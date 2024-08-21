<script lang="ts">
  export let onclick = () => console.log("clicked");
  export let iconUrl = "";

  let focused = false;
  let hovered = false;
  const onfocus = () => (focused = true);
  const onblur = () => (focused = false);
  const onmouseenter = () => (hovered = true);
  const onmouseleave = () => (hovered = false);
  const onkeypress = (e: KeyboardEvent) => {
    if (focused && (e.key === "Enter" || e.key === " ")) onclick();
  };
</script>

<svg class="absolute size-40 bottom-0 right-0" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
  <path class="curve-path focus:ring-0 focus:outline-none stroke-transparent focus:stroke-primary-400-600 active:stroke-primary-200-800 fill-primary-800-200" class:fill-primary-950={focused || hovered} role="button" tabindex="0" {onmouseenter} {onmouseleave} {onfocus} {onblur} {onkeypress} {onclick} d="M60 0v60H0c33.115 0 60-26.885 60-60z" />
</svg>
<div class="absolute size-10 bottom-2 right-2 bg-contain bg-no-repeat pointer-events-none" class:icon-zoom={focused || hovered} style={`background-image: url("${iconUrl}")`}></div>

<style>
  .curve-path {
    transition: fill 0.3s;
    stroke-width: 1;
    paint-order: fill stroke;
  }
  .icon-zoom {
    transform: scale(1.2);
  }
</style>
