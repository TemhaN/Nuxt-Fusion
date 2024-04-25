import { defineStore } from 'pinia';
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {

	const userData = ref(null);
	const reviewsData = ref([]);
	const ratingsData = ref([]);

	const authStore = useAuthStore();

	async function fetchUserData(id: number) {

		const res = await api.get(`/user/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + authStore.authData.token,
			}
		});
		userData.value = res.data;
	}

	async function fetchReviewsData() {

		const res = await api.get(`/user/${authStore.authData.id}/reviews`, {
			headers: {
				Authorization: 'Bearer ' + authStore.authData.token,
			},
		});
		reviewsData.value = res.data.reviews;
	}

	async function fetchRatingsData() {
		
		const res = await api.get(`/user/${authStore.authData.id}/ratings`, {
			 headers: {
				 'Authorization':'Bearer '+ authStore.authData.token,
			 }
		 });
		 ratingsData.value = res.data.ratings;
	}
	
	async function updateProfile(fio: string, email: string, birthday: string, gender_id) {
		const res = await api.put(`/user`, {
			fio,
			email,
			birthday,
			gender_id,
		}, {
			headers: {
				Authorization: 'Bearer ' + authStore.authData.token,
			},
		});
	}

	
	async function removeReviewsData(id: number) {
		await api.delete(`/user/${authStore.authData.id}/review/${id}`, {
			headers: {
				Authorization: 'Bearer ' + authStore.authData.token,
			},
		});

		await fetchReviewsData();
	}

	async function removeRatingsData(id: number) {
		await api.delete(`/user/${authStore.authData.id}/rating/${id}`, {
			headers: {
				Authorization: 'Bearer ' + authStore.authData.token,
			},
		});

		await fetchUserData(authStore.authData.id);
	}

	async function removeUserData() {
		
		await api.delete('/user', {
			headers: {
				Authorization: 'Bearer ' + authStore.authData.token,
			},
		});

		await authStore.removeAuthData();

		await fetchUserData(authStore.authData.id);
	}


	fetchReviewsData();
	fetchRatingsData();


	return {
		removeReviewsData,
		removeRatingsData,
		removeUserData,
		fetchUserData,
		updateProfile,
		ratingsData,
		reviewsData,
		userData,
	};
});
