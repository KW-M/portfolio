import { slidy, type Options, type SlidyInstance } from '@slidy/core';
interface SlidyOptions extends Options {
    enabled: boolean;
    forceUpdate: number | null | boolean;
}

export function slidyAction(root: HTMLElement, options: SlidyOptions) {
    let s: SlidyInstance | null = null;
    let initilized = false;
    init(options);

    function setTransforms(slideElems: HTMLCollection) {
        for (let i = 0; i < slideElems.length; i++) {
            const bbox = slideElems[i].getBoundingClientRect();
            console.log("bbox", bbox);
            slideElems[i].style.position = 'absolute';
            slideElems[i].style.left = `${bbox.left}px`;
            slideElems[i].classList.remove('slidy-slide');
        }
    }


    function init(options: SlidyOptions) {
        console.log("indit", root, root.children);
        // setTransforms(root.children);
        // options.position = lastSlideDist;
        // options.index = lastIndex - 2;
        s = slidy(root, options);
        initilized = true;
    }

    function deint() {
        if (s) s.destroy();
        initilized = false;
    }

    let forceUpdate = options.forceUpdate;
    return {
        update: (options: SlidyOptions) => {
            // if (!initilized && options.enabled) init(options);
            // else if (initilized && !options.enabled) deint();
            // else if (initilized && forceUpdate !== options.forceUpdate) {
            //     // s?.update(options);
            //     s?.to(options.index as number);
            //     forceUpdate = options.forceUpdate;
            // } else if (initilized) s?.to(options.index as number);
        },
        destroy: () => {
            deint();
        }
    }
}
