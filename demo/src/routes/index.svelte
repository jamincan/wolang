<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(
      'https://raw.githubusercontent.com/jamincan/wolang/main/README.md'
    );
    const markdown = await res.text();

    if (res.ok) {
      return { markdown };
    } else {
      this.error(502, 'Unable to retrieve the documentation.');
    }
  }
</script>

<script>
  import Markdown from '../components/Markdown.svelte';

  export let markdown;
</script>

<svelte:head>
  <title>Wolang</title>
</svelte:head>

<Markdown {markdown} />
