<script lang="ts">
  import { ArrowUpRight } from "lucide-svelte";
  import { onMount } from "svelte";
  import { projects } from "$lib/data/projects";

  // Get top 3 projects for featured section
  const featuredProjects = projects
    .slice(0, 3)
    .map(project => ({
      name: project.title,
      href: project.links.github || project.links.demo || project.links.playstore || '#',
      desc: project.description
    }));

  let typedText = "";
  let phrases = ["Software Engineer", "Open Source Contributor", "Systems Enthusiast"];
  let currentPhraseIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseDelay = 1500;

  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting && typedText === currentPhrase) {
      isDeleting = true;
      setTimeout(typeText, pauseDelay);
      return;
    }
    
    if (isDeleting && typedText === "") {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(typeText, typingSpeed);
      return;
    }
    
    const delta = isDeleting ? -1 : 1;
    typedText = currentPhrase.substring(0, typedText.length + delta);
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
  }

  onMount(() => {
    typeText();
  });
</script>

<div class="layout-md text-black text-xl leading-tight font-light mb-16 animate-fade-in">
  <p class="typing-text" id="eric-is">
    <span class="g">I am a</span> {typedText}<span class="cursor">|</span>
  </p>
</div>

<div class="layout-md text-lg space-y-14">
  <div class="space-y-5 animate-slide-up">
    <p>
      I currently work at <a class="link hover-effect" href="https://www.piramalfinance.com/">Piramal Finance</a>, a retail digital loan provider.
    </p>

    <p>
      I hope to be remembered as a good person who was there for people in their times of need and was a lifelong <em class="highlight"> learner </em>.
    </p>

    <p>
      I like to learn more about <em class="highlight"> systems </em> and how computers work.
    </p>
  </div>

  <div class="leading-snug space-y-4 project-section">
    <p class="pb-2 section-title">Notable open-source work:</p>

    {#each featuredProjects as project}
      <a class="project-pair" href={project.href} target="_blank">
        <div class="text-black font-medium project-name">
          {project.name}
          <ArrowUpRight size={18} class="inline text-neutral-400 arrow-icon" />
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

  <div class="space-y-5 journey-section">
    <p>
     I have been a Google Summer of Code contributor at <a class="link hover-effect" href="https://mariadb.org/">MariaDB</a > and <a class="link hover-effect" href="https://eunomia.dev/">eunomia-bpf</a>.
    </p>
    <p>
      I graduated with a B.Tech from <a class="link hover-effect" href="https://www.svnit.ac.in/">SVNIT</a>. My journey started with web development at <a class="link hover-effect" href="https://www.freecodecamp.org/">FreeCodeCamp</a>, 
      leading to machine learning projects in college. A pivotal moment was discovering Operating Systems: Three Easy Pieces (<a class="link hover-effect" href="https://pages.cs.wisc.edu/~remzi/OSTEP/">OSTEP</a>), 
      which sparked my deep interest in systems programming.
    </p>

    <p>
      An inspiring <a class="link hover-effect" href="https://speakerdeck.com/madhavjivrajani/can-we-use-ebpf-to-debug-performance-of-the-go-scheduler">eBPF talk</a> and this fascinating <a class="link hover-effect" href="https://youtu.be/Wb_vD3XZYOA?si=taGvQCXNvSsoVGk0">documentary</a> 
      led me to contribute to <a class="link hover-effect" href="https://eunomia.dev/">eunomia-bpf</a> for GSoC'24, where I work on their innovative userspace eBPF runtime.
    </p>

    <p>
      Currently, I'm deepening my knowledge of distributed systems, working on system design challenges at codecrafters.io, and seeking opportunities in systems engineering roles.
    </p>

    <p class="interests">Other interests: math, reading, football, cricket and basketball.</p>
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
    @apply grid sm:grid-cols-[1fr,2fr] gap-y-1 -mx-3 px-3 py-2 hover:bg-neutral-100 transition-colors rounded-lg;
  }

  aside {
    @apply mt-0.5 text-base text-neutral-500;
  }

  .highlight {
    @apply text-blue-600 font-semibold;
  }

  .hover-effect {
    @apply relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 
           after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100;
  }

  .cursor {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }

  .project-name {
    @apply relative;
  }

  .arrow-icon {
    @apply transform transition-transform duration-200;
  }

  .project-pair:hover .arrow-icon {
    @apply translate-x-1 -translate-y-1;
  }

  .section-title {
    @apply text-xl font-semibold text-blue-600;
  }

  .interests {
    @apply text-neutral-600 italic;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 1s ease-out;
  }

  /* Correction for vertical navigation links on mobile. */
  @media (max-width: 420px) {
    #eric-is {
      @apply -mt-10;
    }
  }
</style>
