const l=`---
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
`,c=`---
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
`,d=`---
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
`,h=`---
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
`,m=`---
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
`,u=`---
title: KubeCon + CloudNativeCon 2024, New Delhi 
date: 2024-12-10
description: Learnings from the first KubeCon in India 
visible: false
---

## Introduction

Kubecon is a conference conducted by Cloud Nat

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
`,g=`---
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
`,b=`---
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
`;async function y(){var n;const i=[],e=Object.assign({"/src/content/blogs/about-mudlet.md":l,"/src/content/blogs/building-understanding-mariaDB.md":c,"/src/content/blogs/git-rebase.md":d,"/src/content/blogs/git-worktree-debug.md":h,"/src/content/blogs/gsoc24.md":m,"/src/content/blogs/kubecon-cloudnativecon.md":u,"/src/content/blogs/support-jetstream-proton.md":g,"/src/content/blogs/welcome.md":b});for(const t in e)try{const o=e[t];if(!o||o.trim()===""){console.warn(`Empty blog post file found: ${t}`);continue}const r=(n=t.split("/").pop())==null?void 0:n.replace(".md","");if(r){const a=p(o,r);a&&i.push(a)}}catch(o){console.error(`Error processing blog post ${t}:`,o);continue}return i.sort((t,o)=>new Date(o.date).getTime()-new Date(t.date).getTime())}async function _(){return(await y()).filter(e=>e.visible!==!1)}async function k(i){try{const e=Object.assign({"/src/content/blogs/about-mudlet.md":l,"/src/content/blogs/building-understanding-mariaDB.md":c,"/src/content/blogs/git-rebase.md":d,"/src/content/blogs/git-worktree-debug.md":h,"/src/content/blogs/gsoc24.md":m,"/src/content/blogs/kubecon-cloudnativecon.md":u,"/src/content/blogs/support-jetstream-proton.md":g,"/src/content/blogs/welcome.md":b}),n=`/src/content/blogs/${i}.md`;if(n in e){const t=e[n];return!t||t.trim()===""?(console.warn(`Empty blog post file found: ${n}`),null):p(t,i)}return null}catch(e){return console.error(`Error loading blog post ${i}:`,e),null}}function p(i,e){try{const n=i.split(`---
`);if(n.length<3)return console.warn(`Invalid frontmatter format in post: ${e}`),null;const t=n[1];if(!t)return console.warn(`Missing frontmatter in post: ${e}`),null;const o=I(t),r=o.title,a=o.date;if(!r||!a)return console.warn(`Missing required frontmatter fields in post: ${e}`),null;const s=o.visible,f=s?s.toLowerCase()==="true":!0,w=o.tags;return{slug:e,title:r,date:a,description:o.description||"",content:n.slice(2).join(`---
`),visible:f,tags:w}}catch(n){return console.error(`Error parsing blog post ${e}:`,n),null}}function I(i){const e={};try{i.split(`
`).forEach(n=>{const[t,...o]=n.split(":");if(t&&o.length){const r=t.trim(),a=o.join(":").trim();r&&a&&(r==="tags"?e[r]=a.split(",").map(s=>s.trim()):e[r]=a)}})}catch(n){console.error("Error parsing frontmatter:",n)}return e}export{k as a,_ as g};
