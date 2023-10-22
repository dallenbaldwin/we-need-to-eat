<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte'
  import { goto } from '$app/navigation'
  import type { PageData } from './$types'
  import { enhance } from '$app/forms'

  export let data: PageData
  if (!data.user) goto('/account/login')
</script>

<PageWrapper name="Account">
  <p>account info</p>
  <p>user id: {data.user?.id}</p>
  <p>username: {data.user?.username}</p>
  <form action="?/logout" use:enhance>
    <input type="submit" value="Logout" />
  </form>
</PageWrapper>
