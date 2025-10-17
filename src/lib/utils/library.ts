export interface LibraryItem {
  slug: string;
  title: string;
  type: 'paper' | 'book' | 'link';
  status?: 'reading' | 'completed';
  authors?: string;
  year?: string;
  url?: string;
  description: string;
  content: string;
  visible: boolean;
  tags?: string[];
}

export async function getAllItems(): Promise<LibraryItem[]> {
  const items: LibraryItem[] = [];
  
  // Import all markdown files from the content/library directory
  const files = import.meta.glob('/src/content/library/*.md', { as: 'raw', eager: true });
  
  for (const path in files) {
    try {
      const content = files[path] as string;
      if (!content || content.trim() === '') {
        console.warn(`Empty library item file found: ${path}`);
        continue;
      }

      const slug = path.split('/').pop()?.replace('.md', '');
      
      if (slug) {
        const item = parseMarkdownItem(content, slug);
        if (item) {
          items.push(item);
        }
      }
    } catch (error) {
      console.error(`Error processing library item ${path}:`, error);
      continue;
    }
  }
  
  // Sort items: currently reading first, then by year (newest first)
  return items.sort((a, b) => {
    // Currently reading items come first
    if (a.status === 'reading' && b.status !== 'reading') return -1;
    if (b.status === 'reading' && a.status !== 'reading') return 1;
    
    // Then sort by year
    const yearA = a.year ? parseInt(a.year) : 0;
    const yearB = b.year ? parseInt(b.year) : 0;
    return yearB - yearA;
  });
}

export async function getVisibleItems(): Promise<LibraryItem[]> {
  const items = await getAllItems();
  return items.filter(item => item.visible !== false);
}

export async function getItem(slug: string): Promise<LibraryItem | null> {
  try {
    const files = import.meta.glob('/src/content/library/*.md', { as: 'raw', eager: true });
    const filePath = `/src/content/library/${slug}.md`;
    
    if (filePath in files) {
      const content = files[filePath] as string;
      if (!content || content.trim() === '') {
        console.warn(`Empty library item file found: ${filePath}`);
        return null;
      }
      return parseMarkdownItem(content, slug);
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading library item ${slug}:`, error);
    return null;
  }
}

function parseMarkdownItem(content: string, slug: string): LibraryItem | null {
  try {
    const parts = content.split('---\n');
    
    if (parts.length < 3) {
      console.warn(`Invalid frontmatter format in library item: ${slug}`);
      return null;
    }

    const frontmatter = parts[1];
    if (!frontmatter) {
      console.warn(`Missing frontmatter in library item: ${slug}`);
      return null;
    }

    const metadata = parseFrontmatter(frontmatter);
    
    const title = metadata.title as string;
    const type = metadata.type as 'paper' | 'book' | 'link';
    if (!title || !type) {
      console.warn(`Missing required frontmatter fields in library item: ${slug}`);
      return null;
    }

    const visibleStr = metadata.visible as string;
    const visible = visibleStr ? visibleStr.toLowerCase() === 'true' : true;

    return {
      slug,
      title,
      type,
      status: metadata.status as 'reading' | 'completed' | undefined,
      authors: metadata.authors as string | undefined,
      year: metadata.year as string | undefined,
      url: metadata.url as string | undefined,
      description: (metadata.description as string) || '',
      content: parts.slice(2).join('---\n'),
      visible,
      tags: metadata.tags as string[] | undefined
    };
  } catch (error) {
    console.error(`Error parsing library item ${slug}:`, error);
    return null;
  }
}

function parseFrontmatter(frontmatter: string): Record<string, string | string[]> {
  const metadata: Record<string, string | string[]> = {};
  
  try {
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const trimmedKey = key.trim();
        const trimmedValue = valueParts.join(':').trim();
        if (trimmedKey && trimmedValue) {
          if (trimmedKey === 'tags') {
            metadata[trimmedKey] = trimmedValue.split(',').map(tag => tag.trim());
          } else {
            metadata[trimmedKey] = trimmedValue;
          }
        }
      }
    });
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
  }
  
  return metadata;
}
