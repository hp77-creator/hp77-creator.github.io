import { getAllItems } from '$lib/utils/library';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const entries = async () => {
  const items = await getAllItems();
  return items.map(item => ({ slug: item.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  return {
    slug: params.slug
  };
};
