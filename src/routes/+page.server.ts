import { fetchProjectCategories } from '$lib/server/index.js';

export const load = async () => {
    const categories = await fetchProjectCategories();
    return { categories };
};

export const prerender = true;
