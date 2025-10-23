---
title: My GSoC'24 Journey with eunomia-bpf
date: 2024-07-21
description: Sharing my experience and learnings from Google Summer of Code 2024 with eunomia-bpf
visible: true
tags: gsoc
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
