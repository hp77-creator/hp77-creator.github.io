import { getAllPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const entries = async () => {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  return {
    slug: params.slug
  };
};
