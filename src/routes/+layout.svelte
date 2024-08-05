<script>
  import "../app.css";
  import CornerLinkBtn from "../components/CornerLinkBtn.svelte";

  import { navIcons } from "$lib/assets";
  import experimentsIcon from "../images/icons/categoryIcons/experiments_24dp_000000.svg";
  import ghIcon from "../images/icons/github_circle_white.svg";
  import meIcon from "../images/profile-photo2.png";
  import cloudOffIcon from "../images/icons/cloud_off_24dp.svg";
  import cloudOnIcon from "../images/icons/wind_cloud_24dp.svg";

  import CanvasRenderer from "../components/CanvasRenderer.svelte";
  export let data;
  import { page } from "$app/stores";
  import { backHomeBtn } from "../actions/backButton";
  import { SvelteURL } from "svelte/reactivity";
  import { PREFERS_REDUCED_MOTION } from "$lib/canvasScale";
  import CornerBtn from "../components/CornerBtn.svelte";
  import Backgrounds from "../components/Backgrounds.svelte";
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<a class="skip-link z-50" href="#main">Skip to content</a>

<Backgrounds />
<CanvasRenderer />

<nav class="fixed border-nav pointer-events-none z-40">
  <CornerLinkBtn href="/" useAction={backHomeBtn} useActionData={{ currentRoute: data.currentRoute }} icon_src={navIcons.home} corner="tl"></CornerLinkBtn>
  <CornerLinkBtn href="https://github.com/kw-m" icon_src={ghIcon} corner="tr"></CornerLinkBtn>
  <CornerBtn corner="br" icon_src={!$PREFERS_REDUCED_MOTION ? cloudOnIcon : cloudOffIcon} onClick={() => PREFERS_REDUCED_MOTION.set(!PREFERS_REDUCED_MOTION.get())} />
  <CornerLinkBtn href="/about" icon_src={meIcon} corner="bl"></CornerLinkBtn>
</nav>

{#key SvelteURL}
  <slot />
{/key}

<!-- <button class="fixed btn clouds-toggle-btn" on:click={() => PREFERS_REDUCED_MOTION.set(!PREFERS_REDUCED_MOTION.get())}>{$PREFERS_REDUCED_MOTION}</button> -->
<div id="imgZoomContainer"></div>

<style>
  :global(html) {
    background-color: white;
  }

  :global(body) {
    background-color: transparent;
  }

  :global(main) {
    padding: 0 30px;
  }
  .clouds-toggle-btn {
    top: 100px;
    right: 100px;
    z-index: 1000;
    background-color: transparent;
    border: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .skip-link {
    /* visibility: hidden; */
    top: 0;
    position: absolute;
    background: #ffffff;
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
    border-radius: 240px;
    top: -120px;
    right: -120px;
    left: -120px;
    height: 100vh;
    border-bottom-color: transparent;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .border-nav:before {
    content: " ";
    position: fixed;
    border: solid black 140px;
    border-radius: 240px;
    bottom: -120px;
    right: -120px;
    left: -120px;
    height: 100vh;
    border-top-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  #imgZoomContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
    pointer-events: none;
    z-index: 1000;
    transition: background-color 0.6s ease-in-out;
  }

  :global(#imgZoomContainer.zoomOpen) {
    background-color: rgba(0, 0, 0, 0.92);
    pointer-events: all;
    cursor: zoom-out;
  }

  :global(#imgZoomContainer *) {
    position: absolute;
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    /* top: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    left: 0; */
    /* transition: transform 2s ease-in-out; */
  }
</style>
