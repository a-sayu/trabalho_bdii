<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade, fly } from "svelte/transition";
    import type { Pessoa } from "$lib/types";
    import type { SubmitFunction } from "@sveltejs/kit";

    let novaPessoa = $state({
        nome: "",
        email: "",
        vinculo: "",
    });

    let pessoaEmEdicao = $state<Pessoa | null>(null);

    const { data } = $props();
    let pessoas = $state((data.pessoas as Pessoa[]) || []);

    function iniciarEdicao(pessoa: Pessoa) {
        pessoaEmEdicao = { ...pessoa };
    }
    function cancelarEdicao() {
        pessoaEmEdicao = null;
    }

    const submitEditar: SubmitFunction = () => {
        return async ({ result, update }) => {
            await update();
            if (result.type === "success") {
                cancelarEdicao();
            }
        };
    };
</script>

<svelte:head>
    <title>Gerenciar Pessoas</title>
</svelte:head>

{#if pessoaEmEdicao}
    <div class="modal-overlay" transition:fade={{ duration: 200 }}>
        <div class="modal-card" transition:fly={{ y: 50, duration: 300 }}>
            <div class="header-edit">
                <h3>Editar Pessoa</h3>
                <button class="btn-close" onclick={cancelarEdicao}>✕</button>
            </div>
            <form method="POST" action="?/editar" use:enhance={submitEditar}>
                <input type="hidden" name="uuid" value={pessoaEmEdicao.UUID} />
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Nome</span>
                        <input
                            type="text"
                            name="nome"
                            bind:value={pessoaEmEdicao.Nome}
                            placeholder="Nome da Pessoa"
                            required
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">E-mail</span>
                        <input
                            type="text"
                            name="email"
                            bind:value={pessoaEmEdicao.Email}
                            placeholder="E-mail da Pessoa"
                            required
                        />
                    </div>
                </div>

                <div class="form-group-label-inside flex-grow">
                    <span class="label-floating">Vínculo com a Unesp</span>
                    <input
                        type="text"
                        name="vinculo"
                        bind:value={pessoaEmEdicao.Vinculo_UNESP}
                        placeholder="Vínculo com a Unesp"
                        required
                    />
                </div>

                <div class="form-btn-side">
                    <button
                        type="button"
                        class="btn-cancel"
                        onclick={cancelarEdicao}>Cancelar</button
                    >
                    <button type="submit" class="btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<main class="split-layout">
    <div class="left">
        <div class="card">
            <h3>Lista de Pessoas Cadastradas</h3>
            {#if pessoas.length > 0}
                <span class="badge">{pessoas.length} encontrados</span>
                <div class="scrollable">
                    {#each pessoas as pessoa (pessoa.UUID)}
                        <div class="user-info" transition:fade>
                            <p class="user-name">{pessoa.Nome}</p>
                            <button
                                class="btn-out"
                                onclick={() => iniciarEdicao(pessoa)}
                                >Ver Mais</button
                            >
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="empty-state">
                    <p>Nenhuma pessoa para exibir.</p>
                </div>
            {/if}
        </div>
    </div>
    <div class="right">
        <div class="form-box">
            <form method="POST" action="?/criar" use:enhance>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Nome</span>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            bind:value={novaPessoa.nome}
                            placeholder="Nome da Pessoa"
                            required
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">E-mail</span>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            bind:value={novaPessoa.email}
                            placeholder="E-mail da Pessoa"
                            required
                        />
                    </div>
                </div>
                <div class="form-group-label-inside flex-grow">
                    <span class="label-floating">Vínculo com a Unesp</span>
                    <input
                        type="text"
                        id="vinculo"
                        name="vinculo"
                        bind:value={novaPessoa.vinculo}
                        placeholder="Vínculo com a Unesp"
                        required
                    />
                </div>
                <div class="form-btn-side">
                    <button type="submit" class="btn-primary">Adicionar</button>
                </div>
            </form>
        </div>
    </div>
</main>

<style>
    .split-layout {
        display: flex;
        padding: 20px;
        gap: 20px;
        margin-top: -5dvh;
        width: 90%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .left {
        flex: 1;
    }
    .right {
        flex: 2;
        max-width: 400px;
    }

    .card {
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        height: 100%;
        min-height: 400px;
    }

    .header-edit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        margin-bottom: 30px;
        padding-bottom: 10px;
    }

    .header-edit h3 {
        margin: 0;
        border: none;
        padding: 0;
        font-size: 1.5rem;
        color: #3d3f97;
    }

    h3 {
        color: #3d3f97;
        margin-bottom: 15px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }
    .badge {
        position: absolute;
        background: #eee;
        color: #666;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        transform: translateY(-57px) translateX(300px);
    }

    .scrollable {
        flex: 1;
        overflow-y: auto;
        padding: 0;
    }

    .user-info {
        display: flex;
        justify-content: space-between; /* 2. Nome na esquerda, botão na direita */
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        outline: none;
        font-family: inherit;
    }

    .form-btn-side {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .btn-primary {
        background-color: #3d3f97;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        width: 150px;
        cursor: pointer;
        font-size: 1rem;
        text-transform: capitalize;
        height: 50px;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .btn-primary:hover {
        background-color: #2c2e75;
    }

    .btn-cancel {
        background-color: transparent;
        color: #666;
        border: 1px solid #ccc;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        height: 50px;
    }
    .btn-cancel:hover {
        background-color: #f5f5f5;
        color: #333;
    }

    .btn-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #999;
    }

    .btn-close:hover {
        color: #d00;
    }

    .btn-out {
        background: transparent;
        border: 1px solid #3d3f97;
        color: #3d3f97;
        padding: 6px 16px;
        border-radius: 6px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
        right: 0;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .btn-out:hover {
        background: #3d3f97;
        color: white;
    }

    .form-row {
        display: flex;
        gap: 15px;
    }

    .flex-grow {
        flex-grow: 1;
    }

    .form-group-label-inside {
        position: relative;
        margin-bottom: 20px;
    }

    .label-floating {
        position: absolute;
        top: 5px;
        left: 15px;
        color: #555;
        font-size: 0.75rem;
        pointer-events: none;
        background: white;
        padding: 0 5px;
        transform: translateY(-15px);
        z-index: 10;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .modal-card {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
    }
</style>
