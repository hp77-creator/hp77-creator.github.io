<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/data/projects';
</script>

<svelte:head>
  <title>Projects | Himanshu Pandey</title>
  <meta name="description" content="Projects and work by Himanshu Pandey" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</div>
