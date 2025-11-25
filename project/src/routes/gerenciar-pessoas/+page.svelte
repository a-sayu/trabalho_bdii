<script lang="ts">
    let novaPessoa = $state({
        nome: "",
        email: "",
        vinculo: "",
    });

    const { data } = $props();
    const pessoas = $state(data.pessoas || []);
</script>

<svelte:head>
    <title>Gerenciar Pessoas</title>
</svelte:head>

<main class="split-layout">
    <div class="left">
        <div class="card">
            <h3>Lista de Usuários</h3>
            {#if pessoas.length > 0}
                {#each pessoas as pessoa (pessoa.UUID)}
                    <div>
                        <p>{pessoa.Nome}</p>
                        <button>Ver Mais</button>
                    </div>
                {/each}
            {:else}
                <div class="empty-state">
                    <p>Nenhuma pessoa para exibir.</p>
                </div>
            {/if}
        </div>
    </div>
    <div class="right">
        <div class="form-box">
            <form method="post">
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">Nome</span>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            bind:value={novaPessoa.nome}
                            placeholder="Nome da Pessoa"
                            required
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-label-inside flex-grow">
                        <span class="label-floating">E-mail</span>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            bind:value={novaPessoa.email}
                            placeholder="E-mail da Pessoa"
                            required
                        />
                    </div>
                </div>
                <div class="form-group-label-inside flex-grow">
                    <span class="label-floating">Vínculo com a Unesp</span>
                    <input
                        type="text"
                        id="vinculo"
                        name="vinculo"
                        bind:value={novaPessoa.vinculo}
                        placeholder="Vínculo com a Unesp"
                        required
                    />
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
    }

    h3 {
        color: #3d3f97;
        margin-bottom: 15px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }


    input {
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
</style>