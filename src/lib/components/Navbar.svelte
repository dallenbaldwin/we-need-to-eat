<script lang="ts">
  import type { User } from '$lib/server'
  import NavbarLink from './NavbarLink.svelte'

  export let user: User | undefined
</script>

<div class="bg-base-100 sticky top-0">
  <div class="p-6 pb-0">
    <div class="navbar p-6 bg-primary text-primary-content rounded-lg">
      <div class="navbar-start">
        <NavbarLink to="/">we need to eat!</NavbarLink>
      </div>
      <div class="navbar-end">
        {#if user?.role === 'admin'}
          <NavbarLink to="/admin">admin</NavbarLink>
        {/if}
        <NavbarLink to="/sitemap">site map</NavbarLink>
        {#if user}
          <NavbarLink to="/eat">eat</NavbarLink>
          <NavbarLink to="/meals">meals</NavbarLink>
          <NavbarLink to="/account">account</NavbarLink>
        {:else}
          <NavbarLink to="/login">login</NavbarLink>
        {/if}
      </div>
    </div>
  </div>
</div>
