---
title: Fixing a MacOS while installing Clickhouse 
date: 2025-05-13
description: how a OS library update can break your DB 
visible: false
tags: Database, blog
---

So, Yesterday I was installing clickhouse from source on my system(macbook air M2), I am glad that `Clickhouse` has a very good
documentation on their site for this purpose.
I referred to it but I was facing an issue whenever I was doing
```
cmake --build build
```
Error was something that `strchrnul` is redefined, previously it was defined in `MacOSX15.4` system libraries and then it was again 
defined in some postgres header file, I checked github to find out if there is any open issue on this. I found one issue but it was closed:
https://github.com/ClickHouse/ClickHouse/issues/78804

In the issue comments it was mentioned that clang version is not supported, maybe because the author had specifically mentioned 
`clang 17.0.0` and `Clickhouse` only works on `clang 19` and that too non-apple one.
Our errors were similar though, so that prompted me to look up more on this issue and I got to know from a LLM that there is
a issue discovered in Postgres on this: 