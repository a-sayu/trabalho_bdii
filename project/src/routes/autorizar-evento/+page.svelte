<script lang="ts">
    const { data } = $props();
    const eventos = $state(data.eventos || []);
</script>

<svelte:head>
    <title>Autorização de Eventos</title>
</svelte:head>

<main>
    <div>
        {#if eventos.length > 0}
            {#each eventos as evento (evento.UUID_evento)}
                <div>
                    <p>{evento.Nome_evento}</p>
                    <button>Ver Mais</button>
                </div>
            {/each}
        {:else}
            <div>
                <p>Nenhum Evento para aprovar.</p>
            </div>
        {/if}
    </div>
</main>
