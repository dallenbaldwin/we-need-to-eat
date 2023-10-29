<script lang="ts">
  export let title: string | undefined
</script>

<svelte:head>
  <title>{title ? `${title} | ` : ''}We Need to Eat</title>
  <slot />
</svelte:head>
