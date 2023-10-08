<!--
  @component
 -->
<script lang="ts">
  import { enhance } from '$app/forms'
</script>

<div class="hero">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form use:enhance method="post" action="?/login" class="card-body">
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            class="input input-bordered"
            required
          />
          <!-- <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label> -->
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
