<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte'
  import type { PageData } from './$types'
  import Login from './Login.svelte'

  export let data: PageData
</script>

<PageWrapper name="Account">
  {#if !!data?.user}
    <p>account info</p>
  {:else}
    <Login />
  {/if}
</PageWrapper>
