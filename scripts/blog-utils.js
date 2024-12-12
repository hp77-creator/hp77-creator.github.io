import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getAllPosts() {
  const posts = [];
  const contentDir = path.join(process.cwd(), 'src', 'content', 'blogs');
  
  try {
    const files = await fs.readdir(contentDir);
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        try {
          const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
          if (!content || content.trim() === '') {
            console.warn(`Empty blog post file found: ${file}`);
            continue;
          }

          const slug = file.replace('.md', '');
          const post = parseMarkdownPost(content, slug);
          if (post) {
            posts.push(post);
          }
        } catch (error) {
          console.error(`Error processing blog post ${file}:`, error);
          continue;
        }
      }
    }
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
  
  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function parseMarkdownPost(content, slug) {
  try {
    // Find the frontmatter section
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!match || !match[1]) {
      console.warn(`Invalid frontmatter format in post: ${slug}`);
      return null;
    }

    const frontmatter = match[1];
    const metadata = parseFrontmatter(frontmatter);
    
    // Validate required fields
    if (!metadata.title || !metadata.date) {
      console.warn(`Missing required frontmatter fields in post: ${slug}`);
      return null;
    }

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      description: metadata.description || ''
    };
  } catch (error) {
    console.error(`Error parsing blog post ${slug}:`, error);
    return null;
  }
}

function parseFrontmatter(frontmatter) {
  const metadata = {};
  
  try {
    const lines = frontmatter.split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const trimmedKey = key.trim();
        const trimmedValue = valueParts.join(':').trim();
        if (trimmedKey && trimmedValue) {
          metadata[trimmedKey] = trimmedValue;
        }
      }
    }
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
  }
  
  return metadata;
}
