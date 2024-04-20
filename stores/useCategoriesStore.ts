import { defineStore } from 'pinia';
import { api } from '~/api';

export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref([]);

	async function fetchCategories() {

		const response = await api.get('/categories');
		categories.value = response.data.categories;

	}
	fetchCategories();
	
	return {
		categories
	}
});