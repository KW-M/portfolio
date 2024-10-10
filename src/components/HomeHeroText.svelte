<script>
  import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
  import { fade } from "svelte/transition";
  export let headerText = "Greetings Internet Traveler!";
  export let subText = "Choose a label to see <br/> what I've been up to.";
</script>

<div class="absolute size-80 bg-white/40 -mt-4 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 blur-3xl" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY }} out:fade|global={{ duration: PAGE_FADE_DURATION }}></div>
<main id="main" class="z-10 absolute py-8 px-4 w-64 text-center lg:w-80 lg:py-16 lg:px-12 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 select-none pointer-events-none" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY }} out:fade|global={{ duration: PAGE_FADE_DURATION }}>
  <h1 class="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl">{headerText}</h1>
  <h3 class="text-center tracking-tight leading-none text-gray-900">{@html subText}</h3>
  <slot />
</main>
