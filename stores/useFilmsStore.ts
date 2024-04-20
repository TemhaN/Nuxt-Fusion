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

	const params = {};


	function addCategoryToParams(category: number|null) {
		if (category) {
			params.category = category;
		} else if ('category' in params) {
			delete params.category;
		}
		fetchFilms();
	}


	async function fetchFilms() {
		const response = await api.get('/films', {params});
		films.value = response.data.films

		
	}

	return {
		films,
		fetchFilms,
		addCategoryToParams,
	}
})