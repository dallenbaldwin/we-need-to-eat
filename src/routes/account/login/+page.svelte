<script lang="ts">
  import type { ActionData } from './$types'
  import Anchor from '$lib/components/Anchor.svelte'

  export let form: ActionData
</script>

<h1>Login</h1>

<form action="?/login" method="POST">
  <div class="form-control">
    <label class="label" for="username">Username</label>
    <input class="input" id="username" name="username" type="text" required />
  </div>

  <div class="form-control">
    <label class="label" for="password">Password</label>
    <input
      class="input"
      id="password"
      name="password"
      type="password"
      required
    />
  </div>
  <div class="form-control">
    <label for="remember" class="label">Remember Me</label>
    <input type="checkbox" class="checkbox" />
  </div>

  <p>
    Don't have an account? <Anchor href="/account/register">Register</Anchor>
  </p>

  {#if form?.invalid}
    <p class="error">Username and password is required.</p>
  {/if}

  {#if form?.credentials}
    <p class="error">You have entered the wrong credentials.</p>
  {/if}

  <button class="btn btn-primary" type="submit">Log in</button>
</form>
