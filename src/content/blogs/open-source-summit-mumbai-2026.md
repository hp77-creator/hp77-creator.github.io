---
title: Open Source Summit'26 at Mumbai
date: 2026-06-21
description: Report of talks and interactions I had in Mumbai Open Source Summit by LFX
visible: true
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
He mentioned the five layers of AI -- Hardware Infrastructure --> Software Infrastructure --> Intelligence --> Agentic AI --> End user Application & Verticals.
He then went in deep on the Layer-4 Agentic AI, here he mentioned, projects like [agentgateway](https://github.com/agentgateway/agentgateway) which is a Governance and control layer then we have AGENTS.md which is responsible for agentic runtime, I already mentioned [Goose](https://goose-docs.ai/) before which is like a AI agent for development.
He also mentioned something about OCUDU, I couldn't understand much about it and so probably can check it out later but it was something in telecom industry. Then there was a mention of India's growth in LF Decentralized Trust projects.


[Slides](https://hosted-files.sched.co/ossindia2026/0d/Arpit%20OSS%20Keynote%20-%20LF%20India%20June%202026%20FINAL.pdf)


### Keynote: Open source Runway


![Policies for agentic AI](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678589/WhatsApp_Image_2026-06-29_at_01.57.46_2_hewmwm.jpg)

This talk took us through the journey of AI from conversational bots to autonomous agents. Talk was centered around how we can reach this destination.
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


[Slides](https://hosted-files.sched.co/ossindia2026/9f/2.%20Toddy%20Mladenov.pdf)

### Keynote: Conversation between Linus Torvalds and Dirk Hohndel

Crowd gave a standing ovation to Linus and some even whistled in awe of seeing a living legend in front of their eyes. I was so happy seeing him on stage. I just wanted to save this moment and I hoped to reach atleast a 1 % of his level, such is his greatness.
Both sat on their respective seats on stage and then Dirk began asking him some set of questions.
Linus also told us why this format he prefers, he said that he is too lazy to prepare some talk in advance and said that it is best form of
talk that he can give, in this manner crowd can also listen to his views without him having to worry a lot about what to say. Questions are
not shown to Linus before so whatever he says is said on the spot.

I learnt that Linux 7.x version is launched. Interesting thing was learning that it has NTFS support and there has been many removals as well mostly of things which are not maintained or used rapidly.
x486 is one of those things.

Arpit also mentioned that Linus had just flew in to do the session and then he left back.

### Keynote Panel: Open source innovation powering India's Digital Public Infrastructure

This was a really interesting panel, CEO of DigiYatra, Network for Humanity were present, I learnt in this panel questions that DigiYatra uses
blockchain for their operations. So, in Arpit's keynote there was a mention of growing use of LF's Decentralized project in India, DigiYatra is one of those users
Also got to learn how they are going to enable DigiYatra globally, they have done some PoC and everyone's excited
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
him explaining about how we can use Yocto to do Linux development for embedded systems was really interesting.

Yocto is SI unit which means 10^-24 which is a very clever way to say it is built for small embedded systems.
Kaiwan mentioned to always use LTS versions whenever using any versions.

Every linux image should have following things:
- a bootloader image
- a kernel image
- device tree blob (DTB) image -- these are super common in embedded
- root filesystem(rootfs) image

yocto builds packages which are then extracted to make bootable images.


[Slides](https://hosted-files.sched.co/ossindia2026/c5/Hey%20Yocto%2C%20build%20me%20a%20custom%20embedded%20Linux%21%20Er%2C%20no%20-%20OSS%20Mumbai%20June2026.pdf)


### DTS 101: From roots to Trees

This was a really interesting session, like I had heard of DTS but never quite understood them, I remember there was one session in Kubecon'24 in Delhi where I just noted things but didn't quite understand
much. I was glad to participate in this session was able to understand the terminologies around DTS, what is their need and when they should be really added. It was really informative for me.

It is a data format to deescribe the non-discoverable hardware.
It is used by software like linux kernel or u-boot to understand the hardware it is running on.
ACPI based systems use ACPI tables for that
Devicetree bindings(DTB) - rules how DTS should be constructed and documenting the ABI

DT Binding define the ABI - it is a contract between the software ( Linux Kernel) & DTS(Device Tree Source)

you should only put hardware info in DTS
properties represent observable hardware characteristics or board wiring


[Slides](https://hosted-files.sched.co/ossindia2026/c6/DTS%20101%20From%20Roots%20to%20Trees%2C%20aka%20Devicetree%20for%20Beginners%20-%20Krzysztof%20Kozlowski%2C%20Qualcomm%20-%20OSS%20India%202026.pdf)


### Open Source is not the same Anymore

Session about recent changes in open source world where AI has contributd so much slop to codebases that many OS projects have disabled them for good. Also they talked about supply chain attacks that
are done by some danger actors.

### Ask the expert with Greg Kroah-Hartman

![Greg-KH in discussion](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678589/WhatsApp_Image_2026-06-29_at_01.57.46_kmqgke.jpg)

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


[Slides](https://hosted-files.sched.co/ossindia2026/96/Guide%20to%20Becoming%20a%20Linux%20Kernel%20Maintainer%20-%20Krzysztof%20Kozlowski%2C%20Qualcomm%20-%20OSS%20India%202026.pdf)

### Recipes and Runtimes: Making sense of containers

This was a really good session on how to optimize container images and what are the latest technologies that are being used in the world at the moment. I learnt a lot from this. I even checked out
slides later on noted pointers on exploring more of some techs which the speaker mentioned.


[Slides](https://hosted-files.sched.co/ossindia2026/d0/Making%20Sense%20Of%20Containers%20in%202026.pdf)



## Day 2

### Keynote on Valkey

![Valkey](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678588/WhatsApp_Image_2026-06-29_at_01.57.45_1_fmncbw.jpg)

I already knew about Valkey since Redis had changed its license to a business friendly license over open source one, Open source community had forked it and created something
called as Valkey. It was a joint effort by major coporations like Amazon, Google and others. I learnt from this talk some best practices of where one should be using
Valkey. I learnt that Valkey has introduced something called as semantic search.
Speaker also told about some of the best practices of where one can use Valkey.


### Keynote Open by design

This was a talk given by IBM field CTO. Speaker mentioned how IBM loves Open source and what innovation they are doing in space of AI.
This talk was an intro to AI Risk Atlas which is being developed by IBM. I read about it, seems like they are creating an ontology for
trust in AI space.
"Open source is powering AI acceleration but trust gap is widening"
Trusted AI = Responsible + Reliant + Transparent
Goal of AI Risk Atlas is to embed trust in each lifecycle of, be it from Data --> Models --> Training --> Deployment --> Monitoring --> Governance


[Slides](https://hosted-files.sched.co/ossindia2026/60/5.%20Geeta%20Gurnani.pdf)



### Rust and Linux, Keynote by Greg KH

Greg KH was also given a standing ovation for his contribution to Linux Kernel. He spoke about Rust and how it can help in making kernel more secure.
He gave examples of some bugs where resources were not freed in some error conditions, some of those type of bugs stayed in kernel for more than 20 years.
He told that Rust will make identifying these bugs easy. It will also force them to document their APIs in a manner which is safe and secure.
And continuing on his yesterday's statement he did say that learning Rust is fun and we all should do it.



[Slides](https://hosted-files.sched.co/ossindia2026/c2/6.%20Greg%20Kroah-Hartman.pdf)

### Breaking Valkey on Purpose

This was a fun session. I saw speaker break valkey's consensus behaviour and interesting part was seeing how she was able to replicate the exact behaviour
So, if you patch up some fix you can again execute the scenarios which led to previous failure and observe if your patch really fixed the issue or not.
I liked how she had leveraged AI in planning what test should be done. Setting up the whole environment and then executing those queries and verifying
the guarantees which are presented by Valkey was a good demo. It looked like a Deterministic Simulation Testing (DST), I really liked this. And it is also
open source, so you can also test your version of Valkey [here](github.com/valkey-io/valkey-fuzzer).


[Slides](https://hosted-files.sched.co/ossindia2026/fa/OSSummit-ValkeyFuzzer.pdf)


![key-takeaway](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678588/WhatsApp_Image_2026-06-29_at_01.57.44_muniyb.jpg)

### Don't Trash it, Hack it: Reverse Engineering Secrets & Re-purposing ISP Routers

This was one of the best sessions of the whole event. I was so mind blown after this session, like cool people like Dheeraj exist around us. Speaker showed
us demonstration on how he was able to hack a router, he was able to figure out username and password by decompiling the binary and looking for keyword like
"password", he used Ghidra to map the exact lines. He showed how he analyzed the binary which is loaded in the router. How he remapped the CLI which was given
by default in router to his own shell script. It was so good. He mentioned if one wants to start in this space, they should be familiar with Kernel and some
instruction set, he was familiar with the instruction set of the microcontroller which was being used in the router and he learned more from MIPS related book.

He also mentions how one can avoid this thing, first is to never pack a UART port in your microcontroller when shipping to production, other thing is to add a passphrase
to avoid figuring out the password from decompiled binary. It was an awesome session. Highly recommended to check it out on youtube when it is up.


![intro](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678898/WhatsApp_Image_2026-06-29_at_01.57.44_1_artn1d.jpg)

[Slides](https://hosted-files.sched.co/ossindia2026/d4/OSS_India_2026_Dont_Trash_it_Hack%20it_Dheeraj_Jonnalagadda.pdf)

### The Next Evolution of Java: Achieving Hyper Performance and Efficiency in Cloud Native Workloads

Daniel Oh spoke to us about Quarkus in this session. He told us about evolution of cloud and how Java framework's fared in this changing ecosystem.
He told us about one use case of an ecommerce company which faced issue when their java system was unable to scale when traffic increased. Reason for that being
Java images take a lot of time to load up in containers because they have to load initial OS then JVM then application code and run that code. All of this takes
significant time and in case of high traffic it can take even more time, k8s healthcheck failed for the company and their system crashed because of this delay
in start up of the service. He mentioned how GraalVM can help in solving this issue, GraalVM creates a native image for the java applications so loading of JVM and
other things are not required. It is Ahead of Time (AOT) compilation compared to Just-in-Time(JIT) compilation of JVM. This has its benefit that start up time is
reduced but it also has a con on cases where there is too many computations in the code, those will not be optimized in subsequent usages while in JIT, computations will be optimized.
It is a trade-off and it totally depends on what you want to use it for. If you think that your services require faster boot up times then you can go ahead with GraalVM based solution, but if you want better optimization over the duration of your codebase execution then JVM is the way to go. With GraalVM you also loose the ability to
debug your application while developing because it generates a binary and that is to be run, so there are some trade-offs like these. Pick your poison ;)

[Slides](https://hosted-files.sched.co/ossindia2026/eb/oss_in26_The%20Next%20Evolution%20of%20Java_%20%E2%98%95%EF%B8%8F%20Achieving%20Hyper%20Performance%20and%20Efficiency%20in%20Cloud%20Native%20Workloads.pdf)


### Operators live in the Past: Designing Reliable Kubernetes Controllers

This was a really good session. I finally understood what operators are in k8s, now I can understand some of the sessions that I attended in Kubecon in 2024 (XD).
Someshwaran is from ElasticSearch, so he showed how one can run operators and what is their use. Operators are like custom workflow that you create for your stateful
services, example of Stateful service is ElasticSearch. How k8s can maintain the pod on the basis of operator and what stuff does an operator need to do all of that was discussed. This also reminded me of PlanetScale's blog on how they have created operator for their deployments and I read that blog again and I could make more sense of it.
Highly recommended to check out this [blog](https://planetscale.com/blog/the-feedback-loops-behind-kubernetes).

[Slides](https://hosted-files.sched.co/ossindia2026/3b/Operators-Designing-Reliable-Kubernetes-Controllers.pdf)


### Confidently Wrong: When AI Cannot catch its own bugs

Speaker talks about how using same model for verifying its own generated output can lead to failures. She gave examples of some failures that AI did on logical questions.
She mentioned we can leverage code based guarantees over model judgement for guaging model output. She talked about Mellea.ai which is something IBM has created to do the same.


![session-img](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678588/WhatsApp_Image_2026-06-29_at_01.57.43_a6wazi.jpg)

### Writing for Machines: How to Capture your Project's "Vibe" and Survive AI Slop

This was a good session on how to maintain an Open source project in this changing ecosystem where every other day you are receiving too many PRs. Speakers shared thier
experience which they gained from maintaining fossology. They also shared how we can use AI in a better way to generate less slop and more code which can be merged.
They shared their experience where they once received a 100% coverage but when tests were checked it was just assert true. so horror stories like those were shared.


![end-slide](https://res.cloudinary.com/ddq6sqvno/image/upload/v1782678898/WhatsApp_Image_2026-06-29_at_01.57.43_1_dbmuo1.jpg)


## Epilogue

This was such a learning experience. I learnt so many things, got to see some of my favorite programmers. I felt ecstatic by the time session ended. Seeing so many people
doing such exciting things in the space of Open source and coming in this Summit and talking about them also motivated me to do something similar and it is an inspiration
to keep giving out to the community which is teaching us so much. I am grateful to Linux Foundation for hosting this and organizing such a wonderful event. To many more...




