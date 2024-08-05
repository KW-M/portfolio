<script>
  import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
  import { fade } from "svelte/transition";
  export let headerText = "Greetings Internet Traveler!";
  export let subText = "Choose a category to see what I've been up to.";
</script>

<main id="main" class="z-50 absolute -mt-20 py-8 px-4 w-64 text-center lg:w-80 lg:py-16 lg:px-12 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 select-none pointer-events-none" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY }} out:fade|global={{ duration: PAGE_FADE_DURATION }}>
  <h1 class="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl">{headerText}</h1>
  <h3 class="text-center tracking-tight leading-none text-gray-900">{subText}</h3>
  <slot />
</main>
