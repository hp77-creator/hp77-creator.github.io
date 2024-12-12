const a=`---
title: My GSoC'24 Journey with eunomia-bpf
date: 2024-07-21
description: Sharing my experience and learnings from Google Summer of Code 2024 with eunomia-bpf
visible: true
---

# My GSoC'24 Journey with eunomia-bpf

I'm excited to share my experience as a Google Summer of Code contributor at eunomia-bpf. In this blog post, I'll walk through my journey, the challenges I faced, and what I learned along the way.

## About eunomia-bpf

[eunomia-bpf](https://eunomia.dev/) is an innovative project that brings eBPF technology to userspace. What makes it particularly interesting is that eBPF, traditionally a kernel-space technology, is now accessible in userspace through their runtime implementation.

## My Contribution

During my GSoC period, I worked on [describe your specific project/contribution]. Some key highlights include:

- bpftime can be compiled on macOS system with feature flags 
- Added tests for functionalities that weren't there before 
- Made registers architecture agnostic 

## Technical Challenges

Some of the interesting technical challenges I encountered were:

1. Testing:
 - I didn't have any non-macOS system with me so testing those changes was very difficult, even setting it up with UTM(QEMU) was not that fast. Once changes were done they needed to be synced with the code in my UTM system and then see the feedback
2. No support of libraries like libelf and libbpf on MacOS meant adding these libraries as your own header files

## What I Learned

This experience has taught me a lot about:

- Working with eBPF technology
- Contributing to open source
- Collaborating with a global team

## Future Plans

Moving forward, I plan to:

- Continue contributing to eunomia-bpf
- Explore more aspects of systems programming
- Share my knowledge with the community

## Conclusion

GSoC has been an incredible learning experience. I'm grateful for the opportunity to work with the eunomia-bpf team and contribute to such an innovative project.

Feel free to check out my contributions on [GitHub](https://github.com/eunomia-bpf/bpftime) and reach out if you have any questions about my GSoC experience!
`,c=`---
title: KubeCon + CloudNativeCon 2024, New Delhi 
date: 2024-12-10
description: Learnings from the first KubeCon in India 
visible: false
---

## Introduction

Kubecon is a conference conducted by Cloud Nat

## What to expect

I'll be writing about:
- Software Development
- Web Technologies
- System Design
- Best Practices
- Personal Projects
- Technical Tutorials

## Why I started this blog

Writing is a great way to:
1. Solidify understanding
2. Share knowledge with others
3. Document learnings for future reference
4. Contribute to the developer community

Stay tuned for more posts!

## Technical Details

This blog is built with:
- SvelteKit for the framework
- Markdown for content
- TailwindCSS for styling
- Hosted on GitHub Pages

Feel free to check out the source code on my GitHub!
`,l=`---
title: Welcome to my blog
date: 2024-01-20
description: Introduction to my technical blog and what to expect
visible: true
---

# Welcome to my blog

Hello! Welcome to my technical blog where I'll be sharing my thoughts, experiences, and learnings in software development.

## What to expect

I'll be writing about:
- Software Development
- Web Technologies
- System Design
- Best Practices
- Personal Projects
- Technical Tutorials

## Why I started this blog

Writing is a great way to:
1. Solidify understanding
2. Share knowledge with others
3. Document learnings for future reference
4. Contribute to the developer community

Stay tuned for more posts!

## Technical Details

This blog is built with:
- SvelteKit for the framework
- Markdown for content
- TailwindCSS for styling
- Hosted on GitHub Pages

Feel free to check out the source code on my GitHub!
`;async function h(){var t;const i=[],e=Object.assign({"/src/content/blogs/gsoc24.md":a,"/src/content/blogs/kubecon-cloudnativecon.md":c,"/src/content/blogs/welcome.md":l});for(const o in e)try{const n=e[o];if(!n||n.trim()===""){console.warn(`Empty blog post file found: ${o}`);continue}const r=(t=o.split("/").pop())==null?void 0:t.replace(".md","");if(r){const s=u(n,r);s&&i.push(s)}}catch(n){console.error(`Error processing blog post ${o}:`,n);continue}return i.sort((o,n)=>new Date(n.date).getTime()-new Date(o.date).getTime())}async function d(){return(await h()).filter(e=>e.visible!==!1)}async function g(i){try{const e=Object.assign({"/src/content/blogs/gsoc24.md":a,"/src/content/blogs/kubecon-cloudnativecon.md":c,"/src/content/blogs/welcome.md":l}),t=`/src/content/blogs/${i}.md`;if(t in e){const o=e[t];return!o||o.trim()===""?(console.warn(`Empty blog post file found: ${t}`),null):u(o,i)}return null}catch(e){return console.error(`Error loading blog post ${i}:`,e),null}}function u(i,e){try{const t=i.split(`---
`);if(t.length<3)return console.warn(`Invalid frontmatter format in post: ${e}`),null;const o=t[1];if(!o)return console.warn(`Missing frontmatter in post: ${e}`),null;const n=m(o);if(!n.title||!n.date)return console.warn(`Missing required frontmatter fields in post: ${e}`),null;const r=n.visible?n.visible.toLowerCase()==="true":!0;return{slug:e,title:n.title,date:n.date,description:n.description||"",content:t.slice(2).join(`---
`),visible:r}}catch(t){return console.error(`Error parsing blog post ${e}:`,t),null}}function m(i){const e={};try{i.split(`
`).forEach(t=>{const[o,...n]=t.split(":");if(o&&n.length){const r=o.trim(),s=n.join(":").trim();r&&s&&(e[r]=s)}})}catch(t){console.error("Error parsing frontmatter:",t)}return e}export{g as a,d as g};
