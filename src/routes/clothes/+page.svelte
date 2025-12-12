<script>
    import ClothingList from "$lib/components/ClothingList.svelte";
    import { onMount } from "svelte";
    import { getClothes } from "$lib/api";

    let items = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            items = await getClothes();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<h1>Tu ropa</h1>

{#if loading}
    <p>Cargando...</p>
{:else if error}
    <p style="color:red">Error: {error}</p>
{:else}
    <ClothingList items={items} />
{/if}
