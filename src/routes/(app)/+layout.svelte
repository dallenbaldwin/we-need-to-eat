<script>
  import Navbar from '$lib/Navbar.svelte'
</script>

<Navbar
  links={[
    { href: '/home', label: 'Home' },
    { href: '/meals', label: 'Meals' },
  ]}
/>

<slot />
