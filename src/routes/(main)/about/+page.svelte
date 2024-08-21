<script>
  import Article, { ArticleType } from "../../../components/Article.svelte";
  import MainContainer from "../../../components/MainContainer.svelte";
  import profilePic from "../../../images/profile-photo2.png";
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<MainContainer>
  <img src={profilePic} alt="me" class="w-60 h-60 mx-auto my-28" />
  <Article title="About" articleType={ArticleType.plain}>
    <p>Recent UC Santa Cruz grad finding ways to make the world a better place. Enjoys coding, camping, climbing, cooking, cats and learning about this wacky universe we call home.</p>
  </Article>
</MainContainer>
