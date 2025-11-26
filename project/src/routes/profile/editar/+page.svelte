<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { Pessoa } from "$lib/types";

    const { data } = $props();

    // Inicializamos o estado com os dados atuais da pessoa ou strings vazias
    let form = $state({
        Nome: data.pessoa?.Nome ?? "",
        RA: data.pessoa?.RA ?? "",
        Vinculo_UNESP: data.pessoa?.Vinculo_UNESP ?? "",
        Github: data.pessoa?.Github ?? "",
        Linkedin: data.pessoa?.Linkedin ?? "",
        Descricao: data.pessoa?.Descricao ?? "",
    });

    let isSaving = $state(false);
</script>

<svelte:head>
    <title>Editar Perfil</title>
</svelte:head>

<main class="blue">
    <div class="profile-card edit-mode">
        <div class="card-content">
            <h2 class="edit-title">Editar Perfil</h2>

            <form
                method="POST"
                action="?/updateProfile"
                use:enhance={() => {
                    isSaving = true;
                    return async ({ update }) => {
                        await update();
                        isSaving = false;
                        // Opcional: Redirecionar após sucesso
                        // goto('//profile');
                    };
                }}
                class="edit-form"
            >
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        bind:value={form.Nome}
                        required
                        placeholder="Seu nome"
                    />
                </div>

                <div class="row-group">
                    <div class="form-group">
                        <label for="ra">RA</label>
                        <input
                            type="text"
                            id="ra"
                            name="ra"
                            bind:value={form.RA}
                            placeholder="000000000"
                        />
                    </div>

                    <div class="form-group">
                        <label for="vinculo">Vínculo</label>
                        <input
                            type="text"
                            id="vinculo"
                            name="vinculo"
                            bind:value={form.Vinculo_UNESP}
                            readonly
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="github">URL do Github</label>
                    <input
                        type="text"
                        id="github"
                        name="github"
                        bind:value={form.Github}
                        placeholder="usuario"
                    />
                </div>

                <div class="form-group">
                    <label for="linkedin">URL do LinkedIn</label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        bind:value={form.Linkedin}
                        placeholder="usuario"
                    />
                </div>

                <div class="form-group">
                    <label for="descricao">Bio / Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        bind:value={form.Descricao}
                        rows="3"
                        placeholder="Fale um pouco sobre você..."
                    ></textarea>
                </div>

                <div class="action-buttons">
                    <button
                        type="button"
                        class="btn cancel-btn"
                        onclick={() => history.back()}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="btn save-btn"
                        disabled={isSaving}
                    >
                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>

<style>
    :root {
        --primary-dark-blue: #282964;
        --light-card-color: #fff;
        --input-border: #ddd;
        --input-focus: #282964;
    }

    /* Reaproveitando estilos bases */
    .profile-card {
        background-color: var(--light-card-color);
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        max-width: 500px; /* Um pouco mais largo para o form */
        width: 100%;
        margin-top: -10dvh;
        padding: 30px;
    }

    .edit-title {
        color: var(--primary-dark-blue);
        margin-bottom: 20px;
        text-align: center;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .row-group {
        display: flex;
        gap: 15px;
    }
    .row-group .form-group {
        flex: 1;
    }

    label {
        font-weight: 600;
        font-size: 0.9rem;
        color: #555;
    }

    input,
    textarea {
        padding: 10px;
        border: 1px solid var(--input-border);
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.2s;
        font-family: inherit;
    }

    input:focus,
    textarea:focus {
        outline: none;
        border-color: var(--input-focus);
        box-shadow: 0 0 0 2px rgba(40, 41, 100, 0.1);
    }

    textarea {
        resize: vertical;
    }

    /* Botões */
    .action-buttons {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .btn {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        border: none;
        transition: opacity 0.2s;
    }

    .save-btn {
        background-color: var(--primary-dark-blue);
        color: white;
    }
    .save-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .cancel-btn {
        background-color: #f0f0f0;
        color: #333;
    }
    .cancel-btn:hover {
        background-color: #e0e0e0;
    }
</style>
