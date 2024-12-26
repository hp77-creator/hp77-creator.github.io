export interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    playstore?: string;
    demo?: string;
  };
  technologies: string[];
  image?: string;
  icon?: string; // Custom icon URL if provided
}

// Function to extract owner and repo from GitHub URL
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  } catch (e) {
    console.error('Error parsing GitHub URL:', e);
  }
  return null;
}

export const projects: Project[] = [
  {
    title: "LinkStash",
    description: "An android application which can store links for blogs, jobs, and video, create reminders for those, let's you sync those links to Github and post on Hackernews",
    links: {
      github: "https://github.com/hp77-creator/linkstash",
      demo: "https://play.google.com/store/apps/details?id=com.example.app"
    },
    technologies: ["Kotlin", "Android"],
    icon: "https://github.com/hp77-creator/linkstash/raw/main/.github/assets/app_icon.png" // Optional: custom icon URL
  },
  {
    title: "Rockstar-clipboard Manager",
    description: "MacOS application to store your clippings be it images, text, or anything, also sync with Obsidian, get notification on copy.",
    links: {
      github: "https://github.com/workhunters/clipboard-core",
      demo: "https://www.producthunt.com/posts/rockstar-clipboard-manager"
    },
    technologies: ["MacOS", "Swift", "Go"],
    icon: "https://github.com/workhunters/clipboard-core/blob/main/ClipboardManager/ClipboardManager/Assets.xcassets/AppIcon.appiconset/icon_128@2x.png?raw=true" // Optional: custom icon URL
  },
  {
    title: "Modern Jenkins Notifier",
    description: "A chrome extension which helps you notify once your jenkins job is complete",
    links: {
      github: "https://github.com/hp77-creator/modern-jenkins-notifier",
      demo: "https://chromewebstore.google.com/detail/modern-jenkins-notifier/kdhhfphgmjdgkpbammmlnlbfalmpphcd?authuser=1&hl=en&pli=1"
    },
    technologies: ["JavaScript", "Chrome APIs"],
    icon: "https://lh3.googleusercontent.com/zA8viFaA6pHB0vCAV0CmPo4mfXFt0QppAjHeAGKCl5-56MV3BRw5bwMQ-AqeS_W1hcUNiLqwJtttEz26kleBsTOR=s120"

  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with SvelteKit and TailwindCSS, featuring blog posts, projects showcase, and resume.",
    links: {
      github: "https://github.com/hp77-creator.github.io",
      demo: "https://hp77-creator.github.io"
    },
    technologies: ["SvelteKit", "TypeScript", "TailwindCSS", "GitHub Pages"],
  },
  {
    title: "bpftime",
    description: "A userspace runtime for eBPF, enabling eBPF programs to run in userspace with high performance.",
    links: {
      github: "https://github.com/eunomia-bpf/bpftime",
      demo: "https://eunomia.dev/bpftime/"
    },
    technologies: ["eBPF", "C++", "LLVM", "Linux"],
  },
  {
    title: "dylogor",
    description: "A CLI tool for ingesting and viewing logs efficiently, making log analysis more streamlined.",
    links: {
      github: "https://github.com/hp77-creator/dylogor"
    },
    technologies: ["Go", "CLI", "Log Analysis"],
  }
];
