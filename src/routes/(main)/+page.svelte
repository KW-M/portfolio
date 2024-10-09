<script>
  import { fade, scale } from "svelte/transition";
  import FloatingCategoryButtons from "../../components/FloatingCategoryButtons.svelte";
  import HomeHeroText from "../../components/HomeHeroText.svelte";
  import DownArrowIcon from "../../images/icons/navIcons/black/arrow_downward_24dp_000000.svg?url";
  import { EMOJI_MAP } from "../../lib/consts";
  export let data;
  const getEmojis = () =>
    new Array(3)
      .fill("")
      .map(() => EMOJI_MAP[Math.floor(Math.random() * EMOJI_MAP.length)])
      .join("");
  let emojis = getEmojis();
</script>

<div in:scale={{ duration: 1000 }} out:scale={{ duration: 2000 }} class="absolute inset-0">
  <HomeHeroText>
    <img src={DownArrowIcon} aria-hidden="true" alt="" class="mx-auto mt-4 opacity-60" />
  </HomeHeroText>
  <FloatingCategoryButtons categoryNames={data.categories} />
</div>
<h1 class="absolute top-[2000vh] w-full overflow-visible text-center h1 text-9xl !py-80 -z-10 cursor-pointer select-none" onpointerdown={() => (emojis = getEmojis())}>{emojis}</h1>
