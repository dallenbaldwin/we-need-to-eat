<!--
  @component
 -->
<script lang="ts">
  import type { User } from '..'

  export let user: User | undefined

  import Navlink from './Navlink.svelte'

  function setTheme(theme?: 'light' | 'dark') {
    if (!theme) localStorage.removeItem('theme')
    else localStorage.setItem('theme', theme)

    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches

    const set = (theme: string) =>
      document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'dark') set('dark')
    else if (!theme && prefers)
      document.documentElement.removeAttribute('data-theme')
    else set('light')
  }
</script>

<div class="bg-base-100 sticky top-0">
  <div class="p-6 pb-0">
    <div class="navbar p-6 bg-primary text-primary-content rounded-lg">
      <div class="navbar-start">we need to eat!</div>
      <div class="navbar-center">
        <Navlink to="/">home</Navlink>
        {#if user?.admin}
          <Navlink to="/admin">admin</Navlink>
        {/if}
        {#if user}
          <Navlink to="/eat">eat</Navlink>
          <Navlink to="/meals">meals</Navlink>
        {/if}
        <Navlink to="/account">account</Navlink>
      </div>
      <div class="navbar-end">
        <button on:click={() => setTheme('light')}>light</button>
        <button on:click={() => setTheme('dark')}>dark</button>
        <button on:click={() => setTheme()}>system</button>
      </div>
    </div>
  </div>
</div>
