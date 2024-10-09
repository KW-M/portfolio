<script>
  import { base } from "$app/paths";
  import { IconCaretBack } from "$lib/assets";
  import HomeHeroText from "./HomeHeroText.svelte";
</script>

<HomeHeroText headerText="404" subText="The page has left the building">
  <a href={base + "/"} class="btn btn-lg preset-filled-primary-500 my-8 pointer-events-auto">
    <IconCaretBack class="size-7 opacity-95 pointer-events-none" tabindex={-1} />
    Go Home
  </a>
</HomeHeroText>
