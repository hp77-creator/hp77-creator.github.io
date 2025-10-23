---
title: Adding a FRM parser to MariaDB 
date: 2025-06-23
description: A GSoC project 
visible: false
tags: database, mariaDB, cpp 
---

In one of my previous posts, I had described my journey of how I compiled `MariaDB` on MacOS. It was a struggle and a lot of back and forth but in the process, I learnt about some dependencies that aren't really necessary to compile and run `MariaDB`. In this 
blog post, I will be talking about `.frm` (form) files and a parser that I am writing as part of this Google summer of Code.

Google Summer of Code is in motion, with this being a pen-ultimate week before mid evaluations, I am currently contributing in this
project (https://summerofcode.withgoogle.com/programs/2025/projects/vAVydntH).

In Community bonding period, members of MariaDB community had setup a call where we introduced ourselves and got to know about our mentors. Post that I connected with my mentors separately and they told me how I can approach this problem. I had researched at my end about the `.frm` files and where they are used in the `MariaDB`.

Through some jira comments mentioned on the raised issue(https://jira.mariadb.org/browse/MDEV-4637). In the comments, Sergei Golubchik describes how we can simply replace the data structures with `printf` and we can have a simple parser. I had thought of the similar approach. After my conversation with my mentors, Nikita Malyavin and Oleksandr Sanja Byelkin, we made this approach concrete, My first task was to create a separate utility which simply compile the `init_from_binary_frm_image` and works. 

I was given the KT on the process and different data structures by Nikita Malyavin and Oleksandr "Sanja" Byelkin in the discussion call, there I learnt about different `handlers` that are being used and the data structures like `THD`, `TABLE`, `TABLE_SHARE`.

In my time, I searched around the format of form files and different tools that are already there in the wild, one particular blog
that I came across and found helpful was this: https://dbsake.readthedocs.io/en/latest/appendix/frm_format.html#frm-format
But it was better to trust the implementation in the `init_from_binary_frm_image` function which is defined in `table.cc` 

`TABLE_SHARE::init_from_binary_frm_image`



Currently when MariaDB starts we have 

---- 

## References

- [MariaDB official Docs](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/)
- [ChatGPT](https://chatgpt.com/)
- [CFI directives](https://sourceware.org/binutils/docs/as/CFI-directives.html)
- [Configuration option](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)
- [Understanding MySQL internals](https://www.amazon.in/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577)
