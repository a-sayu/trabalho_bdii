<script>
  import CalendarMonth from '$lib/components/CalendarMonth.svelte';

  let currentDate = new Date();

  // Dados do formulário
  let evento = {
    titulo: '',
    data: '',
    descricao: ''
  };

  function handleSubmit() {
    alert(`Evento criado: ${evento.titulo}`);
    // Aqui entraria a lógica para salvar no banco de dados
  }
</script>

<svelte:head>
  <title>Adicionar Eventos</title>
</svelte:head>

<main class="split-layout">
  <div class="left">
    <CalendarMonth bind:currentDate={currentDate} />
  </div>

  <div class="right">
    <div class="form-box">
      <h2>Novo Evento</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="titulo">Título</label>
          <input type="text" id="titulo" bind:value={evento.titulo} placeholder="Ex: Workshop de Svelte" required>
        </div>

        <div class="form-group">
          <label for="data">Data</label>
          <input type="date" id="data" bind:value={evento.data} required>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" bind:value={evento.descricao} rows="4"></textarea>
        </div>

        <button type="submit" class="btn-primary">Salvar Evento</button>
      </form>
    </div>
  </div>
</main>

<style>
  /* Estilos locais para o formulário */
  .split-layout {
    display: flex;
    padding: 20px;
    gap: 20px;
    margin-top: -5dvh; /* Ajuste conforme seu layout global */
  }
  .left { flex: 1; max-width: 400px; }
  .right { flex: 2; }
  
  .form-box {
    background: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
  }
  
  h2 { margin-bottom: 20px; color: #3D3F97; }

  .form-group { margin-bottom: 15px; }
  
  label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }

  .btn-primary {
    background-color: #3D3F97;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
  }
  
  .btn-primary:hover { background-color: #2c2e75; }
</style>