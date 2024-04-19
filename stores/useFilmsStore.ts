import { defineStore } from 'pinia';
import { api } from '~/api';

export const useFilmsStore = defineStore('films', () => {
	type Film = {
		id: number;
		name: string;
		link_img: string;
		ratingAvg: number;
		duration: number;
		categories: Category[];
		description: string;
	};

	type Category = {
		id: number;
		name: string;
	};

	const films = ref<Film[]>([]);


	async function fetchFilms() {
		const response = await api.get('/films');
		films.value = response.data.films

		
	}

	return {
		films,
		fetchFilms,
	}
})