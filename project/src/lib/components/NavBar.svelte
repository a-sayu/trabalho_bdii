<script>
  import logoCacic from "../assets/logo-cacic.svg";
  import menuIcon from "../assets/menu.png";
  import profileIcon from "../assets/profile.png";

  // Estado para controlar se o menu está aberto ou fechado
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }
</script>

<svelte:window on:click={closeDropdown} />

<nav class="navbar">
  <div class="nav-guard" on:click|stopPropagation role="presentation">
    <div class="nav-left">
      <a href="/" class="logo">
        <img src={logoCacic} alt="Logo CACiC" />
      </a>
    </div>

    <div class="nav-right">
      <a href="/login">
        <img src={profileIcon} alt="Perfil" class="profile-img" />
      </a>

      <div class="dropdown">
        <button type="button" class="dropbtn" on:click={toggleDropdown}>
          <img src={menuIcon} alt="Menu" class="menu-img" />
        </button>

        {#if isDropdownOpen}
          <div class="dropdown-content">
            <a href="/gerar-qrcode" on:click={closeDropdown}>Gerar QR Code</a>
            <a href="/emitir-certificados" on:click={closeDropdown}
              >Emitir Certificados</a
            >
            <a href="/adicionar-provas" on:click={closeDropdown}
              >Adicionar Provas</a
            >
            <a href="/adicionar-eventos" on:click={closeDropdown}
              >Adicionar Eventos</a
            >
            <a href="/sugestoes-e-pautas" on:click={closeDropdown}
              >Sugestões e Pautas</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>
