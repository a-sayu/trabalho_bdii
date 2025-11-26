<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import type { Pessoa } from "$lib/types";

    const { data } = $props();
    let pessoa = $derived((data.pessoa as Pessoa) || null);

    const session = $derived(page.data.session);

    function handleEdit() {
        goto("profile/editar"); 
    }
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

                        {#if pessoa?.RA}
                            <p class="ra"><strong>RA:</strong> {pessoa.RA}</p>
                        {/if}

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
                        <p style="opacity: 0.5;">Essa pessoa não tem GitHub cadastrado</p>
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
                        <p style="opacity: 0.5;">Essa pessoa não tem LinkedIn cadastrado</p>
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
                    {:else}
                        <p style="opacity: 0.5;">Essa pessoa não tem Bio cadastrada</p>
                        {/if}
                </div>
                <div class="action-buttons">
                    <button onclick={handleEdit} class="btn edit-btn">
                        Editar Perfil
                    </button>
                    <button onclick={() => signOut()} class="btn sign-out-btn">
                        Desconectar
                    </button>
                </div>
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

    .profile-img-content {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    a {
        color: var(--primary-dark-blue);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }

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

    .action-buttons {
        display: flex;
        gap: 10px; /* Espaço entre os botões */
        margin-top: 20px;
    }

    .btn {
        flex: 1; /* Faz os botões ocuparem o mesmo tamanho */
        padding: 10px 0;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
        border: 2px solid transparent;
    }

    .sign-out-btn {
        background-color: var(--primary-dark-blue);
        color: white;
    }
    .sign-out-btn:hover {
        background-color: #1a1b4b;
    }

    .edit-btn {
        background-color: transparent;
        color: var(--primary-dark-blue);
        border: 2px solid var(--primary-dark-blue);
    }
    .edit-btn:hover {
        background-color: #f0f0f5;
    }
</style>
