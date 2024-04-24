import { defineStore } from 'pinia';
import { api } from '~/api';

export const useDetailFilmStore = defineStore('detail', () => {
	const film = ref(null);
	const reviews = ref([]);
	const actors = ref([]);
	const likes = ref([]);
	const authStore = useAuthStore();

	async function fetchFilm(id: number) {
		const res = await api.get('/film/' + id);

		film.value = res.data;
	}

	async function fetchReviews(id: number) {
		const res = await api.get(`/film/${id}/reviews`);
		
		reviews.value = res.data.reviews;
	}
	
	async function fetchActors(id: number) {
		const res = await api.get(`/film/${id}/actors`);

		actors.value = res.data.actors;
	}
	
	async function fetchLikes(id: number) {
		const response = await api.get(`/review/${id}/likes`);
		likes.value = response.data;

		fetchReviews(film.value.id);
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


		async function likeFilm(like: number) {
			const res = await api.post(
				`user/${authStore.authData.id}/favorites`,
				{
					film_id: film.value.id,
					like
				},
				{
					headers: {
						Authorization: 'Bearer ' + authStore.authData.token,
					},
				}
			);
			fetchFilm(film.value.id);
	}
	
		async function likeFilmList(film_id:string, like: number) {
				const res = await api.post(
					`user/${authStore.authData.id}/favorites`,
					{
						film_id,
						like,
					},
					{
						headers: {
							Authorization: 'Bearer ' + authStore.authData.token,
						},
					}
				);
				fetchFilm(film.value.id);
		}



	return {
		likeFilmList,
		fetchReviews,
		fetchActors,
		fetchLikes,
		fetchFilm,
		addReview,
		addRating,
		likeFilm,
		reviews,
		actors,
		film,
	};
});
