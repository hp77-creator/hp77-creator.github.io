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
https://www.postgresql.org/message-id/flat/407464.1743535559%40sss.pgh.pa.us#277a94029172f7d3de0048d46474ebf0

I checked the `cmake` file for `Postgres` and there was already a check regarding this. I wondered why then my build was failing.

I ran the command which was checking the version for my system, it was `xcrun --sdk macosx --show-sdk-version`. This command was returning me `15.2` but I checked in my error logs, library version which was being used was `15.4`. 

Because `xcrun` was returning a lower version, the cmake check was failing and `strchrnul` was also included, it wouldn't have failed
if we were getting `15.4`. 

I changed the way version was checked and re-ran the build commands, voila it worked.

I submitted my PR: https://github.com/ClickHouse/ClickHouse/pull/80228/files

It was interesting to know that how much an OS can change the stability of a system. MacOSX didn't come with their own `strchrnul` but in latest versions they are defining a constant for that.

Postgres had it declared when they were creating their software and now their changes were breaking. It was a nice reminder that unless you own everything in the stack, you can't be sure when and where your software can break.

