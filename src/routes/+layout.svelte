<script lang="ts">
  import '../app.css'
  import { Navbar } from '$lib/components'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Navbar user={data?.user} />
<div class="p-6">
  <slot />
</div>
