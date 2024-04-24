import { defineStore } from 'pinia';
import { api } from '~/api';

export const useLikesStore = defineStore('likes', () => {
		const film = ref(null);
		const likes = ref([]);
		const reviews = ref([]);
		const detailFilmStore = useDetailFilmStore();
		const authStore = useAuthStore();
		
		async function fetchReviews(id: number) {
			const res = await api.get(`/film/${id}/reviews`);
	
			reviews.value = res.data.reviews;
		}
		
		async function fetchLikes(id: number) {
			const response = await api.get(`/review/${id}/likes`);
			likes.value = response.data;

		}

		async function addLikes(like: number, review_id: string) {
			const res = await api.post(
				`user/${authStore.authData.id}/reviews/${review_id}`,
				{
					review_id,
					like,
				},
				{
					headers: {
						Authorization: 'Bearer ' + authStore.authData.token,
					},
				}
			);
			fetchReviews(film.value.id);
	}
	
	return {
		fetchLikes,
		addLikes,
		likes,
	};
});
