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

	const params: {
		category: number | null,
		country: number | null,
	} = {
		category: null,
		country: null,
	};
 

	function addCategoryToParams(category: number | null) {
		params.category = category;
		fetchFilms();
	}

	function addCountryToParams(country: number | null) {
		params.country = country;
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
		addCountryToParams,
	};
})