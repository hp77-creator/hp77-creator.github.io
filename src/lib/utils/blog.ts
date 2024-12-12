export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  visible: boolean;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Import all markdown files from the content/blogs directory
  const files = import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: true });
  
  for (const path in files) {
    try {
      const content = files[path] as string;
      if (!content || content.trim() === '') {
        console.warn(`Empty blog post file found: ${path}`);
        continue;
      }

      const slug = path.split('/').pop()?.replace('.md', '');
      
      if (slug) {
        const post = parseMarkdownPost(content, slug);
        if (post) {
          posts.push(post);
        }
      }
    } catch (error) {
      console.error(`Error processing blog post ${path}:`, error);
      // Continue processing other posts even if one fails
      continue;
    }
  }
  
  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getVisiblePosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.visible !== false); // If visible is undefined, treat as true
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const files = import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: true });
    const filePath = `/src/content/blogs/${slug}.md`;
    
    if (filePath in files) {
      const content = files[filePath] as string;
      if (!content || content.trim() === '') {
        console.warn(`Empty blog post file found: ${filePath}`);
        return null;
      }
      return parseMarkdownPost(content, slug);
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

function parseMarkdownPost(content: string, slug: string): BlogPost | null {
  try {
    const parts = content.split('---\n');
    
    // Validate proper frontmatter format
    if (parts.length < 3) {
      console.warn(`Invalid frontmatter format in post: ${slug}`);
      return null;
    }

    const frontmatter = parts[1]; // Skip the first empty part before ---
    if (!frontmatter) {
      console.warn(`Missing frontmatter in post: ${slug}`);
      return null;
    }

    const metadata = parseFrontmatter(frontmatter);
    
    // Validate required fields
    if (!metadata.title || !metadata.date) {
      console.warn(`Missing required frontmatter fields in post: ${slug}`);
      return null;
    }

    // Parse visible field as boolean, default to true if not specified
    const visible = metadata.visible ? metadata.visible.toLowerCase() === 'true' : true;

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      description: metadata.description || '',
      content: parts.slice(2).join('---\n'), // Join the rest of the content
      visible
    };
  } catch (error) {
    console.error(`Error parsing blog post ${slug}:`, error);
    return null;
  }
}

function parseFrontmatter(frontmatter: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  
  try {
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const trimmedKey = key.trim();
        const trimmedValue = valueParts.join(':').trim();
        if (trimmedKey && trimmedValue) {
          metadata[trimmedKey] = trimmedValue;
        }
      }
    });
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
  }
  
  return metadata;
}
