<script lang="ts">
  export let href: string
  export let external = false
</script>

<a
  {href}
  rel={external ? 'no-referrer' : null}
  target={external ? 'black' : null}
  class="{$$props.class} link link-hover"><slot /></a
>
