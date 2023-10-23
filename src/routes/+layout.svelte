<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/Navbar.svelte'
  import type { LayoutData } from './$types'
  import favicon from '$lib/assets/favicon/default.png'

  export let data: LayoutData
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<Navbar user={data?.user} />
<div class="p-6">
  <slot />
</div>
