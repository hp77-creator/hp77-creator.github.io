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
     I have been a Google Summer of Code contributor at <a class="link hover-effect" href="https://eunomia.dev/">eunomia-bpf</a>.
    </p>
    <p>
      I have done B.Tech from <a class="link hover-effect" href="https://www.svnit.ac.in/">SVNIT</a>.
      I got interested in computers when I was goofing around with my cousins and they were talking about Bill Gates, Steve Jobs.
      I was learning about different things related to computers. Then in school I had a computer course where I learnt about <a class="link hover-effect" href="https://qb64.com/">QBasic</a>.
    </p>

    <p>
      I along with my friends started looking out on resources to create a snake game in QBasic. Then in high school, I started learning about 
      html, css and javascript. I came across <a class="link hover-effect" href="https://www.freecodecamp.org/">Freecodecamp</a> and their extensive curriculum on web development.
    </p>

    <p>
      I started surfing internet for how can I create stuff. I recall I had also started learning python from the
      official documentation. I have not been able to complete it and it makes no sense to complete it as it is a documentation not a learning journal.
    </p>

    <p> 
      I came across Google Code-in and I learnt about open source contribution. That began my journey of open source contribution and curiosity to explore 
      more on the emerging technologies of the world. I learnt <a class="link hover-effect" href="https://www.amazon.in/Computer-Science-Class-12-Examination/dp/8177000241">C++</a> in my 11-12th grade and then in college, I started learning about Machine learning.
      I created couple of projects in ML with a technical club of my college.
    </p>

    <p>
      After graduating from college, I started exploring more on systems and how 
      Operating systems, languages and compilers work. I came across Operating Systems: Three Easy Pieces (It is free to read <a class="link hover-effect" href="https://pages.cs.wisc.edu/~remzi/OSTEP/">here</a>) book and read it cover to cover. I loved every bit of it.
    </p>

    <p>
      I started attending meetups in my city, heard about eBPF and that <a class="link hover-effect" href="https://speakerdeck.com/madhavjivrajani/can-we-use-ebpf-to-debug-performance-of-the-go-scheduler">eBPF talk</a> by Madhav Jivrajani and Raghav remained ingrained in my mind. 
      Then there came a documentary on youtube about <a class="link hover-effect" href="https://youtu.be/Wb_vD3XZYOA?si=taGvQCXNvSsoVGk0">eBPF</a> I watched it and I was amazed to learn of its beginnings.
    </p>

    <p>
      So when GSoC'24 came, I looked for projects on eBPF and I found <a class="link hover-effect" href="https://eunomia.dev/">eunomia-bpf</a>. I was amazed to see that they had created a 
      userspace runtime for eBPF which is by nature a kernel space technology. I got into the project and I am still contributing to it. 
      These days, I am learning more on distributed systems, doing some projects on codecrafters.io and looking for an opportunity to work in a more system oriented role.
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
