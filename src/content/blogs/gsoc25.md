---
title: My GSoC'25 Journey with MariaDB 
date: 2025-09-01
description: Sharing my experience and learnings from Google Summer of Code 2025 with MariaDB
visible: true
tags: GSoC, blog, database
---

# Adding a standalone FRM Parser in MariaDB


## Prologue

MariaDB, is a very popular Relational Database Management System(DBMS). It was forked from MySQL and is currently the 14th Most used database according
to the [DB-Engines](https://db-engines.com/en/ranking). It also participates in Google Summer of Code(GSoC) and has been doing so since [2016](https://www.gsocorganizations.dev/organization/mariadb/). 

I have always wanted to contribute to a database and I have previously got a PR merged in [ClickHouse](https://github.com/ClickHouse/ClickHouse/pull/80228). I also have one open PR in [MariaDB](https://github.com/MariaDB/server/pull/3839).

Before discovering the organization that I wanted to contribute for GSoC, I looked around many databases and projects for my potential organizations
where I could invest time. I reached out to folks in MariaDB Zulip chat, I really liked the reception from folks in the organization.

First challenge was to run `MariaDB` locally on my system (Macbook Air M2), I faced some issues and I documented that in a blog [post](https://hp77-creator.github.io/blogs/building-understanding-mariaDB). I shared the same in the Zulip chat and there was some really good discussion on it. [Link to the thread](https://mariadb.zulipchat.com/#narrow/channel/118760-New-Members/topic/Blog.20on.20how.20to.20compile.20MariaDB.20on.20MacOS/with/497845761)

I really had a good impression of MariaDB after this incident and I wanted to start working on some issues for this org as soon as possible. I referred to a talk by one of the 
core contributors to MariaDB on how I can start and it helped me a lot in the journey. [Link to the talk](https://youtu.be/KJtTSVH_aXA?si=nQuyLsTIVkPc1LEI)

I picked up on one of the issues that I discovered on MariaDB's board and raised a PR for the same Then when the projects were announced I focussed on something related to processes and the project of creating a FRM utility parser caught my eye.

I looked on internet on the `FRM` file format and what it is. [This documentation](https://dbsake.readthedocs.io/en/latest/appendix/frm_format.html) which I guess was prepared after going through the code in `MySQL` or `MariaDB` gave me idea about the format.
![format info referenced from dbsake docs](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/frm-format_lsrcoo.png)

Anyway, only after I did my own comprehension of logic of `.frm` files and how they were
being used in `MariaDB` did I discover that `frm` is actually pronounced as 'form' and these 'form' files are basically what `server` creates whenever you do the following from a client:

```sql
MariaDB[debugdb] > CREATE TABLE(id INT, name VARCHAR(10));
```

`server` will create a `.frm` file in the data directory of your server. That's cool and everything but there are instances that some user may want to
recover some DDL commands which they were not able to backup properly. Currently, a tool called `mysqlfrm` exists but it has limitations, those are highlighted in [this](https://jira.mariadb.org/browse/MDEV-18827). I will note down those here as part of problem statement.

## Problem statement

Develop a FRM file parser which does not need to connect to a server and is able to print DDL statement for the Database Administrators. Currently existing tools work well but they will be difficult to maintain as many tools like [dbsake](https://github.com/abg/dbsake) and [go-frm-parser](https://github.com/zing22845/go-frm-parser) parse from the specification that they took out from code, there are some engines which create `frm` file bit differently(`ARCHIVE` engine is one such example).
So, It is really important to create a tool which is using similar methods that are being used by `MariaDB` server.


## Initial approach

I reached out to the org with an approach that we can create one common library something like `libfrm` which will be then used by both `server` and the new utility tool.
![initial approach](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413754/initial-approach_kzlx8m.png)
I had gone through jira comments mentioned on the raised [issue](https://jira.mariadb.org/browse/MDEV-4637). In the comments, Sergei Golubchik describes how we can simply replace the data structures with `printf` and we can have a simple parser. I had thought of the similar approach. After my conversation with my mentors, Nikita Malyavin and Oleksandr Byelkin, we made this approach concrete, My first task was to create a separate utility which simply compiles the `init_from_binary_frm_image` and works. 

## Coding phase

Adding the `init_from_binary_frm_image` was a very simple task, I had directly linked it with `libsql` and other libraries that are used to build the server.
Trying to make it work was the real challenge, In initial days of my attempts, I used to compile the whole server and then run my tool, I had named it `frm-parser`. 
Real challenge was resolving all the different errors that were now coming because linker was now getting duplicates from linked libraries and headers that are used.

### Learnings

MariaDB uses threads for supporting concurrency and to implement that there are various structures, one such element is `THD` or Thread descriptor
`THD` (Thread Descriptor) is a class for every thread that is created. 
It has lot of fields which are helpful and required for every request that comes
from a client into request. Nikita gave me an overview of all the changes and related file details:
![intro-kt](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/mentor-kt_itt7xe.png)

First challenge that I faced was creating a proper `THD` for the tool. Directly declaring it in the tool was leading to `forward-declaration` errors. So I had a 
discussion with my mentors on this and we decided we will use a small version of THD.
Well it seemed like a good idea at the time but as time progressed, with every iteration and run, it was clear that simply creating a small version of `THD` class
with minimal fields will not work, as the memory layout and variables that are 
expected by `init_from_binary_frm_image` from `THD` are too many. Nikita suggested to use the constructor which is available in `sql_class.h` for `THD`.
I went with that and it seemed to have worked. I have mentioned `init_from_binary_frm_image` too many times but have not really told what it does.

`init_from_binary_frm_image`

From the code
> populates TABLE_SHARE from the table description in the binary frm image.
> if 'write' is true, this frm image is also written into a corresponding frm file
> that serves as a persistent metadata cache to avoid discovering the table over
> and over again

As I mentioned in the `Prologue`, It is called whenever user does something like
following from client:
`CREATE TABLE simple(id INT, name VARCHAR(255));`

in server side:
```
pfs_spawn_thread (pfs.cc) --> handle_one_connection (sql_connect.cc) -->
do_handle_one_connection (sql_connect.cc) --> do_command (sql_parse.cc) -->
dispatch_command(command=COM_QUERY, ..., packet="CREATE TABLE simple(id INT, name VARCHAR(255))) (sql_parse.cc) -->
mysql_parse(thd, rawbuf="CREATE TABLE...") (sql_parse.cc) --> mysql_execute_command (sql_parse.cc) --> Sql_cmd_create_table_like::execute (sql_table.cc) -->
mysql_create_table (sql_table.cc) --> mysql_create_table_no_lock (sql_table.cc) -->
create_table_impl (sql_table.cc) --> ha_create_table (handler.cc) -->
TABLE_SHARE::init_from_binary_frm_image (table.cc)

```

So you can see there are lot of functions that a packet(DDL Query) hops before getting saved in
an `.frm` file.
During the introductory call, Nikita had told about the interaction and mentioned the importance of the `handlerton`
> `handlerton` is a singleton structure - one instance per storage engine
> to provide access to storage engine functionality that works on the 
> "global" level (unlike handler class that works on a per-table basis) 

I read more on this in `Understanding MySQL internals` book and learnt that handler is an interface between storage engines and query optimizer. Each storage
engines implement their own handler by inheriting from the `handler` i.e why 
all handlers are written as `ha_blackhole`, `ha_archive`, `ha_connect` and many more.

excerpt from the book
> The interface is implemented through an abstract class named handler, which provides
> methods for basic operations such as opening and closing a table, sequentially 
> scanning through the records, retrieving records based on the value of a key,
> storing a record, and deleting a record

This is all good but I am creating a standalone utility, why should I care for these structures?? Turns out
to use server functions you need server environment available and to make tool
work, I had to create initialization for following subsystems of the server:
```
character sets
thread environment
global system variables
item initialization
```

Tool needed character set because we are not just reading the frm files, we are
also printing them and to do that we are using `open_table_from_share` as the name
suggests this method, opens a table which is present in a `TABLE_SHARE` object.

Once table is opened, we use the `show_create_table` function to print the DDL query
`show_create_table` output is equivalent to running the following query in the 
client of your MariaDB instance:
```
SHOW CREATE TABLE testdb;
```
We wanted to initialize the tool without initializing the whole server subsystems, so I mocked a lot of functions where were there in our
functions but were not required or which were required to run but internally they were coupled with some other server functions, so I mocked 
all of those and created a `frm_mocks.cc` file. 

Even after mocks, parsing was not working properly because of some issues with `handlerton`, Nikita suggested one approach where he used
`ha_blackhole` and shared the patch for the same. I applied the patch, It fixed some functions but still there were issues in `ha_default_handlerton`
and `ha_lock_engine`. `blackhole` was a good alternative but it was not fully compatible with our use case. I referenced from the file 
and created a mock handler for our usecase and called it `Frm_Mock_Handler` inheriting from `handler` class and overriding all the functions
which were needed by our tool. 

Post this addition, Tool was working fine but it was crashing with segfault as I was using `delete thd` to destruct the thread object. In the
destructor there were lot of `dereferencing` and `deletion` of objects which I hadn't initialized when I did `new THD(0, false)`. In server
context, all the other members of `THD` are initialized and used properly but for our use-case we just wanted a Thread object to make our
function work. 
To fix this dereferencing and removing this destruction of objects, I am not deleting any object atm :) I know this can cause memory leak and stuff.
But `mariadb-frm` is a `standalone` utility and it parses one files at a time, so process starts and ends after processing one file, If we are 
leaking or not deleting any objects, OS will take care of that for us. `¯\_(ツ)_/¯`


After adding the utility, I also had to add tests to verify if its working properly for different types of `DDL` commands, I created a
test which could be run by `mtr` (mariadb's test runner), I had to change that as well, It's a `perl` script, so there I had to 
mention which util will execute the frm file `command` 
During the review phase, it was decided, tool will be called `mariadb-frm` , So the command to run it on any frm file will look like
following:
```
$MARIADB_FRM $MYSQL_TEST_DIR/std_data/frm/table_simple.frm
```
where `MARIADB_FRM` is the path to the executable.

Making the CI job pass gave me lot of learning on the different CMake commands and their equivalents. In the `*nix` systems, we can use
following flags:
```
--allow-multiple-definition, -ffunction-sections, --gc-sections
```
These flags were suggested to me by Nikita when I was facing a lot of linker issues, Refer this [doc](https://docs.google.com/document/d/1JER0O5jXR6sCzZIPhMILd813tt-AbqRSnbchmumbgnU/edit?tab=t.0) for detailed explanation for each flag. Crux is that they remove those flags which
are not being used through a `dead code elimination` or `garbage collection of sections` 
These flags helped get over the linker issues and made tool work but now I needed something equivalent for `MacOS` `AppleClang` and `ld` linker.
I came across `-multiply-defined` but turns out it is obsolete, I looked around the `man` page of `ld` and scoured and asked `ChatGPT` for
some flags equivalent to it, but I found none for linking. I tried variants like:
```
SET_TARGET_PROPERTIES(mariadb-frm PROPERTIES
    LINK_FLAGS "-Wl,-w, -Wl,-no_pie, -Wl,-dead_strip"
)
```
Strangest thing was that the whole tool and every test was passing on my system with same `compiler` and `linker` config as was used in CI but
it was failing in cloud for some reason.
![meme](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413756/works-my-system_opqgxo.png)
I checked my install script that I was using to run the tool locally, I observed one flag which I was using but it was not part of `CMakeLists.txt`
and that was `-fno-common`, I thought let's also try this, so I did and it worked.
Turns out that when we use `-fno-common` the compiler will create each uninitialized global variables as a separate definition and `-dead_strip`
removes any unused code section. 

I also learned a lot things related to C++, for example this initialization method - `Placement new`:
```
new(thd->mem_root) Frm_parse_item
```
Above syntax basically creates a new object in the provided location where in when you simply use `new Frm_parse_item` object will be created in
heap wherever program gets free memory. [Reference](https://en.cppreference.com/w/cpp/language/new.html)










## Epilogue

Like how famously Kobe Bryant said:
![kobe-motivation](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/kobe_ovyb6r.png)
> Job's not finished. Job Finished? I don't think so.

Similarily the work here is not done, it's just the start, there are so many more features that can be incorporated in this tool, the initial idea of creating a separate
library can be flirted with. Adding a `--sql` option which outputs the DDL command in a `.sql` file. Fixing the error handling and so much more.
I feel the more people use it, the better it will get. That is why I am tagging it the `v0.1`. It needs a lot of iterations to get to `v1.0`.


## Acknowledgements
I am really grateful to Monty Widenius and Anna Widenius for giving folks like us this wonderful opportunity of contributing to a database like MariaDB.
I would like to thank Sergei Golubchik for his insights during the proposal phase and giving me the opportunity to work on this. I am really thankful to my mentors Nikita Malyavin and Oleksandr Byelkin for their constant guidance and support, I learnt a lot from our interactions and I hope to continue this. 



## TL;DR

`mariadb-frm` is a standalone utility that is created as part of this GSoC, It has following features:
- Parse FRM files
- Parse FRM files created in Engines like ARCHIVE, MEMORY, MyISAM, INNODB, CSV, ARIA
- Parse FRM files with default expressions like `default(val)`
- Parse FRM files that contain mathematical expressions like `1 * 2 * 3` 
- Parse FRM files containing sequences (exception are `frm` files of DDL expressions like `CREATE SEQUENCE ...`) 
- Parse FRM files for some plugin functions like JSON (exception: INET and complex geometric functions are not yet supported) 
- Provides a `--debug` option to stack trace in case of failures
- uses C++20 features

Features that can be supported in coming version of the tool
- Parse FRM files with Virtual columns
- Parse FRM files with Plugin functions of INET6 & JSON and other such plugins


PR [Link](https://github.com/MariaDB/server/pull/4094)

