import { defineStore } from 'pinia';
import { api } from '~/api';

export const useCountriesStore = defineStore('countries', () => {
	const countries = ref([]);

	async function fetchCountries() {

		const response = await api.get('/countries');
		countries.value = response.data.countries;

	}
	fetchCountries();

	return {
		countries
	};
});