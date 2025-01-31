---
title: Mudlet through an open source contributor's eyes 
date: 2025-01-23
description: how to navigate a large C++ project and how to start with Mudlet 
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



---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
