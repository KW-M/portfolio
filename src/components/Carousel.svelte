<script lang="ts">
  import { flip } from "@slidy/animation";
  import { sine as ease } from "@slidy/easing";
  import { setContext, onDestroy, onMount } from "svelte";
  import { slidyAction } from "./slidyAction";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { attachZoom } from "./ImageZoom.action";
  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  export let loadHiRez = false;

  $$props.class = "";

  let mounted = false;
  const animation = void 0; // flip;
  export let axis = "x";
  export let background = false;
  export let clamp = 0;
  export let classNames = {
    root: "slidy",
    slides: "slidy-slides",
    slide: "slidy-slide",
  };
  export let duration = 850;
  export let easing = ease; // (t: number) => t;
  export let gravity = 1.2;
  export let i18n = i18nDefaults;
  export let indent = 2;
  export let index = 0;
  export let loop = true;
  export let groups = 0;
  export let sensity = 5;
  export let snap = "center";
  setContext("classNames", classNames);
  setContext("i18n", i18n);

  // let placeholderHidden = false;
  // $: if (showPlaceholder == false) placeholderHidden = true;
  $: length = slides.length;

  export let slides: carouselMediaInfo[] = [];
  export let enabled = false;

  const getActiveIndex = () => index;

  function next() {
    index++; //(getActiveIndex() + 1) % length;
  }

  function prev() {
    index--;
  }

  function onIndexChange(e: CustomEvent<{ index: number }>) {
    index = e.detail.index;
    console.log("i", index);
  }

  const mouseStart = { x: 0, y: 0 };
  function onMouseDown(e: MouseEvent) {
    mouseStart.x = e.clientX;
    mouseStart.y = e.clientY;
  }

  function onMouseUp(e: MouseEvent, i: number) {
    const mouseEnd = { x: e.clientX, y: e.clientY };
    const diff = Math.max(mouseEnd.x - mouseStart.x, mouseEnd.y - mouseStart.y);
    if (diff < 10) index = i;
  }
</script>

<!-- <div bind:this={root} class={"snap-carousel-container " + $$props.class}>
  <slot />
</div> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section aria-roledescription={i18n.carousel} aria-orientation="horizontal" class={classNames?.root + " !block "} on:mousedown={onMouseDown}>
  <ol
    class:opacity-0={!mounted}
    class={classNames?.slides + " !py-4"}
    aria-live="polite"
    role="listbox"
    tabindex="0"
    on:destroy
    on:index
    on:index={onIndexChange}
    on:keys
    on:mount={() => (mounted = true)}
    on:move
    on:resize
    on:update
    use:slidyAction={{
      enabled,
      animation,
      axis,
      clamp,
      duration,
      easing,
      gravity,
      indent,
      index,
      loop,
      sensity,
      snap,
    }}
  >
    {#each slides as item, i (item.id)}
      {@const active = i === index}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li use:attachZoom={{}} aria-current={active ? "true" : undefined} data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} class={classNames?.slide + " relative overflow-hidden rounded-xl"} class:active class:bg={background} role="group" on:mouseup={(e) => onMouseUp(e, i)}>
        {#if item.type === "img"}
          <LqipPicture picture={item} class={" !h-80 rounded-none w-auto"} {loadHiRez} />
        {:else if item.type === "video"}
          <LqipVideo video={item} class={" !h-80 rounded-none w-auto"} {loadHiRez} />
        {/if}
        <div class="absolute top-1/2 left-1/2">{i}</div>
      </li>
    {/each}
  </ol>

  <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn left-4" on:click={prev}>(</button>
  <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn right-4" on:click={next}>)</button>
</section>

<!-- <Slidy
  {slides}
  loop={true}
  arrows={true}
  axis="x"
  counter={false}
  snap="center"
  gap={0}
  animation={flip}
  classNames={{
    ...classNames,
    slides: classNames.slides + " !py-4 ",
    root: classNames.root + " !h-96",
  }}
/> -->

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
  /* .slidy-slides {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .slidy-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .slidy-slide img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  } */
</style>
