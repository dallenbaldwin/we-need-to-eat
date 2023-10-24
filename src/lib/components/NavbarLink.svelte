<script lang="ts">
  import Anchor from './Anchor.svelte'

  export let to: string
  export let tooltip: string | boolean = false
</script>

<Anchor class="px-2" href={to}>
  {#if tooltip}
    <span class="tooltip" data-tip={tooltip === true ? to.slice(1) : tooltip}>
      <slot />
    </span>
  {:else}
    <slot />
  {/if}
</Anchor>
