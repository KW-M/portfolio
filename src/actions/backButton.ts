// https://github.com/sveltejs/kit/discussions/10335
import type { Action } from 'svelte/action';
import { base } from '$app/paths';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { historyStack } from '$lib/globals';

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

export const goBack = () => {
    const historyS = historyStack.get()
    if (historyS.length > 1) {
        // historyStack.update((history) => {
        //     history.pop();
        //     return history;
        // });
        // goto(history[history.length - 2]);
        history.back();
    } else {
        alert("No fromRoute, going home");
        goto(home);
    }
}


export const backBtn: Action<HTMLAnchorElement, null | string> = (element) => {
    const getDest = (historyS: string[]) => historyS.length > 1 ? historyS[historyS.length - 2] : home;
    const onClick = (e: MouseEvent) => {
        if (historyStack.get().length > 1) {
            history.back();
            e.preventDefault();
            return false;
        }
    }
    element.addEventListener('click', onClick);
    const unsub = historyStack.subscribe((historyS) => element.href = getDest(historyS));
    return { destroy: () => { unsub(); element.removeEventListener('click', onClick); } }
};

export const backHomeBtn: Action<HTMLAnchorElement, null> = (element) => {
    // const getDest = () => {
    //     const curr = location.pathname;
    //     if (curr === home) return document.referrer || home;
    //     else return home;
    // }
    // const unsub = historyStack.subscribe(() => element.href = getDest());
    // return { destroy: unsub }
    const getDest = (historyS: string[]) => {
        const curr = history.length >= 1 ? historyS[historyS.length - 1] : home;
        const dest = history.length >= 2 ? historyS[historyS.length - 2] : home;
        console.log({ curr, dest });
        return curr === home ? dest : home;
    }
    const onClick = (e: MouseEvent) => {
        const historyS = historyStack.get();
        if (getDest(historyS) !== home) {
            history.back();
            e.preventDefault();
            return false;
        }
    }
    element.addEventListener('click', onClick);
    const unsub = historyStack.subscribe((historyS) => element.href = getDest(historyS));
    return { destroy: () => { unsub(); element.removeEventListener('click', onClick); } }
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
