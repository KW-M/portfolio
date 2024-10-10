
import { base } from "$app/paths";
import { IconEnvironment, IconExperiments, IconGraphics, IconHighlights, IconRobotics, IconScience, IconWebDev } from "./assets";
import nStore from "./libraries/nStore";

export const homePath = base + "/";

// stores the history of paths visited. This is used to determine the previous path when the back button is clicked.
export const historyStack = nStore<string[]>([]);
export const disableBrowserBackSwipe = nStore(false);


//
export const categoryIconMap: { [key: string]: typeof IconHighlights } = {
    Highlights: IconHighlights,
    Robotics: IconRobotics,
    "Web Dev": IconWebDev,
    "Game Dev": IconGraphics,
    "Data Science": IconScience,
    Experiments: IconExperiments,
    Eco: IconEnvironment,
};

export const categoryColorMap: { [key: string]: string } = {
    Highlights: "bg-yellow-400",
    Robotics: "bg-teal-400",
    "Web Dev": "bg-orange-400",
    "Game Dev": "bg-pink-400",
    "Data Science": "bg-blue-400",
    Experiments: "bg-purple-400",
    Eco: "bg-green-400",
    // tags
    Typescript: "bg-blue-400",
    Svelte: "bg-orange-400",
};
export const bgColors = ["bg-yellow-400", "bg-orange-400", "bg-blue-400", "bg-purple-400", "bg-teal-400", "bg-green-400", "bg-indigo-400", "bg-red-400", "bg-pink-400"];
// const colorsDark = ["dark:bg-yellow-500", "dark:bg-orange-500", "dark:bg-blue-500", "dark:bg-purple-500", "dark:bg-teal-500", "dark:bg-green-500", "dark:bg-indigo-500", "dark:bg-red-500", "dark:bg-pink-500"];
// const colorsText = ["text-yellow-400", "text-orange-400", "text-blue-400", "text-purple-400", "text-teal-400", "text-green-400", "text-indigo-400", "text-red-400", "text-pink-400"];
// const colorsTextDark = ["dark:text-yellow-500", "dark:text-orange-500", "dark:text-blue-500", "dark:text-purple-500", "dark:text-teal-500", "dark:text-green-500", "dark:text-indigo-500", "dark:text-red-500", "dark:text-pink-500"];
