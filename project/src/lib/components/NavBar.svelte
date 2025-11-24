<script lang="ts">
    import { page } from "$app/state";
    import logoCacic from "../assets/logo-cacic.svg";
    import menuIcon from "../assets/menu.png";
    import profileIcon from "../assets/profile.png";

    const session = $derived(page.data.session);
</script>

<nav class="navbar">
    <div
        class="nav-guard"
        onclick={(e) => {
            e.stopPropagation();
        }}
        role="presentation"
    >
        <div class="nav-left">
            <a href="/" class="logo">
                <img src={logoCacic} alt="Logo CACiC" />
            </a>
        </div>

        <div class="nav-right">
            {#if session?.user}
                <a href="/login">
                    <img
                        src={session?.user.image}
                        alt="👤"
                        class="profile-img-content"
                    />
                </a>
            {:else}
                <a href="/login">
                    <img src={profileIcon} alt="" class="profile-img-content" />
                </a>
            {/if}

            <div class="dropdown">
                <button type="button" class="dropbtn">
                    <img src={menuIcon} alt="Menu" class="menu-img" />
                </button>

                <div class="dropdown-content">
                    <a href="/gerar-qrcode">Gerar QR Code</a>
                    <a href="/emitir-certificados">Emitir Certificados</a>
                    <a href="/adicionar-provas">Adicionar Provas</a>
                    <a href="/adicionar-eventos">Adicionar Eventos</a>
                    <a href="/sugestoes-e-pautas">Sugestões e Pautas</a>
                </div>
            </div>
        </div>
    </div>
</nav>

<style>
    /* ------------
        NAVBAR
     ------------*/
    .navbar {
        background-color: #3d3f97;
        padding: 0 20px;
        height: 80px;
        display: flex;
        align-items: center;
    }

    .navbar a,
    .dropbtn {
        color: white;
        text-decoration: none;
        padding: 8px 12px;
        font-weight: bold;
        font-family: inherit;
        font-size: 1em;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .nav-guard {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .nav-left {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .nav-left .logo {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
    }

    .logo img {
        height: 100%;
        width: auto;
        max-width: 100%;
        object-fit: contain;
        filter: brightness(0) invert(1);
    }

    .nav-right {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 20px;

        /* ------------
        DROPDOWN
     ------------*/

        .dropdown {
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            right: 8px;
            top: 80%;
            background-color: white;
            width: 40dvw;
            min-width: 150px;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
            border-radius: 20px 0 20px 20px;
            z-index: 1;
        }

        .dropdown:hover > .dropdown-content {
            display: block;
        }

        .dropbtn {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 10px;
            border: none;
            background: transparent;
            cursor: pointer;
        }

        .profile-img-content,
        .menu-img {
            height: 35px;
            width: auto;
            object-fit: contain;
            display: block;
        }

        .profile-img-content {
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #fff
        }

        .menu-img {
            filter: brightness(0) invert(1);
        }

        .dropdown a {
            display: block;
            padding: 8px 12px;
            text-decoration: none;
            color: #282964;
            border-radius: 0;
        }

        .dropdown a:hover {
            background-color: #eee;
        }

        .dropdown a:first-child {
            padding: 12px 12px 8px;
            border-radius: 20px 0 0 0;
        }

        .dropdown a:last-child {
            padding: 8px 12px 12px;
            border-radius: 0 0 20px 20px;
        }
    }
</style>
