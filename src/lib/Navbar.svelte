<!--
  @component
 -->
<script lang="ts">
  export let links: { href: string; label: string }[] = []
</script>

<nav>
  {#each links as { href, label }}
    <a {href}>{label}</a>
  {/each}
</nav>
