<svelte:head>
  <title>Emitir Certificados</title>
</svelte:head>

<main class="container">
    <div class="emitir-cert-box">
        <h2>Certificados Disponíveis</h2>
        <div class="empty-state">
            <p>Nenhum certificado para emitir.</p>
        </div>
        
        </div>
</main>

<style>
    .container {
        padding: 40px;
        display: flex;
        justify-content: center;
    }

    .emitir-cert-box {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 600px;
        text-align: center;
    }

    h2 { color: #3D3F97; margin-bottom: 20px; }
    
    .empty-state p { color: #666; font-size: 1.1rem; }
</style>