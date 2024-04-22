import { defineStore } from 'pinia';
import { api } from '~/api';

export const UseAuthStore = defineStore('auth', () => {
	const authData = ref(null);
	const authCookie = useCookie('authData');

	async function login(email: string, password: string) {
		
		try {
			const res = await api.post('/login', { email, password })
			saveAuthData(res.data)
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	}

	async function logout() {
		await api.post('/signout', null, {
			headers: {
				'Authorization':'Bearer ' + authData.value!.token,
			}
		});
		removeAuthData();
	}


	function saveAuthData(data:any) {
		authData.value = data;
		authCookie.value = btoa(JSON.stringify(data));
	}

	function removeAuthData() {
		authData.value = null;
		authCookie.value = null;
	}

	function readAuthData() {
		if (authCookie.value) {
			authData.value = JSON.parse(atob(authCookie.value));
		}
	}
	readAuthData();
	
	return {
		authData,
		logout,
		login,
	}
})
