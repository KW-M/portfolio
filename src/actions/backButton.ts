// https://github.com/sveltejs/kit/discussions/10335
import type { Action } from 'svelte/action';
import { base } from '$app/paths';

let currentRoute = '';
let lastRoute = '';
const home = base + '/'


const updateRoute = (newRoute: string) => {
    if (newRoute !== currentRoute) {
        lastRoute = currentRoute;
        currentRoute = newRoute;
        return true;
    } else return false;
}


export const backBtn: Action<HTMLAnchorElement, { currentRoute: string }> = (element) => {
    const setLink = () => {
        updateRoute(document.location.pathname);
        element.href = lastRoute || home;
    }
    setLink();
    return {
        update() {
            console.log("update");
            setLink();
        }
    }
};

export const backHomeBtn: Action<HTMLAnchorElement, { currentRoute: string }> = (element, { currentRoute }) => {
    const setLink = (currentRoute: string) => {
        updateRoute(currentRoute);
        if (currentRoute == home) {
            element.href = lastRoute || home;
        } else {
            element.href = home;
        }
    }
    setLink(currentRoute);
    return {
        update({ currentRoute }) {
            console.log("path update", currentRoute);
            setLink(currentRoute);
        }
    }
};

// export const backHomeBtn: Action = (element) => {
//     const setLink = () => {
//         if (document.location.pathname != '/') {
//             element.href = '/';
//         } else if (document.referrer) {
//             element.href = document.referrer;
//         } else {
//             element.href = '/';
//         }
//     };
//     window.navigation.addEventListener("navigate", setLink);
//     setLink();
//     return {
//         destroy() {
//             window.navigation.removeEventListener("navigate", setLink);
//         },
//         update() {
//             console.log("update");
//             setLink();
//         }
//     }
// };
