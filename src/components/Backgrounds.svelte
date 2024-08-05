<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { backgrounds } from "$lib/assets";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  let backgroundList: string[] = [];

  const fadeDurration = 10000;
  const step = 1; //Math.floor(Math.random() * 3) + 1;
  let index = Math.floor(Math.random() * backgrounds.length);

  const changeBg = () => {
    // if (nav.to && nav.to.route.id === "/") {
    //   backgroundList.push(null);
    // } else {
    index = (index + step) % backgrounds.length;
    const src = backgrounds[index].src;
    if (!src) {
      alert("no src" + index);
    }
    backgroundList = [src, ...backgroundList];
  };

  onNavigate(changeBg);

  onMount(() => {
    changeBg();
  });
</script>

{#if backgroundList.length === 0 || backgroundList[0] === null}
  <div out:fade={{ delay: fadeDurration, duration: fadeDurration }} style={`background: linear-gradient(to bottom, #fff94f 0%, rgb(0, 208, 255) 100%) fixed`} class="fixed scale-110 top-0 left-0 w-full h-full bg-cover bg-center -z-10"></div>
{:else}
  {#each backgroundList as background, i (background)}
    {#if i === 0}
      <div in:fade|global={{ duration: fadeDurration }} out:fade|global={{ duration: fadeDurration }} style={`background-image: url("${background}")`} class="fixed scale-110 top-0 left-0 w-full h-full bg-cover bg-center -z-10"></div>
    {/if}
  {/each}
{/if}
