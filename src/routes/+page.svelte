<script>
  import { backgrounds, graphicsExperiments } from "$lib/assets";
  import CloudRenderer from "../components/CloudRenderer.svelte";
  import ContentCard from "../components/ContentCard.svelte";
  const imageUrls = graphicsExperiments;
</script>

<!-- <div class="width-full py-80 bg-black z-50 relative">hi</div> -->
{#each [1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8] as i, index}
  <!-- <article class="prose tidbit midground bubble" style={`transform`}>
    <h1>Page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto
      aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium.
    </p>
  </article> -->
  <ContentCard {index} />
  <!-- snap-carousel-container -->
  <!--class="bg-black/50 h-full rounded-md snap-center flex-grow-1 mx-4 flex-shrink-0 basis-auto" alt="Post"  class:ml-96={i === 0} class:mr-96={i === imageUrls.length - 1} -->
  <!-- {#each imageUrls as imageUrl, i}
      <img src={imageUrl.src} alt="" />
    {/each} -->
  <!-- <SnapCarousel tag="div" onIndexChange={console.log}>
      {#each imageUrls as imageUrl, i}
        <img src={imageUrl} class="bg-black/50 h-full rounded-md snap-center flex-grow-1 flex-shrink-0 basis-auto mx-4" class:ml-96={i === 0} class:mr-96={i === imageUrls.length - 1} alt="Post" />
      {/each}
    </SnapCarousel> -->
  <!-- <Splide options={{ autoWidth: true, type: "loop", pagination: false, drag: true, lazyLoad: "nearby", autoplay: true, gap: "2em", focus: "center", wheel: true }} aria-label="Svelte Splide Example">
        <SplideSlide>
          <img src={backgrounds[0]} alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src={backgrounds[1]} alt="Image 2" />
        </SplideSlide>
        <SplideSlide>
          <img src={backgrounds[3]} alt="Image 3" />
        </SplideSlide>
      </Splide> -->
{/each}
<CloudRenderer />
<div style="position: absolute;top:20000vh">:)</div>

<!--
<style>
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
    max-width: 800px;
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

  :nth-child(3n + 0).tidbit.bubble {
    transform: translateX(calc(-40vw + 100%));
  }

  :nth-child(7n + 0).tidbit.bubble {
    transform: translateX(calc(40vw - 100%));
  }

  :nth-child(even).tidbit.bubble {
    transform: translateX(0);
  }
</style>
 -->

<style>
</style>
