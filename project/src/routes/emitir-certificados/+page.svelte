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
    /* ------------
   Emitir Certificado
   ------------ */

    .container {
        padding: 40px;
        display: flex;
        justify-content: center;
    }

    .emitir-cert-box {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        width: 100%;
        text-align: center;
    }

    h2 {
        color: #3d3f97;
        margin-bottom: 20px;
    }

    .empty-state p {
        color: #666;
        font-size: 1.1rem;
    }

    .emitir-cert-box {
        background-color: #fff;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        width: 70dvw;
        height: 75dvh;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
    }

    .emitir-cert-box p {
        padding: 12px 8px;
        border-bottom: 1px solid #3d3f97;
    }

    .emitir-cert-box p:first-child {
        padding: 12px 12px 8px;
    }

    .emitir-cert-box p:last-child {
        padding: 8px 12px 12px;
        border-bottom: none;
    }
</style>
