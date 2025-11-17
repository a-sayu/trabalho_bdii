<script>
    let novaSugestao = "";
</script>

<svelte:head>
  <title>Sugestões e Pautas</title>
</svelte:head>

<main class="split-layout">
    <div class="column">
        <div class="card">
            <h3>Pautas Recentes</h3>
            <div class="empty-msg">
                <p>Nenhuma pauta ou sugestão para exibir.</p>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
            <h3>Enviar Sugestão</h3>
            <form>
                <div class="form-group">
                    <label for="tipo">Tipo</label>
                    <select id="tipo">
                        <option>Sugestão</option>
                        <option>Pauta de Reunião</option>
                        <option>Reclamação</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="msg">Mensagem</label>
                    <textarea id="msg" bind:value={novaSugestao} rows="6" placeholder="Escreva aqui sua sugestão para o CACiC..."></textarea>
                </div>

                <button type="submit" class="btn-primary">Enviar</button>
            </form>
        </div>
    </div>
</main>

<style>
    .split-layout {
        display: flex;
        padding: 20px;
        gap: 20px;
        flex-wrap: wrap; /* Permite quebrar linha em telas pequenas */
    }

    .column {
        flex: 1;
        min-width: 300px;
    }

    .card {
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
        height: 100%;
    }

    h3 { color: #3D3F97; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px; }

    .empty-msg { color: #777; font-style: italic; padding: 20px 0; text-align: center;}

    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    select, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px; }

    .btn-primary {
        background-color: #3D3F97;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        width: 100%;
        cursor: pointer;
    }
</style>