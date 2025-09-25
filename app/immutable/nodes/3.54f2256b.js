import{S as z,i as J,s as Y,k as w,q as S,a as C,l as b,m as y,r as M,h as c,c as D,n as g,b as v,E as u,G as x,o as V,J as B,$ as Q,u as E}from"../chunks/index.cf6e02a0.js";const $=`---
title: Mudlet through an open source contributor's eyes 
date: 2025-01-23
description: lessons on navigating a large C++ project and understanding it 
visible: false
tags: C++
----

Mudlet, it is an open source application which can be used to play multiplayer text games. It is written in C++ and uses Qt framework for its UI content. It uses raw pointers and is devoid of RAII(I am trying to fix some with this PR: https://github.com/Mudlet/Mudlet/pull/7642)

When you first visit Mudlet, you might feel excited to try it instantly, you can download it from here(insert link here) and if you want to contribute
to it then you will have to learn how to setup your environment, you can refere following guide to get started.

The project is very huge so there are multiple commands that you have to execute to get the application started. You can refer following script for that
\`\`\`shell
mkdir -p build && cd build && rm -rf *
cmake ../../Mudlet-go -DCMAKE_PREFIX_PATH=\`brew --prefix qt@5\` -DUSE_UPDATER=OFF
make -j \`sysctl -n hw.ncpu\`
src/mudlet.app/Contents/MacOS/mudlet
\`\`\`
Note: Make sure to run this script from inside the repo main directory or you might loose all of your changes.
I am currently looking to add feature to add support for voice-readers to read the found result, for more info: . The issue was that result was found
it was highlighted as well but the caret which is used by the voice-readers to get the context for their dictation was not setting up properly.
I fixed that and added a key shortcut to enable this setting. To integrate shortcut, I used the existing \`lua\` scripts and added option for the same.

In the process, I learned that there are some games that might have their own implementation for \`F3\` (key that I have configured to access the results) and that could mess up the search navigation.

If you want to run the program with \`address\` or \`leak\` sanitizers, you can use the following script to do that
I ran this on a MacOS system(specifically m2 air):
\`\`\`shell
#!/bin/bash

# Create and clean build directory
mkdir -p build && cd build && rm -rf *

# Configure with memory leak detection
cmake ../../Mudlet-go \\
    -DCMAKE_PREFIX_PATH=\`brew --prefix qt@5\` \\
    -DUSE_UPDATER=OFF \\
    -DCMAKE_BUILD_TYPE=Debug \\
    -DCMAKE_C_COMPILER="$(brew --prefix llvm)/bin/clang" \\
    -DCMAKE_CXX_COMPILER="$(brew --prefix llvm)/bin/clang++" \\
    -DCMAKE_CXX_FLAGS="-fsanitize=address -fno-omit-frame-pointer" \\
    -DCMAKE_C_FLAGS="-fsanitize=address -fno-omit-frame-pointer" \\
    -DCMAKE_EXE_LINKER_FLAGS="-fsanitize=address"

# Build using available cores
make -j \`sysctl -n hw.ncpu\`

# Run with memory leak detection
ASAN_OPTIONS=detect_leaks=1:leak_check_at_exit=1:verbosity=1 src/mudlet.app/Contents/MacOS/mudlet 2>&1 | tee asan_output.log
\`\`\`

When you build some C++ program, you have to first check the kind of build system project is using, most of the \`C++\` projects that I have come across \`cmake\` but there can be others like \`bazel\` and some custom ones ()[];

---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
`,Z=`---
title: Adding a FRM parser to MariaDB 
date: 2025-06-23
description: A GSoC project 
visible: false
tags: database, mariaDB, C++
---

In one of my previous posts, I had described my journey of how I compiled \`MariaDB\` on MacOS. It was a struggle and a lot of back and forth but in the process, I learnt about some dependencies that aren't really necessary to compile and run \`MariaDB\`. In this 
blog post, I will be talking about \`.frm\` (form) files and a parser that I am writing as part of this Google summer of Code.

Google Summer of Code is in motion, with this being a pen-ultimate week before mid evaluations, I am currently contributing in this
project (https://summerofcode.withgoogle.com/programs/2025/projects/vAVydntH).

In Community bonding period, members of MariaDB community had setup a call where we introduced ourselves and got to know about our mentors. Post that I connected with my mentors separately and they told me how I can approach this problem. I had researched at my end about the \`.frm\` files and where they are used in the \`MariaDB\`.

Through some jira comments mentioned on the raised issue(https://jira.mariadb.org/browse/MDEV-4637). In the comments, Sergei Golubchik describes how we can simply replace the data structures with \`printf\` and we can have a simple parser. I had thought of the similar approach. After my conversation with my mentors, Nikita Malyavin and Oleksandr Sanja Byelkin, we made this approach concrete, My first task was to create a separate utility which simply compile the \`init_from_binary_frm_image\` and works. 

I was given the KT on the process and different data structures by Nikita Malyavin and Oleksandr "Sanja" Byelkin in the discussion call, there I learnt about different \`handlers\` that are being used and the data structures like \`THD\`, \`TABLE\`, \`TABLE_SHARE\`.

In my time, I searched around the format of form files and different tools that are already there in the wild, one particular blog
that I came across and found helpful was this: https://dbsake.readthedocs.io/en/latest/appendix/frm_format.html#frm-format
But it was better to trust the implementation in the \`init_from_binary_frm_image\` function which is defined in \`table.cc\` 

\`TABLE_SHARE::init_from_binary_frm_image\`



Currently when MariaDB starts we have 

---- 

## References

- [MariaDB official Docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)
- [ChatGPT](https://chatgpt.com/)
- [CFI directives](https://sourceware.org/binutils/docs/as/CFI-directives.html)
- [Configuration option](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)
- [Understanding MySQL internals](https://www.amazon.in/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577)
`,ee=`---
title: Building and Running MariaDB on Macbook
date: 2025-02-02
description: letting out the Seal in M-series (sea-ries XD)
visible: true
tags: database, mariaDB, C++, Macbook
---

## Building MariaDB

MariaDB is a fork of MySQL which has been in effect to provide users the flexibility to go with an open source version for a DB like MySQL which is owned by Oracle. 
It is written in C++. To build it on my system(macbook air M2) I followed these steps:
We are going to build the \`server\` which is where most of things happen for the DBMS

- Fork the official repo: [Github](https://github.com/MariaDB/server)
- Clone your forked repo: \`git clone https://github.com/YOUR-USERNAME/server\`
 First time the clone failed because of the following reason:
 \`\`\`shell
 git clone https://github.com/hp77-creator/my-maria-server.git
Cloning into 'my-maria-server'...
remote: Enumerating objects: 1391033, done.
remote: Counting objects: 100% (100/100), done.
remote: Compressing objects: 100% (69/69), done.
error: RPC failed; curl 92 HTTP/2 stream 5 was not closed cleanly: CANCEL (err 8)
error: 2491 bytes of body are still expected
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
 \`\`\`
 Trying by increasing the buffer size:
 \`git config --global http.postBuffer 524288000\`
  The error persists, so I switched to \`ssh\`
  It got cloned.

- Enter into your cloned directory: \`cd my-maria-server\`
- Create a new build directory and change directory to that: \`mkdir -p build && cd build\`
- We will create a \`Debug\` build. To do that, run: \`cmake .. -DCMAKE_BUILD_TYPE=Debug\`
    During installation, I found out that \`bison\` was not installed properly, so I installed it with
    \`brew install bison\` and updated my \`$PATH\` to use or you can use
    \`\`\`
    -DBISON_EXECUTABLE=/opt/homebrew/opt/bison/bin/bison
    \`\`\`
    option when using cmake
- You can follow along this link: [MariaDB docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)

I had read in the book \`Understanding MySQL Internals\` that \`MySQL\` works best with \`GCC\`, so I thought I will try with
that but before that I ran it with default compiler provided by Apple(Clang) there were lot of errors and I was trying to run following commands:
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug
cmake --build . --parallel 5
\`\`\`
During \`--build\` it was giving a lot of errors. I looked up the meaning of different errors, those errors were because of strict nullability check by the compiler. To get over those, I added following options:

> Note before running the following command, ensure that you have cleared your existing build directory.

\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_FLAGS="-Wno-nullability-completeness" \\
-DCMAKE_CXX_FLAGS="-Wno-nullability-completeness"
\`\`\`
Also if you like to log the errors, you can do the following during build:
\`\`\`
cmake --build . --parallel 5 2>&1 | tee build.log
\`\`\`
It failed again, this time it was unable to find the standard \`<stdint.h>\` header. I checked up online, If I can find options to provide these headers specifically and  I did the following:
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=/usr/bin/clang \\
-DCMAKE_CXX_COMPILER=/usr/bin/clang++ \\
-DCMAKE_CXX_FLAGS="-isystem /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include -isystem /Library/Developer/CommandLineTools/usr/include/c++/v1" \\
-DCMAKE_C_FLAGS="-isystem /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include"
\`\`\`

> \`isystem\` adds system include paths, although ideally it should be added in your \`CMakeLists.txt\` file: [StackOverflow answer](https://stackoverflow.com/a/3371528/7116645)

Using the system compiler didn't work again, I thought, maybe I should use \`Homebrew\`'s version of \`clang\` as from experience I had found it better for cross-platform support.

So, I did the following:
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=/opt/homebrew/opt/llvm/bin/clang \\
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/llvm/bin/clang++ \\
-DCMAKE_CXX_FLAGS="-Wno-nullability-completeness" \\
-DCMAKE_C_FLAGS="-Wno-nullability-completeness"
\`\`\`

> You need to have \`brew\` version of clang installed: \`brew install llvm\`

I felt maybe clang's libraries does not have \`stdint\` or maybe I am missing something but I thought, let's try with \`GCC\` as I had read it works fine elsewhere. so I installed gcc: \`brew install gcc\`
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=/opt/homebrew/opt/gcc/bin/gcc-14 \\
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/gcc/bin/g++-14
\`\`\`

There were some errors on about \`deined\` usage and its portability concerns, so I added some more options:
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=/opt/homebrew/opt/gcc/bin/gcc-13 \\
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/gcc/bin/g++-13 \\
-DCMAKE_CXX_FLAGS="-Wno-error=expansion-to-defined -Wno-error" \\
-DCMAKE_C_FLAGS="-Wno-error=expansion-to-defined -Wno-error" \\
-DWITH_DEBUG=1
\`\`\`

I started facing new errors now, something like:
\`\`\`
 3%] No configure step for 'libfmt'
In file included from /Users/himanshu.pandey/codes/gh-repos/my-maria-server/libmariadb/include/ma_global.h:152,
from /Users/himanshu.pandey/codes/gh-repos/my-maria-server/libmariadb/libmariadb/get_password.c:19:
/Library/Developer/CommandLineTools/SDKs/MacOSX15.sdk/usr/include/math.h:54:5: error: #error "Unsupported value of __FLT_EVAL_METHOD__."
54 | # error "Unsupported value of __FLT_EVAL_METHOD__."
| ^~~~~
\`\`\`

I guess, \`MariaDB\` is using some value of \`__FLT_EVAL_METHOD__\` which is not supported by MacOS, I was bit surprised that MacOS libraries were being used, when I had explicitly mentioned to use 
\`Homebrew\`'s \`gcc\` compiler. I tried some approach to use the libraries of \`gcc\` but that was also of no use.
I also set the values of these functions explicitly so that it is overriden during build stage. 
There was some progress but then there were some errors on \`CFI\` directives like following:
\`\`\`
/var/folders/95/n9tm7h4s46sdk134wgfzj8s40000gp/T//ccn7M7ep.s:36:2: error: this directive must appear between .cfi_startproc and .cfi_endproc directives
.cfi_escape 0x07, 30
^
make[2]: *** [libmariadb/libmariadb/CMakeFiles/mariadb_obj.dir/ma_context.c.o] Error 1
make[1]: *** [libmariadb/libmariadb/CMakeFiles/mariadb_obj.dir/all] Error 2
\`\`\`

I asked \`Chatgpt\` and it told this happens when we do relocation on \`ARM\` systems, I figured it could be the mismatch between the machine configuration,
> CFI directives are used by debuggers and unwinders to walk the call stack
I presented my script to it to suggest modifications, it gave the following with Default clang version:
\`\`\`
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=/usr/bin/clang \\
-DCMAKE_CXX_COMPILER=/usr/bin/clang++ \\
-DCMAKE_CXX_FLAGS="-Wno-error -D__FLT_EVAL_METHOD__=0" \\
-DCMAKE_C_FLAGS="-Wno-error -D__FLT_EVAL_METHOD__=0" \\
-DWITH_DEBUG=1 \\
-DWITHOUT_TOKUDB=1 \\
-DWITH_UNIT_TESTS=OFF \\
-DWITH_SSL=system \\
-DWITH_ZLIB=system \\
-DCONC_WITH_EXTERNAL_ZLIB=ON \\
-DWITHOUT_MROONGA=1 \\
-DWITHOUT_ROCKSDB=1
\`\`\`

This script gave a lot of errors on \`OPENSSL\` casting. I added the flags to disable these warnings and disabled a lot of plugins that are by default enabled while building the server.

> Update: 3rd June, 2025 -- Add a new flag CMakeList version flag because of wsrep-lib CMake Version

At the end, I created a script with the commands that I had to type again and again and it came out to look like following:


\`\`\`
#!/bin/sh

# Set paths
MACOS_SDK=/Library/Developer/CommandLineTools/SDKs/MacOSX15.sdk

# Common flags for both C and C++ (all in one line)
COMMON_FLAGS="-w \\
-g \\
-fno-asynchronous-unwind-tables \\
-ffunction-sections \\
-fdata-sections \\
-fno-common \\
-mmacosx-version-min=14.0 \\
-arch arm64"

# Clean and create build directory
rm -rf cmake-build-debug
mkdir -p cmake-build-debug && cd cmake-build-debug

# Run cmake with Clang
cmake .. -DCMAKE_BUILD_TYPE=Debug \\
-DCMAKE_C_COMPILER=clang \\
-DCMAKE_CXX_COMPILER=clang++ \\
-DCMAKE_C_FLAGS="\${COMMON_FLAGS}" \\
-DCMAKE_CXX_FLAGS="\${COMMON_FLAGS}" \\
-DCMAKE_OSX_SYSROOT="\${MACOS_SDK}" \\
-DCMAKE_OSX_DEPLOYMENT_TARGET=14.0 \\
-DWITH_DEBUG=1 \\
-DWITHOUT_TOKUDB=1 \\
-DWITH_UNIT_TESTS=OFF \\
-DWITH_SSL=system \\
-DWITH_ZLIB=system \\
-DCONC_WITH_EXTERNAL_ZLIB=ON \\
-DWITHOUT_MROONGA=1 \\
-DWITHOUT_ROCKSDB=1 \\
-DPLUGIN_TOKUDB=NO \\
-DPLUGIN_ROCKSDB=NO \\
-DPLUGIN_MROONGA=NO \\
-DCONNECT_WITH_MONGO=OFF \\
-DCONNECT_WITH_BSON=OFF \\
-DMYSQL_MAINTAINER_MODE=OFF \\  
-DCMAKE_POLICY_VERSION_MINIMUM=3.5 \\
-G Ninja

# Build using ninja with parallel jobs and logging
cmake --build . --parallel 5 2>&1 | tee build.log
\`\`\`


## Running MariaDB locally

You can directly follow official [docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/);

I will just summarize what I did:

- Create a directory to store your data, I named it \`mariaddb_data\` and stored it in my
home directory
- Create a configuration file like following

\`\`\`
[client-server]
socket = path/to/mariadb.sock

[mariadb]
datadir = path/to/mariadb_data
\`\`\`

- Change directory to your build directory and run the following script
\`\`\`
/scripts/mariadb-install-db \\
--user=$(whoami) \\
--datadir=path/to/mariadb_data \\
--srcdir=path/to/server \\
--defaults-file=path/to/mariadb.conf
\`\`\`

- Open a new terminal session, \`cd\` to your build directory and start the server

\`\`\`
./sql/mariadbd --defaults-file=path/to/mariadb.conf
\`\`\`

- Start the client in new session
\`\`\`
./client/mariadb --defaults-file=path/to/mariadb.conf
\`\`\`

You can then run the following commands and verify your build:
\`\`\`
SHOW DATABASES;
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE test (id INT, name VARCHAR(50));
INSERT INTO test VALUES (1, 'Test User');
SELECT * FROM test;
\`\`\`

> Building and running it took most of my day, will write about internals in another blog post


---- 

## References

- [MariaDB official Docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)
- [ChatGPT](https://chatgpt.com/)
- [CFI directives](https://sourceware.org/binutils/docs/as/CFI-directives.html)
- [Configuration option](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)
- [Understanding MySQL internals](https://www.amazon.in/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577)
`,ne=`---
title: mishap with git rebase, reflog to rescue
date: 2024-12-10
description: lesson on Git and what not to do 
visible: true
tags: git, debugging, tips
---

I was working on one Spring boot repo. The code was mix of spaghetti from around the world and I wanted to iron out some things.
Apply SOLID principles and make it more readable for myself. I did those changes but then I realized that on this same repo there has 
been work done by my colleague as well.

so like my habit, I simply did
\`git rebase origin main\` when I was on a \`feature\` branch and then I saw some conflicts, I expected those since there were some changes that were in common files. I used \`IntelliJ\` merge editor to resolve the conflicts but then I see that my branch is changed to \`main\`

![main-branch-pic](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413819/main-branch_ygzwj3.png)

Before observing this change, I had also done \`git add\` and was about to \`commit\`.

But now that my branch was switched to \`main\`, I was curious what did I do wrong and do I know rebase correctly. I searched for my mistake and observed that, when we do rebase
we should use

\`git rebase origin/main\` and not \`git rebase origin main\`

when you do \`git rebase origin/main\`

You are telling \`git\` to rebase your existing branch with \`main\` that is there in \`origin\`

and when you do \`git rebase origin main\` 

You are telling \`git\` to rebase your __main__ branch with \`origin\`'s \`main\` and it automatically switches your branch as well.

To see the history of the \`HEAD\` pointer of \`git\` to track which branch it switched to or from, you can use \`git reflog\`.

It will show you history of the branches and places it had originated from and had been, something like below:
![git-reflog](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413821/git-reflog_vwuqsc.png)






---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
`,te=`---
title: TIL - Git worktree & WCGW even after Server processes request sucessfully
date: 2025-03-28
description: Learning more on internals of Git & Web Server 
visible: true
tags: git, java, spring-boot
---

I am currently working on an internal tool where I am tasked with creating a microservice to interact with a client. Tech stack that we use in my organization
is mostly in Java(Spring-boot). Spring-boot is such a powerful and beautiful framework. You can create servers so easily. It's IOC(Inversion of
control) paradigm, it's autoconfiguration and dependency management all lead to a wonderful developer experience.

I mapped an endpoint in my controller like following:
\`\`\`java

@PostMapping("/post/text")
public ResponseEntity<Text> addText(@Valid @RequestBody RequestBody request) {
    return Response.ok(dependentService.addText(request));
}
\`\`\`
It was a pretty simple endpoint, and in the service implementation, I was simply saving whatever the user was sending from their end, ofc with validations.
I ran the server, It compiled and then executed without any error, Server was up. I hit my create request using an http client, 
I observed a strange thing, I see that server is returning me a \`500\` with some \`Internal Server Exception\`, I thought let's check the server logs, there might
be something that I missed.
To my shock, there was nothing in server logs, nada. It baffled me even more, I was like what went wrong here. I put some debugger points and checked with that, inside service, function is returning expected response, inside controller, If I execute the return statement separately, using \`Evaluate expression\` of IntelliJ, I see correct response, so I continue the execution and again same error.

Well, At this point, I was questioning my configuration, did I mess up anything there, I don't know, I looked around, took reference from other services, I was 
following what should be followed but I was getting error meanwhile other services were working fine and worst part, I didn't know from where the error was coming. I approached with this problem to my colleague, they mentioned they have seen this same issue before, they suggested to add a configuration for \`ObjectMapper\`, of course, the error must be happening in the serialization layer, logs for that are not shown by default. To see that, I added following lines in the 
\`application.properties\`
\`\`\`
logging.level.org.springframework.web=debug
logging.level.com.fasterxml.jackson.databind=debug
\`\`\`
And indeed, Error was occuring because of a model mismatch. I fixed that model and then the issue was resolved. This incident made me realize how much we take 
for granted different abstractions that frameworks provide, It prompted me to always think in terms of first principle whenever we get stuck and look beyond 
abstractions provided by your framework.

---

Git Worktree

Have you ever had a project, where you were working on a branch, you have some changes which are not committed but then you receive a requirement which needs a new branch from your \`main\`. What would you do in this case?

Before today, I would have done \`git stash\`, switch \`HEAD\` to \`main\` and then create another branch from there and work on the higher priority feature/fix. 
But Today I learned that there exists something like \`git worktree\` and it is such a wonderful command. Essentially it creates a new repo for you from your existing git objects from the branch that you mention, example:
\`\`\`shell
git worktree add -b emergency-fix ../temp master
\`\`\`
Above command will create a new repo in your parent directory with name \`temp\` and switch to \`emergency-fix\` branch and you can simply \`cd\` or (\`pushd\`) into it and start working on your fix, when 
done you can simply commit from the new directory and then switch back to your old directory.

This command legit helps you have multiple context for your project, It extends the concept of branch, I was reading more about it in \`Mastering Git\` and during
my read, I learnt that it has been there for long time and It was shock for me that during my entire college years and now dev years, I didn't see it being 
mentioned much. 
I am modifying my git workflow to include this command and have better separation for concern for different features. Features like this make you realize how much you don't know about some of the tools that you think you might be knowing a lot. Answer is to always \`Stay curious\`.

Workflow that I am switching to, if there's any feature that I need to work on, what I do is
\`\`\`shell
git worktree add -b account_api_fix ../api-fix main 
\`\`\`
\`-b\` creates a new branch, \`../api-fix\` creates a new worktree in the parent directory of current location, \`main\` is for from where it 
should branch the new branch and create the worktree.

After work is done, I simply do
\`\`\`shell
git worktree remove <worktree-name>
\`\`\`
above command removes the worktree from the \`git\` object and also removes the extra created directory.


Also, Would like to mention that when you change your directory, you might have to reinstall your dependencies which you normally ignore, example \`venv\` dir in \`python\` and \`node_modules\` in \`Javascript\`

---- 

## References

- [Mastering Git](https://www.amazon.in/Mastering-Git-Jakub-Narebski/dp/1783553758)
- [Git Worktree documentation](https://git-scm.com/docs/git-worktree)
`,ae=`---
title: My GSoC'24 Journey with eunomia-bpf
date: 2024-07-21
description: Sharing my experience and learnings from Google Summer of Code 2024 with eunomia-bpf
visible: true
tags: GSoC, blog
---

# My GSoC'24 Journey with eunomia-bpf

I'm excited to share my experience as a Google Summer of Code contributor at eunomia-bpf. In this blog post, I'll walk through my journey, the challenges I faced, and what I learned along the way.

## About eunomia-bpf

[eunomia-bpf](https://eunomia.dev/) is an innovative project that brings eBPF technology to userspace. What makes it particularly interesting is that eBPF, traditionally a kernel-space technology, is now accessible in userspace through their runtime implementation.

## My Contribution

During my GSoC period, I worked on [describe your specific project/contribution]. Some key highlights include:

- bpftime can be compiled on macOS system with feature flags 
- Added tests for functionalities that weren't there before 
- Made registers architecture agnostic 

## Technical Challenges

Some of the interesting technical challenges I encountered were:

1. Testing:
 - I didn't have any non-macOS system with me so testing those changes was very difficult, even setting it up with UTM(QEMU) was not that fast. Once changes were done they needed to be synced with the code in my UTM system and then see the feedback
2. No support of libraries like libelf and libbpf on MacOS meant adding these libraries as your own header files

## What I Learned

This experience has taught me a lot about:

- Working with eBPF technology
- Contributing to open source
- Collaborating with a global team

## Future Plans

Moving forward, I plan to:

- Continue contributing to eunomia-bpf
- Explore more aspects of systems programming
- Share my knowledge with the community

## Conclusion

GSoC has been an incredible learning experience. I'm grateful for the opportunity to work with the eunomia-bpf team and contribute to such an innovative project.

Feel free to check out my contributions on [GitHub](https://github.com/eunomia-bpf/bpftime) and reach out if you have any questions about my GSoC experience!
`,oe=`---
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

First challenge was to run \`MariaDB\` locally on my system (Macbook Air M2), I faced some issues and I documented that in a blog [post](https://hp77-creator.github.io/blogs/building-understanding-mariaDB). I shared the same in the Zulip chat and there was some really good discussion on it. [Link to the thread](https://mariadb.zulipchat.com/#narrow/channel/118760-New-Members/topic/Blog.20on.20how.20to.20compile.20MariaDB.20on.20MacOS/with/497845761)

I really had a good impression of MariaDB after this incident and I wanted to start working on some issues for this org as soon as possible. I referred to a talk by one of the 
core contributors to MariaDB on how I can start and it helped me a lot in the journey. [Link to the talk](https://youtu.be/KJtTSVH_aXA?si=nQuyLsTIVkPc1LEI)

I picked up on one of the issues that I discovered on MariaDB's board and raised a PR for the same Then when the projects were announced I focussed on something related to processes and the project of creating a FRM utility parser caught my eye.

I looked on internet on the \`FRM\` file format and what it is. [This documentation](https://dbsake.readthedocs.io/en/latest/appendix/frm_format.html) which I guess was prepared after going through the code in \`MySQL\` or \`MariaDB\` gave me idea about the format.
![format info referenced from dbsake docs](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/frm-format_lsrcoo.png)

Anyway, only after I did my own comprehension of logic of \`.frm\` files and how they were
being used in \`MariaDB\` did I discover that \`frm\` is actually pronounced as 'form' and these 'form' files are basically what \`server\` creates whenever you do the following from a client:

\`\`\`sql
MariaDB[debugdb] > CREATE TABLE(id INT, name VARCHAR(10));
\`\`\`

\`server\` will create a \`.frm\` file in the data directory of your server. That's cool and everything but there are instances that some user may want to
recover some DDL commands which they were not able to backup properly. Currently, a tool called \`mysqlfrm\` exists but it has limitations, those are highlighted in [this](https://jira.mariadb.org/browse/MDEV-18827). I will note down those here as part of problem statement.

## Problem statement

Develop a FRM file parser which does not need to connect to a server and is able to print DDL statement for the Database Administrators. Currently existing tools work well but they will be difficult to maintain as many tools like [dbsake](https://github.com/abg/dbsake) and [go-frm-parser](https://github.com/zing22845/go-frm-parser) parse from the specification that they took out from code, there are some engines which create \`frm\` file bit differently(\`ARCHIVE\` engine is one such example).
So, It is really important to create a tool which is using similar methods that are being used by \`MariaDB\` server.


## Initial approach

I reached out to the org with an approach that we can create one common library something like \`libfrm\` which will be then used by both \`server\` and the new utility tool.
![initial approach](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413754/initial-approach_kzlx8m.png)
I had gone through jira comments mentioned on the raised [issue](https://jira.mariadb.org/browse/MDEV-4637). In the comments, Sergei Golubchik describes how we can simply replace the data structures with \`printf\` and we can have a simple parser. I had thought of the similar approach. After my conversation with my mentors, Nikita Malyavin and Oleksandr Byelkin, we made this approach concrete, My first task was to create a separate utility which simply compiles the \`init_from_binary_frm_image\` and works. 

## Coding phase

Adding the \`init_from_binary_frm_image\` was a very simple task, I had directly linked it with \`libsql\` and other libraries that are used to build the server.
Trying to make it work was the real challenge, In initial days of my attempts, I used to compile the whole server and then run my tool, I had named it \`frm-parser\`. 
Real challenge was resolving all the different errors that were now coming because linker was now getting duplicates from linked libraries and headers that are used.

### Learnings

MariaDB uses threads for supporting concurrency and to implement that there are various structures, one such element is \`THD\` or Thread descriptor
\`THD\` (Thread Descriptor) is a class for every thread that is created. 
It has lot of fields which are helpful and required for every request that comes
from a client into request. Nikita gave me an overview of all the changes and related file details:
![intro-kt](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/mentor-kt_itt7xe.png)

First challenge that I faced was creating a proper \`THD\` for the tool. Directly declaring it in the tool was leading to \`forward-declaration\` errors. So I had a 
discussion with my mentors on this and we decided we will use a small version of THD.
Well it seemed like a good idea at the time but as time progressed, with every iteration and run, it was clear that simply creating a small version of \`THD\` class
with minimal fields will not work, as the memory layout and variables that are 
expected by \`init_from_binary_frm_image\` from \`THD\` are too many. Nikita suggested to use the constructor which is available in \`sql_class.h\` for \`THD\`.
I went with that and it seemed to have worked. I have mentioned \`init_from_binary_frm_image\` too many times but have not really told what it does.

\`init_from_binary_frm_image\`

From the code
> populates TABLE_SHARE from the table description in the binary frm image.
> if 'write' is true, this frm image is also written into a corresponding frm file
> that serves as a persistent metadata cache to avoid discovering the table over
> and over again

As I mentioned in the \`Prologue\`, It is called whenever user does something like
following from client:
\`CREATE TABLE simple(id INT, name VARCHAR(255));\`

in server side:
\`\`\`
pfs_spawn_thread (pfs.cc) --> handle_one_connection (sql_connect.cc) -->
do_handle_one_connection (sql_connect.cc) --> do_command (sql_parse.cc) -->
dispatch_command(command=COM_QUERY, ..., packet="CREATE TABLE simple(id INT, name VARCHAR(255))) (sql_parse.cc) -->
mysql_parse(thd, rawbuf="CREATE TABLE...") (sql_parse.cc) --> mysql_execute_command (sql_parse.cc) --> Sql_cmd_create_table_like::execute (sql_table.cc) -->
mysql_create_table (sql_table.cc) --> mysql_create_table_no_lock (sql_table.cc) -->
create_table_impl (sql_table.cc) --> ha_create_table (handler.cc) -->
TABLE_SHARE::init_from_binary_frm_image (table.cc)

\`\`\`

So you can see there are lot of functions that a packet(DDL Query) hops before getting saved in
an \`.frm\` file.
During the introductory call, Nikita had told about the interaction and mentioned the importance of the \`handlerton\`
> \`handlerton\` is a singleton structure - one instance per storage engine
> to provide access to storage engine functionality that works on the 
> "global" level (unlike handler class that works on a per-table basis) 

I read more on this in \`Understanding MySQL internals\` book and learnt that handler is an interface between storage engines and query optimizer. Each storage
engines implement their own handler by inheriting from the \`handler\` i.e why 
all handlers are written as \`ha_blackhole\`, \`ha_archive\`, \`ha_connect\` and many more.

excerpt from the book
> The interface is implemented through an abstract class named handler, which provides
> methods for basic operations such as opening and closing a table, sequentially 
> scanning through the records, retrieving records based on the value of a key,
> storing a record, and deleting a record

This is all good but I am creating a standalone utility, why should I care for these structures?? Turns out
to use server functions you need server environment available and to make tool
work, I had to create initialization for following subsystems of the server:
\`\`\`
character sets
thread environment
global system variables
item initialization
\`\`\`

Tool needed character set because we are not just reading the frm files, we are
also printing them and to do that we are using \`open_table_from_share\` as the name
suggests this method, opens a table which is present in a \`TABLE_SHARE\` object.

Once table is opened, we use the \`show_create_table\` function to print the DDL query
\`show_create_table\` output is equivalent to running the following query in the 
client of your MariaDB instance:
\`\`\`
SHOW CREATE TABLE testdb;
\`\`\`
We wanted to initialize the tool without initializing the whole server subsystems, so I mocked a lot of functions where were there in our
functions but were not required or which were required to run but internally they were coupled with some other server functions, so I mocked 
all of those and created a \`frm_mocks.cc\` file. 

Even after mocks, parsing was not working properly because of some issues with \`handlerton\`, Nikita suggested one approach where he used
\`ha_blackhole\` and shared the patch for the same. I applied the patch, It fixed some functions but still there were issues in \`ha_default_handlerton\`
and \`ha_lock_engine\`. \`blackhole\` was a good alternative but it was not fully compatible with our use case. I referenced from the file 
and created a mock handler for our usecase and called it \`Frm_Mock_Handler\` inheriting from \`handler\` class and overriding all the functions
which were needed by our tool. 

Post this addition, Tool was working fine but it was crashing with segfault as I was using \`delete thd\` to destruct the thread object. In the
destructor there were lot of \`dereferencing\` and \`deletion\` of objects which I hadn't initialized when I did \`new THD(0, false)\`. In server
context, all the other members of \`THD\` are initialized and used properly but for our use-case we just wanted a Thread object to make our
function work. 
To fix this dereferencing and removing this destruction of objects, I am not deleting any object atm :) I know this can cause memory leak and stuff.
But \`mariadb-frm\` is a \`standalone\` utility and it parses one files at a time, so process starts and ends after processing one file, If we are 
leaking or not deleting any objects, OS will take care of that for us. \`¯\\_(ツ)_/¯\`


After adding the utility, I also had to add tests to verify if its working properly for different types of \`DDL\` commands, I created a
test which could be run by \`mtr\` (mariadb's test runner), I had to change that as well, It's a \`perl\` script, so there I had to 
mention which util will execute the frm file \`command\` 
During the review phase, it was decided, tool will be called \`mariadb-frm\` , So the command to run it on any frm file will look like
following:
\`\`\`
$MARIADB_FRM $MYSQL_TEST_DIR/std_data/frm/table_simple.frm
\`\`\`
where \`MARIADB_FRM\` is the path to the executable.

Making the CI job pass gave me lot of learning on the different CMake commands and their equivalents. In the \`*nix\` systems, we can use
following flags:
\`\`\`
--allow-multiple-definition, -ffunction-sections, --gc-sections
\`\`\`
These flags were suggested to me by Nikita when I was facing a lot of linker issues, Refer this [doc](https://docs.google.com/document/d/1JER0O5jXR6sCzZIPhMILd813tt-AbqRSnbchmumbgnU/edit?tab=t.0) for detailed explanation for each flag. Crux is that they remove those flags which
are not being used through a \`dead code elimination\` or \`garbage collection of sections\` 
These flags helped get over the linker issues and made tool work but now I needed something equivalent for \`MacOS\` \`AppleClang\` and \`ld\` linker.
I came across \`-multiply-defined\` but turns out it is obsolete, I looked around the \`man\` page of \`ld\` and scoured and asked \`ChatGPT\` for
some flags equivalent to it, but I found none for linking. I tried variants like:
\`\`\`
SET_TARGET_PROPERTIES(mariadb-frm PROPERTIES
    LINK_FLAGS "-Wl,-w, -Wl,-no_pie, -Wl,-dead_strip"
)
\`\`\`
Strangest thing was that the whole tool and every test was passing on my system with same \`compiler\` and \`linker\` config as was used in CI but
it was failing in cloud for some reason.
![meme](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413756/works-my-system_opqgxo.png)
I checked my install script that I was using to run the tool locally, I observed one flag which I was using but it was not part of \`CMakeLists.txt\`
and that was \`-fno-common\`, I thought let's also try this, so I did and it worked.
Turns out that when we use \`-fno-common\` the compiler will create each uninitialized global variables as a separate definition and \`-dead_strip\`
removes any unused code section. 

I also learned a lot things related to C++, for example this initialization method - \`Placement new\`:
\`\`\`
new(thd->mem_root) Frm_parse_item
\`\`\`
Above syntax basically creates a new object in the provided location where in when you simply use \`new Frm_parse_item\` object will be created in
heap wherever program gets free memory. [Reference](https://en.cppreference.com/w/cpp/language/new.html)










## Epilogue

Like how famously Kobe Bryant said:
![kobe-motivation](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413755/kobe_ovyb6r.png)
> Job's not finished. Job Finished? I don't think so.

Similarily the work here is not done, it's just the start, there are so many more features that can be incorporated in this tool, the initial idea of creating a separate
library can be flirted with. Adding a \`--sql\` option which outputs the DDL command in a \`.sql\` file. Fixing the error handling and so much more.
I feel the more people use it, the better it will get. That is why I am tagging it the \`v0.1\`. It needs a lot of iterations to get to \`v1.0\`.


## Acknowledgements
I am really grateful to Monty Widenius and Anna Widenius for giving folks like us this wonderful opportunity of contributing to a database like MariaDB.
I would like to thank Sergei Golubchik for his insights during the proposal phase and giving me the opportunity to work on this. I am really thankful to my mentors Nikita Malyavin and Oleksandr Byelkin for their constant guidance and support, I learnt a lot from our interactions and I hope to continue this. 



## TL;DR

\`mariadb-frm\` is a standalone utility that is created as part of this GSoC, It has following features:
- Parse FRM files
- Parse FRM files created in Engines like ARCHIVE, MEMORY, MyISAM, INNODB, CSV, ARIA
- Parse FRM files with default expressions like \`default(val)\`
- Parse FRM files that contain mathematical expressions like \`1 * 2 * 3\` 
- Parse FRM files containing sequences (exception are \`frm\` files of DDL expressions like \`CREATE SEQUENCE ...\`) 
- Parse FRM files for some plugin functions like JSON (exception: INET and complex geometric functions are not yet supported) 
- Provides a \`--debug\` option to stack trace in case of failures
- uses C++20 features

Features that can be supported in coming version of the tool
- Parse FRM files with Virtual columns
- Parse FRM files with Plugin functions of INET6 & JSON and other such plugins


PR [Link](https://github.com/MariaDB/server/pull/4094)

`,ie=`---
title: India FOSS'25 - A weekend into learning
date: 2025-09-21
description: India FOSS is an annual conference where hackers from around India come and share their learnings 
visible: true
tags: blog, technical-writing
---



> Disclaimer:
>
>I don't claim everything mentioned here will be correct or how the original speaker intended those to be.
>This is supposed to be a log of my experience at
>the conference. For exact details and info you can visit: https://fossunited.org/dashboard/schedule/indiafoss/2025
>
>For Videos of the conference: https://youtube.com/playlist?list=PLOGilj110olxij6kbNUlRdd3Ez8bWczny&si=hQ04NrjBhxT1IjDJ


# Day 1

We visited the location for the conference which was at NIMHANS convention center

I attended the Compilers and systems track which was organized in Devroom-2 

Lineup of talk was awesome, I had planned to sit through all the talks for this track which were planned till lunch. Post lunch
schedule was not decided

*First* talk was on Creating CLI tools in Go, It was a nice talk which told about different practices that we can use to make our
CLI better for our users

*Second* talk was on Cache eviction strategies, I learnt a lot about different methods, I only knew couple of them like FIFO, LRU, LFU
but Talk had a lot more like LFRU, Segmented LRU, Second Chance(or Clock) 
And at the end again FIFO but with lazy eviction and promotion, so it was all a circle, we started with FIFO and ended with FIFO
Speaker also mentioned that it is still a very actively researched topic and we all know that Cache invalidation is one of the 
hardest problem of the Computer Science

*Third* talk was on Packaging GPU packages for Debian ecosystem, This talk was given by Spaarsh, he had titled it \`Packaging: pain\` 
I really liked how he touched upon different components of Debian packages, which consist of Source files and a \`debian\` directory
He touched upon different GPU terms, I was aware of linking issues and packaging in CPU, it was new to learn that this issue is more
severe in GPU ecosystem, he shared his experience of packaging some library for rocxm (AMD's alternative to CuDA)

*Fourth* talk was on Wasm titled \`Your Next server might be browser\`, Speaker shared his project \`wasm-run\` which is like a \`node\` for
\`wasm\` ecosystem. I was really fascinated to see an alpine linux distro running in a browser, a freaking browser. This wasm thing is 
so under-used at this moment and this talk has excited me to look more around it. I will (hopefully)contribute something in this space

*Fifth* talk was titled \`Building a software language\`, here Speaker talked about his journey of creating a new language
which he named \`ASL\` (A Software Language), He compared it with different languages like Rust, Go
and their shortcomings.

*Sixth* talk was on \`ld\`, Speaker showed how you can link a C Program with a Python program which is then called by a Rust program,
He showed live demonstration by creating a pokemon-art generator, It was really awesome to see how powerful \`ld\` is, how your shared
libraries can be linked over different languages


*Seventh* talk was on \`JNI: Java native interface\`, this was really new to me, I had never heard of this before, You can use C library functions in your Java code thanks to this JNI, She also showed the new API which is part of Java 21 called FFM(Foreign Function and Memory), FFM really reduces a lot of effort for this interaction, earlier you had to change your library to adapt it to be called by a 
Java program but with FFM, your library can be how it is and you can use it in your Java, I really liked this and it has excited me to
explore this more.

I was also excited to know that there will be an Innovation in Compiler Technology conference on 27th-28th Sept in IISc, I registered for it instantly :) 
Looking forward to more talks like these

Then we went for lunch, I had pleasure of being in company of some really awesome folks from Thoughtworks, Akamai, fly.io, Jupiter. It was so exciting to learn about the work that they are doing at their respective companies. 

Post lunch, I attended a Panel discussion consisting of Chad Whitacre(Head of OSS, Sentry), Kailash Nadh(CTO of Zerodha), Monica(COO of Frappe), Panel was around sustainability of OSS and health of ecosystem in India and different initiatives that their respective
companies are taking to make OSS sustainable, some nice points were discussed.

I stayed in the same auditorium and next talk was on open source UPI app called \`librefin\`, Nemo was giving this talk with <> 
they spoke on how they are reverse engineering UPI to create something open, It was exciting to see how they are doing it,
They have also been able to do this thanks to 52(1)(ab) clause of Copyright infringement act, and this has also inspired them to
name their company 52-labs, 

After this, there was a talk on \`How's Javascript\` given by Ujjawal kumar, he showed how different features are added in JS ecosystem, 
He is one of the members of the TC39 committe which decides on new features for JS. 

This was the last talk that I attended and then I went out to network, I saw KC Sivaramakrishnan from IIT-Madras, who is also really active on Socials talking about OCaML, It was nice to learn that he is one of the speakers at ICT IISc. I had a chat with him, he 
mentioned about his startup and how they are deploying application on satellite, not your typical servers. It was so awesome to know
something like this being done in our Country.

Post this I got to talk with Ujjawal, I had discussion with him on JS and his work on JS engines, He shared how different vendors are really tackling performance for their engines, learnt a bit about Igalia.

I was also able to meet Kailash Nadh with my friends, I asked him questions on Databases, AI and his view on languages, It was a nice experience.
![Proof that I met Kailash XD](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758770193/WhatsApp_Image_2025-09-21_at_20.00.16_ygosx5.jpg)
I also met Nemo and it was so refreshing to see folk like them in India, who are just hacking for the fun of it.
Seeing such wonderful people around me in this space just made me grateful for being in a city like Bengaluru and how fortunate I am to see them. It is inspiring and it makes you work towards your goal, so that you can inspire a new generation like how they are inspiring us.

Really wonderful session.

# Day 2

First talk that I attended today was by Hridesh and it was around contributing to Linux Kernel
He told about his journey how he joined the LFX mentorship for Linux kernel program and worked
around fixing some bugs that he saw in his laptop. I really liked the attitude that he brought
that curious mind to figure out what is wrong and then fixing it by sending the Patch to the Linux
Kernel source system. It was really cool to see someone doing what I wished I should have done as well XD. 

Second talk was on Ente's end to end video streaming platform, I learnt how streaming really works, so
there are two things, we have streaming data and playlist data(\`.m3u8\` format). Ente's providing end-to-end encrypted solution, so they encrypt the data before sending it to their server to store it.
Later on whenever client requests for those videos, they send the videos and that's decrypted at the
client side. They use AES encryption to encrypt/decrypt their data. 

Third talk was by \`wraft\` co-founder where he talked about \`wraft\` which is an open-source documentation
lifecycle management platform. Learnt that it is written in \`elixir\`. It was nice talk on how they
solved a problem that many companies face when they hire new people, there are many documents that
are generated and circulated for signing and everything but there isn't any one platform which stitches all different apps into one. \`wraft\` bridges this gap and resolves this problem.

Fourth talk was on \`Bootable containers\` and how you can now use containers as distro image for your system. Speaker mentioned about their effort and creating \`bluefin-lts\`

Fifth talk was on \`logchef\` an UI created to query logs being stored in \`Clickhouse\` at \`Zerodha\`. 
Speaker admitted that Grafana can also be used if provided RBAC auth support, to manage their usecase
for audit and security purpose they created this tool.

Post this, I went on lunch and networked with different people present in the conference. It was nice
meeting new people and talking about system and their companies and jobs.

I also attended some parts of Kailash Nadh's talk where he was showcasing \`huml\`, a new markup language which is oriented more towards human readability. It is a very opiniated language and it is 
still growing phase. You can check it out at \`huml.io\`

I went on to attend \`Sanchari-Kathegaara: Community Mesh Networks with Tribal Settlements in Karnataka\` talk, Speaker told us about their efforts connecting remote villages of Karnataka and their
challenges. It was so cool to see people doing efforts like this, They connected a network between different sections of the same village and hosted some open source program. This network was also source
for knowledge sharing about medicinal-practices, and other educational stuff. 

After this, I attended the talk on \`Proxmox\`, I hadn't heard of it before this conference but from the
audience, I got to know it's a really popular tool in this virtualization space. It uses \`Qemu\` and in demo,
Speaker showed how they are using Proxmox to manage their workstations including one workstation where they have setup Editing software and even GPUs.

Then I went out and had some knowledge gathering at the \`Zeiss\` booth, where I learnt about different
open source software that \`Zeiss\` uses, interesting was \`Conan\`, a C++ package manager and besides that
there were many more, you can maybe find that on their website.

Last talk that I attended was on \`Flavours of Zig language\`, Speaker demonstrated their journey of creating
a GPU library called \`cudaz\`, \`comptime\` was mentioned and how it helps improve developer experience.


It was one of the best conference that I have visited till date in terms of talks, meeting new people,
filling up my to-do list for stuff that I should check out/contribute to.

Really grateful to IndiaFOSS for organizing such a wonderful event. 

`,re=`---
title: Fixing a MacOS issue while installing Clickhouse 
date: 2025-05-13
description: how a OS library update can break your DB 
visible: false
tags: Database, blog
---

So, Yesterday I was installing clickhouse from source on my system(macbook air M2), I am glad that \`Clickhouse\` has a very good
documentation on their site for this purpose.
I referred to it but I was facing an issue whenever I was doing
\`\`\`
cmake --build build
\`\`\`
Error was something that \`strchrnul\` is redefined, previously it was defined in \`MacOSX15.4\` system libraries and then it was again 
defined in some postgres header file, I checked github to find out if there is any open issue on this. I found one issue but it was closed:
https://github.com/ClickHouse/ClickHouse/issues/78804

In the issue comments it was mentioned that clang version is not supported, maybe because the author had specifically mentioned 
\`clang 17.0.0\` and \`Clickhouse\` only works on \`clang 19\` and that too non-apple one.
Our errors were similar though, so that prompted me to look up more on this issue and I got to know from a LLM that there is
a issue discovered in Postgres on this: 
https://www.postgresql.org/message-id/flat/407464.1743535559%40sss.pgh.pa.us#277a94029172f7d3de0048d46474ebf0

I checked the \`cmake\` file for \`Postgres\` and there was already a check regarding this. I wondered why then my build was failing.

I ran the command which was checking the version for my system, it was \`xcrun --sdk macosx --show-sdk-version\`. This command was returning me \`15.2\` but I checked in my error logs, library version which was being used was \`15.4\`. 

Because \`xcrun\` was returning a lower version, the cmake check was failing and \`strchrnul\` was also included, it wouldn't have failed
if we were getting \`15.4\`. 

I changed the way version was checked and re-ran the build commands, voila it worked.

I submitted my PR: https://github.com/ClickHouse/ClickHouse/pull/80228/files

It was interesting to know that how much an OS can change the stability of a system. MacOSX didn't come with their own \`strchrnul\` but in latest versions they are defining a constant for that.

Postgres had it declared when they were creating their software and now their changes were breaking. It was a nice reminder that unless you own everything in the stack, you can't be sure when and where your software can break.

`,se="---\ntitle: IntelliJ IDEA shortcuts\ndate: 2025-09-23\ndescription: Some cool shortcuts that I have learnt and am learning\nvisible: true\ntags: blog, technical-writing\n---\n\nIntelliJ is one of my favorite IDE's for Java. I work in a company where most of our codebase is in Java for Backend. We use\nIntelliJ as our IDE. It is really powerful and has some awesome shortcuts that I think one can add in their arsenal, below I am \nsharing couple of which I like a lot\n\n- `Shift + Shift` for Search Anywhere feature. This allows you to search anything in your project, be it in text, code or anywhere\n- `Cmd + Shift + A` for `Find Action`. If you want to do some Action like `Run Test`, `Open Terminal` or any other refactoring task, this command is handy\n- `Cmd + E` for checking out the `Recent Files` and accessing them without going over the project window\n- `Cmd + Shift + E` for switching between different locations of your `Recent Files`\n- `Ctrl + Tab` for directly switching between different files\n\nI like `Vim` keybindings so I have enabled that for my IDE and I navigate java files using that, I really like the comfort of home row key navigation.\n\nYou can also use `Zen Mode` by pressing 'Ctrl + \\`' and then Selecting `5. View Mode` and selecting `Zen Mode` out of it.\n\nWhen you are in Zen Mode, you can use all the above shortcut to search for things without distraction and have things at your fingertip.\n",le=`---
title: KubeCon + CloudNativeCon 2024, New Delhi 
date: 2024-12-10
description: Learnings from the first KubeCon in India 
visible: false
---

## Introduction

Kubecon is a conference conducted by Cloud Native Foundation

## What to expect

I'll be writing about:
- Software Development
- Web Technologies
- System Design
- Best Practices
- Personal Projects
- Technical Tutorials

## Why I started this blog

Writing is a great way to:
1. Solidify understanding
2. Share knowledge with others
3. Document learnings for future reference
4. Contribute to the developer community

Stay tuned for more posts!

## Technical Details

This blog is built with:
- SvelteKit for the framework
- Markdown for content
- TailwindCSS for styling
- Hosted on GitHub Pages

Feel free to check out the source code on my GitHub!
`,he=`---
title: Outing near a lakehouse 
date: 2025-05-13
description: what I learned about Datawarehouses, Delta-lakes and Lakehouses 
visible: false
tags: Database, blog
---
This sunday there was an interesting meetup organized by \`e6data(https://www.e6data.com/)\`, called Lakehouse days(https://lu.ma/m593968s?tk=5dBS7S).
Theme for this week was around \`Apache Iceberg\` before coming to this meetup, I had only heard of \`Datawarehouses\`, \`Delta lakes\` and \`Lakehouses\` courtesy reading some parts of \`Apache Iceberg: The definitive Guide\`(https://www.amazon.in/Apache-Iceberg-Functionality-Performance-Scalability/dp/1098148622).
I went in with an open mind, to learn more about this ecosystem, to really understand how those terms are defined and used in Industry.
First talk was titled \`Design a lakehouse brick by brick using pyarrow, pyberg & DuckDB\`

It was pretty interesting, really cleared up a lot of things for me before jumping into details of DWH, Delta Lake & Lakehouse, I would like to talk about Data platforms.

Data platforms consist of following:
- Storage (Cloud/Disk)
- File formats (Parquet, Avro, ORC)
- Table format (Apache Iceberg)
- Storage engine
- Compute engine (e6data is one example) 
- Catalog 

### **Storage**
It is basically where your data resides, it can be in a disk or in object storage.

### **File formats**
These are formats in which data are stored, storing data the way it is received will be very space inefficient and will be difficult
in certain operations.

### **Table formats**
These are formats to make your data files queryable with some language, it can be SQL or something else, Apache Hive was the first
to provide one interface on top of HDFS(Hadoop File System).

### **Storage engine**
These are what controls the flow of data, like which page to put data into and how to store, everything is handled by these, they are an abstraction over filesystem.

### **Compute engine**
Processing data files & table formats is done with the help of compute engine, some famous ones are like \`Apache Spark\`, \`DuckDB\`, \`Apache Flink\` and many more.

### **Catalog**
Storing metadata about different components of your data and 

Datawarehouses, Delta Lakes & Lakehouses all have these components, difference lies in how these components are assembled.

In a Datawarehouse, data is pretty structured and all the components are well packaged into one software component. As a user you
are stuck with one solution and if you want to try some new File format or add a new table format to your data, you will have to
switch your DB, Another issue with DWH is that they are not good in storing unstructured data, in production systems, there is 
always an ETL(Extract-Transform-Load) step before data is added into these DBs.

Delta Lakes provide one step better clarity and support unstructured or semi-structured data but they also lack the modularity 
`,de=`---
title: mishap with git rebase, reflog to rescue
date: 2024-12-10
description: lesson on Git and what not to do 
visible: false
tags: git, debugging, tips
---

I was working on one Spring boot repo. The code was mix of spaghetti from around the world and I wanted to iron out some things.
Apply SOLID principles and make it more readable for myself. I did those changes but then I realized that on this same repo there has 
been work done by my colleague as well.

so like my habit, I simply did
\`git rebase origin main\` when I was on a \`feature\` branch and then I saw some conflicts, I expected those since there were some changes that were in common files. I used \`IntelliJ\` merge editor to resolve the conflicts but then I see that my branch is changed to \`main\`

![main-branch-pic](/blog-pic/main-branch.png)

Before observing this change, I had also done \`git add\` and was about to \`commit\`.

But now that my branch was switched to \`main\`, I was curious what did I do wrong and do I know rebase correctly. I searched for my mistake and observed that, when we do rebase
we should use

\`git rebase origin/main\` and not \`git rebase origin main\`

when you do \`git rebase origin/main\`

You are telling \`git\` to rebase your existing branch with \`main\` that is there in \`origin\`

and when you do \`git rebase origin main\` 

You are telling \`git\` to rebase your __main__ branch with \`origin\`'s \`main\` and it automatically switches your branch as well.

To see the history of the \`HEAD\` pointer of \`git\` to track which branch it switched to or from, you can use \`git reflog\`.

It will show you history of the branches and places it had originated from and had been, something like below:
![git-reflog](/blog-pic/git-reflog.png)






---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
`,ce=`---
title: Welcome to my blog
date: 2024-01-20
description: Introduction to my technical blog and what to expect
visible: true
tags: blog, technical-writing
---

# Welcome to my blog

Hello! Welcome to my technical blog where I'll be sharing my thoughts, experiences, and learnings in software development.

## What to expect

I'll be writing about:
- Software Development
- Web Technologies
- System Design
- Best Practices
- Personal Projects
- Technical Tutorials

## Why I started this blog

Writing is a great way to:
1. Solidify understanding
2. Share knowledge with others
3. Document learnings for future reference
4. Contribute to the developer community

Stay tuned for more posts!

## Technical Details

This blog is built with:
- SvelteKit for the framework
- Markdown for content
- TailwindCSS for styling
- Hosted on GitHub Pages

Feel free to check out the source code on my GitHub!
`;async function ue(){var o;const r=[],a=Object.assign({"/src/content/blogs/about-mudlet.md":$,"/src/content/blogs/adding-frm-parser-part-1.md":Z,"/src/content/blogs/building-understanding-mariaDB.md":ee,"/src/content/blogs/git-rebase.md":ne,"/src/content/blogs/git-worktree-debug.md":te,"/src/content/blogs/gsoc24.md":ae,"/src/content/blogs/gsoc25.md":oe,"/src/content/blogs/india-foss-2025.md":ie,"/src/content/blogs/installing-clickhouse-fixing-a-macos-issue.md":re,"/src/content/blogs/intellij-shortcuts.md":se,"/src/content/blogs/kubecon-cloudnativecon.md":le,"/src/content/blogs/outing-near-a-lakehouse.md":he,"/src/content/blogs/support-jetstream-proton.md":de,"/src/content/blogs/welcome.md":ce});for(const t in a)try{const n=a[t];if(!n||n.trim()===""){console.warn(`Empty blog post file found: ${t}`);continue}const i=(o=t.split("/").pop())==null?void 0:o.replace(".md","");if(i){const e=ge(n,i);e&&r.push(e)}}catch(n){console.error(`Error processing blog post ${t}:`,n);continue}return r.sort((t,n)=>new Date(n.date).getTime()-new Date(t.date).getTime())}async function me(){return(await ue()).filter(a=>a.visible!==!1)}function ge(r,a){try{const o=r.split(`---
`);if(o.length<3)return console.warn(`Invalid frontmatter format in post: ${a}`),null;const t=o[1];if(!t)return console.warn(`Missing frontmatter in post: ${a}`),null;const n=fe(t),i=n.title,e=n.date;if(!i||!e)return console.warn(`Missing required frontmatter fields in post: ${a}`),null;const l=n.visible,m=l?l.toLowerCase()==="true":!0,h=n.tags;return{slug:a,title:i,date:e,description:n.description||"",content:o.slice(2).join(`---
`),visible:m,tags:h}}catch(o){return console.error(`Error parsing blog post ${a}:`,o),null}}function fe(r){const a={};try{r.split(`
`).forEach(o=>{const[t,...n]=o.split(":");if(t&&n.length){const i=t.trim(),e=n.join(":").trim();i&&e&&(i==="tags"?a[i]=e.split(",").map(l=>l.trim()):a[i]=e)}})}catch(o){console.error("Error parsing frontmatter:",o)}return a}function G(r,a,o){const t=r.slice();return t[8]=a[o],t}function N(r,a,o){const t=r.slice();return t[11]=a[o],t}function j(r,a,o){const t=r.slice();return t[11]=a[o],t}function U(r){let a,o=Array.from(r[2]),t=[];for(let n=0;n<o.length;n+=1)t[n]=K(j(r,o,n));return{c(){a=w("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){a=b(n,"DIV",{class:!0});var i=y(a);for(let e=0;e<t.length;e+=1)t[e].l(i);i.forEach(c),this.h()},h(){g(a,"class","mb-8 flex flex-wrap gap-2")},m(n,i){v(n,a,i);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(a,null)},p(n,i){if(i&21){o=Array.from(n[2]);let e;for(e=0;e<o.length;e+=1){const l=j(n,o,e);t[e]?t[e].p(l,i):(t[e]=K(l),t[e].c(),t[e].m(a,null))}for(;e<t.length;e+=1)t[e].d(1);t.length=o.length}},d(n){n&&c(a),B(t,n)}}}function K(r){let a,o=r[11]+"",t,n,i,e,l;function m(){return r[6](r[11])}return{c(){a=w("button"),t=S(o),n=C(),this.h()},l(h){a=b(h,"BUTTON",{class:!0});var s=y(a);t=M(s,o),n=D(s),s.forEach(c),this.h()},h(){g(a,"class",i="px-3 py-1 rounded-full text-sm transition-colors "+(r[0]===r[11]?"bg-blue-600 text-white":"bg-neutral-100 text-neutral-700 hover:bg-neutral-200"))},m(h,s){v(h,a,s),u(a,t),u(a,n),e||(l=Q(a,"click",m),e=!0)},p(h,s){r=h,s&4&&o!==(o=r[11]+"")&&E(t,o),s&5&&i!==(i="px-3 py-1 rounded-full text-sm transition-colors "+(r[0]===r[11]?"bg-blue-600 text-white":"bg-neutral-100 text-neutral-700 hover:bg-neutral-200"))&&g(a,"class",i)},d(h){h&&c(a),e=!1,l()}}}function pe(r){let a,o=r[3],t=[];for(let n=0;n<o.length;n+=1)t[n]=X(G(r,o,n));return{c(){a=w("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){a=b(n,"DIV",{class:!0});var i=y(a);for(let e=0;e<t.length;e+=1)t[e].l(i);i.forEach(c),this.h()},h(){g(a,"class","space-y-12")},m(n,i){v(n,a,i);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(a,null)},p(n,i){if(i&8){o=n[3];let e;for(e=0;e<o.length;e+=1){const l=G(n,o,e);t[e]?t[e].p(l,i):(t[e]=X(l),t[e].c(),t[e].m(a,null))}for(;e<t.length;e+=1)t[e].d(1);t.length=o.length}},d(n){n&&c(a),B(t,n)}}}function we(r){let a,o=r[0]?`No posts found with tag "${r[0]}"`:"No blog posts found.",t;return{c(){a=w("p"),t=S(o),this.h()},l(n){a=b(n,"P",{class:!0});var i=y(a);t=M(i,o),i.forEach(c),this.h()},h(){g(a,"class","text-neutral-600")},m(n,i){v(n,a,i),u(a,t)},p(n,i){i&1&&o!==(o=n[0]?`No posts found with tag "${n[0]}"`:"No blog posts found.")&&E(t,o)},d(n){n&&c(a)}}}function be(r){let a,o;return{c(){a=w("p"),o=S("Loading posts..."),this.h()},l(t){a=b(t,"P",{class:!0});var n=y(a);o=M(n,"Loading posts..."),n.forEach(c),this.h()},h(){g(a,"class","text-neutral-600")},m(t,n){v(t,a,n),u(a,o)},p:x,d(t){t&&c(a)}}}function q(r){let a,o=r[8].tags,t=[];for(let n=0;n<o.length;n+=1)t[n]=W(N(r,o,n));return{c(){a=w("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){a=b(n,"DIV",{class:!0});var i=y(a);for(let e=0;e<t.length;e+=1)t[e].l(i);i.forEach(c),this.h()},h(){g(a,"class","flex flex-wrap gap-2 mb-2")},m(n,i){v(n,a,i);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(a,null)},p(n,i){if(i&8){o=n[8].tags;let e;for(e=0;e<o.length;e+=1){const l=N(n,o,e);t[e]?t[e].p(l,i):(t[e]=W(l),t[e].c(),t[e].m(a,null))}for(;e<t.length;e+=1)t[e].d(1);t.length=o.length}},d(n){n&&c(a),B(t,n)}}}function W(r){let a,o=r[11]+"",t,n;return{c(){a=w("span"),t=S(o),n=C(),this.h()},l(i){a=b(i,"SPAN",{class:!0});var e=y(a);t=M(e,o),n=D(e),e.forEach(c),this.h()},h(){g(a,"class","text-sm px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded")},m(i,e){v(i,a,e),u(a,t),u(a,n)},p(i,e){e&8&&o!==(o=i[11]+"")&&E(t,o)},d(i){i&&c(a)}}}function X(r){var R;let a,o,t,n=r[8].title+"",i,e,l,m=r[8].description+"",h,s,d,p,T=new Date(r[8].date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"",A,L,O,f=((R=r[8].tags)==null?void 0:R.length)&&q(r);return{c(){a=w("article"),o=w("a"),t=w("h2"),i=S(n),e=C(),l=w("p"),h=S(m),s=C(),f&&f.c(),d=C(),p=w("time"),A=S(T),O=C(),this.h()},l(k){a=b(k,"ARTICLE",{class:!0});var I=y(a);o=b(I,"A",{href:!0,class:!0});var _=y(o);t=b(_,"H2",{class:!0});var F=y(t);i=M(F,n),F.forEach(c),e=D(_),l=b(_,"P",{class:!0});var P=y(l);h=M(P,m),P.forEach(c),s=D(_),f&&f.l(_),d=D(_),p=b(_,"TIME",{class:!0});var H=y(p);A=M(H,T),H.forEach(c),_.forEach(c),O=D(I),I.forEach(c),this.h()},h(){g(t,"class","text-2xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors"),g(l,"class","text-neutral-600 leading-relaxed"),g(p,"class","text-sm text-neutral-500 block"),g(o,"href",L=`/blogs/${r[8].slug}`),g(o,"class","block space-y-3"),g(a,"class","group svelte-1h5iphg")},m(k,I){v(k,a,I),u(a,o),u(o,t),u(t,i),u(o,e),u(o,l),u(l,h),u(o,s),f&&f.m(o,null),u(o,d),u(o,p),u(p,A),u(a,O)},p(k,I){var _;I&8&&n!==(n=k[8].title+"")&&E(i,n),I&8&&m!==(m=k[8].description+"")&&E(h,m),(_=k[8].tags)!=null&&_.length?f?f.p(k,I):(f=q(k),f.c(),f.m(o,d)):f&&(f.d(1),f=null),I&8&&T!==(T=new Date(k[8].date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"")&&E(A,T),I&8&&L!==(L=`/blogs/${k[8].slug}`)&&g(o,"href",L)},d(k){k&&c(a),f&&f.d()}}}function ye(r){let a,o,t,n,i,e=!r[1]&&r[2].size>0&&U(r);function l(s,d){return s[1]?be:s[3].length===0?we:pe}let m=l(r),h=m(r);return{c(){a=w("div"),o=w("h1"),t=S("Blog Posts"),n=C(),e&&e.c(),i=C(),h.c(),this.h()},l(s){a=b(s,"DIV",{class:!0});var d=y(a);o=b(d,"H1",{class:!0});var p=y(o);t=M(p,"Blog Posts"),p.forEach(c),n=D(d),e&&e.l(d),i=D(d),h.l(d),d.forEach(c),this.h()},h(){g(o,"class","text-3xl font-bold mb-8"),g(a,"class","layout-md py-8")},m(s,d){v(s,a,d),u(a,o),u(o,t),u(a,n),e&&e.m(a,null),u(a,i),h.m(a,null)},p(s,[d]){!s[1]&&s[2].size>0?e?e.p(s,d):(e=U(s),e.c(),e.m(a,i)):e&&(e.d(1),e=null),m===(m=l(s))&&h?h.p(s,d):(h.d(1),h=m(s),h&&(h.c(),h.m(a,null)))},i:x,o:x,d(s){s&&c(a),e&&e.d(),h.d()}}}function ke(r,a,o){let t,n=[],i=!0,e=null,l=new Set;function m(){const d=window.location.hash.slice(1);o(0,e=d?decodeURIComponent(d):null)}V(async()=>(o(5,n=await me()),n.forEach(d=>{var p;(p=d.tags)==null||p.forEach(T=>l.add(T))}),o(2,l),m(),window.addEventListener("hashchange",m),o(1,i=!1),()=>{window.removeEventListener("hashchange",m)}));function h(d){e===d?window.location.hash="":window.location.hash=encodeURIComponent(d)}const s=d=>h(d);return r.$$.update=()=>{r.$$.dirty&33&&o(3,t=e?n.filter(d=>{var p;return(p=d.tags)==null?void 0:p.includes(e)}):n)},[e,i,l,t,h,n,s]}class _e extends z{constructor(a){super(),J(this,a,ke,ye,Y,{})}}export{_e as component};
