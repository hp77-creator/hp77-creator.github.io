const c=`---
title: Mudlet through an open source contributor's eyes 
date: 2025-01-23
description: how to navigate a large C++ project and how to start with Mudlet 
visible: false
tags: C++
----

Mudlet, it is an open source application which can be used to play multiplayer text games. It is written in C++ and uses Qt framework for its UI content. It uses raw pointers and is devoid of RAII(I am trying to fix some with this PR: https://github.com/Mudlet/Mudlet/pull/7642)

When you first visit Mudlet, you might feel excited to try it instantly, you can download it from here(insert link here) and if you want to contribute
to it then you will have to learn how to setup your environment, you can refere following guide to get started.

The project is very huge so there are multiple commands that you have to execute to get the application started. You can refer following script for that
\`\`\`shell
mkdir -p build && cd build && rm -rf *
cmake ../../Mudlet-go -DCMAKE_PREFIX_PATH=\`brew --prefix qt@5\` -DUSE_UPDATER=OFF
make -j \`sysctl -n hw.ncpu\`
src/mudlet.app/Contents/MacOS/mudlet
\`\`\`
Note: Make sure to run this script from inside the repo main directory or you might loose all of your changes.
I am currently looking to add feature to add support for voice-readers to read the found result, for more info: . The issue was that result was found
it was highlighted as well but the caret which is used by the voice-readers to get the context for their dictation was not setting up properly.
I fixed that and added a key shortcut to enable this setting. To integrate shortcut, I used the existing \`lua\` scripts and added option for the same.

In the process, I learned that there are some games that might have their own implementation for \`F3\` (key that I have configured to access the results) and that could mess up the search navigation.



---- 

## References

- [Git remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
`,l=`---
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
`,h=`---
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
`,u=`---
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
`,d=`---
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
`;async function f(){var n;const i=[],e=Object.assign({"/src/content/blogs/about-mudlet.md":c,"/src/content/blogs/git-rebase.md":l,"/src/content/blogs/gsoc24.md":h,"/src/content/blogs/kubecon-cloudnativecon.md":u,"/src/content/blogs/welcome.md":d});for(const t in e)try{const o=e[t];if(!o||o.trim()===""){console.warn(`Empty blog post file found: ${t}`);continue}const r=(n=t.split("/").pop())==null?void 0:n.replace(".md","");if(r){const s=g(o,r);s&&i.push(s)}}catch(o){console.error(`Error processing blog post ${t}:`,o);continue}return i.sort((t,o)=>new Date(o.date).getTime()-new Date(t.date).getTime())}async function w(){return(await f()).filter(e=>e.visible!==!1)}async function y(i){try{const e=Object.assign({"/src/content/blogs/about-mudlet.md":c,"/src/content/blogs/git-rebase.md":l,"/src/content/blogs/gsoc24.md":h,"/src/content/blogs/kubecon-cloudnativecon.md":u,"/src/content/blogs/welcome.md":d}),n=`/src/content/blogs/${i}.md`;if(n in e){const t=e[n];return!t||t.trim()===""?(console.warn(`Empty blog post file found: ${n}`),null):g(t,i)}return null}catch(e){return console.error(`Error loading blog post ${i}:`,e),null}}function g(i,e){try{const n=i.split(`---
`);if(n.length<3)return console.warn(`Invalid frontmatter format in post: ${e}`),null;const t=n[1];if(!t)return console.warn(`Missing frontmatter in post: ${e}`),null;const o=p(t),r=o.title,s=o.date;if(!r||!s)return console.warn(`Missing required frontmatter fields in post: ${e}`),null;const a=o.visible,m=a?a.toLowerCase()==="true":!0,b=o.tags;return{slug:e,title:r,date:s,description:o.description||"",content:n.slice(2).join(`---
`),visible:m,tags:b}}catch(n){return console.error(`Error parsing blog post ${e}:`,n),null}}function p(i){const e={};try{i.split(`
`).forEach(n=>{const[t,...o]=n.split(":");if(t&&o.length){const r=t.trim(),s=o.join(":").trim();r&&s&&(r==="tags"?e[r]=s.split(",").map(a=>a.trim()):e[r]=s)}})}catch(n){console.error("Error parsing frontmatter:",n)}return e}export{y as a,w as g};
