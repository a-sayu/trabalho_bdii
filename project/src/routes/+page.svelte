<script lang="ts">
    import CalendarMonth from "$lib/components/CalendarMonth.svelte";
    import CalendarWeek from "$lib/components/CalendarWeek.svelte";

    export let data;

    let now = new Date(); // clock
    let viewDate = new Date(); // navigation
    const interval = setInterval(() => {
        now = new Date();
    }, 60000);

    const eventos = data.eventos;
    $: eventosAgora = eventos.filter((evento) => {
        const eventDate = new Date(evento.Data_local);
        const isSameTime =
            eventDate.getFullYear() === now.getFullYear() &&
            eventDate.getMonth() === now.getMonth() &&
            eventDate.getDate() === now.getDate() &&
            eventDate.getHours() == now.getHours()

        return isSameTime;
    });

    import { onDestroy } from "svelte";
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<svelte:head>
    <title>Início - CACiC</title>
</svelte:head>

<main class="homepage-layout">
    <div class="left-panel">
        {#if eventosAgora.length > 0}
            {#each eventosAgora as evento (evento.UUID)}
                <h2 class="current-event-title">
                    {evento.Nome} Acontecendo Agora
                </h2>
            {/each}
        {:else}
            <h2 class="current-event-title">Nenhum Evento Acontecendo Agora</h2>
        {/if}
        <CalendarMonth bind:currentDate={viewDate} />
    </div>

    <div class="right-panel">
        <CalendarWeek currentDate={viewDate} />
    </div>
</main>

<style>
    /* ------------
   Index / Homepage Layout
   ------------ */
    .homepage-layout {
        display: flex;
        padding: 30px 40px;
        gap: 30px;
        margin-top: -10px;
        align-items: flex-start;
        height: calc(100vh - 80px);
    }

    .left-panel {
        flex: 0 0 350px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .current-event-title {
        color: #3d3f97;
        font-size: 1.2rem;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
    }

    .right-panel {
        flex: 2;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        padding: 20px;
        position: relative;
    }

    @media (max-width: 1000px) {
        .homepage-layout {
            flex-direction: column;
            height: auto;
            padding: 20px;

            align-items: center;
        }

        .left-panel {
            flex: none;
            width: 100%;

            max-width: 350px;

            margin-bottom: 20px;
        }

        .right-panel {
            width: 100%;
            height: 600px;
            min-height: 50vh;
        }
    }
</style>
