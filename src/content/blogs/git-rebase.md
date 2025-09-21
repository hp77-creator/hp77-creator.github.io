---
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
`git rebase origin main` when I was on a `feature` branch and then I saw some conflicts, I expected those since there were some changes that were in common files. I used `IntelliJ` merge editor to resolve the conflicts but then I see that my branch is changed to `main`

![main-branch-pic](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413819/main-branch_ygzwj3.png)

Before observing this change, I had also done `git add` and was about to `commit`.

But now that my branch was switched to `main`, I was curious what did I do wrong and do I know rebase correctly. I searched for my mistake and observed that, when we do rebase
we should use

`git rebase origin/main` and not `git rebase origin main`

when you do `git rebase origin/main`

You are telling `git` to rebase your existing branch with `main` that is there in `origin`

and when you do `git rebase origin main` 

You are telling `git` to rebase your __main__ branch with `origin`'s `main` and it automatically switches your branch as well.

To see the history of the `HEAD` pointer of `git` to track which branch it switched to or from, you can use `git reflog`.

It will show you history of the branches and places it had originated from and had been, something like below:
![git-reflog](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758413821/git-reflog_vwuqsc.png)






---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
