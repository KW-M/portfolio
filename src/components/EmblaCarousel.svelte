<script lang="ts">
  import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import EmblaClassNames from "embla-carousel-class-names";
  import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { onDestroy } from "svelte";
  import { IconCaretBack, IconCaretForward } from "$lib/assets";
  import { disableBrowserBackSwipe } from "$lib/globals";

  const yPadding = 18;
  interface Props {
    color?: string;
    slides?: carouselMediaInfo[];
    class: string;
  }

  let { color = "bg-slate-900", slides = [], class: className = "" }: Props = $props();
  let length = $derived(slides.length);
  let zoomedSlide = -1;
  let centerSlide = $state(-1);
  let mounted = $state(false);

  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  const i18n = i18nDefaults;

  let emblaApi: EmblaCarouselType;

  function next() {
    emblaApi.scrollNext();
  }

  function prev() {
    emblaApi.scrollPrev();
  }

  function onSlideClick(clickIndex: number) {
    if (!emblaApi) return false;
    const index = emblaApi.selectedScrollSnap();
    if (index === clickIndex) {
      return true;
    } else {
      emblaApi.scrollTo(clickIndex);
      return false;
    }
  }

  function emblaInit(evt: CustomEvent<EmblaCarouselType>) {
    emblaApi = evt.detail;
    emblaApi.on("select", () => {
      centerSlide = emblaApi.selectedScrollSnap();
    });
    mounted = true;
  }

  let options: EmblaOptionsType = {
    loop: true,
    watchResize: true,
    align: "center",
    watchSlides: false,
    containScroll: "keepSnaps",
    breakpoints: {
      "(min-width:  48rem)": { loop: true },
      "(min-width:  64rem)": { loop: true },
      "(prefers-reduced-motion: reduce)": { duration: 0 },
    },
  };
  let plugins = [
    EmblaClassNames({
      draggable: "embla__dragable",
      dragging: "embla__dragging",
      active: true,
    }),
    // WheelGesturesPlugin({
    //   forceWheelAxis: "x",
    // }),
  ];

  onDestroy(() => {
    if (emblaApi) emblaApi.destroy();
  });
</script>

<section class="embla" class:embla__fullscreen={false} use:emblaCarouselSvelte={{ options, plugins }} onemblaInit={emblaInit}>
  <ol class="embla__container" aria-live="polite" role="listbox" tabindex="0" onmouseenter={() => disableBrowserBackSwipe.set(true)} onmouseleave={() => disableBrowserBackSwipe.set(true)}>
    {#each slides as item, i}
      {#if item != null}
        <li class="embla__slide embla__class-names" data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} role="group">
          {#if item.type === "img"}
            <LqipPicture picture={item} class={"w-auto h-full embla__slide__img"} loadHiRez={mounted} onClick={() => onSlideClick(i)} showZoom={true} />
          {:else if item.type === "video"}
            <LqipVideo video={item} class={"w-auto h-full embla__slide__img"} loadHiRez={mounted} isCentered={centerSlide === i} onClick={() => onSlideClick(i)} showZoom={true} />
          {/if}
        </li>
      {/if}
    {/each}
  </ol>
  <button class={"btn btn-icon cursor-pointer preset-filled-primary-400-600 text-contrast-primary-400-600  shadow-xl embla__btn left-4 btn-icon-xl md:btn-icon-2xl"} onclick={prev} aria-label="previous photo">
    <IconCaretBack class="pointer-events-none"></IconCaretBack>
  </button>
  <button class={"btn btn-icon cursor-pointer preset-filled-primary-400-600 text-contrast-primary-400-600 shadow-xl embla__btn right-4  btn-icon-xl md:btn-icon-2xl"} onclick={next} aria-label="next photo">
    <IconCaretForward class="pointer-events-none"></IconCaretForward>
  </button>
</section>

<style>
  .embla {
    /* --slide-height: 352px; */

    --slide-spacing: 1rem;
    --slide-size: 70%;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;
    border-bottom: 18px solid transparent;
    border-top: 18px solid transparent;

    height: calc(var(--spacing) * 44) /* 11rem = 176px */;
  }

  @media (width >= 48rem /* 768px */) {
    .embla {
      height: calc(var(--spacing) * 80) /* 20rem = 320px */;
    }
  }

  @media (width >= 64rem /* 1024px */) {
    .embla {
      height: calc(var(--spacing) * 96) /* 24rem = 384px */;
    }
  }
  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    /* margin-left: calc(var(--slide-spacing) * -1); */
    overscroll-behavior: contain;
    user-select: none;
    height: 100%;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 1 0 auto;
    margin-left: var(--slide-spacing);
    /* margin-right: var(--slide-spacing); */
    height: 100%;
  }
  .embla__slide {
    transition: opacity 0.2s ease-in-out;
  }
  .embla__slide {
    opacity: 1;
  }
  :global(.embla__dragable) {
    cursor: pointer;
  }
  :global(.embla__dragging) {
    cursor: grabbing;
  }
  :global(.embla__slide.is-snapped) {
    opacity: 1;
  }
  :global(.embla__slide.is-snapped button) {
    display: block;
  }
  .embla__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .embla.embla__fullscreen {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    border: 0;
  }

  .embla.embla__fullscreen .embla__slide {
    height: 100%;
  }

  :global(.embla.embla__fullscreen .embla__slide > div) {
    scale: 95%;
  }
</style>
