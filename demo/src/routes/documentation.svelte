<script context="module">
  import marked from 'marked';
  export async function preload(page, session) {
    const res = await this.fetch(
      'https://raw.githubusercontent.com/jamincan/wolang/main/README.md'
    );
    const text = await res.text();
    const doc = marked(text);
    if (res.ok) {
      return { doc };
    } else {
      this.error(502, 'Unable to retrieve the documentation.');
    }
  }
</script>

<script>
  export let doc;
</script>

<svelte:head>
  <title>Wolang - Documentation</title>
</svelte:head>
<section>
  {@html doc}
</section>
