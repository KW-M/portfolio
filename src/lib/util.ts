import type { nStoreT } from "./libraries/nStore";

export function pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function pickPsudoRandom<T>(array: T[], PRNG: () => number): T {
    return array[Math.floor(PRNG() * array.length)];
}

/** splitmix32 is a psudoRandom number generator
 * source: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param a seed
 * @returns a random 32 bit integer generator;
 */
export function psudoRandomGenerator(a: number) {
    return function () {
        a |= 0; a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

export function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function changesSubscribe<V>(store: nStoreT<V>, callback: (value: V) => void) {
    let gotInitalValueFlag = false;
    const unSub = store.subscribe((value) => {
        if (gotInitalValueFlag == false) {
            gotInitalValueFlag = true;
            return;
        }
        callback(value);
    });
    return unSub;
}

export function oneShotSubscribe<V>(store: nStoreT<V>, callback: (value: V) => void) {
    const unSub = store.subscribe((value) => {
        if (!value) return;
        setTimeout(() => {
            unSub();
            callback(value);
        });
    });
    return unSub;
}

// source: https://www.30secondsofcode.org/js/s/throttle-function/
export const throttle = (fn: (a: IArguments) => void, wait: number) => {
    let inThrottle: boolean, lastFn: number, lastTime: number;
    return function (...args: [IArguments]) {
        // @ts-expect-error tricky context capture
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};
