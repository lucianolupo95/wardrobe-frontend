<script>
    import { createClothing } from "$lib/api";
    import { goto } from "$app/navigation";

    // Props
    export let mode = "create"; // "create" | "edit"

    /** @type {{
     *   id?: number,
     *   name?: string,
     *   photoUrl?: string,
     *   seasonId?: number,
     *   categoryId?: number,
     *   statusId?: number,
     *   visible?: boolean,
     *   notes?: string
     * } | null}
     */
    export let initial = null;

    // Estado del formulario
    let name = "";
    let photoUrl = "";
    let seasonId = 1;
    let categoryId = 1;
    let statusId = 1;
    let visible = true;
    let notes = "";

    // Precargar datos si estamos en modo edit
    if (initial) {
        name = initial.name ?? "";
        photoUrl = initial.photoUrl ?? "";
        seasonId = initial.seasonId ?? 1;
        categoryId = initial.categoryId ?? 1;
        statusId = initial.statusId ?? 1;
        visible = initial.visible ?? true;
        notes = initial.notes ?? "";
    }

    async function handleSubmit() {
        const payload = {
            name,
            photoUrl,
            seasonId,
            categoryId,
            statusId,
            visible,
            notes
        };

        try {
            if (mode === "create") {
                await createClothing(payload);
            }
            goto("/clothes");
        } catch (e) {
            const message = e instanceof Error ? e.message : "Error desconocido";
            alert("Error: " + message);
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <label>
        Nombre
        <input bind:value={name} required />
    </label>

    <label>
        Foto (URL)
        <input bind:value={photoUrl} placeholder="https://..." />
    </label>

    <label>
        Temporada
        <select bind:value={seasonId}>
            <option value={1}>Summer</option>
            <option value={2}>Winter</option>
            <option value={3}>Both</option>
        </select>
    </label>

    <label>
        Categoría
        <select bind:value={categoryId}>
            <option value={1}>Remera</option>
            <option value={2}>Campera</option>
            <option value={3}>Pantalón</option>
            <option value={4}>Zapatillas</option>
        </select>
    </label>

    <label>
        Estado
        <select bind:value={statusId}>
            <option value={1}>Nuevo</option>
            <option value={2}>Usado</option>
            <option value={3}>Gastado</option>
        </select>
    </label>

    <label class="checkbox">
        <input type="checkbox" bind:checked={visible} />
        Visible
    </label>

    <label>
        Notas
        <textarea bind:value={notes} rows="4"></textarea>
    </label>

    <button type="submit">
        {mode === "create" ? "Crear" : "Guardar cambios"}
    </button>
</form>
