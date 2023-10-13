<script lang="ts">
  import PageWrapper from '$lib/components/PageWrapper.svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  if (!$page.data.user) goto('/account/login')
</script>

<PageWrapper name="Account">
  <p>account info</p>
</PageWrapper>
