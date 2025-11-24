<script lang="ts">
    const { data } = $props();
    const eventos = $state(data.eventos || []);
</script>

<svelte:head>
    <title>Autorização de Eventos</title>
</svelte:head>

<main class="container">
    <div class="autorizar-box">
        <h2>Eventos Não Autorizados</h2>
        {#if eventos.length > 0}
            {#each eventos as evento (evento.UUID_evento)}
                <div>
                    <p>{evento.Nome_evento}</p>
                    <button>Ver Mais</button>
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

    h2 {
        color: #3d3f97;
        margin-bottom: 20px;
    }

    .empty-state p {
        color: #666;
        font-size: 1.1rem;
    }
</style>
