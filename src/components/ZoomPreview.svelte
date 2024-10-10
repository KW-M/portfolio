<script lang="ts" context="module">
  import nStore from "$lib/libraries/nStore";
  import { onMount } from "svelte";

  type zoomElemData = {
    limboNode: HTMLElement;
    originalParent: HTMLElement;
    zoomed: boolean;
  };

  type zoomOptions = {
    zoomed: boolean;
    width: number;
    height: number;
  };

  let zoomedElemContainer: HTMLDivElement | null;
  const zoomsInLimbo = nStore<zoomElemData[]>([]);
  export const zoomAction = (node: HTMLElement, options: zoomOptions) => {
    return {
      update(options: zoomOptions) {
        console.log("updateZoom", options, node, zoomedElemContainer);
        if (!zoomedElemContainer) return;
        zoomsInLimbo.update((zooms) => {
          const zoomDataIndex = zooms.findIndex((z) => z.limboNode === node);

          // handle new zooms:
          if (zoomDataIndex === -1) {
            if (!options.zoomed) return zooms;
            (zoomedElemContainer as HTMLDivElement).appendChild(node);
            for (let z of zooms) z.zoomed = false;
            zooms.push({
              limboNode: node,
              originalParent: node.parentElement!,
              zoomed: true,
            });

            // handle existing zooms:
          } else {
            // ignore non changes
            const zoomData = zooms[zoomDataIndex];
            if (!options.zoomed && !zoomData.zoomed) return zooms;
            else if (options.zoomed && zoomData.zoomed) return zooms;

            // update the zoomed state
            for (let z of zooms) z.zoomed = false;
            zoomData.zoomed = options.zoomed;
          }

          return zooms;
        });
      },
      destroy: () => {},
    };
  };
</script>

<script lang="ts">
  let zoomContainer: HTMLDivElement;
  onMount(() => {
    zoomedElemContainer = zoomContainer;
  });
</script>

<div id="img_zoom_backdrop" class="z-40" bind:this={zoomContainer}>
  <!-- Zoomed Images go here -->
</div>

<!-- <div class="fixed inset-0 w-full h-full z-50 pointer-events-none" transition:fade={{ duration: TRANSITION_DURRATION }}>
  <button on:click={() => previewZoomOpen.set(false)} class="btn-icon btn-icon-lg cursor-zoom-out pointer-events-auto preset-filled-surface-950-50 absolute top-4 right-4 bg-no-repeat bg-center bg-size-32" aria-label="close image zoom"></button>
</div> -->

<style>
  /* .bg-size-32 {
    background-size: 32px;
  } */
  #img_zoom_backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: all;
    @apply bg-black cursor-zoom-out;
  }

  :global(#img_zoom_backdrop *) {
    position: absolute;
    max-height: 100%;
    max-width: 100%;
    height: 100%;
  }
</style>
