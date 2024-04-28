import { defineStore } from 'pinia';
import { api } from '~/api';

export const useMainPageStore = defineStore('topRatedFilmLink', () => {
	
	const topRatedFilmLink = ref(null);
	const films = ref([]);

	// const likes = ref([]);
	// const reviews = ref([]);
	// const detailFilmStore = useDetailFilmStore();
	// const authStore = useAuthStore();

	async function topRatedFilm() {
		const res = await api.get(`/topRatedFilmLink`);

		topRatedFilmLink.value = res.data.link_video;
	}

	
	async function topRatedFilmListMain() {
		const res = await api.get(`/getTopRatedFilmList`);

		films.value = res.data.films;
	}

	
	
	// async function fetchLikes(id: number) {
	// 	const response = await api.get(`/review/${id}/likes`);
	// 	likes.value = response.data;
		
	// }
	
	// async function addLikes(like: number, review_id: string) {
	// 	const res = await api.post(
	// 		`user/${authStore.authData.id}/reviews/${review_id}`,
	// 		{
	// 			review_id,
	// 			like,
	// 		},
	// 		{
	// 			headers: {
	// 				Authorization: 'Bearer ' + authStore.authData.token,
	// 			},
	// 		});
		
	// 	fetchReviews(film.value.id);
		
	// }
					
					
	topRatedFilmListMain();
	topRatedFilm();
								

	return {
		topRatedFilmLink,
		films,
	};
});
