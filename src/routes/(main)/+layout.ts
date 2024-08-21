import { browser } from '$app/environment';

export const ssr = true;
export const csr = true;
export const prerender = true;

// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot)
    import.meta.hot.accept(() => {
        if (import.meta.hot) import.meta.hot.invalidate()
    })

export const load = ({ url }) => {
    if (browser) {
        document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
    }
    const currentRoute = url.pathname;
    return {
        currentRoute
    };
};
