<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "../app.css"; // css global
    import Navbar from "$lib/components/NavBar.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header>
    <Navbar />
</header>

{@render children()}
