<script lang="ts">
  import Anchor from './Anchor.svelte'

  export let to: string
</script>

<Anchor class="px-2" href={to}><slot /></Anchor>
