<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import ClothingForm from "$lib/components/ClothingForm.svelte";
  import { getClothingById } from "$lib/api";
    /** @type {any} */
    let clothing = null;

    /** @type {string | null} */
    let error = null;
    let loading = true;
  onMount(async () => {
    const id = Number($page.params.id);

    try {
      clothing = await getClothingById(id);
    } catch (e) {
      error = "No se pudo cargar la prenda";
      console.error(e);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Cargando prenda...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <ClothingForm mode="edit" initial={clothing} />
{/if}
