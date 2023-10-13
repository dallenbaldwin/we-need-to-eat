<!--
  @component
 -->
<script lang="ts">
  import type { User } from '../server/db/schema/User'
  import Anchor from './Anchor.svelte'
  import NavbarLink from './NavbarLink.svelte'

  export let user: User | undefined

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
      <div class="navbar-start">
        <Anchor href="/">we need to eat!</Anchor>
      </div>
      <div class="navbar-center">
        <NavbarLink to="/">home</NavbarLink>
        {#if user?.admin}
          <NavbarLink to="/admin">admin</NavbarLink>
        {/if}
        {#if user}
          <NavbarLink to="/eat">eat</NavbarLink>
          <NavbarLink to="/meals">meals</NavbarLink>
        {/if}
        <NavbarLink to="/account">account</NavbarLink>
      </div>
      <div class="navbar-end">
        <button on:click={() => setTheme('light')}>light</button>
        <button on:click={() => setTheme('dark')}>dark</button>
        <button on:click={() => setTheme()}>system</button>
      </div>
    </div>
  </div>
</div>
