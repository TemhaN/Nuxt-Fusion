import { defineStore } from 'pinia';
import { api } from '~/api';

export const useDetailFilmStore = defineStore('detail', () => {
	const film = ref(null);
	const reviews = ref([]);

	async function fetchFilm(id: number) {
		const res = await api.get('/film/' + id);

		film.value = res.data;
	}

	async function fetchReviews(id: number) {
		const res = await api.get(`/film/${id}/reviews`);
		
		reviews.value = res.data.reviews;
	}
	
	async function addReview(filmId: number, message: string) {
		const res = await api.post(`user/${authStore.authData.id}/reviews`, {
				film_id: filmId,
				message,
			},
			{
				headers: {
					Authorization: 'Bearer ' + authStore.authData.token,
				},
			}
		);
		fetchReviews(film);
	}
	
	return {
		fetchReviews,
		fetchFilm,
		addReview,
		reviews,
		film,
	};
});
