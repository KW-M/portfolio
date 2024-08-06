<script>
  import { navIcons } from "$lib/assets";
  import FloatingCategoryButtons from "../components/FloatingCategoryButtons.svelte";
  import HomeHeroText from "../components/HomeHeroText.svelte";
  import DownArrowIcon from "../images/icons/navIcons/black/arrow_downward_24dp_000000.svg?url";
  export let data;
</script>

<HomeHeroText>
  <img src={DownArrowIcon} aria-hidden="true" alt="" class="mx-auto mt-4 opacity-60" />
</HomeHeroText>
<FloatingCategoryButtons categoryNames={data.categories} />

<h1 class="absolute top-[2000vh] w-full overflow-clip text-center h1 text-9xl !pb-80 -z-10">🥥🪩🧿</h1>
