import { fetchMarkdownMetadata, fetchPageExports } from '$lib/server/index.js';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ route }) => {
    const urlPath = route.id.substring(7);
    const project = await fetchMarkdownMetadata(urlPath);
    const pageExports = await fetchPageExports(route.id);
    return { meta: project.meta, mediaSlides: pageExports._mediaSlides || [] };
};

export const prerender = true;
