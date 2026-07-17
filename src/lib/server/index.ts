import { categoryIconMap } from '$lib/globals';
import { projectFromPath, urlPathify } from '$lib/util';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

type svelteRenderedComponent = Component

interface projectMetadata {
    title: string;
    highlight?: boolean;
    categories?: string[];
    tags?: string[]
    links?: { [key: string]: string };
    date?: string;
    dateUpdated?: string;
    coverImage?: string;
}

export interface project {
    meta: projectMetadata;
    content: string;
    head: string;
    path: string;
    filePath: string;
    carousel?: any[];
}

export const fetchPageExports = async (route: string) => {
    const projectName = projectFromPath(route)
    return await import(`$routes/project/${projectName}/+page.server.ts`);
};

export const fetchMarkdownMetadata = async (path: string) => {
    const allPostFiles = await fetchProjects();

    // console.log(allPostFiles.map((k) => k.path.toLowerCase()));
    const post = allPostFiles.find((post) => projectFromPath(post.path) === projectFromPath(path));
    return {
        meta: post ? post.meta : null,
    };
};

export const fetchProjects = async () => {
    const allPostFiles = import.meta.glob('/src/routes/project/*/*.svx');
    const iterablePostFiles = Object.entries(allPostFiles);
    const allProjects = await Promise.all(
        iterablePostFiles.map(async ([path, loadContents]) => {
            const content = await loadContents() as { metadata: projectMetadata, default: svelteRenderedComponent };

            const pPath = path.matchAll(/\/project\/(.+?)[\/]/g).next().value;
            const postPath = urlPathify(pPath ? "/project/" + pPath[1] : "");
            const rendered = render(content.default)
            return {
                meta: content.metadata,
                content: rendered.body,
                head: rendered.head,
                path: postPath,
                filePath: path
            } as project;
        })
    );

    return allProjects;
};

export const fetchProjectCategories = async () => {
    const allPosts = await fetchProjects();
    const sortedCategories = allPosts.map((post) => post.meta.categories || []).flat(1);
    const categoryCounts = sortedCategories.reduce((acc, category: string) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });
    const categories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])  // sort categories by number of posts in category decending
        .map((c) => c[0])
        .sort((a, b) => (categoryIconMap[a] ? -1 : 1) - (categoryIconMap[b] ? -1 : 1)); // sort so categories with icons go first
    return categories
}
