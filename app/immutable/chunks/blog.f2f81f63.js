const s=`---
title: My GSoC'24 Journey with eunomia-bpf
date: 2024-07-21
description: Sharing my experience and learnings from Google Summer of Code 2024 with eunomia-bpf
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
`;async function u(){var n;const r=[],e=Object.assign({"/src/content/blogs/gsoc24.md":s,"/src/content/blogs/welcome.md":c});for(const t in e)try{const o=e[t];if(!o||o.trim()===""){console.warn(`Empty blog post file found: ${t}`);continue}const i=(n=t.split("/").pop())==null?void 0:n.replace(".md","");if(i){const a=l(o,i);a&&r.push(a)}}catch(o){console.error(`Error processing blog post ${t}:`,o);continue}return r.sort((t,o)=>new Date(o.date).getTime()-new Date(t.date).getTime())}async function m(r){try{const e=Object.assign({"/src/content/blogs/gsoc24.md":s,"/src/content/blogs/welcome.md":c}),n=`/src/content/blogs/${r}.md`;if(n in e){const t=e[n];return!t||t.trim()===""?(console.warn(`Empty blog post file found: ${n}`),null):l(t,r)}return null}catch(e){return console.error(`Error loading blog post ${r}:`,e),null}}function l(r,e){try{const n=r.split(`---
`);if(n.length<3)return console.warn(`Invalid frontmatter format in post: ${e}`),null;const t=n[1];if(!t)return console.warn(`Missing frontmatter in post: ${e}`),null;const o=h(t);return!o.title||!o.date?(console.warn(`Missing required frontmatter fields in post: ${e}`),null):{slug:e,title:o.title,date:o.date,description:o.description||"",content:n.slice(2).join(`---
`)}}catch(n){return console.error(`Error parsing blog post ${e}:`,n),null}}function h(r){const e={};try{r.split(`
`).forEach(n=>{const[t,...o]=n.split(":");if(t&&o.length){const i=t.trim(),a=o.join(":").trim();i&&a&&(e[i]=a)}})}catch(n){console.error("Error parsing frontmatter:",n)}return e}export{m as a,u as g};
