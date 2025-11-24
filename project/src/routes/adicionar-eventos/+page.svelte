<script lang="ts">
    import CalendarMonth from "$lib/components/CalendarMonth.svelte";

    let currentDate = new Date();

    // Dados do formulário
    let evento = {
        titulo: "",
        data: "", // Formato YYYY-MM-DD
        horario: "",
        localizacao: "",
        responsavel: "",
        descricao: "",
        maximo: "", // O Svelte mantém como string aqui
    };

    // Função para formatar a data para exibição (DD/MM/YYYY)
    function formatToBR(dateString: string) {
        if (!dateString) return "";
        // O valor real da data (evento.data) deve estar no formato ISO (YYYY-MM-DD)
        const parts = dateString.split("-");
        if (parts.length === 3) {
             const [year, month, day] = parts;
             return `${day}/${month}/${year}`;
        }
        return dateString; // Retorna o que estava se não for YYYY-MM-DD
    }

    // Variável reativa para mostrar a data no formato BR, mas o valor de evento.data é ISO
    $: displayedDate = formatToBR(evento.data);

    function handleDateSelect(date: string) {
        // Recebe a data no formato ISO e atualiza o estado
        evento.data = date;
    }
</script>

<svelte:head>
    <title>Adicionar Eventos</title>
</svelte:head>

<main class="split-layout">
    <div class="left">
        <!-- O componente CalendarMonth deve emitir a data no formato YYYY-MM-DD -->
        <CalendarMonth bind:currentDate onSelect={handleDateSelect} />
    </div>

    <div class="right">
        <div class="form-box">
            <h2>Novo Evento</h2>
            <form method="POST">
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Nome do Evento</span>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            bind:value={evento.titulo}
                            placeholder="Nome do Evento*"
                            required
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Data</span>
                        <input
                            type="text"
                            id="data"
                            name="data"
                            bind:value={displayedDate}
                            placeholder="Data do Evento"
                            required
                            readonly
                        />
                    </div>

                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Horário</span>
                        <input
                            type="time"
                            id="horario"
                            name="horario" 
                            bind:value={evento.horario}
                            required
                        />
                    </div>
                </div>
                <div class="form-group-label-inside full-width">
                    <span class="label-floating">Localização</span>
                    <input
                        type="text"
                        id="localizacao"
                        name="localizacao" 
                        bind:value={evento.localizacao}
                        placeholder="Local do Evento"
                    />
                </div>

                <div class="form-group-label-inside full-width">
                    <span class="label-floating">Responsável</span>
                    <input
                        type="text"
                        id="responsavel"
                        name="responsavel"
                        bind:value={evento.responsavel}
                        placeholder="Pessoa Responsável"
                    />
                </div>
                
                <div class="form-group-label-inside flex-grow">
                    <span class="label-floating">Capacidade Máxima</span>
                    <input
                        type="number"
                        id="maximo"
                        name="maximo" 
                        bind:value={evento.maximo}
                        placeholder="Nº Máximo de Participantes"
                        required
                    />
                </div>

                <div class="form-group-label-inside full-width textarea-group">
                    <span class="label-floating">Conteúdo</span>
                    <textarea
                        id="evento"
                        name="descricao" 
                        bind:value={evento.descricao}
                        rows="4"
                        placeholder="Descrição do Evento"
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
        max-width: 400px;
    }
    .right {
        flex: 2;
    }

    .form-box {
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        max-width: 600px;
    }

    h2 {
        margin-bottom: 20px;
        color: #3d3f97;
    }

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
</style>