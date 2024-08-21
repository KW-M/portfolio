<script>
  import { fade, scale } from "svelte/transition";
  import FloatingCategoryButtons from "../../components/FloatingCategoryButtons.svelte";
  import HomeHeroText from "../../components/HomeHeroText.svelte";
  import DownArrowIcon from "../../images/icons/navIcons/black/arrow_downward_24dp_000000.svg?url";
  export let data;
</script>

<div in:scale={{ duration: 1000 }} out:scale={{ duration: 2000 }} class="absolute inset-0">
  <HomeHeroText>
    <img src={DownArrowIcon} aria-hidden="true" alt="" class="mx-auto mt-4 opacity-60" />
  </HomeHeroText>
  <FloatingCategoryButtons categoryNames={data.categories} />
</div>
<h1 class="absolute top-[2000vh] w-full overflow-visible text-center h1 text-9xl !pb-80 -z-10">🥥🪩🧿</h1>
