---
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
```shell
mkdir -p build && cd build && rm -rf *
cmake ../../Mudlet-go -DCMAKE_PREFIX_PATH=`brew --prefix qt@5` -DUSE_UPDATER=OFF
make -j `sysctl -n hw.ncpu`
src/mudlet.app/Contents/MacOS/mudlet
```
Note: Make sure to run this script from inside the repo main directory or you might loose all of your changes.
I am currently looking to add feature to add support for voice-readers to read the found result, for more info: . The issue was that result was found
it was highlighted as well but the caret which is used by the voice-readers to get the context for their dictation was not setting up properly.
I fixed that and added a key shortcut to enable this setting. To integrate shortcut, I used the existing `lua` scripts and added option for the same.

In the process, I learned that there are some games that might have their own implementation for `F3` (key that I have configured to access the results) and that could mess up the search navigation.

If you want to run the program with `address` or `leak` sanitizers, you can use the following script to do that
I ran this on a MacOS system(specifically m2 air):
```shell
#!/bin/bash

# Create and clean build directory
mkdir -p build && cd build && rm -rf *

# Configure with memory leak detection
cmake ../../Mudlet-go \
    -DCMAKE_PREFIX_PATH=`brew --prefix qt@5` \
    -DUSE_UPDATER=OFF \
    -DCMAKE_BUILD_TYPE=Debug \
    -DCMAKE_C_COMPILER="$(brew --prefix llvm)/bin/clang" \
    -DCMAKE_CXX_COMPILER="$(brew --prefix llvm)/bin/clang++" \
    -DCMAKE_CXX_FLAGS="-fsanitize=address -fno-omit-frame-pointer" \
    -DCMAKE_C_FLAGS="-fsanitize=address -fno-omit-frame-pointer" \
    -DCMAKE_EXE_LINKER_FLAGS="-fsanitize=address"

# Build using available cores
make -j `sysctl -n hw.ncpu`

# Run with memory leak detection
ASAN_OPTIONS=detect_leaks=1:leak_check_at_exit=1:verbosity=1 src/mudlet.app/Contents/MacOS/mudlet 2>&1 | tee asan_output.log
```

When you build some C++ program, you have to first check the kind of build system project is using, most of the `C++` projects that I have come across `cmake` but there can be others like `bazel` and some custom ones ()[];

---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
