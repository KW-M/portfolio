export const ssr = false;
export const prerender = false;


// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot)
    import.meta.hot.accept(() => import.meta.hot.invalidate())
