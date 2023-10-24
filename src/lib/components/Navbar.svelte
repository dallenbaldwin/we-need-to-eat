<script lang="ts">
  import type { User } from '$lib/server'
  import Anchor from './Anchor.svelte'
  import NavbarLink from './NavbarLink.svelte'
  import Profile from './icons/Profile.svelte'
  import SiteMap from './icons/SiteMap.svelte'

  export let user: User | undefined
</script>

<div class="bg-base-100 sticky top-0">
  <div class="p-6 pb-0">
    <div class="navbar p-6 bg-primary text-primary-content rounded-lg">
      <div class="navbar-start">
        <NavbarLink tooltip="home" to="/">we need to eat!</NavbarLink>
      </div>
      <div class="navbar-end">
        {#if user?.role === 'admin'}
          <NavbarLink to="/admin">admin</NavbarLink>
        {/if}
        {#if user}
          <NavbarLink to="/eat">eat</NavbarLink>
          <NavbarLink to="/meals">meals</NavbarLink>
        {/if}
        <NavbarLink tooltip to="/sitemap"><SiteMap /></NavbarLink>
        <NavbarLink tooltip to="/account"><Profile /></NavbarLink>
      </div>
    </div>
  </div>
</div>
