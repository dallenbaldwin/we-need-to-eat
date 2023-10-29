<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>plan for a specific date</h1>
<pre>{data?.date}</pre>
