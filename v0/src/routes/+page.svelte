<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<nav class="sticky">
  <ul class="list-inline">
    <li><a href="#a">Section A</a></li>
    <li><a href="#b">Section B</a></li>
    <li><a href="#c">Section C</a></li>
    <li><a href="#d">Section D</a></li>
    <li><a href="#a2">Section A</a></li>
    <li><a href="#b2">Section B</a></li>
    <li><a href="#c2">Section C</a></li>
    <li><a href="#d2">Section D</a></li>
  </ul>
</nav> -->

<!-- <main> -->
<div class="grid-tile" id="a">
  <article><h2>Section A</h2></article>
</div>
<div class="grid-tile" id="b">
  <article><h2>Section B</h2></article>
</div>
<div class="grid-tile" id="c">
  <article><h2>Section C</h2></article>
</div>
<div class="grid-tile" id="d">
  <article><h2>Section D</h2></article>
</div>

<div class="grid-tile" id="a2">
  <article><h2>Section A</h2></article>
</div>
<div class="grid-tile" id="b2">
  <article><h2>Section B</h2></article>
</div>
<div class="grid-tile" id="c2">
  <article><h2>Section C</h2></article>
</div>
<div class="grid-tile" id="d2">
  <article><h2>Section D</h2></article>
</div>

<!-- </main> -->

<style>
  .grid-tile {
    color: #ffffff;
    overflow: hidden;
    width: 100vw;
    flex: 1 0 auto;
    height: calc(100vh);
    margin: 0;
    scroll-margin-top: 1em;
    /* scroll-snap-stop: normal;
    scroll-snap-align: end; */
    list-style-type: none;
    background: white;
    font-family: monospace;
    font-size: 3rem;
    line-height: 12vw;
    text-align: center;
    counter-increment: items 1;
  }

  #a,
  #a2 {
    background-color: #0074d9;
  }
  #b,
  #b2 {
    background-color: #2ecc40;
  }
  #c,
  #c2 {
    background-color: #ff851b;
  }
  #d,
  #d2 {
    background-color: #b10dc9;
  }

  h2 {
    margin: 0;
    padding: 0;
  }

  /**
 * Sticky navigation
 */
  .sticky {
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }

  /**
 * Display lists on a single line.
 * @bugfix Prevent webkit from removing list semantics
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
  .list-inline {
    list-style: none;
    margin-left: -0.5em;
    margin-right: -0.5em;
    padding: 0;
  }

  .list-inline > li {
    display: inline-block;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  .list-inline > li:before {
    content: "\200B"; /* 1 */
    position: absolute; /* 2 */
  }
</style>
