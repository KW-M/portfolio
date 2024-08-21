<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { getVisibleSpiralPoints } from "../lib/spiralGen";
  import { categoryIcons } from "../lib/assets";
  import { fade } from "svelte/transition";
  import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
  import { browser } from "$app/environment";
  import { base } from "$app/paths";

  const iconMap: { [key: string]: string } = {
    Highlights: categoryIcons.favorites,
    Robotics: categoryIcons.robotics,
    "Web Dev": categoryIcons.webDev,
    "Game Dev": categoryIcons.graphics,
    "Data Science": categoryIcons.science,
    Experiments: categoryIcons.experiments,
    Eco: categoryIcons.environment,
  };
  const colors = ["bg-yellow-500", "bg-orange-500", "bg-blue-500", "bg-purple-500", "bg-teal-500", "bg-green-500", "bg-indigo-500"];

  let ready = false;
  export let categoryNames: string[] = [];
  const categories = categoryNames.map((name) => ({ name, icon: iconMap[name] || "" }));
  const categoryCount = categories.length;
  // const categories = [
  //   { name: "Highlights", icon: categoryIcons.favorites },
  //   { name: "Robotics", icon: categoryIcons.robotics },
  //   { name: "Web Dev", icon: categoryIcons.webDev },
  //   { name: "Game Dev", icon: categoryIcons.graphics },
  //   { name: "Data Science", icon: categoryIcons.science },
  //   // { name: "GIS", icon: categoryIcons.environment },
  //   { name: "Experiments", icon: categoryIcons.experiments },

  //   { name: "Eco" },
  //   { name: "Python" },
  //   { name: "Backend" },
  //   { name: "Frontend" },
  //   { name: "React" },
  //   { name: "Svelte" },
  //   { name: "Node" },
  //   { name: "MongoDB" },
  //   { name: "PostgreSQL" },
  //   { name: "SQL" },
  //   { name: "Graph DB" },
  //   { name: "REST" },
  //   { name: "APIs" },
  //   { name: "Docker" },
  //   { name: "Kubernetes" },
  //   { name: "CI/CD" },
  //   { name: "Testing" },
  //   { name: "Security" },
  //   { name: "Performance" },
  //   { name: "Design" },
  //   { name: "UX" },
  //   { name: "UI" },
  //   { name: "Accessibility" },
  //   { name: "Responsive" },
  //   { name: "Animations" },
  //   { name: "SVG" },
  //   { name: "Canvas" },
  //   { name: "WebGL" },
  //   { name: "Three.js" },
  //   { name: "Unity" },
  //   { name: "Unreal" },
  //   { name: "Blender" },
  //   { name: "Photoshop" },
  //   { name: "Illustrator" },
  //   { name: "InDesign" },
  //   { name: "Figma" },
  //   { name: "Sketch" },
  //   { name: "Zeplin" },
  //   { name: "Framer" },
  //   { name: "Principle" },
  //   { name: "After Effects" },
  //   { name: "Premiere" },
  //   { name: "Final Cut" },
  //   { name: "Logic" },
  //   { name: "Ableton" },
  //   { name: "Pro Tools" },
  //   { name: "Max" },
  //   { name: "Pure Data" },
  //   { name: "Reaktor" },
  //   { name: "SuperCollider" },
  //   { name: "TidalCycles" },
  //   { name: "Sonic Pi" },
  //   { name: "Arduino" },
  //   { name: "Raspberry Pi" },
  //   { name: "ESP32" },
  //   // open source contributions?
  // ];

  let screenWidth = browser ? innerWidth : 768;
  let screenHeight = browser ? innerHeight : 1024;

  // generateSpiralPoints(categoryCount);
  let spiralPoints: { x: number; y: number }[] = [];
  const onResize = () => {
    screenWidth = browser ? innerWidth : 768;
    screenHeight = browser ? innerHeight : 1024;
    const scale = Math.log((screenWidth + screenHeight) / 2);
    spiralPoints = getVisibleSpiralPoints(categoryCount, scale, screenWidth - 200, screenHeight - 200);
  };

  onResize();

  onMount(() => {
    if (browser) {
      window.addEventListener("resize", onResize);
      ready = true;
    }
  });

  onDestroy(() => {
    if (browser) window.removeEventListener("resize", onResize);
  });
</script>

{#if ready}
  <div class="inset-0 w-100 overflow-visible left-1/2 top-1/2 absolute">
    {#each spiralPoints as { x, y }, i}
      {@const category = categories[i]}
      {@const color = colors[i % 6]}
      <div class="absolute" style={`Transform: translate(${x}px,${y}px)`} in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY + 50 * i }} out:fade|global={{ duration: PAGE_FADE_DURATION }}>
        {#if category.icon}
          <!-- <a href={`${base}/cat/${categories[i].name}`} class="dot-button-contnr" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY + 50 * i }} out:fade|global={{ duration: PAGE_FADE_DURATION }} style={`Transform: translate(${screenWidth / 2 + x}px,${screenHeight / 2 + y}px)`}>
            <div class:dot-caption={true} class={color}>{category.name}</div>
          </a> -->
          <a href={`${base}/cat/${categories[i].name}`} class={"min-w-20 translate-y-12 btn btn-md absolute bg-tap-target-xl flex-shrink  w-min " + color}>
            <div tabindex="-1" class={"w-full aspect-square rounded-t-full bg-center bg-size-32 bg-no-repeat absolute left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 " + color} style={`background-image: url("${category.icon}")`}></div>
            <span>{category.name}</span>
          </a>
        {:else}
          <a href={`${base}/cat/${categories[i].name}`} class={"btn btn-md absolute bg-tap-target-xl " + color}>
            {category.name}
          </a>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .bg-size-32 {
    background-size: 3rem;
  }

  .bg-tap-target-xl::before {
    content: " ";
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: transparent;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100000px;
  }

  .dot-button-contnr {
    display: block;
    position: absolute;
    top: calc(-100px - 2.75em);
    left: -100px;
    width: 200px;
    height: calc(100px + 5.5em);
    /* border: 1px solid black; */
    overflow: hidden;
    text-align: center;
    color: black;
    cursor: pointer;
  }

  .dot-button-contnr:hover .dot-circle-btn {
    opacity: 1;
    transform: scale(1.1);
  }

  .dot-circle-btn {
    width: 100px;
    height: 100px;
    background-position: center;
    margin: 2.5em auto 0.5em auto;
    border-radius: 50%;
    background-repeat: no-repeat;

    opacity: 0.7;
    background-size: 70px;
  }

  .dot-button-contnr:hover .dot-caption {
    opacity: 1 !important;
    transform: scale(1.1);
  }

  .dot-caption {
    height: 2em;
    line-height: 2em;
    /* background-color: white; */
    border-radius: 50px;
    font-size: large;
    white-space: nowrap;
    padding: 0 1em;
    margin: 0 auto;
    font-weight: bold;
    width: min-content;
    min-width: 100px;

    opacity: 0.7;
  }

  .dot-caption-only {
    margin-top: 50%;
    transform: translateY(-1.5em);
    opacity: 0.5;
  }

  .dot-button-contnr:hover .dot-caption-only {
    opacity: 1 !important;
    transform: translateY(-1.5em) scale(1.1);
  }
</style>
