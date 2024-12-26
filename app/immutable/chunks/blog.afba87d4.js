const c=`---
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
\`git rebase origin main\` when I was on a \`feature\` branch and then I saw some conflicts, I expected those since there were some changes that were in common files. I used \`IntelliJ\` merge editor to resolve the conflicts but then I see that my branch is changed to \`main\`

![main-branch-pic](/blog-pic/main-branch.png)

Before observing this change, I had also done \`git add\` and was about to \`commit\`.

But now that my branch was switched to \`main\`, I was curious what did I do wrong and do I know rebase correctly. I searched for my mistake and observed that, when we do rebase
we should use

\`git rebase origin/main\` and not \`git rebase origin main\`

when you do \`git rebase origin/main\`

You are telling \`git\` to rebase your existing branch with \`main\` that is there in \`origin\`

and when you do \`git rebase origin main\` 

You are telling \`git\` to rebase your __main__ branch with \`origin\`'s \`main\` and it automatically switches your branch as well.

To see the history of the \`HEAD\` pointer of \`git\` to track which branch it switched to or from, you can use \`git reflog\`.

It will show you history of the branches and places it had originated from and had been, something like below:
![git-reflog](/blog-pic/git-reflog.png)






---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
`,l=`---
title: My GSoC'24 Journey with eunomia-bpf
date: 2024-07-21
description: Sharing my experience and learnings from Google Summer of Code 2024 with eunomia-bpf
visible: true
tags: GSoC, blog
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
`,h=`---
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
`,g=`---
title: Welcome to my blog
date: 2024-01-20
description: Introduction to my technical blog and what to expect
visible: true
tags: blog, technical-writing
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
`;async function b(){var n;const i=[],e=Object.assign({"/src/content/blogs/git-rebase.md":c,"/src/content/blogs/gsoc24.md":l,"/src/content/blogs/kubecon-cloudnativecon.md":h,"/src/content/blogs/welcome.md":g});for(const t in e)try{const o=e[t];if(!o||o.trim()===""){console.warn(`Empty blog post file found: ${t}`);continue}const r=(n=t.split("/").pop())==null?void 0:n.replace(".md","");if(r){const s=u(o,r);s&&i.push(s)}}catch(o){console.error(`Error processing blog post ${t}:`,o);continue}return i.sort((t,o)=>new Date(o.date).getTime()-new Date(t.date).getTime())}async function p(){return(await b()).filter(e=>e.visible!==!1)}async function w(i){try{const e=Object.assign({"/src/content/blogs/git-rebase.md":c,"/src/content/blogs/gsoc24.md":l,"/src/content/blogs/kubecon-cloudnativecon.md":h,"/src/content/blogs/welcome.md":g}),n=`/src/content/blogs/${i}.md`;if(n in e){const t=e[n];return!t||t.trim()===""?(console.warn(`Empty blog post file found: ${n}`),null):u(t,i)}return null}catch(e){return console.error(`Error loading blog post ${i}:`,e),null}}function u(i,e){try{const n=i.split(`---
`);if(n.length<3)return console.warn(`Invalid frontmatter format in post: ${e}`),null;const t=n[1];if(!t)return console.warn(`Missing frontmatter in post: ${e}`),null;const o=f(t),r=o.title,s=o.date;if(!r||!s)return console.warn(`Missing required frontmatter fields in post: ${e}`),null;const a=o.visible,d=a?a.toLowerCase()==="true":!0,m=o.tags;return{slug:e,title:r,date:s,description:o.description||"",content:n.slice(2).join(`---
`),visible:d,tags:m}}catch(n){return console.error(`Error parsing blog post ${e}:`,n),null}}function f(i){const e={};try{i.split(`
`).forEach(n=>{const[t,...o]=n.split(":");if(t&&o.length){const r=t.trim(),s=o.join(":").trim();r&&s&&(r==="tags"?e[r]=s.split(",").map(a=>a.trim()):e[r]=s)}})}catch(n){console.error("Error parsing frontmatter:",n)}return e}export{w as a,p as g};
