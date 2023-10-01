<!--
  @component
 -->
<script lang="ts">
  import Navlink from './Navlink.svelte'

  function setTheme(theme?: 'light' | 'dark') {
    if (!theme) localStorage.removeItem('theme')
    else localStorage.setItem('theme', theme)

    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const classList = document.documentElement.classList
    if (theme === 'dark') classList.add('dark')
    else if (!theme && prefers) classList.add('dark')
    else classList.remove('dark')
  }
</script>

<nav class="flex justify-between p-3">
  <span>We Need to Eat!</span>
  <span>
    <Navlink to="/">Home</Navlink>
    <Navlink to="/about">About</Navlink>
    <Navlink to="/admin">Admin</Navlink>
    <Navlink to="/eat">Eat</Navlink>
    <Navlink to="/meals">Meals</Navlink>
    <Navlink to="/account">Account</Navlink>
  </span>
  <span>
    <button on:click={() => setTheme('light')}>light</button>
    <button on:click={() => setTheme('dark')}>dark</button>
    <button on:click={() => setTheme()}>system</button>
  </span>
</nav>
