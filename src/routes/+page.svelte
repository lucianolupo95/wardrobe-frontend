<script>
    import { onMount } from "svelte";
    import { getClothes, deleteClothing, restoreClothing } from "$lib/api";

    let clothes = [];
    let loading = true;
    let error = null;

    // Cargar datos al montar la página
    onMount(async () => {
        try {
            clothes = await getClothes();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    async function handleDelete(id) {
        if (!confirm("¿Borrar esta prenda? (Soft delete)")) return;

        try {
            await deleteClothing(id);
            clothes = clothes.filter(c => c.id !== id);
        } catch (e) {
            alert("Error al borrar: " + e.message);
        }
    }

    async function handleRestore(id) {
        try {
            await restoreClothing(id);
            clothes = await getClothes();
        } catch (e) {
            alert("Error al restaurar: " + e.message);
        }
    }
</script>

<h1>Ropa</h1>

<!-- Botón para agregar -->
<a href="/clothes/new">➕ Agregar prenda</a>

{#if loading}
    <p>Cargando ropa...</p>
{:else if error}
    <p style="color: red;">Error: {error}</p>
{:else}
    {#if clothes.length === 0}
        <p>No hay prendas aún.</p>
    {/if}

    <ul>
        {#each clothes as item}
            <li>
                <strong>{item.name}</strong>
                — Season: {item.season_id}
                — Category: {item.category_id}
                — Status: {item.status_id}

                <!-- Edit -->
                <a href={`/clothes/${item.id}/edit`}>Editar</a>

                <!-- Borrar -->
                <button on:click={() => handleDelete(item.id)}>
                    Borrar
                </button>

                <!-- Restaurar -->
                <button on:click={() => handleRestore(item.id)}>
                    Restaurar
                </button>
            </li>
        {/each}
    </ul>
{/if}
