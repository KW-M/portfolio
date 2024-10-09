<script lang="ts">
  export let svg: string;
  export let size: string = "w-4 h-4";
  export let color: string = "text-current";

  const html_svg = svg.replace(/<svg/, `<svg class="${size} ${color} fill-current"`);
</script>

{@html html_svg}
<div class="fill-current"></div>
