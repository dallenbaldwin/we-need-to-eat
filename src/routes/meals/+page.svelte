<script lang="ts">
  import { SvelteHead } from '$lib/components'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<SvelteHead title="Meals" />

<h1>Meals</h1>
<p>where you manage your meals + recipes</p>
