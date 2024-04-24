<script lang="ts" setup>

const profileStore = useProfileStore();


</script>

<style>

</style>


<template>
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
								<a class="btn btn-info" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
								<a class="btn btn-danger" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Delete</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="2" >
				<div class="d-flex justify-content-evenly card" v-for="review in profileStore.reviewsData" :key="review.id">
					<div class="d-flex">
						<img class="img_icon_film card offset-1" :src="review.film.link_img" alt="ImageFilm">
						<a href="">
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
							<button class="btn btn-outline-danger">Remove</button>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="scores-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="3">
				<div class="d-flex justify-content-evenly card" v-for="rating in profileStore.ratingsData" :key="rating.id">
					<div class="d-flex">
						<a href="">
							<h3 class="m-5 fw-bold">{{ rating.film.name }}</h3>
						</a>
					</div>
					<div class="d-flex justify-content-end flex-column m-5">
						<div class="d-flex flex-column">
							<div>Опубликовано: {{ (new Date(rating.created_at)).toLocaleDateString() }}</div>
							<p class="my-2">Оценка: <span class="fw-bold">{{ rating.score }}</span></p>
							<button class="btn btn-outline-danger">Remove</button>
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
</template>


