
import { fetchMarkdownProjects, fetchPageExports, fetchProjectCategories } from '$lib/server/index.js';
function getPreviewContent(post) {
    const splitpont = post.content.indexOf('<hr>');
    if (splitpont == -1) return { ...post, hasMore: false };
    else return { ...post, content: post.content.substring(0, splitpont), hasMore: true };
}

export const load = async ({ params, parent }) => {
    const { category } = params;
    const { categories } = await parent();
    const allPosts = await fetchMarkdownProjects();
    const filteredPosts = category.toLowerCase() === "all" ? allPosts : allPosts.filter((post) => post.meta.categories.includes(category)).sort((a, b) => {
        const dateA = a.meta.dateUpdated || a.meta.date || "1970-01-01";
        const dateB = b.meta.dateUpdated || b.meta.date || "1970-01-01";
        return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
    const posts = await Promise.all(filteredPosts.map(getPreviewContent).map(async (post) => {
        const pageExports = await fetchPageExports(post.path)
        post.carousel = pageExports._mediaSlides || [];
        return post;
    }));
    const categoryIndex = categories.indexOf(category) || 0;
    return {
        categoryIndex,
        category,
        posts
    };
};

export const entries = async () => {
    const categories = (await fetchProjectCategories()) as string[];
    return categories.map((category) => ({ category }));
}





// type CarouselImageItem = {
//     img: null;
//     src: string;
//     alt?: string;
// }

// type CarouselVideoItem = {
//     vid: null;
//     formats: { src: string, type: string }[];
//     title?: string;
// }
// async function getCarouselStructure(metadata: { carousel: (CarouselImageItem | CarouselVideoItem)[] }, sourcePageFilePath: string) {
//     sourcePageFilePath = path.dirname(sourcePageFilePath);
//     if (!metadata.carousel) return [];

//     return (await Promise.allSettled(metadata.carousel.map(async (carouselItem) => {

//         if ('img' in carouselItem && carouselItem.img != null) {
//             const src = path.join(sourcePageFilePath, carouselItem.img) + "?lqip";
//             const lqip_img = await import(/* @vite-ignore */ src)
//             return {
//                 type: 'img',
//                 alt: carouselItem.alt || "",
//                 ...lqip_img.default
//             };
//         } else if ('vid' in carouselItem && carouselItem.vid != null) {
//             const folder = path.join(sourcePageFilePath, carouselItem.vid);
//             const src = path.join(folder, "cover.jpg") + "?lqip";
//             const lqip_img = await import(/* @vite-ignore */ src)
//             console.log("carouselItemlqip_img", lqip_img);
//             await Promise.all(carouselItem.formats.map(async (format) => {
//                 const src = path.join(folder, format.src);
//                 format.src = (await import(/* @vite-ignore */ src + "?url")).default;
//                 console.log("format.src", format.src);
//             }))
//             return {
//                 type: 'video',
//                 ...lqip_img.default,
//                 ...carouselItem
//             };
//         }
//         throw new Error("carousel Type Not implemented" + JSON.stringify(carouselItem));
//     }))).map((p) => p.status == "fulfilled" ? p.value : null) as carouselMediaInfo[];
// }
