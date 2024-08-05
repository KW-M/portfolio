<script>
  import { fade } from "svelte/transition";
  import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
</script>

<main id="main" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY }} out:fade|global={{ duration: PAGE_FADE_DURATION }} class="mx-auto max-w-fit relative">
  <slot />
</main>
