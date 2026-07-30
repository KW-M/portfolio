<script lang="ts">
  import "./layout.css";
  import { disableBrowserBackSwipe, historyStack } from "$lib/globals";
  import { IconExpandIn, IconMenu } from "$lib/assets";
  import Backgrounds from "$components/Backgrounds.svelte";
  import CanvasRenderer from "$components/CanvasRenderer.svelte";
  import { browser } from "$app/env";
  import { SvelteURL } from "svelte/reactivity";
  import { previewZoomOpen, TRANSITION_DURRATION } from "../actions/ImageZoom.action";
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
  import { afterNavigate } from "$app/navigation";

  let { children } = $props();

  disableBrowserBackSwipe.subscribe((value) => {
    if (browser) document.body.classList.toggle("overscroll-none", value);
    if (browser) document.documentElement.classList.toggle("overscroll-none", value);
  });

  afterNavigate(async ({ to, from, delta }) => {
    if (delta && delta < 0) {
      historyStack.update((stack) => {
        stack = stack.slice(0, delta);
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

  let getHomeLink = () => {
    if (page.route.id === "/") {
      const history = historyStack.get();
      return history.length != 0 ? history[history.length - 1] : "/";
    } else return "/";
  };
</script>

<svelte:head>
  <title>{page.data.title || "Kyle W-M"}</title>
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="icon" type="image/x-icon" href="/Favicons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicons/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/Favicons/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicons/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicons/favicon-16x16.png" />

  <link rel="mask-icon" href="/Favicons/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#2b5797" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Greetings Fellow Netizen! I'm Kyle. Come see what I've been up to on my web portfolio!" />
  <meta name="author" content="Kyle Worcester-Moore" />

  <meta property="og:url" content="https://kw-m.cc" />
  <meta property="og:title" content="Kyle Worcester-Moore | Portfolio" />
  <meta property="og:description" content="Greetings Fellow Netizen! Come see what I've been up to on my portfolio!" />
  <meta property="og:site_name" content="KW-M.cc" />
  <meta property="og:image" content="https://kw-m.cc/og-image.jpg" />
  <meta property="og:image:width" content="1000" />
  <meta property="og:image:height" content="524" />
  <meta property="og:type" content="website" />
  <meta property="og:logo" content={"https://kw-m.cc/Favicons/favicon-96x96.png"} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a class="skip-link z-50" href={"#main"}>Skip to content</a>
<Backgrounds />
<CanvasRenderer />
<!-- TODO Figure out width thing -->
<a href={getHomeLink()} class="group sm:hover:bg-surface-50-950/70 fixed top-3 left-3 overflow-clip max-sm:rounded-r-none max-sm:right-0 rounded-tl-none px-5 py-3 flex flex-nowrap flex-row gap-3 items-center cursor-pointer justify-start z-30 rounded-4xl bg-white/70 backdrop-blur-md shadow-xl" aria-label="Open Navigation Menu">
  <!-- <IconMenuFill class={`w-6 h-6 shrink-0  scale-120  block group-hover:hidden group-focus:hidden`} /> -->
  <IconMenu class={`w-6 h-6 shrink-0  scale-120   opacity-80  group-hover:text-secondary-900-100 group-focus:block group-focus:opacity-100`} />
  <span class="vr border-surface-600-400 scale-120"></span>
  <span class="text-2xl text-right whitespace-nowrap">Kyle Worcester-Moore</span>
</a>

{#key SvelteURL}
  {@render children()}
{/key}

{#if $previewZoomOpen}
  <div onclick={() => previewZoomOpen.set(false)} aria-hidden="true" id="img_zoom_backdrop" class="z-40 bg-black absolute inset-0 opacity-70" transition:fade={{ duration: TRANSITION_DURRATION }}></div>
  <div class=" fixed inset-0 w-full h-full z-50 pointer-events-none" transition:fade={{ duration: TRANSITION_DURRATION }}>
    <button onclick={() => previewZoomOpen.set(false)} class="btn-icon btn-icon-lg cursor-zoom-out pointer-events-auto preset-filled-surface-950-50 absolute top-4 right-4 bg-size-32" aria-label="close image zoom">
      <IconExpandIn class="size-7 pointer-events-none" />
    </button>
  </div>
{/if}
