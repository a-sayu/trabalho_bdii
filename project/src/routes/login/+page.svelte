<script>
  import { signIn } from "@auth/sveltekit/client";
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<main class="blue">
    <div class="login-box">
        <p>Conecte-se com o e-mail da UNESP:</p>
        <div class="google-box">
            <button on:click={() => signIn('google')}>
                 G
            </button>
        </div>
    </div>
</main>

<style>
    /* Add your styles back here */
    .google-box button {
        background: none;
        border: none;
        font-size: 1.5rem; /* Adjust as needed */
        cursor: pointer;
        color: inherit;
    }
</style>