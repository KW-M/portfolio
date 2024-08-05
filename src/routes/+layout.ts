export const ssr = true;
export const csr = true;
export const prerender = true;

// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot)
    import.meta.hot.accept(() => {
        if (import.meta.hot) import.meta.hot.invalidate()
    })

export const load = ({ url }) => {
    const currentRoute = url.pathname;
    return {
        currentRoute
    };
};
