<script>
  import { browser } from "$app/environment";
  import Err404 from "$components/Err404.svelte";

  // redirect to lowecase page if the path is not lowercase
  if (browser && window.location.pathname !== window.location.pathname.toLowerCase()) {
    window.location.href = window.location.pathname.toLowerCase() + window.location.search + window.location.hash;
  }
</script>

<Err404 />
