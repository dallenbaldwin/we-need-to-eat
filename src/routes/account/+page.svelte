<script lang="ts">
  import type { PageData } from './$types'
  import { enhance } from '$app/forms'
  import { Computer, Moon, Sun, SvelteHead } from '$lib/components'

  export let data: PageData

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

<SvelteHead title="Account" />
<p>account info</p>
<p>user id: {data.user?.id}</p>
<p>username: {data.user?.username}</p>
<p>role: {data.user?.role}</p>
<p>
  theme: <span class="join">
    <button class="btn join-item" on:click={() => setTheme('light')}
      ><Sun /> light</button
    >
    <button class="btn join-item" on:click={() => setTheme('dark')}
      ><Moon /> dark</button
    >
    <button class="btn join-item" on:click={() => setTheme()}
      ><Computer /> system</button
    >
  </span>
</p>
<form method="POST" action="?/logout" use:enhance>
  <button type="submit" class="btn">Logout</button>
</form>
