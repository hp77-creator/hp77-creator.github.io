const i=`---
title: Welcome to my blog
date: 2024-01-20
description: Introduction to my technical blog and what to expect
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
`;async function g(){var r;const e=[],t=Object.assign({"/src/content/blogs/welcome.md":i});for(const n in t){const o=t[n],s=(r=n.split("/").pop())==null?void 0:r.replace(".md","");if(s){const l=c(o,s);e.push(l)}}return e.sort((n,o)=>new Date(o.date).getTime()-new Date(n.date).getTime())}async function d(e){try{const t=Object.assign({"/src/content/blogs/welcome.md":i}),r=`/src/content/blogs/${e}.md`;if(r in t){const n=t[r];return c(n,e)}return null}catch(t){return console.error(`Error loading blog post ${e}:`,t),null}}function c(e,t){const[r,...n]=e.split(`---
`).filter(Boolean),o=a(r);return{slug:t,title:o.title||"Untitled",date:o.date||new Date().toISOString().split("T")[0],description:o.description||"",content:n.join(`---
`)}}function a(e){const t={};return e.split(`
`).forEach(r=>{const[n,...o]=r.split(":");n&&o.length&&(t[n.trim()]=o.join(":").trim())}),t}export{d as a,g};
