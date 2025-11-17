<script>
    import CalendarMonth from '$lib/components/CalendarMonth.svelte';
    import CalendarWeek from '$lib/components/CalendarWeek.svelte';

    // Estado compartilhado: Data atual
    let currentDate = new Date();
</script>

<svelte:head>
  <title>Início - CACiC</title>
</svelte:head>

<main class="homepage-layout">
    <div class="left-panel">
        <h2 class="current-event-title">Nenhum Evento Acontecendo Agora</h2>
        <CalendarMonth bind:currentDate={currentDate} />
    </div>

    <div class="right-panel">
        <CalendarWeek currentDate={currentDate} />
    </div>
</main>

<style>
    .homepage-layout {
        display: flex;
        padding: 30px 40px; /* Mais espaçamento para corresponder à imagem */
        gap: 30px; /* Mais espaço entre os painéis */
        margin-top: -10px; /* Ajuste fino para o espaço abaixo da navbar */
        align-items: flex-start; /* Alinha o topo dos painéis */
        height: calc(100vh - 80px); /* Ocupa a altura restante da viewport */
    }

    .left-panel {
        flex: 0 0 350px; /* Largura fixa para o calendário esquerdo */
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .current-event-title {
        color: #3D3F97; /* Cor roxa */
        font-size: 1.4rem;
        margin-bottom: 10px;
    }

    .right-panel {
        flex: 1; /* Ocupa todo o espaço restante */
        background: white;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
        overflow: hidden; /* Garante que elementos internos não vazem */
        padding: 20px; /* Espaçamento interno */
        position: relative; /* Para posicionar elementos internos, como a linha do tempo */
    }
</style>