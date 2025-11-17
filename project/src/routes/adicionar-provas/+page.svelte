<script>
  import CalendarMonth from '$lib/components/CalendarMonth.svelte';

  let currentDate = new Date();

  let prova = {
    materia: '',
    data: '',
    conteudo: ''
  };
</script>

<svelte:head>
  <title>Adicionar Provas</title>
</svelte:head>

<main class="split-layout">
  <div class="left">
    <CalendarMonth bind:currentDate={currentDate} />
  </div>

  <div class="right">
    <div class="form-box">
      <h2>Nova Prova</h2>
      <form>
        <div class="form-group">
          <label for="materia">Matéria</label>
          <input type="text" id="materia" bind:value={prova.materia} placeholder="Ex: Banco de Dados II" required>
        </div>

        <div class="form-group">
          <label for="data">Data da Prova</label>
          <input type="date" id="data" bind:value={prova.data} required>
        </div>

        <div class="form-group">
          <label for="conteudo">Conteúdo Cobrado</label>
          <textarea id="conteudo" bind:value={prova.conteudo} rows="4" placeholder="Capítulos 1 a 5..."></textarea>
        </div>

        <button type="submit" class="btn-primary">Agendar Prova</button>
      </form>
    </div>
  </div>
</main>

<style>
  /* ... Copie o estilo do <style> do ficheiro anterior aqui ... */
  .split-layout { display: flex; padding: 20px; gap: 20px; margin-top: -5dvh; }
  .left { flex: 1; max-width: 400px; }
  .right { flex: 2; }
  .form-box { background: white; padding: 20px; border-radius: 20px; box-shadow: 0px 8px 16px rgba(0,0,0,0.1); }
  h2 { margin-bottom: 20px; color: #3D3F97; }
  .form-group { margin-bottom: 15px; }
  label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
  input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
  .btn-primary { background-color: #3D3F97; color: white; border: none; padding: 10px 20px; border-radius: 8px; width: 100%; cursor: pointer; }
</style>