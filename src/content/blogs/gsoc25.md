---
title: My GSoC'25 Journey with MariaDB 
date: 2025-09-01
description: Sharing my experience and learnings from Google Summer of Code 2025 with MariaDB
visible: false
tags: GSoC, blog, database
---

# Adding a standalone FRM Parser in MariaDB

MariaDB, is a very popular Relational Database Management System(DBMS). It was forked from MySQL and is currently the 14th Most used database according
to the [DB-Engines](https://db-engines.com/en/ranking). It also participates in Google Summer of Code(https://www.gsocorganizations.dev/organization/mariadb/) and has been doing so since 2016. 

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

Develop a FRM file parser which does not need to connect to a server and is able to print DDL statement for the Database Administrators. Currently existing tools work well but they will be difficult to maintain as many tools like [dbsake](https://github.com/abg/dbsake) and [go-frm-parser](https://github.com/zing22845/go-frm-parser)




Previous attempts at adding a FRM Parser: [PR Link](https://github.com/MariaDB/server/pull/2191/files)
