<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { page } from "$app/state";

    const session = $derived(page.data.session);
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<main class="blue">
    {#if session?.user}
        <div class="welcome-box profile-card">
            <div class="card-content">
                <div class="user-info-row">
                    <div class="profile-icon">
                        <img
                            src={session.user.image}
                            alt="👤"
                            class="profile-img-content"
                        />
                    </div>
                    <div class="profile-details">
                        <p class="name">{session.user.name ?? "Usuário"}</p>
                        <p class="email">
                            {session.user.email ?? "exemplo@unesp.br"}
                        </p>
                        <p class="ra">RA</p>
                        <p class="cpf">CPF</p>
                    </div>
                </div>
                <div class="contact-details">
                    <p>Github</p>
                    <p>LinkedIn</p>
                    <p>Bio</p>
                </div>
                <button onclick={() => signOut()} class="sign-out-button"
                    >Desconectar</button
                >
            </div>
        </div>
    {:else}
        <div class="login-box profile-card">
            <p>Conecte-se com o e-mail da UNESP:</p>
            <div class="google-box">
                <button onclick={() => signIn("google")}> G </button>
            </div>
        </div>
    {/if}
</main>

<style>
    :root {
        --primary-dark-blue: #282964;
        --light-card-color: #fff;
        --text-dark: #646464;
    }

    /* ------------
   Login Box
   ------------ */
    .login-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2em;
        gap: 2em;
        min-height: 250px;
    }

    .login-box p {
        color: #9293d3;
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;
    }

    .google-box {
        background-color: #eee;
        width: 100px;
        height: 60px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .google-box button {
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 0 10px;
        text-decoration: none;
        color: var(--primary-dark-blue);
        background: transparent;
        border-radius: inherit;
        justify-content: center;
        text-align: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }

    .google-box button:hover {
        background-color: #ddd;
        border-radius: inherit;
        cursor: pointer;
    }

    /* ------------
        Profile
    ------------ */
    .profile-card {
        background-color: #fff;
        background-color: var(--light-card-color);
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        min-height: 400px;
        max-width: 450px;
        width: 100%;
        margin-top: -15dvh;
    }

    .welcome-box {
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .user-info-row {
        display: flex;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .profile-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #e0e0e0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        border: none;
        overflow: hidden;
    }

    .profile-details p {
        margin: 0;
        line-height: 1.4;
        color: var(--text-dark);
    }

    .profile-details .name {
        font-weight: bold;
        font-size: 1.1em;
    }

    .profile-details .email {
        color: #888;
        margin-bottom: 10px;
    }

    .contact-details p {
        margin: 0;
        padding: 5px 0;
        color: var(--text-dark);
    }

    .sign-out-button {
        background-color: var(--primary-dark-blue);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 20px;
    }
</style>
