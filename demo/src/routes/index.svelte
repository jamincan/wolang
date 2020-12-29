<script>
</script>

<style>
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    text-align: center;
    margin: 0 auto;
  }

  h1 > strong {
    display: inline;
    text-decoration: underline;
    text-decoration-color: rgb(60, 255, 0);
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Wolang</title>
</svelte:head>

<h1><strong>wo</strong>lang</h1>

<p>Wolang is a human-centric language for describing cycling workout.</p>
<pre>
  <code>
# Sample Workout
10 min @ 150W "warmup"
2x 
  5 min @ 250W
  1 min @ 190W
10 min @ 150W "cooldown"
  </code>
</pre>
