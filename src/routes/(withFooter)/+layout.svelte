<script lang="ts">
  import Footer from '$lib/components/Footer.svelte'
</script>

<div class="pre-footer">
  <slot />
</div>
<Footer />

<style>
  .pre-footer {
    height: calc(100vh - 400px);
  }
</style>
