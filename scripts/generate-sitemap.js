import { getAllPosts } from './blog-utils.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const website = 'https://hp77-creator.github.io';

async function generateSitemap() {
  const posts = await getAllPosts();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <!-- Home Page -->
      <url>
        <loc>${website}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      <!-- Resume Page -->
      <url>
        <loc>${website}/resume</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Blogs Index -->
      <url>
        <loc>${website}/blogs</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>

      <!-- Blog Posts -->
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${website}/blogs/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`.trim();

  // Ensure build directory exists
  await fs.mkdir('build', { recursive: true });
  await fs.writeFile(path.join('build', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
