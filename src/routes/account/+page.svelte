<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte'
  import type { PageData } from './$types'
  import { enhance } from '$app/forms'

  export let data: PageData
</script>

<PageWrapper name="Account">
  <p>account info</p>
  <p>user id: {data.user?.id}</p>
  <p>username: {data.user?.username}</p>
  <p>role: {data.user?.role}</p>
  <form method="POST" action="?/logout" use:enhance>
    <button type="submit" class="btn">Logout</button>
  </form>
</PageWrapper>
