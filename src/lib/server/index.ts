import type { Component } from 'svelte';
import { render } from 'svelte/server';

type svelteRenderedComponent = Component

interface projectMetadata {
    title: string;
    categories: string[];
    links?: { [key: string]: string };
    date?: string;
    dateUpdated?: string;
}

export const fetchPageExports = async (route: string) => {
    const routeParts = route.split("/").filter((r) => r.length != 0)
    const projectName = routeParts[routeParts.length - 1]
    return await import(`../../routes/(main)/project/${projectName}/+page.server.ts`);
};

export const fetchMarkdownMetadata = async (path: string) => {
    const allPostFiles = await fetchMarkdownProjects();

    console.log(allPostFiles.map((k) => k.path.toLowerCase()), path.toLowerCase());
    const post = allPostFiles.find((post) => post.path.toLowerCase() === path.toLowerCase());
    return {
        meta: post ? post.meta : null,
    };
};

export const fetchMarkdownProjects = async () => {
    const allPostFiles = import.meta.glob('/src/routes/\\(main\\)/project/*/*.svx');
    const iterablePostFiles = Object.entries(allPostFiles);
    const allProjects = await Promise.all(
        iterablePostFiles.map(async ([path, loadContents]) => {
            const content = await loadContents() as { metadata: projectMetadata, default: svelteRenderedComponent };
            const postPath = path.slice(18, -10);

            const rendered = render(content.default)
            return {
                meta: content.metadata,
                content: rendered.body,
                head: rendered.head,
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
    const categoryCounts = sortedCategories.reduce((acc, category: string) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });
    const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map((c) => c[0]);
    //     const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map((c) => c[0] + " (" + c[1] + ")");
    return categories;
}
