<script>
  import Navbar from '$lib/Navbar.svelte'
</script>

<Navbar
  links={[
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Signup' },
    { href: '/admin', label: 'Admin' },
  ]}
/>

<slot />
