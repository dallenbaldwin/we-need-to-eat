<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>Account</h1>

{#if !!data?.user}
  <p>account info</p>
{:else}
  <p>log in/register</p>
{/if}
