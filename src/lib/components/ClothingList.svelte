<script>
    /** @type {{ id:number, name:string, photoUrl:string }[]} */
    export let items = [];

    const placeholder = "https://placehold.co/300x300?text=Sin+imagen";
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }
    .card {
        border: 1px solid var(--border, #444);
        border-radius: 8px;
        padding: 0.5rem;
        text-align: center;
        background: var(--bg-card, #222);
        color: var(--text, #f2f2f2);
        transition: 0.2s ease;
    }
    .card:hover {
        transform: scale(1.03);
        box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    }
    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 6px;
        margin-bottom: 0.5rem;
        background-color: #555;
    }
    .name {
        font-weight: bold;
        word-break: break-word;
    }
    .edit {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #93c5fd;
    text-decoration: none;
}
.edit:hover {
    text-decoration: underline;
}

</style>

<div class="grid">
    {#each items as item}
        <div class="card">
            <img
                src={(item.photoUrl && item.photoUrl.trim() !== "") ? item.photoUrl : placeholder}
                alt={item.name}
            />
            <div class="name">{item.name}</div>
            <a class="edit" href={`/clothes/${item.id}/edit`}>Editar</a>
        </div>
    {/each}
</div>
