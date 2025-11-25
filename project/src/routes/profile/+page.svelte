<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import { page } from "$app/state";
    import type { Pessoa } from "$lib/types";

    const { data } = $props();
    let pessoa = $state((data.pessoa as Pessoa) || null);

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
                            src={session.user.image ||
                                "https://ui-avatars.com/api/?name=" +
                                    (pessoa?.Nome || session.user.name)}
                            alt="👤"
                            class="profile-img-content"
                        />
                    </div>
                    <div class="profile-details">
                        <p class="name">
                            {pessoa?.Nome ?? session.user.name ?? "Usuário"}
                        </p>

                        <p class="email">
                            {pessoa?.Email ??
                                session.user.email ??
                                "email@unesp.br"}
                        </p>

                        {#if pessoa?.Vinculo_UNESP}
                            <p class="ra">
                                <strong>Vínculo:</strong>
                                {pessoa.Vinculo_UNESP}
                            </p>
                        {:else}
                            <p class="ra" style="opacity: 0.5;">
                                Vínculo não informado
                            </p>
                        {/if}
                    </div>
                </div>
                <div class="contact-details">
                    {#if pessoa?.Github}
                        <p>
                            <strong>Github:</strong>
                            <a
                                href={pessoa.Github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {pessoa.Github.replace(
                                    "https://github.com/",
                                    ""
                                )}
                            </a>
                        </p>
                    {:else}
                        <p style="opacity: 0.5;">Github não cadastrado</p>
                    {/if}

                    {#if pessoa?.Linkedin}
                        <p>
                            <strong>LinkedIn:</strong>
                            <a
                                href={pessoa.Linkedin}
                                target="_blank"
                                rel="noopener noreferrer">Ver Perfil</a
                            >
                        </p>
                    {:else}
                        <p style="opacity: 0.5;">LinkedIn não cadastrado</p>
                    {/if}

                    {#if pessoa?.Descricao}
                        <div
                            style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #eee;"
                        >
                            <p><strong>Bio:</strong></p>
                            <p style="font-style: italic;">
                                {pessoa.Descricao}
                            </p>
                        </div>
                    {/if}
                </div>
                <button onclick={() => signOut()} class="sign-out-button"
                    >Desconectar</button
                >
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
        bottom: 0;
    }
</style>
