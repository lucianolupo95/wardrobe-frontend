<script>
    import "../app.css";  // Tema oscuro global
    import favicon from "$lib/assets/favicon.svg";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<slot />
