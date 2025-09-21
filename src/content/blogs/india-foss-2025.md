---
title: India FOSS'25 - A weekend into learning
date: 2025-09-21
description: India FOSS is an annual conference where hackers from around India come and share their learnings 
visible: false
tags: blog, technical-writing
---

# Day 1

We visited the location for the conference which was at NIMHANS convention center

I attended the Compilers and systems track which was organized in Devroom-2 

Lineup of talk was awesome, I had planned to sit through all the talks for this track which were planned till lunch. Post lunch
schedule was not decided

First talk was on Creating CLI tools in Go, It was a nice talk which told about different practices that we can use to make our
CLI better for our users

Second talk was on Cache eviction strategies, I learnt a lot about different methods, I only knew couple of them like FIFO, LRU, LFU
but Talk had a lot more like LFRU, Segmented LRU, Second Chance(or Clock) 
And at the end again FIFO but with lazy eviction and promotion, so it was all a circle, we started with FIFO and ended with FIFO
Speaker also mentioned that it is still a very actively researched topic and we all know that Cache invalidation is one of the 
hardest problem of the Computer Science

Third talk was on Packaging GPU packages for Debian ecosystem, This talk was given by Spaarsh, he had titled it `Packaging: pain` 
I really liked how he touched upon different components of Debian packages, which consist of Source files and a `debian` directory
He touched upon different GPU terms, I was aware of linking issues and packaging in CPU, it was new to learn that this issue is more
severe in GPU ecosystem, he shared his experience of packaging some library for rocxm (AMD's alternative to CuDA)

Fourth talk was on Wasm titled `Your Next server might be browser`, Speaker shared his project `wasm-run` which is like a `node` for
`wasm` ecosystem. I was really fascinated to see an alpine linux distro running in a browser, a freaking browser. This wasm thing is 
so under-used at this moment and this talk has excited me to look more around it. I will (hopefully)contribute something in this space

Fifth talk was on `ld`, Speaker showed how you can link a C Program with a Python program which is then called by a Rust program,
He showed live demonstration by creating a pokemon-art generator, It was really awesome to see how powerful `ld` is, how your shared
libraries can be linked over different languages

Sixth talk was on `JNI: Java native interface`, this was really new to me, I had never heard of this before, You can use C library functions in your Java code thanks to this JNI, She also showed the new API which is part of Java 21 called FFM(Foreign Function and Memory), FFM really reduces a lot of effort for this interaction, earlier you had to change your library to adapt it to be called by a 
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
I also met Nemo and it was so refreshing to see folk like them in India, who are just hacking for the fun of it.
Seeing such wonderful people around me in this space just made me grateful for being in a city like Bengaluru and how fortunate I am to see them. It is inspiring and it makes you work towards your goal, so that you can inspire a new generation like how they are inspiring us.

Really wonderful session.

