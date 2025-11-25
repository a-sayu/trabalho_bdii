<script lang="ts">
    const { data } = $props();
    const logs = $state(data.logs || []);
</script>

<svelte:head>
    <title>Todos os Logs</title>
</svelte:head>

<main class="container">
    <div class="exibir-log-box">
        <h2>Log</h2>
        {#if logs.length > 0}
            <div class="list-container">
                {#each logs as log (log.UUID)}
                    <div class="log-item">
                        <p>LOG: [{log.Origem}] {log.Data} : {log.Descricao}</p>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="empty-state">
                <p>Nenhum log para exibir.</p>
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

    .list-container {
        width: 100%;
        overflow-y: auto; /* Permite rolar se tiver muitos eventos */
    }

    .exibir-log-box {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        width: 100%;
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

    .exibir-log-box p {
        padding: 12px 8px;
        border-bottom: 1px solid #3d3f97;
    }

    .exibir-log-box p:first-child {
        padding: 12px 12px 8px;
    }

    .exibir-log-box p:last-child {
        padding: 8px 12px 12px;
        border-bottom: none;
    }

    .log-item {
        display: flex;
        justify-content: space-between; /* 2. Nome na esquerda, botão na direita */
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
    }
</style>
