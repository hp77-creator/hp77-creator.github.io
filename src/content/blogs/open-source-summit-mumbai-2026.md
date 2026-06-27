---
title: Open Source Summit'26 at Mumbai
date: 2026-06-21
description: Report of talks and interactions I had in Mumbai Open Source Summit by LFX
visible: false
---

## Introduction

Opensource Summit is a conference conducted by Linux Foundation. I was really excited for this version because Linus Torvalds and
Greg KH were going to give keynotes and I didn't want to miss this opportunity. I booked tickets for the conference only a week earlier
when I got to know of their arrival in email.

I was really stoked to see Linus Torvalds and Greg. I hoped to also get a click with them if there was any chance of interaction. I reached
location from Bandra Terminus Station. Conference was being held at Jio World Convention Center.

## Day 1

Day started with registration where we were given our badges and T-Shirt. I took those and just wandered in hall looking around and soaking in
the vastness of India's open source community. I was not able to recognize anyone, this only proved how many different people are there that despite being active in communities in Bengaluru, I still wasn't able to see a recognizable face.
I saw Greg KH moving from keynote hall to outside and it fel so surreal, I became fan of Greg KH ever since I saw his talk on Google talks about Kernel development and then I had recently also watched his podcast on Pragmatic Programmer. I was really excited for the upcoming sessions.

### Keynote: From Consumption to Global Leadership by Arpit

In this keynote, Speaker mentioned the growth of Linux Foundation in India and how India is embracing open source with open arms. Some interesting bits from this talk that I noted was that LFX is now also creating section for AI, they have set up Agentic AI foundation. Arpit mentioned
about Goose and Tokenomics.
He mentioned the five layers of AI

### Keynote: Open source Runway

I learnt about Microsoft's current status on Agentic AI. Todd Mladenov also mentioned about the requirements of an agentic AI workflow which are
- Scale
- Security
- Cost-efficiency
I was also surprised when Todd mentioned that Linux is the OS of the internet. I am well aware that it is the case but seeing this admission
from a Microsoft spoke-person was something I hadn't heard before. I googled and saw that it has been quite sometime that Microsoft fully
embraced Linux and is now contributing back to it.
I learnt that Agents are also topology sensitive. I have to read more on it. I will probably write something if I learn anything interesting.
Agent runtime requires dynamic resource allocation.
Microsoft has also created something called as Agent governance toolkit ([link]( https://github.com/microsoft/agent-governance-toolkit)).
They have also created something called as Agent reference stack for k8s (KARS)

### Keynote: Conversation between Linus Torvalds and Dirk Hohndel

Crowd gave a standing ovation to Linus and some even whistled in awe of seeing a living legend in front of their eyes. I was so happy seeing him on stage. I just wanted to save this moment and I hoped to reach atleast a 1 % of his level, such is his greatness.
Both sat on their respective seats on stage and then Dirk began asking him some set of questions.
Linus also told us why this format he prefers, he said that he is too lazy to prepare some talk in advance and said that it is best form of
talk that he can give, in this manner crowd can also listen to his views without him having to worry a lot about what to say. Questions are
not shown to Linus before so whatever he says is said on the spot.

I learnt that Linux 7.x version is launched. Interesting thing was learning that it has NTFS support and there has been many removals as well mostly of things which are not maintained or used rapidly.
x486 is one of those things.
There was discussion about

Arpit also mentioned that Linus had just flew in to do the session and then he left back.

### Keynote Panel: Open source innovation powering India's Digital Public Infrastructure

This was a really interesting panel, CEO of DigiYatra, Network for Humanity were present, I learnt in this panel questions that DigiYatra uses
blockchain for their operations. Also got to learn how they are going to enable DigiYatra globally, they have done some PoC and everyone's excited
to see it. It will use Passport to create a profile unlike Aadhaar which is just for Indian citizens. I found it interesting like a technology
which will be global and India is driving this innovation. I really liked how their overcame the risk of data security by simply putting the
onus on clients and leveraging blockchain technology. It was really interesting.

### Lunch

In lunch, I met some interesting folks, I met a guy who had written his own runtime for wasm in Java. I met a developer who was a maintainer in linux, she had pushed her own drivers and was working for some OS company now. I met some college students who were exploring the intersection of Electronics and AI.
I also met a developer who has open sourced his analytics application for Google Forms which works even if user hasn't submitted answers.
It was so cool meeting these people. I also learnt about LinBit, about how the developer's code was added in kernel by Linus Torvalds
even though the project was started as a college student project.

### Hey yocto, build me a custom embedded Linux

This was so interesting session, I had seen Kaiwan Billimoria's name on books of Linux Kernel development but seeing him in person and
explaining about how we can use Yocto to do Linux development for embedded systems was really interesting. There were too many things
that flew over my head because I am not aware of lot of kernel terms but I learnt some terms which I will google for example, how to develop
an image and how to customize your linux kernel image.

### DTS 101: From roots to Trees

This was a really interesting session, like I had heard of DTS but never quite understood them, I remember there was one session in Kubecon'24 in Delhi where I just noted things but didn't quite understand
much. I was glad to participate in this session was able to understand the terminologies around DTS, what is their need and when they should be really added. It was really informative for me.


### Open Source is not the same Anymore

Session about recent changes in open source world where AI has contributd so much slop to codebases that many OS projects have disabled them for good. Also they talked about supply chain attacks that
are done by some danger actors.

### Ask the expert with Greg Kroah-Hartman

This was a roundtable discussion, where attendees had just surrounded Greg KH and asking questions to him. Question ranged from asking him about the increased use of AI for finding bugs in kernel.
Some people were raising questions of memory subsystems but Greg politely told them he is not aware of the intricacies of that ecosystem. There were also questions around his day to day, what tools
does he use, it was awesome to learn that he uses VIm as his daily driver editor and when asked about the distro that he uses, he mentioned, there are lot of them, He uses distros like Arch, Fedora
. He also talked about First person circle as another form of security which they are exploring.
There were also questions about his favorite programming language and he mentioned C, since he has been programming in it for most of his career. He also recommended others to try Rust as he was also
learning it. He told that he discovered joy of programming once again by learning to write programs in Rust.

### Guide to become Linux kernel maintainer

This session was again taken by Krystoff, He talked about how one should aim for maintainer role in Kernel. You need to be contributing for some time and then start with giving reviews to the
patch which come on the mailing list, you need to get trust from the maintainer which you can only build by doing contributions. You need to then nominate yourself and it is a job where in
you have to constantly keep reviewing changes that are sent to you and maintain your system. Becoming a maintainer is the easy part but staying a maintainer and maintaining is the real challenge.

### Recipes and Runtimes: Making sense of containers

This was a really good session on how to optimize container images and what are the latest technologies that are being used in the world at the moment. I learnt a lot from this. I even checked out
slides later on noted pointers on exploring more of some techs which the speaker mentioned.



## Day 2

### Keynote on Valkey

I already knew about Valkey since Redis had changed its license to a business friendly license over open source one, Open source community had forked it and created something
called as Valkey. It was a joint effort by major coporations like Amazon, Google and others. I learnt from this talk some best practices of where one should be using
Valkey. I learnt that Valkey has introduced something called as semantic search.
Speaker also told about some of the best practices of where one can use Valkey.


### Keynote Open by design



### Rust and Linux, Keynote by Greg KH

It was an awesome session

### Breaking Valkey on Purpose

### Don't Trash it, Hack it: Reverse Engineering Secrets & Re-purposing ISP Routers

### The Next Evolution of Java: Achieving Hyper Performance and Efficiency in Cloud Native Workloads

### Operators live in the Past: Designing Reliable Kubernetes Controllers

### Confidently Wrong: When AI Cannot catch its own bugs

### Writing for Machines: How to Capture your Project's "Vibe" and Survive AI Slop




