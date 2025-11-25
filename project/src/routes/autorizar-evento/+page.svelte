<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade, fly } from "svelte/transition";
    import type { Evento } from "$lib/types";
    import type { SubmitFunction } from "@sveltejs/kit";
    const { data } = $props();
    let eventos = $derived((data.eventos as Evento[]) || []);

    let eventoEmEdicao = $state<Evento | null>(null);

    function iniciarEdicao(evento: Evento) {
        eventoEmEdicao = { ...evento };
    }
    function cancelarEdicao() {
        eventoEmEdicao = null;
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
    <title>Autorização de Eventos</title>
</svelte:head>

{#if eventoEmEdicao}
    <div class="modal-overlay" transition:fade={{ duration: 200 }}>
        <div class="modal-card" transition:fly={{ y: 50, duration: 300 }}>
            <div class="header-edit">
                <h3>Editar Evento</h3>
                <button class="btn-close" onclick={cancelarEdicao}>✕</button>
            </div>
            <form method="POST" action="?/editar" use:enhance={submitEditar}>
                <input type="hidden" name="uuid" value={eventoEmEdicao.UUID} />
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Nome</span>
                        <input
                            type="text"
                            name="nome"
                            bind:value={eventoEmEdicao.Nome}
                            placeholder="Nome da Pessoa"
                            required
                        />
                    </div>
                </div>

                <div class="form-btn-side">
                    <button
                        type="button"
                        class="btn-cancel"
                        onclick={cancelarEdicao}>Cancelar</button
                    >
                    <button type="submit" class="btn-primary">Autorizar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<main class="container">
    <div class="autorizar-box">
        <h2>Eventos Não Autorizados</h2>
        {#if eventos.length > 0}
            {#each eventos as evento (evento.UUID)}
                <div class="evento-info" transition:fade>
                    <p class="evento-name">{evento.Nome}</p>
                    <button
                        class="btn-out"
                        onclick={() => iniciarEdicao(evento)}>Editar</button
                    >
                </div>
            {/each}
        {:else}
            <div class="empty-state">
                <p>Nenhum Evento para aprovar.</p>
            </div>
        {/if}
    </div>
</main>

<style>
    .container {
        padding: 40px;
        display: flex;
        justify-content: center;
    }

    .autorizar-box {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        width: 100%;
        width: 70dvw;
        height: 75dvh;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .autorizar-box p {
        padding: 12px 8px;
        border-bottom: 1px solid #3d3f97;
    }

    .autorizar-box p:first-child {
        padding: 12px 12px 8px;
    }

    .autorizar-box p:last-child {
        padding: 8px 12px 12px;
        border-bottom: none;
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

    h2 {
        margin-bottom: 20px;
        color: #3d3f97;
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


    input{
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        outline: none;
        font-family: inherit;
    }

    .evento-info {
        display: flex;
        justify-content: space-between; /* 2. Nome na esquerda, botão na direita */
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
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


    
    h2 {
        color: #3d3f97;
        margin-bottom: 20px;
    }

    .empty-state p {
        color: #666;
        font-size: 1.1rem;
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
