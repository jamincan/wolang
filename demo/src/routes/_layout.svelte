<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
