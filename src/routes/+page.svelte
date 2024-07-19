<script lang="ts">
  import { ArrowUpRight } from "lucide-svelte";

  import Seo from "$lib/components/Seo.svelte";

  const featuredProjects = [
    {
      name: "bpftime",
      href: "/projects",
      desc: "a userspace runtime for ebpf",
    },
    {
      name: "dylogor",
      href: "/projects",
      desc: "a CLI tool to ingest logs and view them" 
    }
  ];
</script>

<Seo
  title="Himanshu Pandey"
  description="Software engineer, Open Source Contributor"
/>

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
      <a class="project-pair" href={project.href}>
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
      I 
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
