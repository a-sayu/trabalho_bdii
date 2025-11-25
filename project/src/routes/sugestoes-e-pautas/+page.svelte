<script lang="ts">
    let novaMensagem = {
        titulo: "",
        tipo: "",
        pessoa: "",
        descricao: "",
    };

    export let data;
    const mensagens = data.sugestos_e_pautas || [];
</script>

<svelte:head>
    <title>Sugestões e Pautas</title>
</svelte:head>

<main class="split-layout">
    <div class="left">
        <div class="card">
            <h3>Pautas Recentes</h3>
            {#if mensagens.length > 0}
                {#each mensagens as mensagem (mensagem.UUID)}
                    <div class="item">
                        <p>{mensagem.Nome}</p>
                        <p>{mensagem.Pessoa}</p>
                        <button>Ver Mais</button>
                    </div>
                {/each}
            {:else}
                <div class="empty-state">
                    <p>Nenhum mensagem para exibir.</p>
                </div>
            {/if}
        </div>
    </div>

    <div class="right">
        <div>
            <h3>Deseja Enviar uma Pauta ou Sugestão?</h3>
            <form method="POST">
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Título</span>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            bind:value={novaMensagem.titulo}
                            placeholder="Título da Pauta/Sugestão"
                            required
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <select
                            id="tipo"
                            name="tipo"
                            bind:value={novaMensagem.tipo}
                            required
                        >
                            <option value="" disabled selected>
                                Selecione o Tipo*</option
                            >
                            <option>Sugestão</option>
                            <option>Pauta</option>
                        </select>
                    </div>
                </div>

                <div class="form-group-label-inside full-width">
                    <span class="label-floating">Ano ou Pessoa</span>
                    <input
                        type="text"
                        id="responsavel"
                        name="pessoa"
                        bind:value={novaMensagem.pessoa}
                        placeholder="Pessoa Responsável"
                    />
                </div>

                <div class="form-group-label-inside full-width textarea-group">
                    <span class="label-floating">Descrição</span>
                    <textarea
                        id="msg"
                        name="descricao"
                        bind:value={novaMensagem.descricao}
                        rows="6"
                        placeholder="Escreva aqui sua sugestão, pauta ou reclamação para o CACiC"
                        required
                    ></textarea>
                </div>

                <div class="form-btn-side">
                    <button type="submit" class="btn-primary">Enviar</button>
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
        overflow-y: auto;
    }

    h3 {
        color: #3d3f97;
        margin-bottom: 15px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }

    select,
    input,
    textarea {
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
        margin-top: 20px;
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
    }
    .btn-primary:hover {
        background-color: #2c2e75;
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

    .textarea-group {
        margin-top: 15px;
    }

    textarea {
        min-height: 120px;
        resize: vertical;
    }

    .item > button {
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

    .item > button:hover {
        background: #3d3f97;
        color: white;
    }

    .item {
        display: flex;
        justify-content: space-between; /* 2. Nome na esquerda, botão na direita */
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
    }
</style>
