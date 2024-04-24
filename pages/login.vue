<script lang="ts" setup>
const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const errorMsg = ref('');

const login = async () => {
	if (email.value && password.value) {
		try {
			await authStore.login(email.value, password.value);
      router.push('/');
		} catch(error: any) {
			errorMsg.value = error.message;
		}
	}
}
</script>

<style>

</style>

<template>
	
	<div class="container register-form">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-xl-10">
				<div class="card rounded-3 text-black">
					<div class="row g-0">
						<div class="col-lg-6">
							<div class="card-body p-md-5 mx-md-4">

								<div class="text-center">
									<img src="/img/logo.svg"
										style="width: 150px;" alt="logo">
									<h4 class="mt-1 mb-5 pb-1">We are Fusion</h4>
								</div>

								<div class="alert alert-danger d-flex align-items-center" role="alert" v-if="errorMsg">
									<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
									<div>
										{{ errorMsg }}
									</div>
								</div>

								<form @submit.prevent="login">
									<p>Please login to your account</p>
									<div data-mdb-input-init class="form-outline mb-4">
										<input type="email" v-model="email" id="form2Example11" class="form-control"
											placeholder="Email address" />
										<label class="form-label" for="form2Example11">Email</label>
									</div>

									<div data-mdb-input-init class="form-outline mb-4">
										<input type="password" v-model="password" id="form2Example22" class="form-control" />
										<label class="form-label" for="form2Example22">Password</label>
									</div>

									<div class="text-center pt-1 mb-5 pb-1 d-flex justify-content-center row">
										<button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block gradient-custom-2 mb-3 w-50" type="submit" >Log
											in</button>
										<a class="text-muted" href="#!">Forgot password?</a>
									</div>

									<div class="d-flex align-items-center justify-content-center pb-4">
										<p class="mb-0 me-2">Don't have an account?</p>
										<button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-danger" @click="$router.push('/register')">Create new</button>
									</div>

								</form>

							</div>
						</div>
						<div class="col-lg-6 d-flex align-items-center gradient-custom-2">
							<div class="text-white px-3 py-4 p-md-5 mx-md-4">
								<h4 class="mb-4">We are a movie site</h4>
								<p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>