<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(60, 255, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    padding: 0 1em;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(60, 255, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">Main</a>
    </li>
    <li>
      <a
        aria-current={segment === 'documentation' ? 'page' : undefined}
        href="documentation">Documentation</a>
    </li>
    <li>
      <a
        aria-current={segment === 'langref' ? 'page' : undefined}
        href="langref">Language Reference</a>
    </li>
    <li>
      <a aria-current={segment === 'demo' ? 'page' : undefined} href="demo">Demo</a>
    </li>
  </ul>
</nav>
