<script lang="ts">
    import type { Evento } from "$lib/types";
    const { data } = $props();
    let eventos = $derived((data.eventos as Evento[]) || []);
</script>

<svelte:head>
    <title>Registrar Presença</title>
</svelte:head>

<main class="container">
    <div class="reg-pres-box">
        <h2>Eventos Disponíveis</h2>

        {#if eventos.length > 0}
            <div class="list-container">
                {#each eventos as evento (evento.UUID)}
                    <div class="evento-item">
                        <p><strong>{evento.Nome}</strong></p>
                        <p class="data-info">
                            {new Date(evento.Data_local).toLocaleDateString()}
                        </p>
                        <button>Registrar Presença</button>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="empty-state">
                <p>Nenhum evento encontrado.</p>
            </div>
        {/if}
    </div>
</main>

<style>
    /* ------------
   Registrar Presença
   ------------ */

    .container {
        padding: 40px;
        display: flex;
        justify-content: center;
    }

    .list-container {
        flex: 1;
        width: 100%;
        overflow-y: auto; /* Permite rolar se tiver muitos eventos */
        padding: 0;
    }

    .reg-pres-box {
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        height: 100%;
        min-height: 400px;
    }

    h2 {
        color: #3d3f97;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .empty-state p {
        color: #666;
        font-size: 1.1rem;
    }

    .reg-pres-box {
        background-color: #fff;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        width: 70dvw;
        height: 75dvh;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
    }

    .reg-pres-box p {
        padding: 12px 8px;
    }

    .reg-pres-box p:first-child {
        padding: 12px 12px 8px;
    }

    .reg-pres-box p:last-child {
        padding: 8px 12px 12px;
        border-bottom: none;
    }

    button {
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

    button:hover {
        background: #3d3f97;
        color: white;
    }

    .evento-item {
        display: flex;
        justify-content: space-between; /* 2. Nome na esquerda, botão na direita */
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
    }
</style>
