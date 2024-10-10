<script lang="ts">
  import "../../app.css";
  import CornerLinkBtn from "../../components/CornerLinkBtn.svelte";

  import { IconCaretBack, IconExpandIn, navIcons } from "$lib/assets";
  // import experimentsIcon from "../../images/icons/categoryIcons/experiments_24dp_000000.svg?url";
  import ghIcon from "../../images/icons/github_circle_white.svg?url";
  import meIcon from "../../images/profile-photo2.png?url";
  import cloudOffIcon from "../../images/icons/cloud_off_24dp.svg?url";
  import cloudOnIcon from "../../images/icons/wind_cloud_24dp.svg?url";
  import CanvasRenderer from "../../components/CanvasRenderer.svelte";

  import { page } from "$app/stores";
  import { backHomeBtn } from "../../actions/backButton";
  import { SvelteURL } from "svelte/reactivity";
  import { PREFERS_REDUCED_MOTION } from "$lib/canvasScale";
  import CornerBtn from "../../components/CornerBtn.svelte";
  import Backgrounds from "../../components/Backgrounds.svelte";
  import { previewZoomOpen, TRANSITION_DURRATION } from "../../actions/ImageZoom.action";
  import { afterNavigate } from "$app/navigation";
  import { disableBrowserBackSwipe, historyStack } from "$lib/globals";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

  $: if ($disableBrowserBackSwipe) {
    if (browser) document.body.classList.add("overscroll-x-none");
  } else {
    if (browser) document.body.classList.remove("overscroll-x-none");
  }

  afterNavigate(async ({ to, from, delta }) => {
    if (delta && delta < 0) {
      historyStack.update((stack) => {
        stack = stack.slice(0, delta);
        // if (to && stack[stack.length - 1] !== to.url.pathname) {
        //   stack.push(to.url.pathname);
        // }
        if (to && stack.length === 0) stack.push(to.url.pathname);
        return stack;
      });
    } else if (to) {
      historyStack.update((stack) => {
        if (stack[stack.length - 1] !== to.url.pathname) {
          stack.push(to.url.pathname);
        }
        return stack;
      });
    } else {
      console.warn("navigated to unknown", to, from, delta);
    }
  });
</script>

<svelte:head>
  <title>{$page.data.title || "Kyle W-M"}</title>
</svelte:head>

<a class="skip-link z-50" href="#main">Skip to content</a>

<Backgrounds />
<CanvasRenderer />

<nav class="fixed border-nav pointer-events-none z-40">
  <CornerLinkBtn fixed={true} href="/" useAction={backHomeBtn} icon={IconCaretBack} corner="tl"></CornerLinkBtn>
  <!-- <CornerLinkBtn fixed={true} href="https://github.com/kw-m" icon_src={ghIcon} corner="tr"></CornerLinkBtn> -->
  <CornerBtn corner="br" icon_src={!$PREFERS_REDUCED_MOTION ? cloudOnIcon : cloudOffIcon} onClick={() => PREFERS_REDUCED_MOTION.set(!PREFERS_REDUCED_MOTION.get())} />
  <!-- <CornerLinkBtn fixed={true} href="/about" icon_src={meIcon} corner="bl"></CornerLinkBtn> -->
</nav>

{#key SvelteURL}
  <slot />
{/key}

{#if $previewZoomOpen}
  <div on:click={() => previewZoomOpen.set(false)} aria-hidden="true" id="img_zoom_backdrop" class="z-40" transition:fade={{ duration: TRANSITION_DURRATION }}></div>
  <div class=" fixed inset-0 w-full h-full z-50 pointer-events-none" transition:fade={{ duration: TRANSITION_DURRATION }}>
    <button on:click={() => previewZoomOpen.set(false)} class="btn-icon btn-icon-lg cursor-zoom-out pointer-events-auto preset-filled-surface-950-50 absolute top-4 right-4 bg-size-32" aria-label="close image zoom">
      <IconExpandIn class="size-7 pointer-events-none" />
    </button>
  </div>
{/if}

<!-- History Stack Debug -->
<!-- <p class="fixed h5 z-50 left-0 right-0 top-28 m-auto p-5 bg-white">{$historyStack.join(" | ")} | {$historyStack.length}<a href={$historyStack[$historyStack.length - 2]} data-sveltekit-replacestate>Curr</a></p> -->

<style>
  :global(main) {
    padding: 0 30px;
  }
  :global(:root) {
    --scrollbar-width: 0px;
  }

  .skip-link {
    /* visibility: hidden; */
    top: 0;
    position: absolute;
    background: #000000;
    color: white; /* change the color */
    left: 50%;
    padding: 8px 16px;
    position: absolute;
    transform: translateX(-50%) translateY(-100%);
    transition: transform 0.3s;
  }

  .skip-link:focus {
    visibility: visible;
    transform: translateX(-50%) translateY(0%);
  }

  .border-nav {
    border: solid black 140px;
    top: -120px;
    right: calc(-120px - var(--scrollbar-width));
    left: -120px;
    height: 100vh;
    border-bottom-color: transparent;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 240px;
    border-top-right-radius: 160px;
  }

  .border-nav:before {
    content: " ";
    position: fixed;
    border: solid black 140px;
    border-radius: 160px;
    border-bottom-right-radius: 240px;
    bottom: -120px;
    right: calc(-120px - var(--scrollbar-width));
    left: -120px;
    height: 100vh;
    border-top-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  #img_zoom_backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 1);
    pointer-events: all;
    cursor: zoom-out;
    @apply bg-black;
  }

  .bg-size-32 {
    background-size: 32px;
  }

  :global(#img_zoom_backdrop *) {
    position: absolute;
    max-height: 100%;
    max-width: 100%;
    height: 100%;
  }
</style>
