<script lang="ts">
  // import { flip } from "@slidy/animation";
  import { sine as ease } from "@slidy/easing";
  import { setContext, onDestroy, onMount } from "svelte";
  import { slidyAction } from "../actions/slidy.action.ts";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { previewZoomOpen } from "../actions/ImageZoom.action";

  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  const i18n = i18nDefaults;
  setContext("i18n", i18n);

  $$props.class = "";
  const yPadding = 18;
  export let slides: carouselMediaInfo[] = [];
  export let index = 0;
  export let enabled = false;
  export let loadHiRez = false;
  export let mounted = false;
  $: length = slides.length;
  $: scale = 1;

  let slideHeight = 0;
  let zoomedSlide = -1;
  let forceUpdate = false;
  let renderCarousel = false;
  let transitionTimeout: number;
  $: if (enabled) {
    renderCarousel = true;
  } else {
    clearTimeout(transitionTimeout);
    transitionTimeout = window.setTimeout(() => {
      if (!enabled) renderCarousel = false;
    }, 1000);
  }

  function next() {
    if (previewZoomOpen.get()) return;
    index++;
  }

  function prev() {
    if (previewZoomOpen.get()) return;
    index--;
  }

  function onIndexChange(e: CustomEvent<{ index: number }>) {
    index = e.detail.index;
    console.log("i", index);
  }

  function onSlidyMount(e) {
    const slidyElem = e.target;
    const slides = slidyElem.children;
    setTimeout(() => {
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        // slide.style.position = "absolute";
        // slide.style.display = "0";
      }
    }, 2000);
    mounted = true;
  }

  const mouseStart = { x: 0, y: 0 };
  function onMouseDown(e: MouseEvent, i: number) {
    mouseStart.x = e.clientX;
    mouseStart.y = e.clientY;
    let mouseStill = true;
    const onMouseMove = () => {
      mouseStill = false;
      e.currentTarget?.removeEventListener("mousemove", onMouseMove);
    };
    const onMouseUp = () => {
      e.currentTarget?.removeEventListener("mousemove", onMouseMove);
      e.currentTarget?.removeEventListener("mouseup", onMouseUp);
      if (mouseStill && loadHiRez) {
        if (index === i) {
          zoomedSlide = i;
        } else {
          index = i;
        }
      }
    };

    if (e.currentTarget) {
      e.currentTarget.addEventListener("mousemove", onMouseMove);
      e.currentTarget.addEventListener("mouseup", onMouseUp);
    }
  }

  let resizeTimeout = -1;
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      let newHeight = 0;
      if (window.innerWidth > 720) {
        newHeight = 352;
      } else {
        newHeight = window.innerWidth * (352 / 720);
      }
      if (newHeight !== slideHeight) {
        slideHeight = newHeight;

        if (enabled) {
          forceUpdate = !forceUpdate;
          // forceUpdate = Math.random();
          console.log("forceUpdate");
        }
      }
    }, 1000);
  };
  // onResize();

  // previewZoomOpen.subscribe((v) => {
  //   if (!v) zoomedSlide = -1;
  // });

  // onMount(() => {
  //   window.addEventListener("resize", onResize);
  // });

  // onDestroy(() => {
  //   window.removeEventListener("resize", onResize);
  // });
</script>

<!-- <div bind:this={root} class={"snap-carousel-container " + $$props.class}>
  <slot />
</div> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- style={`height: ${slideHeight + yPadding * 2}px;padding-top:${yPadding}px;transform: translateY(${enabled ? 0 : -slideHeight - yPadding * 2 + scale * slideHeight}px) scale(${scale})`} -->
<section aria-roledescription={i18n.carousel} class={"slidy"} class:cardTransition={renderCarousel}>
  <!--
      on:destroy
      on:index
      on:move
      on:resize
      on:update
      on:keys
    -->
  <ol
    class:invisible={!mounted}
    class="slidy-slides"
    aria-live="polite"
    role="listbox"
    tabindex="0"
    on:mount={onSlidyMount}
    on:index={onIndexChange}
    use:slidyAction={{
      enabled: true,
      forceUpdate: false,
      animation: undefined,
      axis: "x",
      clamp: 0,
      duration: 850,
      easing: ease,
      gravity: 1.2,
      indent: 2,
      index: 0,
      loop: true,
      sensity: 5,
      snap: "center",
    }}
  >
    {#each slides as item, i}
      {@const active = i === index}
      {@const visible = i === index || i === index - 1 || i === (index + 1) % slides.length}
      {@const zoomed = i === zoomedSlide}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <!-- style={`height: ${slideHeight}px; width: ${slideHeight * (item.width / item.height)}px`} -->
      <li aria-current={active ? "true" : undefined} data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} class="slidy-slide" class:active role="group" on:mousedown={(e) => onMouseDown(e, i)}>
        {#if item.type === "img"}
          <LqipPicture picture={item} class={"rounded-none w-auto h-full"} loadHiRez={true} zoomed={false} />
        {:else if item.type === "video"}
          <LqipVideo video={item} class={"rounded-none w-auto  h-full"} loadHiRez={true} zoomed={false} />
        {/if}
        <!-- <div class="absolute top-1/2 left-1/2">{i}</div> -->
      </li>
    {/each}
  </ol>

  <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn left-4" on:click={prev}>(</button>
  <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn right-4" on:click={next}>)</button>
</section>

<style>
  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  li.fake-active {
    position: absolute;
    top: 50%;
    z-index: 10;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slidy {
    position: relative;
    height: 352px;
    overflow: hidden;
    overscroll-behavior: contain;
    user-select: none;
    cursor: grab;
    -webkit-user-select: none;
    transform-origin: center bottom;
    @apply block border-t-8 border-b-8 border-transparent border-solid;
  }

  .slidy.cardTransition {
    transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .slidy-slides {
    min-height: 0;
    position: relative;
    white-space: nowrap;
    width: 100%;
    height: 100%;
    max-width: 100%;
    list-style: none;
  }

  .slidy-slide {
    display: inline-block;
    height: 100%;
    @apply mx-8 relative overflow-hidden rounded-xl bg-cover;
  }

  .slides-placeholder {
    transform: translateX(-50%);
    filter: blur(5px);
    @apply block rounded-xl absolute top-4 z-50 bottom-4 left-1/2 bg-cover bg-no-repeat;
  }
</style>
