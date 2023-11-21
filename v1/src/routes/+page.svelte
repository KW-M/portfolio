<script>
  import CloudRenderer from "../components/CloudRenderer.svelte";
</script>

<div class="space-x-2" />
{#each [1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 4, 5, 6, 8] as i}
  <article class="prose tidbit midground bubble" style={`transform`}>
    <!-- <h1>Page</h1> -->
    <!-- <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium. Inpu sumbai sorai. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque architecto
      aliquam repellendus tempora exercitationem, voluptates, odio impedit magni consectetur aspernatur nihil dicta dolore incidunt? Aliquam dolorum fuga eaque voluptatem accusantium.
    </p> -->
  </article>
{/each}
<CloudRenderer />

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
    @apply bg-gradient-to-bl from-orange-500/60 to-purple-400/60;
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
