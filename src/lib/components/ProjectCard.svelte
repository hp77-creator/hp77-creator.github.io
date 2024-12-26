<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '$lib/data/projects';
  import { parseGitHubUrl } from '$lib/data/projects';

  export let project: Project;
  
  let repoIcon: string | null = null;
  let loading = true;

  async function fetchGitHubIcon() {
    if (project.icon) {
      repoIcon = project.icon;
      loading = false;
      return;
    }

    if (project.links.github) {
      const githubInfo = parseGitHubUrl(project.links.github);
      if (githubInfo) {
        try {
          const response = await fetch(`https://api.github.com/repos/${githubInfo.owner}/${githubInfo.repo}`);
          if (response.ok) {
            const data = await response.json();
            // Use organization/owner avatar as fallback icon
            repoIcon = data.organization?.avatar_url || data.owner?.avatar_url;
          }
        } catch (error) {
          console.error('Error fetching GitHub data:', error);
        }
      }
    }
    loading = false;
  }

  onMount(() => {
    fetchGitHubIcon();
  });
</script>

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <div class="flex items-start gap-4 mb-6">
    {#if loading}
      <div class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    {:else if repoIcon}
      <img src={repoIcon} alt="Project Icon" class="w-16 h-16 rounded-lg object-cover"/>
    {:else}
      <div class="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <span class="text-blue-600 dark:text-blue-300 text-2xl font-bold">
          {project.title[0].toUpperCase()}
        </span>
      </div>
    {/if}
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {project.title}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {project.description}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        {#each project.technologies as tech}
          <span class="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
            {tech}
          </span>
        {/each}
      </div>
    </div>
  </div>

  {#if project.image}
    <img src={project.image} alt={project.title} class="w-full h-48 object-cover rounded-lg mb-4"/>
  {/if}

  <div class="flex gap-3 mt-4">
    {#if project.links.github}
      <a
        href={project.links.github}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
    {/if}
    {#if project.links.demo}
      <a
        href={project.links.demo}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Live Demo
      </a>
    {/if}
    {#if project.links.playstore}
      <a
        href={project.links.playstore}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.799-3.8l-2.878 1.675-2.808 2.808L3.827 1.699 14.688 8.01l3.61-2.096a1 1 0 011.41.41 1 1 0 01-.41 1.583zm-.3 11.886l-3.908-3.908 2.808-2.808 2.878 1.675a1 1 0 01.41 1.583 1 1 0 01-1.41.41l.022.048z"/>
        </svg>
        Play Store
      </a>
    {/if}
  </div>
</div>
