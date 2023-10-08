<script lang="ts">
  import Link from './Link.svelte'
</script>

<footer class="footer p-10 bg-neutral text-neutral-content rounded-lg my-6">
  <nav>
    <header class="footer-title">We Need to Eat</header>
    <Link href="/about">About</Link>
    <Link external href="http://github.com/dallenbaldwin/we-need-to-eat"
      >GitHub</Link
    >
  </nav>
  <nav>
    <header class="footer-title">Legal</header>
    <Link href="/terms">Terms of use</Link>
    <Link href="/privacy">Privacy policy</Link>
    <Link href="/cookies">Cookie policy</Link>
  </nav>
</footer>
