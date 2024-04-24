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
	const page = ref(1);
	const total = ref(0);
	const size = 12;
	const isLoading = ref(false);
	
	const params: {
		category: number[] | null;
		country: number | null;
		sortBy: string;
		sortDir: string;
		page: number;
		size: number;
	} = {
		category: null,
		country: null,
		sortBy: 'name',
		sortDir: 'desc',
		page: page.value,
		size
	};

	function addCategoryToParams (category: number[] | null) {
		if (category) {
			page.value = 1;
			params.page = 1;
			params.category = category.join('%');
		} else {
			page.value = 1;
			params.page = 1;
			params.category = null;
		}
		fetchFilms();
	}


	function addCountryToParams (country: number | null) {
		params.country = country;
		page.value = 1;
		params.page = 1;
		fetchFilms();
	}

	function addSortToParams (sortBy: string) {
		params.sortBy = sortBy;
		fetchFilms();
	}

	function changePage(pages: number) {
		page.value = pages;
		params.page = pages;
		fetchFilms();
	}

	async function fetchFilms() {
		isLoading.value = true;
		const response = await api.get('/films', { params });
		isLoading.value = false;

		films.value = response.data.films;
		page.value = response.data.page;
		total.value = response.data.total;
	}
	

	return {
		addCategoryToParams,
		addCountryToParams,
		addSortToParams,
		changePage,
		fetchFilms,
		isLoading,
		total,
		films,
		size,
		page,
	};
})