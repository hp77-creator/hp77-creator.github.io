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
to the [DB-Engines](https://db-engines.com/en/ranking). It also participates in [Google Summer of Code](https://www.gsocorganizations.dev/organization/mariadb/) and has been doing so since 2016. 

I have always wanted to contribute to a database and recently I have previously got a PR merged in [ClickHouse](https://github.com/ClickHouse/ClickHouse/pull/80228). I also have one open PR in [MariaDB](https://github.com/MariaDB/server/pull/3839).

Before discovering the organization that I wanted to contribute for GSoC, I looked around many databases and projects for my potential organizations
where I could invest time. I reached out to folks in MariaDB Zulip chat, I really liked the reception from folks in the organization.

First challenge was to run `MariaDB` locally on my system (Macbook Air M2), I faced some issues and I documented that in a blog [post](https://hp77-creator.github.io/blogs/building-understanding-mariaDB). I shared the same in the Zulip chat and there was some really good discussion on it. [Link to the thread](https://mariadb.zulipchat.com/#narrow/channel/118760-New-Members/topic/Blog.20on.20how.20to.20compile.20MariaDB.20on.20MacOS/with/497845761)

I really had a good impression of MariaDB after this incident and I wanted to start working on some issues for this org as soon as possible. I referred to a talk by one of the 
core contributors to MariaDB on how I can start and it helped me a lot in the journey. [Link to the talk](https://youtu.be/KJtTSVH_aXA?si=nQuyLsTIVkPc1LEI)

I picked up on one of the issues that I discovered on MariaDB's board and raised a PR for the same Then when the projects were announced I focussed on something related to processes and the project of creating a FRM utility parser caught my eye.

I looked on internet on the `FRM` file format and what it is. [This documentation](https://dbsake.readthedocs.io/en/latest/appendix/frm_format.html) which I guess was prepared after going through the code in `MySQL` or `MariaDB`. Anyway, only after I did my own comprehension of logic of `.frm` files and how they were
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
I had gone through jira comments mentioned on the raised [issue](https://jira.mariadb.org/browse/MDEV-4637). In the comments, Sergei Golubchik describes how we can simply replace the data structures with `printf` and we can have a simple parser. I had thought of the similar approach. After my conversation with my mentors, Nikita Malyavin and Oleksandr Byelkin, we made this approach concrete, My first task was to create a separate utility which simply compiles the `init_from_binary_frm_image` and works. 

## Coding phase

Adding the `init_from_binary_frm_image` was a very simple task, I had directly linked it with `libsql` and other libraries that are used to build the server.
Trying to make it work was the real challenge, In initial days of my attempts, I used to compile the whole server and then run my tool, I had named it `frm-parser`. 
Real challenge was resolving all the different errors that are now coming because linker is now getting duplicates from my linked libraries, headers that 
I am using and the variables that I have defined to make my tool work.

`THD` (Thread Descriptor) is a class for every thread that is created


## Epilogue

Like how famously Kobe Bryant said:
> Job's not finished. Job Finished? I don't think so.

Similarily the work here is not done, it's just the start, there are so many more features that can be incorporated, the initial idea of creating a separate
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

PR [Link](https://github.com/MariaDB/server/pull/4094)

