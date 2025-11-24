<script lang="ts">
    import CalendarMonth from "$lib/components/CalendarMonth.svelte";

    let currentDate = new Date();

    let prova = {
        disciplina: "",
        provaNumero: "",
        data: "",
        horario: "",
        localizacao: "",
        professor: "",
        conteudo: "",
    };

    function formatToBR(dateString: string) {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    $: displayedDate = formatToBR(prova.data);

    function handleDateSelect(date: string) {
        prova.data = date;
    }

    function handleSubmit() {
        console.log("Dados da Prova:", prova);
        alert("Prova agendada com sucesso!");
    }
</script>

<svelte:head>
    <title>Adicionar Provas</title>
</svelte:head>

<main class="split-layout">
    <div class="left">
        <CalendarMonth bind:currentDate onSelect={handleDateSelect} />
    </div>

    <div class="right">
        <div class="form-box">
            <h2>Nova Prova</h2>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Disciplina</span>
                        <input
                            type="text"
                            id="disciplina"
                            bind:value={prova.disciplina}
                            placeholder="Nome da Disciplina"
                            required
                        />
                    </div>
                    <div class="form-group-label-inside form-prova">
                        <span class="label-floating">Prova</span>
                        <input
                            type="text"
                            id="prova"
                            bind:value={prova.provaNumero}
                            placeholder="P1"
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
                            bind:value={displayedDate}
                            placeholder="Data da Prova"
                            required
                            readonly
                        />
                    </div>
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Horário</span>
                        <input
                            type="time"
                            id="horario"
                            bind:value={prova.horario}
                            required
                        />
                    </div>
                </div>

                <div class="form-group-label-inside full-width">
                    <span class="label-floating">Localização</span>
                    <input
                        type="text"
                        id="localizacao"
                        bind:value={prova.localizacao}
                        placeholder="Local da Prova"
                    />
                </div>

                <div class="form-group-label-inside full-width">
                    <span class="label-floating">Professor</span>
                    <input
                        type="text"
                        id="professor"
                        bind:value={prova.professor}
                        placeholder="Professor"
                    />
                </div>

                <div class="form-group-label-inside full-width textarea-group">
                    <span class="label-floating">Conteúdo</span>
                    <textarea
                        id="conteudo"
                        bind:value={prova.conteudo}
                        rows="4"
                        placeholder="Conteúdo da Prova"
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

    .form-prova {
        flex-shrink: 0;
        width: 100px;
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
