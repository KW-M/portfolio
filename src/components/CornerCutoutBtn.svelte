<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    onclick: () => {};
    icon?: typeof SvelteComponent;
  }

  let { onclick = () => {}, icon } = $props();

  let focused = $state(false);
  let hovered = $state(false);
  const onfocus = () => (focused = true);
  const onblur = () => (focused = false);
  const onmouseenter = () => (hovered = true);
  const onmouseleave = () => (hovered = false);
  const onkeypress = (e: KeyboardEvent) => {
    if (focused && (e.key === "Enter" || e.key === " ")) onclick();
  };
</script>

<!-- preset-filled-primary-400-600 text-contrast-primary-400-600 -->
<svg class="absolute size-40 bottom-0 right-0 !m-0" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
  <path
    class={`curve-path focus:ring-0 focus:outline-hidden stroke-transparent  cursor-pointer ${hovered || focused ? "fill-primary-300-700 " : "fill-primary-500"}`}
    role="button"
    tabindex="0"
    {onmouseenter}
    {onmouseleave}
    {onfocus}
    {onblur}
    {onkeypress}
    onclick={() => {
      onclick();
    }}
    d="M60 0v60H0c33.115 0 60-26.885 60-60z"
  />
</svg>
{#if icon}
  {@const IconComponent = icon}
  <IconComponent class={`absolute m-0! text-primary-contrast-300-700  size-7 bottom-3 right-4 pointer-events-none ${focused || hovered ? "animate-pulse" : ""}`} />
{/if}

<style>
  .curve-path {
    transition: fill 0.3s;
    stroke-width: 1;
    paint-order: fill stroke;
  }
</style>
