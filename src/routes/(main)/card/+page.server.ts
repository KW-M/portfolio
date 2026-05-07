export const load = async ({ parent }) => {
    const { categories } = await parent();
    return { categories };
};

export const prerender = true;
