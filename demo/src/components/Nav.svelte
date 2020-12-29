<script>
  export let segment;
</script>

<style>
  nav {
    background: #efefff;
  }
  nav div {
    max-width: 56em;
    padding: 0 0.5em;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 6em 3em;
    align-items: center;
  }
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 8em;
    font-weight: 400;
    margin-top: 0.5em;
    text-align: center;
  }

  h1 > strong {
    text-decoration: underline;
    text-decoration-color: rgb(60, 255, 0);
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: inline-block;
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
  <div>
    <h1><strong>wo</strong>lang</h1>
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
          aria-current={segment === 'specification' ? 'page' : undefined}
          href="specification">Specification</a>
      </li>
      <li>
        <a aria-current={segment === 'demo' ? 'page' : undefined} href="demo">Demo</a>
      </li>
    </ul>
  </div>
</nav>
