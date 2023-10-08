<!--
  @component
 -->
<script lang="ts">
  export let name: string | undefined
</script>

<svelte:head>
  <title>{name ? `${name} | ` : ''}We Need to Eat</title>
</svelte:head>

<slot />
