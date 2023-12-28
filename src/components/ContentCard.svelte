<script lang="ts">
  import { backgrounds, graphicsExperiments, wikitrustDesktopVideo, wikitrustMobileVideo } from "$lib/assets";
  import { oneShotSubscribe, pickRandom } from "$lib/util";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import { convertRemToPixels } from "$lib/util";
  import { forgroundPixiCanvas, openCardIndex } from "$lib/consts";
  import type { Container } from "pixi.js";
  import { destroyCircularText, drawCircularText } from "$lib/circleWrapText";
  import Carousel from "./Carousel.svelte";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";

  const padding = convertRemToPixels(2);
  const imageUrls: carouselMediaInfo[] = graphicsExperiments.map((pic, i) => {
    return {
      id: i,
      type: "img",
      alt: "Image " + i,
      ...pic,
    };
  });
  imageUrls.splice(0, 0, Object.assign(wikitrustMobileVideo, { id: 9 }));
  imageUrls.splice(0, 0, Object.assign(wikitrustDesktopVideo, { id: 10 }));


  export let index = 0;
  export let carouselSlideIndex = 0;
  let DOT_SIZE = 280;
  let VIEWPORT_VISIBILITY_MARGIN = 200;
  let cardElement: HTMLDivElement;
  let cardClipElement: HTMLDivElement;
  let headerElem: HTMLDivElement;
  let maxHeight = DOT_SIZE;
  let xOffset = 0;
  let yOffset = 0;
  let hoverDisabled = false;
  let isExpanded = false;
  let isVisible = false;
  let carouselEnabled = false;

  const updateMaxHeight = () => {
    const availableWidth = window.innerWidth / 2 - padding - DOT_SIZE / 2;
    xOffset = Math.sin(index * 17.135159) * availableWidth;
    cardClipElement.style.height = cardElement.clientHeight + "px";
    if (openCardIndex.get() === index) maxHeight = cardElement.clientHeight;
    else maxHeight = DOT_SIZE;
  };

  const bubleIsOnscreen = () => {
    const rect = cardClipElement.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const checkScroll = () => {
    const scrollYadj = window.scrollY - 40;
    const clipTop = yOffset;
    const cardOpen = openCardIndex.get() === index;
    if (cardOpen) {
      isVisible = true;
      if ((scrollYadj + window.innerHeight * (3 / 4) < clipTop || scrollYadj > clipTop + cardElement.clientHeight) && openCardIndex.get() === index) {
        closeCard();
      }
    } else {
      if (clipTop + DOT_SIZE + VIEWPORT_VISIBILITY_MARGIN > scrollYadj && clipTop - VIEWPORT_VISIBILITY_MARGIN < scrollYadj + window.innerHeight) {
        if (isVisible === false) isVisible = true;
      } else if (isVisible === true) {
        isVisible = false;
      }
    }
  };

  window.addEventListener("scroll", checkScroll);

  const onClick = (event: MouseEvent) => {
    const rect = cardElement.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      closeCard();
    } else if (openCardIndex.get() !== index) {
      openCard();
    }
  };

  const openCard = () => {
    if (hoverDisabled) return;
    openCardIndex.set(index);
  };

  const closeCard = () => {
    hoverDisabled = true;
    setTimeout(() => {
      hoverDisabled = false;
    }, 400);
    openCardIndex.set(-1);
  };

  let unsub: () => void;
  let snapCarouselInstance;
  onMount(() => {
    checkScroll();
    // snapCarouselInstance = carousel(headerElem, { snap: true, snapAlign: "center", snapToCenter: true, snapToCenterThreshold: 0.5 });
    yOffset = index * (721 + DOT_SIZE) + 153;
    cardClipElement.style.top = yOffset + "px";
    unsub = openCardIndex.subscribe((value) => {
      if (value === index) {
        updateMaxHeight();
        window.addEventListener("resize", updateMaxHeight);
        window.addEventListener("mousedown", onClick);
        isExpanded = true;
        setTimeout(() => {
          if (isExpanded) carouselEnabled = true;
        }, 710);
      } else {
        updateMaxHeight();
        window.removeEventListener("resize", updateMaxHeight);
        window.removeEventListener("mousedown", onClick);
        isExpanded = false;
        carouselEnabled = false;
      }
    });
  });

  onDestroy(() => {
    if (unsub) unsub();
    window.removeEventListener("scroll", checkScroll);
    window.removeEventListener("resize", updateMaxHeight);
    window.removeEventListener("click", onClick);
  });
</script>

<div class="card-container midground" class:ui-forground={isExpanded} bind:this={cardClipElement} class:hidden={!isVisible}>
  <div class="card-clip bg-card-gradient" style={"max-height:" + maxHeight + "px;transform:translate(" + xOffset + "px, 2.5rem)"} class:expanded={isExpanded} on:click={openCard}>
    <!-- on:mouseenter={openCard}  -->
    <div class="card !bg-transparent overflow-hidden left-1/2 -translate-y-10 -translate-x-1/2 relative" bind:this={cardElement}>
      {#if isVisible}
        <Carousel enabled={true} loadHiRez={isExpanded} bind:index={carouselSlideIndex} class="bg-black/50 image-carousel-header py-8 snap-x flex-row flex snap-carousel-container" slides={imageUrls}></Carousel>
      {/if}
      <div class="p-8 space-y-8 bg-card-gradient">
        <h6 class="h6 text-center text-on-surface-token opacity-75" data-toc-ignore>Announcements</h6>
        <h2 class="h2 !mt-2 text-center" data-toc-ignore>Skeleton is Awesome! {index}</h2>

        <!-- <h2 class="text-2xl font-bold mb-2">Title</h2>
        <h3 class="text-lg font-medium mb-2">Subtitle</h3> -->
        <article class="prose text-on-surface-token">
          <p>
            <!-- cspell:disable -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
            <!-- cspell:enable -->
          </p>
          <p>
            <!-- cspell:disable -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
            <!-- cspell:enable -->
          </p>
          <p>
            <!-- cspell:disable -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
            <!-- cspell:enable -->
          </p>
          <p>Body text goes here.</p>
        </article>
      </div>
    </div>
  </div>
</div>

<style>
  .card-container {
    @apply px-6 absolute w-full;
    height: 280px;
    overflow: visible;
  }

  :global(.image-carousel-header) {
    @apply w-full h-1/2 snap-mandatory;
    height: 380px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    z-index: 1;
  }

  .carousel-padding {
    @apply h-full;
    width: 50%;
    flex: 1 0 50%;
  }

  .card-clip {
    cursor: pointer;
    width: calc(100vw - 40px);
    height: 900000px;
    overflow: hidden;
    @apply overflow-clip mx-auto relative block border-4 border-secondary-700;
    max-width: 280px;
    max-height: 280px;
    border-radius: 500px;
    border: 0;
    @apply shadow-2xl;
    /* bg-gradient-to-bl from-white to-surface-100/80; */
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .card-clip.expanded {
    @apply shadow-2xl rounded-3xl;
    max-width: 700px;
    /* background: transparent !important; */
    transform: translateX(0) !important;
  }

  .card-clip.expanded .card * {
    cursor: initial;
  }

  .card {
    /* @apply rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out;
    width: 300px;
    height: 300px; */
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    /* opacity: 0.2; */
    width: calc(100vw - 40px);
    max-width: 700px;
    height: fit-content;
    @apply overflow-y-auto overflow-x-clip;
  }

  .card-clip.expanded .card {
    opacity: 1;
    @apply translate-y-0;
  }
  /*
  .card-clip.expanded .image-carousel-header {
    @apply snap-mandatory;
    overflow-x: visible;
  } */

  .bg-card-gradient {
    @apply bg-gradient-to-bl from-orange-900/90 to-purple-900/90;
    /* background: rgba(0, 0, 0, 0.9) !important; */
    /* @apply bg-surface-700; */
  }

  .bg-card-gradient.expanded {
    /* @apply bg-black/90; */
    /* background: rgba(0, 0, 0, 0.8) !important; */

    /* @apply bg-surface-700; */
  }

  .image {
    @apply w-full h-2/3 bg-gray-300;
  }

  .content {
    @apply p-6;
  }

  .tidbit.bubble {
    @apply p-6  mx-auto relative block text-center border-4 border-secondary-700;
    /* box-shadow: 0 0 80px 45px white, 0 5px 4px 0 black; */
    /* background-color: rgba(255, 255, 255, 0.933); */
    @apply shadow-2xl;
    margin-top: 20vh;
    margin-bottom: 60vh;
    /* bg-gradient-to-bl from-white to-surface-100/80; */
    transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    overflow: hidden;
  }

  .tidbit.bubble:hover {
    @apply shadow-2xl rounded-3xl bg-white;
    transform: translateX(0) !important;
    max-width: 700px;
  }

  .tidbit.bubble {
    transform: translateX(20vw);
    max-width: 280px;
    max-height: 280px;
    height: 100vh;
    border-radius: 500px;
    @apply bg-gradient-to-bl from-orange-500/90 to-purple-400/90;
    border: 0;
  }
</style>
