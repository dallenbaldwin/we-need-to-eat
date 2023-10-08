<script lang="ts">
  import Link from './Link.svelte'

  export let to: string
</script>

<Link class="px-2" href={to}><slot /></Link>
