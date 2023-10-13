<script lang="ts">
  import Anchor from './Anchor.svelte'
</script>

<footer class="footer p-10 bg-neutral text-neutral-content rounded-lg my-6">
  <nav>
    <header class="footer-title">We Need to Eat</header>
    <Anchor href="/about">About</Anchor>
    <Anchor external href="http://github.com/dallenbaldwin/we-need-to-eat"
      >GitHub</Anchor
    >
  </nav>
  <nav>
    <header class="footer-title">Legal</header>
    <Anchor href="/terms">Terms of use</Anchor>
    <Anchor href="/privacy">Privacy policy</Anchor>
    <Anchor href="/cookies">Cookie policy</Anchor>
  </nav>
</footer>
