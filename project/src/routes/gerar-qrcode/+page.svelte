<script>
    import QR from "@svelte-put/qr/svg/QR.svelte";
</script>

<svelte:head>
    <title>Gerar QR Code</title>
</svelte:head>

<main class="blue">
    <div class="qr-code-box">
        <p>Seu QR Code</p>
        <div class="qr-code">
            <QR
                data="123123123"
                logo="src/lib/assets/favicon.svg"
                logoRatio={107 / 128}
                shape="square"
                margin={4}
            >
                {#snippet svg({ attributes, innerHTML })}
                    <svg {...attributes} class="**:fill-blue-500">
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html innerHTML}
                    </svg>
                {/snippet}
            </QR>
        </div>
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
