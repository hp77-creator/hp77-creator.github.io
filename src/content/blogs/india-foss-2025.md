---
title: India FOSS'25 - A weekend into learning
date: 2025-09-21
description: India FOSS is an annual conference where hackers from around India come and share their learnings 
visible: true
tags: technical-writing
---



> Disclaimer:
>
>I don't claim everything mentioned here will be correct or how the original speaker intended those to be.
>This is supposed to be a log of my experience at
>the conference. For exact details and info you can visit: https://fossunited.org/dashboard/schedule/indiafoss/2025
>
>For Videos of the conference: https://youtube.com/playlist?list=PLOGilj110olxij6kbNUlRdd3Ez8bWczny&si=hQ04NrjBhxT1IjDJ


# Day 1

We visited the location for the conference which was at NIMHANS convention center

I attended the Compilers and systems track which was organized in Devroom-2 

Lineup of talk was awesome, I had planned to sit through all the talks for this track which were planned till lunch. Post lunch
schedule was not decided

*First* talk was on Creating CLI tools in Go, It was a nice talk which told about different practices that we can use to make our
CLI better for our users

*Second* talk was on Cache eviction strategies, I learnt a lot about different methods, I only knew couple of them like FIFO, LRU, LFU
but Talk had a lot more like LFRU, Segmented LRU, Second Chance(or Clock) 
And at the end again FIFO but with lazy eviction and promotion, so it was all a circle, we started with FIFO and ended with FIFO
Speaker also mentioned that it is still a very actively researched topic and we all know that Cache invalidation is one of the 
hardest problem of the Computer Science

*Third* talk was on Packaging GPU packages for Debian ecosystem, This talk was given by Spaarsh, he had titled it `Packaging: pain` 
I really liked how he touched upon different components of Debian packages, which consist of Source files and a `debian` directory
He touched upon different GPU terms, I was aware of linking issues and packaging in CPU, it was new to learn that this issue is more
severe in GPU ecosystem, he shared his experience of packaging some library for rocxm (AMD's alternative to CuDA)

*Fourth* talk was on Wasm titled `Your Next server might be browser`, Speaker shared his project `wasm-run` which is like a `node` for
`wasm` ecosystem. I was really fascinated to see an alpine linux distro running in a browser, a freaking browser. This wasm thing is 
so under-used at this moment and this talk has excited me to look more around it. I will (hopefully)contribute something in this space

*Fifth* talk was titled `Building a software language`, here Speaker talked about his journey of creating a new language
which he named `ASL` (A Software Language), He compared it with different languages like Rust, Go
and their shortcomings.

*Sixth* talk was on `ld`, Speaker showed how you can link a C Program with a Python program which is then called by a Rust program,
He showed live demonstration by creating a pokemon-art generator, It was really awesome to see how powerful `ld` is, how your shared
libraries can be linked over different languages


*Seventh* talk was on `JNI: Java native interface`, this was really new to me, I had never heard of this before, You can use C library functions in your Java code thanks to this JNI, She also showed the new API which is part of Java 21 called FFM(Foreign Function and Memory), FFM really reduces a lot of effort for this interaction, earlier you had to change your library to adapt it to be called by a 
Java program but with FFM, your library can be how it is and you can use it in your Java, I really liked this and it has excited me to
explore this more.

I was also excited to know that there will be an Innovation in Compiler Technology conference on 27th-28th Sept in IISc, I registered for it instantly :) 
Looking forward to more talks like these

Then we went for lunch, I had pleasure of being in company of some really awesome folks from Thoughtworks, Akamai, fly.io, Jupiter. It was so exciting to learn about the work that they are doing at their respective companies. 

Post lunch, I attended a Panel discussion consisting of Chad Whitacre(Head of OSS, Sentry), Kailash Nadh(CTO of Zerodha), Monica(COO of Frappe), Panel was around sustainability of OSS and health of ecosystem in India and different initiatives that their respective
companies are taking to make OSS sustainable, some nice points were discussed.

I stayed in the same auditorium and next talk was on open source UPI app called `librefin`, Nemo was giving this talk with <> 
they spoke on how they are reverse engineering UPI to create something open, It was exciting to see how they are doing it,
They have also been able to do this thanks to 52(1)(ab) clause of Copyright infringement act, and this has also inspired them to
name their company 52-labs, 

After this, there was a talk on `How's Javascript` given by Ujjawal kumar, he showed how different features are added in JS ecosystem, 
He is one of the members of the TC39 committe which decides on new features for JS. 

This was the last talk that I attended and then I went out to network, I saw KC Sivaramakrishnan from IIT-Madras, who is also really active on Socials talking about OCaML, It was nice to learn that he is one of the speakers at ICT IISc. I had a chat with him, he 
mentioned about his startup and how they are deploying application on satellite, not your typical servers. It was so awesome to know
something like this being done in our Country.

Post this I got to talk with Ujjawal, I had discussion with him on JS and his work on JS engines, He shared how different vendors are really tackling performance for their engines, learnt a bit about Igalia.

I was also able to meet Kailash Nadh with my friends, I asked him questions on Databases, AI and his view on languages, It was a nice experience.
![Proof that I met Kailash XD](https://res.cloudinary.com/ddq6sqvno/image/upload/v1758770193/WhatsApp_Image_2025-09-21_at_20.00.16_ygosx5.jpg)
I also met Nemo and it was so refreshing to see folk like them in India, who are just hacking for the fun of it.
Seeing such wonderful people around me in this space just made me grateful for being in a city like Bengaluru and how fortunate I am to see them. It is inspiring and it makes you work towards your goal, so that you can inspire a new generation like how they are inspiring us.

Really wonderful session.

# Day 2

First talk that I attended today was by Hridesh and it was around contributing to Linux Kernel
He told about his journey how he joined the LFX mentorship for Linux kernel program and worked
around fixing some bugs that he saw in his laptop. I really liked the attitude that he brought
that curious mind to figure out what is wrong and then fixing it by sending the Patch to the Linux
Kernel source system. It was really cool to see someone doing what I wished I should have done as well XD. 

Second talk was on Ente's end to end video streaming platform, I learnt how streaming really works, so
there are two things, we have streaming data and playlist data(`.m3u8` format). Ente's providing end-to-end encrypted solution, so they encrypt the data before sending it to their server to store it.
Later on whenever client requests for those videos, they send the videos and that's decrypted at the
client side. They use AES encryption to encrypt/decrypt their data. 

Third talk was by `wraft` co-founder where he talked about `wraft` which is an open-source documentation
lifecycle management platform. Learnt that it is written in `elixir`. It was nice talk on how they
solved a problem that many companies face when they hire new people, there are many documents that
are generated and circulated for signing and everything but there isn't any one platform which stitches all different apps into one. `wraft` bridges this gap and resolves this problem.

Fourth talk was on `Bootable containers` and how you can now use containers as distro image for your system. Speaker mentioned about their effort and creating `bluefin-lts`

Fifth talk was on `logchef` an UI created to query logs being stored in `Clickhouse` at `Zerodha`. 
Speaker admitted that Grafana can also be used if provided RBAC auth support, to manage their usecase
for audit and security purpose they created this tool.

Post this, I went on lunch and networked with different people present in the conference. It was nice
meeting new people and talking about system and their companies and jobs.

I also attended some parts of Kailash Nadh's talk where he was showcasing `huml`, a new markup language which is oriented more towards human readability. It is a very opiniated language and it is 
still growing phase. You can check it out at `huml.io`

I went on to attend `Sanchari-Kathegaara: Community Mesh Networks with Tribal Settlements in Karnataka` talk, Speaker told us about their efforts connecting remote villages of Karnataka and their
challenges. It was so cool to see people doing efforts like this, They connected a network between different sections of the same village and hosted some open source program. This network was also source
for knowledge sharing about medicinal-practices, and other educational stuff. 

After this, I attended the talk on `Proxmox`, I hadn't heard of it before this conference but from the
audience, I got to know it's a really popular tool in this virtualization space. It uses `Qemu` and in demo,
Speaker showed how they are using Proxmox to manage their workstations including one workstation where they have setup Editing software and even GPUs.

Then I went out and had some knowledge gathering at the `Zeiss` booth, where I learnt about different
open source software that `Zeiss` uses, interesting was `Conan`, a C++ package manager and besides that
there were many more, you can maybe find that on their website.

Last talk that I attended was on `Flavours of Zig language`, Speaker demonstrated their journey of creating
a GPU library called `cudaz`, `comptime` was mentioned and how it helps improve developer experience.


It was one of the best conference that I have visited till date in terms of talks, meeting new people,
filling up my to-do list for stuff that I should check out/contribute to.

Really grateful to IndiaFOSS for organizing such a wonderful event. 

