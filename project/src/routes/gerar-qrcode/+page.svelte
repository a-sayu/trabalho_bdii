<svelte:head>
    <title>Gerar QR Code</title>
</svelte:head>

<main class="blue">
    <div class="qr-code-box">
        <p>Seu QR Code</p>
        <div class="qr-code"></div>
    </div>
</main>

<style>
    /* ------------
   QR Code Box
   ------------ */
    .qr-code-box {
        background-color: #fff;
        padding: 2em;
        border-radius: 20px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        width: 30dvw;
        max-width: 400px;
        height: 45dvh;
        margin-top: -20dvh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        gap: 2em;
    }

    .qr-code-box p {
        color: #9293d3;
        font-weight: bold;
        font-size: 1.7em;
    }

    .qr-code {
        background-color: #fff;
        width: 20dvw;
        max-width: 200px;
        max-height: 200px;
        height: 20dvw;
        min-height: 100px;
        min-width: 100px;
        border-radius: 20px;
        border: solid 2px #aaa;
    }
</style>
