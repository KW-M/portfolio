import type { ComponentType, SvelteComponent } from 'svelte';
import { render } from 'svelte/server';

import path from 'path';

export const fetchPageExports = async (route: string) => {
    const tsPath = path.join("/src/routes/", route, "+page.server.ts");
    return await import(tsPath);
};

export const fetchMarkdownMetadata = async (path: string) => {
    const allPostFiles = await fetchMarkdownProjects();
    const post = allPostFiles.find((post) => post.path === path);
    return {
        meta: post ? post.meta : null,
    };
};

export const fetchMarkdownProjects = async () => {
    const allPostFiles = import.meta.glob('/src/routes/project/*/*.svx');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allProjects = await Promise.all(
        iterablePostFiles.map(async ([path, loadContents]) => {
            const content = await loadContents() as { metadata: { [key: string]: string | number | boolean | string[] }, default: ComponentType<SvelteComponent<any, any, any>> };
            const postPath = path.slice(11, -10);
            let mediaSlides = [];
            const rendered = render(content.default, {
                props: {
                    mediaSlides
                }
            })
            return {
                meta: content.metadata,
                content: rendered.body,
                head: rendered.head,
                mediaSlides,
                path: postPath,
                filePath: path
            };
        })
    );

    return allProjects;
};

export const fetchProjectCategories = async () => {
    const allPosts = await fetchMarkdownProjects();
    const sortedCategories = allPosts.map((post) => post.meta.categories).flat(1).sort();
    const categoryCounts = sortedCategories.reduce((acc: { [key: string]: number }, category: string) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
    const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map((c) => c[0]);
    //     const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map((c) => c[0] + " (" + c[1] + ")");
    return categories;
}
