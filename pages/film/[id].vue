<script lang="ts" setup>

const profileStore = useProfileStore();
const detailFilmStore = useDetailFilmStore();
const route = useRoute();
const authStore = useAuthStore();
const message = ref('');
const hoverRating = ref(0);

detailFilmStore.fetchFilm(route.params.id);
detailFilmStore.fetchReviews(route.params.id);

const sendReview = () => {
  if (message.value) {
    detailFilmStore.addReview(route.params.id, message.value);
  }
}

</script>

<template>

	<template v-if="detailFilmStore.film">

		<div class="d-flex row mt-5">
			<div class="col-md-5">
				<img :src="detailFilmStore.film.link_img"  alt="Film" style="min-height:500px; max-height: 500px; border-radius:25px ">
			</div>
			<div class="card-body col-md-7">
				<div class="m-4">
					<div class="fw-bold film-name d-flex flex-row" style="font-size: 3rem">
						<h1 class="ml-4" style="margin-top: 15px">{{ detailFilmStore.film.name }}</h1>
						<div class="d-flex align-items-baseline mx-4">
							<p style="background: linear-gradient(to right, #FFD700, #d08801); -webkit-background-clip: text; color: transparent;">{{ detailFilmStore.film.ratingAvg }}</p>
							<i class="fas fa-regular fa-star mx-3" style="background: linear-gradient(to right, #FFD700, #efa620); -webkit-background-clip: text; color: transparent;"></i>
						</div>
					</div>
					
					<i v-for="index in 1" :key="index" @click.prevent="detailFilmStore.likeFilm(index)" class="fa-regular fa-heart"></i>

					<p class="font-weight-bold mt-5" style="font-size: 1.5rem; color:gray;">О фильме</p>
					<div style="line-height: 20px">
						<div class="row mt-3" style="width: 800px">
							<div class="col-sm-6">
								<table class="table table-borderless">
									<tr>
										<td class="text-left border-bottom">Страна:</td>
										<td class="text-right text-muted border-bottom">{{ detailFilmStore.film.country.name }}</td>
									</tr>
									<tr>
										<td class="text-left border-bottom">Продолжительность:</td>
										<td class="text-right text-muted border-bottom">{{ detailFilmStore.film.duration }} мин.</td>
									</tr>
									<tr>
										<td class="text-left border-bottom">Дата выхода:</td>
										<td class="text-right text-muted border-bottom">{{ detailFilmStore.film.year_of_issue }}</td>
									</tr>
									<tr>
										<td class="text-left border-bottom">Возраст:</td>
										<td class="text-right text-muted border-bottom">{{ detailFilmStore.film.age }}+</td>
									</tr>
									<tr>
										<td class="text-left border-bottom">Категории:</td>
										<td class="text-right text-muted border-bottom">
											<p v-if="detailFilmStore.film.categories.length != 0">
												<template v-for="(genre, index) in detailFilmStore.film.categories" :key="genre.id">
													{{ (index != detailFilmStore.film.categories.length - 1) ? genre.name+', ' : genre.name }}
												</template>
											</p>
											<p class="text-muted" v-else>Нет жанров</p>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class=" mt-5">
			<p class="text-center fw-semibold fs-3">Трейлер:</p>
			<div class="d-flex justify-content-center align-items-center">
				<iframe width="1120" height="630" :src="'https://www.youtube.com/embed/'+detailFilmStore.film.link_video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		</div>
		<div class="row mt-5" v-if="authStore.authData">
			<div class="d-flex align-items-center gap-2">
				<p v-for="index in [5, 4, 3, 2, 1]" :key="index">
					<a @click.prevent="detailFilmStore.addRating(index)" class="text-warning link-offset-2 link-underline link-underline-opacity-0" style="cursor: pointer;">
						<i :class="hoverRating >= index ? 'fa-solid fa-star fa-2xl' : 'fa-sharp fa-regular fa-star fa-2xl'" @mouseover="hoverRating = index"></i>
					</a>
				</p>
			</div>
		</div>
		<div class="row mt-5" v-else>
		</div>
		<div class="row mt-5" v-if="authStore.authData">
			<div class="col-md-10">
				<label for="review" class="form-label">Add review</label>
				<textarea class="form-control" rows="3" v-model="message"></textarea>
			</div>
			<div class="col-md-2 d-flex align-items-end">
				<button class="btn btn-primary mt-3" @click.prevent="sendReview">Send</button>
			</div>
		</div>
		<div class="row mt-5" v-else>
			<p class="text-center">
				Do add comment please to <a style="cursor: pointer;" class="fw-semibold" @click="$router.push('/login')">Login</a> or <a style="cursor: pointer;"  class="fw-semibold" @click="$router.push('/register')">Register</a>
			</p>
		</div>
		<div class="row mt-5">
			<div class="col">
				<p class="fw-semibold mt-5" style="font-size: 2.5rem; color:black;">Отзывы</p>
			</div>
			<div class="row">
				<div class="col-md-6" v-for="review in detailFilmStore.reviews" :key="review.id">
					<div class="card mb-4 card-review">
						<div class="card-body">
							<h5 class="card-title">{{ review.user.fio }}</h5>
							<h6 class="card-subtitle mb-2 text-muted">{{ (new Date(review.created_at)).toLocaleDateString() }}</h6>
							<p class="card-text">{{ review.message }}</p>
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


<style>

</style>