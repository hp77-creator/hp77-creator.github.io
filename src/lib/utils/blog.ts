export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Import all markdown files from the content/blogs directory
  const files = import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: true });
  
  for (const path in files) {
    const content = files[path] as string;
    const slug = path.split('/').pop()?.replace('.md', '');
    
    if (slug) {
      const post = parseMarkdownPost(content, slug);
      posts.push(post);
    }
  }
  
  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const files = import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: true });
    const filePath = `/src/content/blogs/${slug}.md`;
    
    if (filePath in files) {
      const content = files[filePath] as string;
      return parseMarkdownPost(content, slug);
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

function parseMarkdownPost(content: string, slug: string): BlogPost {
  const [frontmatter, ...contentParts] = content.split('---\n').filter(Boolean);
  const metadata = parseFrontmatter(frontmatter);
  
  return {
    slug,
    title: metadata.title || 'Untitled',
    date: metadata.date || new Date().toISOString().split('T')[0],
    description: metadata.description || '',
    content: contentParts.join('---\n')
  };
}

function parseFrontmatter(frontmatter: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return metadata;
}
