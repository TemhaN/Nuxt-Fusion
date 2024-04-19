import { defineStore } from 'pinia';
import { api } from '~/api';

export const useFilmsStore = defineStore('films', () => {
	const films = ref([]);

	async function fetchFilms() {
		const response = await api.get('/films');
		films.value = response.data.films

		
	}

	return {
		films,
		fetchFilms,
	}
})