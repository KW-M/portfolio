
import { base } from "$app/paths";
import nStore from "./libraries/nStore";

export const homePath = base + "/";

// stores the history of paths visited. This is used to determine the previous path when the back button is clicked.
export const historyStack = nStore<string[]>([]);
