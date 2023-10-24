<!--
  @component
 -->
<script lang="ts">
  import type { User } from '../server/db/schema/User'
  import Anchor from './Anchor.svelte'
  import NavbarLink from './NavbarLink.svelte'
  import ChevronDown from './icons/ChevronDown.svelte'
  import Computer from './icons/Computer.svelte'
  import Moon from './icons/Moon.svelte'
  import PaintBrush from './icons/PaintBrush.svelte'
  import Sun from './icons/Sun.svelte'
  import Ellipsis from './icons/Ellipsis.svelte'

  export let user: User | undefined

  let open = false
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
        {#if user?.role === 'admin'}
          <NavbarLink to="/admin">admin</NavbarLink>
        {/if}
        {#if user}
          <NavbarLink to="/eat">eat</NavbarLink>
          <NavbarLink to="/meals">meals</NavbarLink>
          <NavbarLink to="/account">account</NavbarLink>
        {:else}
          <NavbarLink to="/login">login</NavbarLink>
        {/if}

        <details class="dropdown px-2">
          <summary class="btn btn-ghost">
            <Ellipsis />
          </summary>
          <ul
            class="menu dropdown-content z-[1] p-2 shadow bg-secondary rounded-box mt-1 min-w-max"
          >
            <li>
              <NavbarLink to="/about">about</NavbarLink>
            </li>
            <li>
              <NavbarLink to="/terms">terms of use</NavbarLink>
            </li>
            <li>
              <NavbarLink to="/privacy">privacy policy</NavbarLink>
            </li>
            <li>
              <NavbarLink to="/cookies">cookies</NavbarLink>
            </li>
          </ul>
        </details>
      </div>
      <div class="navbar-end">
        <details class="dropdown dropdown-hover dropdown-end" bind:open>
          <summary class="btn btn-ghost"
            ><PaintBrush /> theme <ChevronDown /></summary
          >
          <ul
            class="mt-1 p-2 shadow menu dropdown-content z-[1] bg-secondary rounded-box"
          >
            <li>
              <button class="btn btn-ghost" on:click={() => setTheme('light')}
                ><Sun /> light</button
              >
            </li>
            <li>
              <button class="btn btn-ghost" on:click={() => setTheme('dark')}
                ><Moon /> dark</button
              >
            </li>
            <li>
              <button class="btn btn-ghost" on:click={() => setTheme()}
                ><Computer /> system</button
              >
            </li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</div>

<style>
  details > summary::-webkit-details-marker,
  details > summary::marker {
    display: none;
  }
</style>
