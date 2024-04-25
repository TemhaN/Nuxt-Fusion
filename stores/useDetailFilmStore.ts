import { defineStore } from 'pinia';
import { api } from '~/api';

export const useDetailFilmStore = defineStore('detail', () => {
	const film = ref(null);
	const reviews = ref([]);
	const authStore = useAuthStore();

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
					'Authorization': 'Bearer ' + authStore.authData.token,
				},
			}
		);
		fetchReviews(film.value.id);
	}

	async function addRating(ball:number) {
			const res = await api.post(`user/${authStore.authData.id}/ratings`, {
				film_id: film.value.id,
				ball
			}, {
				headers: {
					'Authorization' : 'Bearer ' + authStore.authData.token,
				}
			});
			fetchFilm(film.value.id);
	}




	return {
		fetchReviews,
		fetchFilm,
		addReview,
		addRating,
		reviews,
		film,
	};
});
