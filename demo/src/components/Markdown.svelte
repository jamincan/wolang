<script>
  import { onMount } from 'svelte';
  import marked from 'marked';
  import Prism from 'prismjs';

  export let markdown;

  const html = marked.parse(markdown);

  onMount(() => Prism.highlightAll());
</script>

{@html html}
