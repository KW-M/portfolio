<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import FloatingCategoryButtons from "../../components/FloatingCategoryButtons.svelte";
  import HomeHeroText from "../../components/HomeHeroText.svelte";
  import { EMOJI_MAP } from "../../lib/consts";
  import { IconArrowBendRightUp } from "$lib/assets";
  import { onMount } from "svelte";

  const getEmojis = () =>
    new Array(3)
      .fill("")
      .map(() => EMOJI_MAP[Math.floor(Math.random() * EMOJI_MAP.length)])
      .join("");
  let emojis = getEmojis();

  onMount(() => {
    const interval = setInterval(() => {
      emojis = getEmojis();
    }, 4000);
    return () => clearInterval(interval);
  });
</script>

<div in:scale={{ duration: 1000 }} out:scale={{ duration: 2000 }} class="absolute inset-0 z-10">
  <HomeHeroText subText={""}>
    <div class="flex flex-row items-center justify-center">
      <IconArrowBendRightUp class="mx-auto size-7 text-black opacity-0" />
      <h3 class="text-center tracking-tight leading-none text-gray-900">Choose a category to see<br /> what I've been up to</h3>
      <IconArrowBendRightUp class="mx-auto size-7 text-black opacity-60" />
    </div>
  </HomeHeroText>
</div>
{#key emojis}
  <h1 class="absolute top-[2000vh] w-full overflow-visible text-center h1 text-9xl !py-80 cursor-pointer select-none" onpointerdown={() => (emojis = getEmojis())} in:fade={{ duration: 1000 }} out:fade={{ duration: 1000 }}>{emojis}</h1>
{/key}
