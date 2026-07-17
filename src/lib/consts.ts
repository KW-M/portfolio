
import { psudoRandomGenerator } from "./util";

// 1 192 186 23907 2391 159
export const PRNG = psudoRandomGenerator(159);
export const PERSPECTIVE = 800; // 800
export const SPLITPOINT_HEIGHT = 200;
export const SPLITPOINT_CLOUD_DEPTH = 1000;
export const SPRITE_DEBUG_ON = false;
export const DEBUG_ON = false;
export const DEBUG_FPS_ON = false;
export const DEBUG_SPRITE_ON = false;

// BACKGROUND CANVAS CONSTANTS
export const NUM_CLOUDS = 20; // 31
export const BACKGROUND_FADE_RATE = 0.001;
export const CLOUD_OPACITY = 1;
export const CLOUD_FADE_RATE = 0.0005;
export const CLOUD_SPEED = 0.01;
export const Z_BACKGROUND = 2000;
export const ZRANGE_CLOUD_MAX = 2000; // 1600; 200
export const ZRANGE_CLOUD_MIN = 400; // 500
export const ZRANGE_CLOUD = ZRANGE_CLOUD_MAX - ZRANGE_CLOUD_MIN;

// PAGE TRANSITION CONSTANTS
export const PAGE_FADE_DELAY = 500;
export const PAGE_FADE_DURATION = 300;

// VERY IMPORTANT
export const EMOJI_MAP = ["🏔", "🏎", "🚃", "🕤", "🐔", "🛤", "🚖", "🎿", "🐼", "🙏", "🏨", "💞", "🐺", "👽", "🎯", "🏊", "🍘", "🍕", "🎡", "🐋", "🍒", "🐜", "💫", "🏑", "💥", "⛰", "🎬", "🐝", "👎", "🚓", "💵", "📡", "🏤", "📍", "🍔", "🌐", "🏧", "👈", "💺", "🛺", "😳", "🌌", "🥋", "🐚", "🐄", "🎓", "🚵", "🔑", "🛖", "🕍", "💿", "🎚", "🐫", "🌍", "🌔", "🍓", "🤾", "💧", "🍌", "🍚", "💯", "🥘", "⌛", "🔬", "🛣", "🌊", "🏰", "🎫", "🌈", "👶", "🚫", "🚑", "📊", "💐", "📠", "👠", "🎤", "🚨", "🎢", "🐽", "🍞", "🚄", "🐂", "🍸", "🚗", "👑", "🦽", "🎹", "🚿", "⌚", "🎾", "🤿", "🚪", "🍇", "🐻", "👦", "🛟", "🥌", "🃏", "🏜", "🐗", "🚜", "🍫", "🚌", "🌅", "🪁", "🌳", "🚕", "🚛", "🚇", "🍵", "🔔", "🛶", "👏", "💚", "🤼", "🏄", "🐙", "😄", "🌄", "🎸", "🌆", "👇", "⛲", "🍩", "🩼", "🛳", "🔉", "💦", "🏃", "🛵", "🌼", "🏩", "🎅", "🌵", "🏠", "🍆", "🍺", "⭐", "🐣", "🏥", "💻", "🎮", "🎲", "👅", "⛱", "🏙", "📰", "📯", "🎥", "🍏", "🎊", "🐩", "🍍", "📼", "📺", "🚅", "⚽", "🚙", "📘", "🍎", "🚚", "🚀", "🐊", "🎺", "👧", "🚝", "🧡", "⛳", "🔕", "👃", "🛞", "👂", "🏇", "🍁", "🔫", "🎵", "🐢", "🖱", "🤺", "🔆", "🐈", "💔", "🚣", "🤣", "🪕", "🔦", "🙈", "🛷", "📸", "🎟", "🌽", "🚠", "🗼", "📢", "🍗", "🗜", "💋", "🎗", "📷", "🥛", "📫", "🎃", "💡", "🗿", "🐌", "🥁", "🎍", "🥝", "📚", "🍪", "🍟", "🏦", "💢", "🌬", "🍷", "😼", "🔩", "🚴", "🕋", "🎆", "👛", "🌿", "🚔", "🎽", "📞", "🏚", "🏵", "🧦", "🐬", "💭", "🎩", "⛵", "⛺", "🔧", "💼", "👻", "🛻", "🏝", "🍼", "👾", "🚋", "🐍", "🐸", "🍐", "🌠", "📽", "⛔", "🍰", "🪂", "💉", "📖", "🔍", "💎", "⛄", "🏘", "🚲", "📻", "🌀", "👉", "🎳", "📌", "🏹", "🔥", "🏀", "💾", "⛪", "🏍", "💙", "🏈", "🏕", "💪", "💒", "👆", "🍨", "🛫", "🐎", "🐀", "🚆", "👊", "😈", "🏟", "🐴", "💩", "👐", "🔮", "🐓", "💨", "🎁", "🔨", "🍬", "📆", "💣", "🚉", "👓", "🎀", "🎻", "🐇", "🏁", "🎪", "📟", "🎂", "🕌", "🚽", "🌁", "💃", "💘", "😠", "🤹", "👔", "💀", "🚮", "🪀", "📣", "🚈", "🏖", "📝", "💊", "🚒", "🎈", "🪲", "🥊", "☁", "🗻", "🏞", "⛷", "💰", "🎨", "🌇", "😎", "🚊", "🛼", "🚦", "🛴", "💬", "👍", "🛀", "👩", "🐛", "👌", "👫", "🎭", "🎷", "👕", "🌮", "🍃", "🎱", "🗾", "🕠", "🚢", "💈", "🍂", "🚧", "👼", "🔢", "🐧", "🐖", "🍄", "🎠", "👜", "🐨", "🛬", "🛹", "🍤", "🚍", "🤽", "🎄", "🐒", "🚥", "🐕", "⛩", "🚡", "🎑", "👰", "🔭", "⛽", "🎇", "😮", "🏯", "🍀", "⛑", "🔋", "⛅", "😌", "🌹", "😭", "🚘", "🧩", "🏆", "🍑", "👤", "🛥", "🐁", "🛰", "💍", "🛩", "🧿", "🥥", "🪩"];


// /** Returns the day of year in the range 1-365 as an integer
//  * @param date a JS date object (defaults to today)
//  * @returns Returns the day of year
//  */
// export function getDayOfYear(date = new Date()): number {
//     const timestamp1 = Date.UTC(
//         date.getFullYear(),
//         date.getMonth(),
//         date.getDate(),
//     );
//     const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
//     const differenceInMilliseconds = timestamp1 - timestamp2;
//     const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;
//     return differenceInDays;
// }



// /** Returns a unique emoji for every day of the year */
// export function emojiOfTheDay() {
//     return EMOJI_MAP[getDayOfYear()]
// }

// /**
//  * converts a number expressed as hex to a string of emojis that is unique for every number (just a base conversion to the list of emojis)
//  * @param hexString a number expressed as a hex string to convert to emojis
//  * @param itterCount the number of emojis to put into the output string.
//  * @returns
//  */
// export function hexToEmojiEncoding(hexString = "FF", itterCount) {
//     let out = ""
//     let emojiCount = BigInt(EMOJI_MAP.length)
//     hexString = "0x" + hexString
//     let value = BigInt(hexString);
//     while (itterCount > 0 && value > 0) {
//         out += EMOJI_MAP[Number(value % emojiCount)];
//         value = value / emojiCount;
//         itterCount--
//     }
//     return out
// }
