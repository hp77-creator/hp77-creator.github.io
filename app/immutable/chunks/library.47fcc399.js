import{S as g,i as w,s as _,T as l,y as v,z as k,A as T,U as $,V as S,g as d,d as u,B as I,W as c,L as A,M as E,N as M,O as x}from"./index.c8c469ad.js";import{I as N}from"./Icon.3abadf8f.js";function D(i){let t;const a=i[2].default,n=A(a,i,i[3],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,s){n&&n.m(e,s),t=!0},p(e,s){n&&n.p&&(!t||s&8)&&E(n,a,e,e[3],t?x(a,e[3],s,null):M(e[3]),null)},i(e){t||(d(n,e),t=!0)},o(e){u(n,e),t=!1},d(e){n&&n.d(e)}}}function P(i){let t,a;const n=[{name:"external-link"},i[1],{iconNode:i[0]}];let e={$$slots:{default:[D]},$$scope:{ctx:i}};for(let s=0;s<n.length;s+=1)e=l(e,n[s]);return t=new N({props:e}),{c(){v(t.$$.fragment)},l(s){k(t.$$.fragment,s)},m(s,o){T(t,s,o),a=!0},p(s,[o]){const r=o&3?$(n,[n[0],o&2&&S(s[1]),o&1&&{iconNode:s[0]}]):{};o&8&&(r.$$scope={dirty:o,ctx:s}),t.$set(r)},i(s){a||(d(t.$$.fragment,s),a=!0)},o(s){u(t.$$.fragment,s),a=!1},d(s){I(t,s)}}}function j(i,t,a){let{$$slots:n={},$$scope:e}=t;const s=[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}],["polyline",{points:"15 3 21 3 21 9"}],["line",{x1:"10",y1:"14",x2:"21",y2:"3"}]];return i.$$set=o=>{a(1,t=l(l({},t),c(o))),"$$scope"in o&&a(3,e=o.$$scope)},t=c(t),[s,t,n,e]}class B extends g{constructor(t){super(),w(this,t,j,P,_,{})}}const q=B,m=`---
title: Attention Is All You Need
type: paper
status: completed
authors: Vaswani et al.
year: 2017
url: https://arxiv.org/abs/1706.03762
description: The paper that introduced the Transformer architecture
tags: machine-learning, transformers, nlp
visible: false
---

## Summary

This seminal paper introduced the Transformer architecture, which has become the foundation for modern large language models like GPT, BERT, and many others.

## Key Contributions

1. **Self-Attention Mechanism**: The paper shows that attention mechanisms alone, without recurrence or convolution, can achieve state-of-the-art results
2. **Positional Encoding**: Since the model has no inherent sense of order, positional encodings are added to give the model information about token positions
3. **Multi-Head Attention**: Using multiple attention heads allows the model to attend to different representation subspaces

## Architecture Overview

The Transformer consists of:
- **Encoder**: Stack of identical layers, each with multi-head self-attention and feed-forward networks
- **Decoder**: Similar to encoder but with additional cross-attention layer to attend to encoder outputs

## Why It Matters

Before Transformers, sequential models like RNNs and LSTMs were dominant for sequence tasks. The Transformer's parallel processing capability made it much more efficient to train and scale.

## Personal Insights

The beauty of this architecture is its simplicity - the core idea of self-attention is elegant yet powerful. It's fascinating how this relatively simple mechanism has enabled such dramatic progress in AI.

The positional encoding approach is particularly clever - using sine and cosine functions of different frequencies allows the model to learn relative positions easily.
`,h=`---
title: Awesome eBPF
type: link
url: https://github.com/zoidbergwill/awesome-ebpf
description: A curated list of awesome projects related to eBPF
tags: ebpf, systems, performance
visible: true
---
`,f=`---
title: Designing Data-Intensive Applications
type: book
status: reading
authors: Martin Kleppmann
year: 2017
url: https://dataintensive.net/
description: The big ideas behind reliable, scalable, and maintainable systems
tags: databases, distributed-systems, architecture
visible: false
---

## Overview

This book is a comprehensive guide to building data-intensive applications. It covers fundamental concepts and trade-offs in distributed systems.

## Key Takeaways

### Chapter 1: Reliable, Scalable, and Maintainable Applications

- **Reliability**: System should work correctly even when things go wrong (hardware faults, software faults, human errors)
- **Scalability**: As system grows (data volume, traffic, complexity), there should be reasonable ways to deal with that growth
- **Maintainability**: Over time, many different people will work on the system, and they should all be able to work on it productively

### Data Models

The book explores different data models:
- Relational databases
- Document databases (NoSQL)
- Graph databases

Each has its own strengths and use cases.

## Personal Notes

This book provides excellent mental models for thinking about distributed systems. The author does a great job of explaining complex concepts with clear examples and diagrams.

Currently working through the chapters on replication and partitioning - fascinating stuff about consistency models and consensus algorithms.
`,p=`---
title: Think Distributed Systems 
type: book
status: completed
authors: Dominik Tornow
year: 2025
url: https://www.manning.com/books/think-distributed-systems
description: Reason confidently about Distributed Systems
tags: distributed-systems
visible: false
---

## Overview
This book is about core ideas of distributed systems and their different concepts, what one should know when thinking about them.
And some mental models to understand and reason better about them.


## Key Takeaways

### Chapter 1: Thinking in distributed systems: Models, mindets, and mechanics

> Striving fo
>


### Data Models

The book explores different data models:
- Relational databases
- Document databases (NoSQL)
- Graph databases

Each has its own strengths and use cases.

## Personal Notes

This book provides excellent mental models for thinking about distributed systems. The author does a great job of explaining complex concepts with clear examples and diagrams.

Currently working through the chapters on replication and partitioning - fascinating stuff about consistency models and consensus algorithms.
`;async function C(){var a;const i=[],t=Object.assign({"/src/content/library/attention-is-all-you-need.md":m,"/src/content/library/awesome-ebpf.md":h,"/src/content/library/designing-data-intensive-applications.md":f,"/src/content/library/think-distributed-systems.md":p});for(const n in t)try{const e=t[n];if(!e||e.trim()===""){console.warn(`Empty library item file found: ${n}`);continue}const s=(a=n.split("/").pop())==null?void 0:a.replace(".md","");if(s){const o=b(e,s);o&&i.push(o)}}catch(e){console.error(`Error processing library item ${n}:`,e);continue}return i.sort((n,e)=>{if(n.status==="reading"&&e.status!=="reading")return-1;if(e.status==="reading"&&n.status!=="reading")return 1;const s=n.year?parseInt(n.year):0;return(e.year?parseInt(e.year):0)-s})}async function K(){return(await C()).filter(t=>t.visible!==!1)}async function V(i){try{const t=Object.assign({"/src/content/library/attention-is-all-you-need.md":m,"/src/content/library/awesome-ebpf.md":h,"/src/content/library/designing-data-intensive-applications.md":f,"/src/content/library/think-distributed-systems.md":p}),a=`/src/content/library/${i}.md`;if(a in t){const n=t[a];return!n||n.trim()===""?(console.warn(`Empty library item file found: ${a}`),null):b(n,i)}return null}catch(t){return console.error(`Error loading library item ${i}:`,t),null}}function b(i,t){try{const a=i.split(`---
`);if(a.length<3)return console.warn(`Invalid frontmatter format in library item: ${t}`),null;const n=a[1];if(!n)return console.warn(`Missing frontmatter in library item: ${t}`),null;const e=O(n),s=e.title,o=e.type;if(!s||!o)return console.warn(`Missing required frontmatter fields in library item: ${t}`),null;const r=e.visible,y=r?r.toLowerCase()==="true":!0;return{slug:t,title:s,type:o,status:e.status,authors:e.authors,year:e.year,url:e.url,description:e.description||"",content:a.slice(2).join(`---
`),visible:y,tags:e.tags}}catch(a){return console.error(`Error parsing library item ${t}:`,a),null}}function O(i){const t={};try{i.split(`
`).forEach(a=>{const[n,...e]=a.split(":");if(n&&e.length){const s=n.trim(),o=e.join(":").trim();s&&o&&(s==="tags"?t[s]=o.split(",").map(r=>r.trim()):t[s]=o)}})}catch(a){console.error("Error parsing frontmatter:",a)}return t}export{q as E,V as a,K as g};
