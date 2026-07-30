<script lang="ts">
  interface Props {
    svg: string;
    size?: string;
    color?: string;
  }

  let { svg, size = "w-4 h-4", color = "text-current" }: Props = $props();

  const html_svg = svg.replace(/<svg/, `<svg class="${size} ${color} fill-current"`);
</script>

{@html html_svg}
<div class="fill-current"></div>
