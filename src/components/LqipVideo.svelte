<script lang="ts">
  export let video: { type: "video"; title?: string; formats: { src: string; type: string }[]; placeholder: { src: string; width: number; height: number; lqip: string } };
  export let loadHiRez: boolean = false;

  let shouldLoad = false;
  let loaded: boolean = false;
  let loadedOnce: boolean = false;

  $: if (loadHiRez) {
    shouldLoad = true;
  } else {
    loaded = false;
    setTimeout(() => {
      if (!loadHiRez) shouldLoad = false;
      else if (loadedOnce) loaded = true;
    }, 600);
  }
</script>

<figure style={`background-image: url(${video.placeholder.lqip}); background-size:cover; aspect-ratio: ${video.placeholder.width} / ${video.placeholder.height}`} class={$$props.class + " blurable"} class:blur={!loaded}>
  {#if shouldLoad}
    <video
      width={video.placeholder.width || ""}
      height={video.placeholder.height || ""}
      class={" pic"}
      class:loaded
      title={video.title || ""}
      poster={shouldLoad ? video.placeholder.src : ""}
      loop
      autoplay
      muted
      playsinline
      on:canplay={(e) => {
        loadedOnce = true;
        loaded = true;
        e.currentTarget.play();
      }}
    >
      {#each video.formats as fmt}
        <source src={fmt.src} type={fmt.type} />
      {/each}
    </video>
  {/if}
</figure>

<style>
  .pic {
    transition: opacity ease-in 0.6s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
  }
  .pic.loaded {
    /* transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1); */
    opacity: 1;
  }

  .blurable {
    transition: filter linear 0.6s;
    filter: blur(0);
  }

  .blur {
    filter: blur(4px);
  }
</style>
