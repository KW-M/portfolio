<script lang="ts">
  import "../../app.css";
  import CornerLinkBtn from "../../components/CornerLinkBtn.svelte";

  import cornerRoundSvg from "../../images/ui/CornerBtnBr.svg?url";

  import { IconArrowDown, IconCaretBack, IconExpandIn, navIcons } from "$lib/assets";
  // import experimentsIcon from "../../images/icons/categoryIcons/experiments_24dp_000000.svg?url";
  import ghIcon from "../../images/icons/github_circle_white.svg?url";
  import meIcon from "../../images/profile-photo2.png?url";
  import cloudOffIcon from "../../images/icons/cloud_off_24dp.svg?url";
  import cloudOnIcon from "../../images/icons/wind_cloud_24dp.svg?url";
  import homeIcon from "../../images/icons/navIcons/arrow_tl_24dp.svg?url";
  import CanvasRenderer from "../../components/CanvasRenderer.svelte";

  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import { backHomeBtn } from "../../actions/backButton";
  import { SvelteURL } from "svelte/reactivity";
  import { PREFERS_REDUCED_MOTION } from "$lib/canvasScale";
  import CornerBtn from "../../components/CornerBtn.svelte";
  import Backgrounds from "../../components/Backgrounds.svelte";
  import { previewZoomOpen, TRANSITION_DURRATION } from "../../actions/ImageZoom.action";
  import { disableBrowserBackSwipe, historyStack, navOpen } from "$lib/globals";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import TagNav from "../../components/tagNav.svelte";
  import { onMount } from "svelte";

  $: if ($disableBrowserBackSwipe) {
    if (browser) document.body.classList.add("overscroll-none");
    if (browser) document.documentElement.classList.add("overscroll-none");
  } else {
    if (browser) document.body.classList.remove("overscroll-none");
    if (browser) document.documentElement.classList.remove("overscroll-none");
  }

  $: mainNavOpen = $navOpen || $page.route.id === "/(main)";
  $: pageNavOpen = $navOpen && $page.route.id != "/(main)";

  const closeNav = () => {
    navOpen.set(false);
    document.removeEventListener("click", closeNav);
  };
  const onScroll = () => {
    const currentScrollY = document?.scrollingElement?.scrollTop || 0;
    if (Math.abs(currentScrollY - startScrollY) > 1000) closeNav();
  };
  let startScrollY = browser ? document?.scrollingElement?.scrollTop || 0 : 0;
  navOpen.subscribe((value) => {
    if (!browser) return;
    startScrollY = document?.scrollingElement?.scrollTop || 0;
    if (value) document.addEventListener("scroll", onScroll);
    else document.removeEventListener("scroll", onScroll);
    setTimeout(() => {
      if (navOpen.get()) document.addEventListener("click", closeNav);
      else document.removeEventListener("click", closeNav);
    });
  });

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

  onMount(() => {});
</script>

<svelte:head>
  <title>{$page.data.title || "Kyle W-M"}</title>
</svelte:head>

<a class="skip-link z-50" href="#main">Skip to content</a>
<Backgrounds />
<CanvasRenderer />

<nav class="fixed border-nav pointer-events-none z-30 duration-300 ease-in-out" class:nav-open={mainNavOpen}>
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" class="absolute -top-[1px] -left-[1px] w-40 h-40 duration-300 ease-in-out transition-transform origin-top-left scale-50" class:scale-[15%]={!mainNavOpen}>
    <path d="M60 0v60H0c33.115 0 60-26.885 60-60z" transform="rotate(180)" transform-origin="center center" />
  </svg>
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" class="absolute -top-[1px] -right-[1px] w-40 h-40 duration-300 ease-in-out transition-transform origin-top-right scale-50" class:scale-[15%]={!mainNavOpen}>
    <path d="M60 0v60H0c33.115 0 60-26.885 60-60z" transform="rotate(270)" transform-origin="center center" />
  </svg>
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" class="absolute -bottom-[1px] -left-[1px] w-40 h-40 duration-300 ease-in-out transition-transform origin-bottom-left" class:scale-50={mainNavOpen}>
    <path d="M60 0v60H0c33.115 0 60-26.885 60-60z" transform="rotate(90)" transform-origin="center center" />
  </svg>
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" class="absolute -bottom-[1px] -right-[1px] w-40 h-40 duration-300 ease-in-out transition-transform origin-bottom-right scale-50" class:scale-[15%]={!mainNavOpen}>
    <path d="M60 0v60H0c33.115 0 60-26.885 60-60z" transform="rotate(0)" transform-origin="center center" />
  </svg>

  <!-- <div style="background-image: url('{cornerRoundSvg}');" class="corner-bg-tl"></div> -->
  <!-- <CornerLinkBtn fixed={true} href="/" useAction={backHomeBtn} icon={IconCaretBack} corner="tl"></CornerLinkBtn> -->

  <!-- <CornerLinkBtn fixed={true} href="https://github.com/kw-m" icon_src={ghIcon} corner="tr"></CornerLinkBtn> -->
  <!-- <CornerBtn corner="tr" icon_src={!$PREFERS_REDUCED_MOTION ? cloudOnIcon : cloudOffIcon} onClick={() => PREFERS_REDUCED_MOTION.set(!PREFERS_REDUCED_MOTION.get())} /> -->
  <!-- <CornerLinkBtn fixed={true} href="/about" icon_src={meIcon} corner="bl"></CornerLinkBtn> -->
  <h3 class="text-center tracking-tight font-bold absolute leading-none select-none text-gray-900 pointer-events-none bottom-0 p-3 w-full" class:opacity-0={!pageNavOpen}><IconArrowDown class="inline mx-2"></IconArrowDown> Pick a Category</h3>
</nav>
<TagNav open={mainNavOpen} />
<!-- <CornerBtn corner="bl" icon_src={homeIcon} onClick={() => navOpen.set(!navOpen.get())} classNames={" z-50 fixed " + (mainNavOpen ? "rotate-270" : "rotate-90")} /> -->
<button on:click={() => navOpen.set(!navOpen.get())} class="corner-btn-bl" class:-rotate-90={$navOpen} class:rotate-90={!$navOpen} style={`background-image:url("${homeIcon}")`} aria-label="Open Navigation Menu"></button>
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

  .corner-bg-tl {
    transform-origin: top-left;
    transform: rotate(180deg) scale(50%);
    @apply top-0 left-0 w-40 h-40;
  }

  .corner-btn-bl {
    background-size: 36px;
    @apply bottom-0 left-0 fixed w-16 h-16 m-0 bg-transparent bg-no-repeat z-40 rounded-none pointer-events-auto;
    /* background-position: bottom 0.8rem left 0.8rem; */
    background-position: center;
  }

  .nav-open .corner-bg-tl {
    transform: scale(50%) rotate(180deg);
  }

  .border-nav {
    border: solid black 8px;
    transition: border 250ms ease;
    top: 0;
    width: calc(100vw - var(--scrollbar-width));
    left: 0;
    height: calc(100vh);
  }

  .nav-open.border-nav {
    border-top: solid black 30px;
    border-bottom: solid black 80px;
    border-left: solid black 30px;
    border-right: solid black 30px;
  }

  /*

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
  } */

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
