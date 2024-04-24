<script lang="ts" setup>

const profileStore = useProfileStore();
const gendersStore = useGendersStore();
const authStore = useAuthStore();
const fio = ref();
const email = ref();
const birthday = ref();
const gender = ref();

const profileLoad = async () => {
	await profileStore.fetchUserData(authStore.authData.id);
	fio.value = profileStore.userData.fio;
	email.value = profileStore.userData.email;
	birthday.value = profileStore.userData.birthday;
	gender.value = profileStore.userData.gender;
			
}

profileLoad();

const editProfile = async () => {
	if (fio.value && email.value && birthday.value && gender.value) {
		await profileStore.updateProfile(fio.value, email.value, birthday.value, gender.value);
		profileLoad();
	}

}



</script>

<style>

</style>


<template>

	<div class="container py-2 content">
		<template v-if="profileStore.userData">
			
			<div class="card-body">
				<div class="d-flex flex-column align-items-center text-center">
					<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
					<div class="mt-3">
						<h4>{{ profileStore.userData.fio }}</h4>
						<p class="text-secondary mb-1">Full Stack Developer</p>
						<p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
						<div class="d-flex justify-content-center gap-3">
							<button class="btn btn-outline-primary">Follow</button>
							<button class="btn btn-outline-primary">Message</button>
						</div>
						<div class="d-flex justify-content-center gap-5 mt-4">
							<p class="mb-1">Count reviews: {{ profileStore.userData.reviewCount }}</p>
							<p>Count scores: {{ profileStore.userData.ratingCount }}</p>
							<p>Count you favorites: {{ profileStore.userData.favoriteCount }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="nav-user my-5">
				<ul class="nav nav-pills nav-fill d-flex justify-content-center align-items-center" id="myTab" role="tablist">
					<li class="nav-link tab-pane" role="presentation">
						<button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">My profile</button>
					</li>
					<li class="nav-link tab-pane" role="presentation">
						<button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">My reviews</button>
					</li>
					<li class=" nav-link tab-pane" role="presentation">
						<button class="nav-link" id="scores-tab" data-bs-toggle="tab" data-bs-target="#scores-tab-pane" type="button" role="tab" aria-controls="scores-tab-pane" aria-selected="false">My scores</button>
					</li>
					<li class=" nav-link tab-pane" role="presentation">
						<button class="nav-link" id="favorites-tab" data-bs-toggle="tab" data-bs-target="#favorites-tab-pane" type="button" role="tab" aria-controls="favorites-tab-pane" aria-selected="false">My Favorites</button>
					</li>
					<p class="nav-link icon-user-settings">
						<i class="fa-solid fa-user-gear"></i>
					</p>
				</ul>
			</div>
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="1">
					<div class="profile-tab">
						<div class="card-body">
							<div class="row">
								<div class="col-sm-3">
									<h6 class="mb-0">Full Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									{{ profileStore.userData.fio }}
								</div>
							</div>
							<hr>
							<div class="row">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									{{ profileStore.userData.email }}
								</div>
							</div>
							<hr>
							<div class="row">
								<div class="col-sm-3">
									<h6 class="mb-0">Birthday</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									{{ (new Date(profileStore.userData.birthday)).toLocaleDateString()  }}
								</div>
							</div>
							<hr>
							<div class="row">
								<div class="col-sm-3">
									<h6 class="mb-0">Gender</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									{{ profileStore.userData.gender.name }}
								</div>
							</div>
							<hr>
							<div class="row mt-5">
								<div class="col-sm-12 d-flex gap-3">
									<button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
									<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h1 class="modal-title fs-5" id="exampleModalLabel">Edit profile</h1>
													<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div class="modal-body">
													<form>
														<div class="mb-3">
															<label for="name" class="col-form-label">Username:</label>
															<input type="text" v-model="fio" class="form-control" id="name">
														</div>
														<div class="mb-3">
															<label for="email" class="col-form-label">Email:</label>
															<input type="text" v-model="email" class="form-control" id="email">
														</div>
														<!-- <div class="mb-3">
															<label for="password" v-model="password" class="col-form-label">Password:</label>
															<input type="text" :value="profileStore.userData.password" class="form-control" id="password">
														</div> -->
														<div class="mb-3">
															<label for="birthday" class="col-form-label">Birthday:</label>
															<input type="date" v-model="birthday" class="form-control" id="birthday">
														</div>
														<div class="mb-3">
															<label for="gender" class="col-form-label">Gender:</label>
															<select id="form2Example22" class="form-control" v-model="gender">
																<option selected :value="null">Select Gender...</option>
																<option 
																	v-for="gender in gendersStore.genders" 
																	:key="gender.id" 
																	:value="gender.id"
																	:selected="gender_id == gender"
																	>{{ gender.name }}
																</option>
															</select>
														</div>
													</form>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" class="btn btn-primary" @click="editProfile">Submit</button>
												</div>
											</div>
										</div>
									</div>
									<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">Delete</button>

									<div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title" id="confirmDeleteModalLabel">Подтверждение удаления</h5>
													<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div class="modal-body">
													<p>Вы действительно хотите удалить свой аккаунт?</p>
													<p>Это действие нельзя отменить.</p>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
													<button type="button" class="btn btn-danger" id="deleteButton" @click="profileStore.removeUserData()">Удалить</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="2" >
					<div class="d-flex justify-content-evenly card" v-for="review in profileStore.reviewsData" :key="review.id">
						<div class="d-flex">
							<img class="img_icon_film card offset-1" :src="review.film.link_img" alt="ImageFilm">
							<a :href="'/film/'+ review.film.id" class="favorite_text">
								<h3 class="m-5 fw-bold">{{ review.film.name }}</h3>
							</a>
						</div>
						<div class="d-flex justify-content-end flex-column m-5">
							<div class="d-flex justify-content-end"
							:class="{
								'text-success':review.is_approved, 
								'text-danger':!review.is_approved}">
							{{ (review.is_approved) ? 
							'isApproved' : 
							'На рассмотрении' }}
							</div>
							<div class="d-flex flex-column">
								<div>Опубликовано: {{ (new Date(review.created_at)).toLocaleDateString() }}</div>
								<p class="fw-bold my-2">{{ review.message }}</p>
								<button class="btn btn-outline-danger" @click="profileStore.removeReviewsData(review.id)">Remove</button>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="scores-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="3">
					<div class="d-flex justify-content-evenly card" v-for="rating in profileStore.ratingsData" :key="rating.id">
						<div class="d-flex">
							<a :href="'/film/'+ rating.film.id" class="favorite_text">
								<h3 class="m-5 fw-bold">{{ rating.film.name }}</h3>
							</a>
						</div>
						<div class="d-flex justify-content-end flex-column m-5">
							<div class="d-flex flex-column">
								<div>Опубликовано: {{ (new Date(rating.created_at)).toLocaleDateString() }}</div>
								<p class="my-2">Оценка: <span class="fw-bold">{{ rating.score }}</span></p>
								<button class="btn btn-outline-danger" @click="profileStore.removeRatingsData(rating.id)">Remove</button>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="favorites-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="4">
					<div class="d-flex justify-content-evenly card" v-for="favorite in profileStore.favoritesData" :key="favorite.id">
						<div class="d-flex">
							<a :href="'/film/'+ favorite.film.id" class="favorite_text">
								<h3 class="m-5 fw-bold">{{ favorite.film.name }}</h3>
							</a>
						</div>
						<div class="d-flex justify-content-end flex-column m-5">
							<div class="d-flex flex-column">
								<i class="fas fa-heart text-danger my-2" @click="profileStore.removeFavoritesData(favorite.id)"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
			<!-- Loader -->
		<template v-else>
			<div class="text-center">
				<div class="gooey">
					<span class="dot"></span>
					<div class="dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</template>
	</div>

</template>


