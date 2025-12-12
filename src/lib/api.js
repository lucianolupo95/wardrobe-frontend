const API_URL = 'http://localhost:8080/api/clothes';

/** @returns {Promise<any[]>} */
export async function getClothes() {
	const res = await fetch(API_URL);
	if (!res.ok) throw new Error('Error fetching clothes');
	return await res.json();
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function getClothingById(id) {
	const res = await fetch(`${API_URL}/${id}`);
	if (!res.ok) throw new Error('Item not found');
	return await res.json();
}

/**
 * @param {object} payload
 * @returns {Promise<any>}
 */
export async function createClothing(payload) {
	const res = await fetch('http://localhost:8080/api/clothes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'Error creando prenda');
	}

	return res.json();
}

/**
 * @param {number} id
 * @param {object} data
 * @returns {Promise<any>}
 */
export async function updateClothing(id, data) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Error updating item');
	return await res.json();
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function deleteClothing(id) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	});
	if (!res.ok) throw new Error('Error deleting item');
	return await res.json();
}

/**
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function restoreClothing(id) {
	const res = await fetch(`${API_URL}/${id}/restore`, {
		method: 'PATCH'
	});
	if (!res.ok) throw new Error('Error restoring item');
	return await res.json();
}
