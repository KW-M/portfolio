import { fetchProjects as fetchProjects, fetchPageExports, fetchProjectCategories } from '$lib/server/index.js';
import type { project } from "$lib/server/index.ts"
import { projectFromPath, urlPathify } from '$lib/util';

function getPreviewContent(post: project) {
    const splitpoint = post.content.indexOf('<hr>');
    if (splitpoint == -1) return { ...post, hasMore: false };
    else return { ...post, content: post.content.substring(0, splitpoint), hasMore: true };
}

export const load = async ({ parent }) => {
    const allProjects = await fetchProjects();
    const includedProjects = [
        "Geothermal", "ISMS", "BathymetryGIS", "EcoHus", "ROV-Web", "RoBoats"
    ]
    const filteredPosts = includedProjects.map((name) => allProjects.find((p) => (projectFromPath(p.path) == urlPathify(name)))).filter((a) => (a != undefined))
    const posts = await Promise.all(filteredPosts.map(getPreviewContent).map(async (post) => {
        const pageExports = await fetchPageExports(post.path)
        post.carousel = pageExports._mediaSlides || [];
        return post;
    }));
    return {
        categoryIndex: 100,
        category: "geo",
        posts
    };
};
