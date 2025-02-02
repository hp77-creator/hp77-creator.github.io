---
title: Building and Running MariaDB on Macbook
date: 2025-02-02
description: letting out the Seal in M-series (sea-ries XD)
visible: true
tags: database, mariaDB, C++, Macbook
---

## Building MariaDB

MariaDB is a fork of MySQL which has been in effect to provide users the flexibility to go with an open source version for a DB like MySQL which is owned by Oracle. 
It is written in C++. To build it on my system(macbook air M2) I followed these steps:
We are going to build the `server` which is where most of things happen for the DBMS

- Fork the official repo: [Github](https://github.com/MariaDB/server)
- Clone your forked repo: `git clone https://github.com/YOUR-USERNAME/server`
 First time the clone failed because of the following reason:
 ```shell
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
 ```
 Trying by increasing the buffer size:
 `git config --global http.postBuffer 524288000`
  The error persists, so I switched to `ssh`
  It got cloned.

- Enter into your cloned directory: `cd my-maria-server`
- Create a new build directory and change directory to that: `mkdir -p build && cd build`
- We will create a `Debug` build. To do that, run: `cmake .. -DCMAKE_BUILD_TYPE=Debug`
    During installation, I found out that `bison` was not installed properly, so I installed it with
    `brew install bison` and updated my `$PATH` to use or you can use
    ```
    -DBISON_EXECUTABLE=/opt/homebrew/opt/bison/bin/bison
    ```
    option when using cmake
- You can follow along this link: [MariaDB docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)

I had read in the book `Understanding MySQL Internals` that `MySQL` works best with `GCC`, so I thought I will try with
that but before that I ran it with default compiler provided by Apple(Clang) there were lot of errors and I was trying to run following commands:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug
cmake --build . --parallel 5
```
During `--build` it was giving a lot of errors. I looked up the meaning of different errors, those errors were because of strict nullability check by the compiler. To get over those, I added following options:

> Note before running the following command, ensure that you have cleared your existing build directory.

```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_FLAGS="-Wno-nullability-completeness" \
-DCMAKE_CXX_FLAGS="-Wno-nullability-completeness"
```
Also if you like to log the errors, you can do the following during build:
```
cmake --build . --parallel 5 2>&1 | tee build.log
```
It failed again, this time it was unable to find the standard `<stdint.h>` header. I checked up online, If I can find options to provide these headers specifically and  I did the following:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=/usr/bin/clang \
-DCMAKE_CXX_COMPILER=/usr/bin/clang++ \
-DCMAKE_CXX_FLAGS="-isystem /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include -isystem /Library/Developer/CommandLineTools/usr/include/c++/v1" \
-DCMAKE_C_FLAGS="-isystem /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include"
```

> `isystem` adds system include paths, although ideally it should be added in your `CMakeLists.txt` file: [StackOverflow answer](https://stackoverflow.com/a/3371528/7116645)

Using the system compiler didn't work again, I thought, maybe I should use `Homebrew`'s version of `clang` as from experience I had found it better for cross-platform support.

So, I did the following:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=/opt/homebrew/opt/llvm/bin/clang \
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/llvm/bin/clang++ \
-DCMAKE_CXX_FLAGS="-Wno-nullability-completeness" \
-DCMAKE_C_FLAGS="-Wno-nullability-completeness"
```

> You need to have `brew` version of clang installed: `brew install llvm`

I felt maybe clang's libraries does not have `stdint` or maybe I am missing something but I thought, let's try with `GCC` as I had read it works fine elsewhere. so I installed gcc: `brew install gcc`
```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=/opt/homebrew/opt/gcc/bin/gcc-14 \
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/gcc/bin/g++-14
```

There were some errors on about `deined` usage and its portability concerns, so I added some more options:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=/opt/homebrew/opt/gcc/bin/gcc-13 \
-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/gcc/bin/g++-13 \
-DCMAKE_CXX_FLAGS="-Wno-error=expansion-to-defined -Wno-error" \
-DCMAKE_C_FLAGS="-Wno-error=expansion-to-defined -Wno-error" \
-DWITH_DEBUG=1
```

I started facing new errors now, something like:
```
 3%] No configure step for 'libfmt'
In file included from /Users/himanshu.pandey/codes/gh-repos/my-maria-server/libmariadb/include/ma_global.h:152,
from /Users/himanshu.pandey/codes/gh-repos/my-maria-server/libmariadb/libmariadb/get_password.c:19:
/Library/Developer/CommandLineTools/SDKs/MacOSX15.sdk/usr/include/math.h:54:5: error: #error "Unsupported value of __FLT_EVAL_METHOD__."
54 | # error "Unsupported value of __FLT_EVAL_METHOD__."
| ^~~~~
```

I guess, `MariaDB` is using some value of `__FLT_EVAL_METHOD__` which is not supported by MacOS, I was bit surprised that MacOS libraries were being used, when I had explicitly mentioned to use 
`Homebrew`'s `gcc` compiler. I tried some approach to use the libraries of `gcc` but that was also of no use.
I also set the values of these functions explicitly so that it is overriden during build stage. 
There was some progress but then there were some errors on `CFI` directives like following:
```
/var/folders/95/n9tm7h4s46sdk134wgfzj8s40000gp/T//ccn7M7ep.s:36:2: error: this directive must appear between .cfi_startproc and .cfi_endproc directives
.cfi_escape 0x07, 30
^
make[2]: *** [libmariadb/libmariadb/CMakeFiles/mariadb_obj.dir/ma_context.c.o] Error 1
make[1]: *** [libmariadb/libmariadb/CMakeFiles/mariadb_obj.dir/all] Error 2
```

I asked `Chatgpt` and it told this happens when we do relocation on `ARM` systems, I figured it could be the mismatch between the machine configuration,
> CFI directives are used by debuggers and unwinders to walk the call stack
I presented my script to it to suggest modifications, it gave the following with Default clang version:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=/usr/bin/clang \
-DCMAKE_CXX_COMPILER=/usr/bin/clang++ \
-DCMAKE_CXX_FLAGS="-Wno-error -D__FLT_EVAL_METHOD__=0" \
-DCMAKE_C_FLAGS="-Wno-error -D__FLT_EVAL_METHOD__=0" \
-DWITH_DEBUG=1 \
-DWITHOUT_TOKUDB=1 \
-DWITH_UNIT_TESTS=OFF \
-DWITH_SSL=system \
-DWITH_ZLIB=system \
-DCONC_WITH_EXTERNAL_ZLIB=ON \
-DWITHOUT_MROONGA=1 \
-DWITHOUT_ROCKSDB=1
```

This script gave a lot of errors on `OPENSSL` casting. I added the flags to disable these warnings and disabled a lot of plugins that are by default enabled while building the server.

At the end, I created a script with the commands that I had to type again and again and it came out to look like following:

```
#!/bin/sh

# Set paths
MACOS_SDK=/Library/Developer/CommandLineTools/SDKs/MacOSX15.sdk

# Common flags for both C and C++ (all in one line)
COMMON_FLAGS="-w \
-g \
-fno-asynchronous-unwind-tables \
-ffunction-sections \
-fdata-sections \
-fno-common \
-mmacosx-version-min=14.0 \
-arch arm64"

# Clean and create build directory
rm -rf cmake-build-debug
mkdir -p cmake-build-debug && cd cmake-build-debug

# Run cmake with Clang
cmake .. -DCMAKE_BUILD_TYPE=Debug \
-DCMAKE_C_COMPILER=clang \
-DCMAKE_CXX_COMPILER=clang++ \
-DCMAKE_C_FLAGS="${COMMON_FLAGS}" \
-DCMAKE_CXX_FLAGS="${COMMON_FLAGS}" \
-DCMAKE_OSX_SYSROOT="${MACOS_SDK}" \
-DCMAKE_OSX_DEPLOYMENT_TARGET=14.0 \
-DWITH_DEBUG=1 \
-DWITHOUT_TOKUDB=1 \
-DWITH_UNIT_TESTS=OFF \
-DWITH_SSL=system \
-DWITH_ZLIB=system \
-DCONC_WITH_EXTERNAL_ZLIB=ON \
-DWITHOUT_MROONGA=1 \
-DWITHOUT_ROCKSDB=1 \
-DPLUGIN_TOKUDB=NO \
-DPLUGIN_ROCKSDB=NO \
-DPLUGIN_MROONGA=NO \
-DCONNECT_WITH_MONGO=OFF \
-DCONNECT_WITH_BSON=OFF \
-DMYSQL_MAINTAINER_MODE=OFF \  
-G Ninja

# Build using ninja with parallel jobs and logging
cmake --build . --parallel 5 2>&1 | tee build.log
```


## Running MariaDB locally

You can directly follow official [docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/);

I will just summarize what I did:

- Create a directory to store your data, I named it `mariaddb_data` and stored it in my
home directory
- Create a configuration file like following

```
[client-server]
socket = path/to/mariadb.sock

[mariadb]
datadir = path/to/mariadb_data
```

- Change directory to your build directory and run the following script
```
/scripts/mariadb-install-db \
--user=$(whoami) \
--datadir=path/to/mariadb_data \
--srcdir=path/to/server \
--defaults-file=path/to/mariadb.conf
```

- Open a new terminal session, `cd` to your build directory and start the server

```
./sql/mariadbd --defaults-file=path/to/mariadb.conf
```

- Start the client in new session
```
./client/mariadb --defaults-file=path/to/mariadb.conf
```

You can then run the following commands and verify your build:
```
SHOW DATABASES;
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE test (id INT, name VARCHAR(50));
INSERT INTO test VALUES (1, 'Test User');
SELECT * FROM test;
```

> Building and running it took most of my day, will write about internals in another blog post


---- 

## References

- [MariaDB official Docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)
- [ChatGPT](https://chatgpt.com/)
- [CFI directives](https://sourceware.org/binutils/docs/as/CFI-directives.html)
- [Configuration option](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)
- [Understanding MySQL internals](https://www.amazon.in/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577)
