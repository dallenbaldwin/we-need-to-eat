<script lang="ts">
  import { enhance } from '$app/forms'
  import { Anchor, SvelteHead } from '$lib/components'
  import type { ActionData } from './$types'

  export let form: ActionData
  let password: string | undefined
  $: invalidPassword = !!password && !password.length
  let confirm: string | undefined
  $: invalidConfirm = !!confirm && !confirm.length
  $: disabled = invalidConfirm || invalidPassword || password !== confirm
</script>

<SvelteHead title="Register" />

<h1>Register</h1>

<form method="POST" use:enhance>
  <div class="form-control">
    <label class="label" for="username">Username</label>
    <input class="input" id="username" name="username" type="text" required />
  </div>

  <div class="form-control">
    <label class="label" for="password">Password</label>
    <input
      bind:value={password}
      class={invalidPassword ? 'input input-error' : 'input'}
      id="password"
      name="password"
      type="password"
      required
    />
  </div>
  <div class="form-control">
    <label class="label" for="confirm">Confirm Password</label>
    <input
      bind:value={confirm}
      class={invalidConfirm ? 'input input-error' : 'input'}
      id="confirm"
      name="confirm"
      type="password"
      required
    />
  </div>

  <p>
    Already have an account? <Anchor href="/login">Log in</Anchor>
  </p>

  {#if form?.reason}
    <p class="error">{form.reason}</p>
  {/if}

  <button class="btn btn-primary" {disabled} type="submit">Register</button>
</form>
