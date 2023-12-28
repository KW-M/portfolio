import { slidy, type Options, type SlidyInstance } from '@slidy/core';
interface SlidyOptions extends Options {
    enabled: boolean;
}

export function slidyAction(root: HTMLElement, options: SlidyOptions) {
    let s: SlidyInstance | null = null;
    let initilized = false;

    // @ts-expect-error mount is a custom event
    root.addEventListener("mount", () => {
        if (initilized && s) s.to(options.index as number);
    }, 10);

    if (options.enabled) init(options);
    // else {
    //     // fake slidy positioning
    //     // setTimeout(() => {
    //     //     const children = root.childNodes;
    //     //     const indexItem = children[options.index as number - 1] as HTMLLIElement;
    //     //     const center = indexItem.offsetLeft + indexItem.offsetWidth / 2;
    //     //     const delta = center - root.offsetWidth / 2;
    //     //     console.log(delta);
    //     //     children.forEach((child) => {
    //     //         (child as HTMLLIElement).style.transform = `translateX(-${center}px)`;
    //     //     });
    //     // }, 500);
    // }
    // init(options);
    // if (!options.enabled) deint();

    // function orderChildeNodes() {
    //     const children = root.childNodes;
    //     const outArray = new Array(children.length);
    //     children.forEach((child, i) => {
    //         const index: number = parseInt((child as HTMLLIElement).dataset.index || i);
    //         outArray[index] = child;
    //         root.removeChild(child);
    //     });
    //     outArray.forEach((child) => {
    //         root.appendChild(child);
    //     })
    //     console.log(outArray);
    // }

    function stripTransform() {
        const children = root.childNodes;
        children.forEach((child) => {
            (child as HTMLLIElement).style.transform = "";
        });
    }

    function init(options: SlidyOptions) {
        stripTransform()
        // options.position = lastSlideDist;
        // options.index = lastIndex - 2;
        s = slidy(root, options);
        initilized = true;
    }

    function deint() {
        if (s) s.destroy();
        initilized = false;
    }

    return {
        update: (options: SlidyOptions) => {
            if (!initilized && options.enabled) init(options);
            else if (initilized && !options.enabled) deint();
            else if (initilized && s) s.to(options.index as number);
        },
        destroy: () => {
            deint();
        }
    }
}
