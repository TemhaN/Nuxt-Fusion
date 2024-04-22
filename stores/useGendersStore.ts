import { defineStore } from 'pinia';
import { api } from '~/api';

export const useGendersStore = defineStore('genders', () => {
	const genders = ref([]);

	async function fetchGenders() {

		const response = await api.get('/genders');
		genders.value = response.data.genders;

	}
	fetchGenders();
	
	return {
		genders,
	};
});