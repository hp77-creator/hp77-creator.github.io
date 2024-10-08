<script lang="ts">
  import { ArrowUpRight } from "lucide-svelte";


  const featuredProjects = [
    {
      name: "bpftime",
      href: "https://github.com/eunomia-bpf/bpftime",
      desc: "a userspace runtime for ebpf",
    },
    {
      name: "dylogor",
      href: "https://github.com/hp77-creator/dylogor",
      desc: "a CLI tool to ingest logs and view them" 
    }
  ];
</script>


<p
  class="layout-md text-black text-xl leading-tight font-light mb-16"
  id="eric-is"
>
  <span class="g">is a</span> Software Engineer<span class="g">, and an</span><br />
  Open Source Contributor<span class="g">.
</p>

<div class="layout-md text-lg space-y-14">
  <div class="space-y-5">
    <p>
      I currently work at <a class="link" href="https://www.piramalfinance.com/">Piramal Finance</a>, a retail digital loan provider.
    </p>

    <p>
      I hope to be remembered as a good person who was there for people in their times of need and was a lifelong <em> learner </em>.
    </p>

    <p>
      I like to learn more about <em> systems </em> and how computers work.
    </p>
  </div>

  <div class="leading-snug space-y-4">
    <p class="pb-2">Notable open-source work:</p>

    {#each featuredProjects as project}
      <a class="project-pair" href={project.href} target="_blank">
        <div class="text-black font-medium">
          {project.name}
          <ArrowUpRight size={18} class="inline text-neutral-400" />
        </div>
        <div>
          <p>{project.desc}</p>
          {#if project.aside}
            <aside>{project.aside}</aside>
          {/if}
        </div>
      </a>
    {/each}
  </div>

  <div class="space-y-5">
    <p>
     I have been a Google Summer of Code contributor at <a class="link" href="https://eunomia.dev/">eunomia-bpf</a>.
    </p>
    <p>
      I have done B.Tech from <a class="link" href="https://www.svnit.ac.in/">SVNIT </a>.
      I got interested in computers when I was goofing around with my cousins and they were talking about Bill Gates, Steve Jobs.
      I was learning about different things related to computers. Then in school I had a computer course where I learnt about <a class="link" href="https://qb64.com/"> QBasic </a>.
      I along with my friends started looking out on resources to create a snake game in QBasic. Then in high school, I started learning about 
      html, css and javascript. I came across <a class="link" href="https://www.freecodecamp.org/"> Freecodecamp</a> and their extensive curriculum on web development. I started learning about 
      it and with a Dell inspiron 15 3000 with 4th gen intel chip, I started surfing internet for how can I create stuff. I recall I had also started learning python from the
      official documentation. I have not been able to complete it and it makes no sense to complete it as it is a documentation not a learning journal. </p>

      <p> I came across Google Code-in and I learnt about open source contribution. That began my journey of open source contribution and curiosity to explore 
      more on the emerging technologies of the world. I learnt <a class="link" href="https://www.amazon.in/Computer-Science-Class-12-Examination/dp/8177000241">C++</a> in my 11-12th grade and then in college, I started learning about Machine learning.
      I created couple of projects in ML with a technical club of my college. </p>
      <p>After graduating from college, I started exploring more on systems and how 
      Operating systems, languages and compilers work. I came across Operating Systems: Three Easy Pieces(It is free to read <a class="link" href="https://pages.cs.wisc.edu/~remzi/OSTEP/">here</a>) book and read it cover to cover. I loved every bit of it.
      I started attending meetups in my city, heard about eBPF and that <a class="link" href="https://speakerdeck.com/madhavjivrajani/can-we-use-ebpf-to-debug-performance-of-the-go-scheduler">eBPF talk</a> by Madhav Jivrajani and Raghav remained ingrained in my mind. 
      Then there came a documentary on youtube about <a class="link" href="https://youtu.be/Wb_vD3XZYOA?si=taGvQCXNvSsoVGk0"> eBPF </a> I watched it and I was amazed to learn of its beginnings. So when GSoC'24 came,
      I looked for projects on eBPF and I found <a class="link" href="https://eunomia.dev/">eunomia-bpf</a>. I was amazed to see that they had created a 
      userpace runtime for eBPF which is by nature a kernel space technology. I got into the project and I am still contributing to it. 
      These days, I am learning more on distributed systems, doing some projects on codecrafters.io and looking for an opportunity to work in a more system oriented role.
    </p>

    <p>Other interests: math, reading, football, cricket and basketball.</p>
  </div>
</div>

<style lang="postcss">
  .g {
    @apply text-neutral-400;
  }

  em {
    @apply font-serif text-[110%] leading-[100%];
  }

  .project-pair {
    @apply grid sm:grid-cols-[1fr,2fr] gap-y-1 -mx-3 px-3 py-2 hover:bg-neutral-100 transition-colors;
  }

  aside {
    @apply mt-0.5 text-base text-neutral-500;
  }

  /* Correction for vertical navigation links on mobile. */
  @media (max-width: 420px) {
    #eric-is {
      @apply -mt-10;
    }
  }
</style>
