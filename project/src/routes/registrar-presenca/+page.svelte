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
        width: 100%;
        overflow-y: auto; /* Permite rolar se tiver muitos eventos */
    }

    .reg-pres-box {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        width: 100%;
        text-align: center;
    }

    h2 {
        color: #3d3f97;
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
        border-bottom: 1px solid #3d3f97;
    }

    .reg-pres-box p:first-child {
        padding: 12px 12px 8px;
    }

    .reg-pres-box p:last-child {
        padding: 8px 12px 12px;
        border-bottom: none;
    }
</style>
