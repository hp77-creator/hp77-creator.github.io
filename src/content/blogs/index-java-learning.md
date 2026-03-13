---
title: Index of interesting java bits
date: 2026-03-13
description: One liners or links to posts on some interesting facts of Java 
visible: true
tags: technical-writing
---

1. Java Optional
We misuse it a lot and I have noted some rules which were shared by Stuart Marks from his yt video. [Stuart Marks yt video](https://youtu.be/Ej0sss6cq14?si=_ow_LeA3aznQyCnE)

2. Can't use null in collections
If you do `.contains(null)` on some `Collection` It will throw a NPE. This is totally opposite to how
those work in `guava` libraries. [Collections which allow null](https://stackoverflow.com/a/62820956/7116645), [Guava author's answer](https://stackoverflow.com/a/67956082/7116645)