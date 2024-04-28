<script lang="ts" setup>

import { useFilmsStore } from '~/stores/useFilmsStore';
import { useCategoriesStore } from '~/stores/useCategoriesStore';
import { useCountriesStore } from '~/stores/useCountriesStore';

const detailFilmStore = useDetailFilmStore();
const profileStore = useProfileStore();
const mainPage = useMainPageStore();

const filmsStore = useFilmsStore();
const categoriesStore = useCategoriesStore();
const countriesStore = useCountriesStore();

const category = ref(null);
watch(category, (newCategory) => {
	filmsStore.addCategoryToParams(newCategory);
});

const country = ref(null);
watch(country, (newCountry) => {
	filmsStore.addCountryToParams(newCountry);
});

const sortBy = ref('name');
watch(sortBy, (newSortBy) => {
	filmsStore.addSortToParams(newSortBy);
})

const resetParams = () => {
	filmsStore.selectedCategoryIds.value = null;
	category.value = null;
	country.value = null;
	sortBy.value = 'name';

	filmsStore.fetchFilms();
}

filmsStore.fetchFilms();


function getPageLinks(currentPage: number, totalPages: number): number[] {
  const MAX_VISIBLE_PAGES = 3;
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);

  let startPage = Math.max(Math.min(currentPage - half, totalPages - MAX_VISIBLE_PAGES + 1), 1);
  let endPage = Math.min(Math.max(currentPage + half, MAX_VISIBLE_PAGES), totalPages);

  if (totalPages <= MAX_VISIBLE_PAGES) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= half + 1) {
    endPage = Math.min(totalPages, MAX_VISIBLE_PAGES);
  } else if (currentPage >= totalPages - half) {
    startPage = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

</script>

<style>

</style>

<template>
	
	<iframe
		width="100%"
		height="700px"
		:src="'https://www.youtube.com/embed/'+mainPage.topRatedFilmLink"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
		:style="{ objectFit: 'cover' }">
	</iframe>

	<div class="container content">
		
		<h1 class="text-center main-page-text">Все фильмы</h1>

		<div class="row my-4">

			<div class="col col-md-5">
				<select class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="country">
					<option selected :value="null">Выбрать страну</option>
					<option 
						v-for="country in countriesStore.countries" 
						:key="country.id" 
						:value="country.id"
						>{{ country.name }}
					</option>
				</select>
			</div>

			<div class="col col-md-5">
				<select class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="sortBy">
					<option selected :value="name">Сортировать по... <p class="text-muted">Названию</p></option>
					<option value="year">Сортировать по... <p class="text-muted">Дате</p></option>
					<option value="rating">Сортировать по... <p class="text-muted">Рейтингу</p></option>
				</select>
			</div>

			<div class="col col-md-2">
				<button class="btn-reset" @click="resetParams"><span>Сбросить</span></button>
			</div>

		</div>


		<div class="category-list">
			<div
				v-for="(category, index) in categoriesStore.categories"
				:key="category.id"
				class="category-card wallet"
				:class="{ selected: filmsStore.selectedCategoryIds.includes(category.id) }"
				@click="filmsStore.toggleCategorySelection(category.id, index)"
			>
				<div class="overlay"></div>
				<div class="category-name">{{ category.name }}</div>
				<div class="category-count">{{ category.filmCount }} фильмов</div>
			</div>
		</div>

		<!-- Loader -->
		<div class="text-center" v-if="filmsStore.isLoading">
			<div class="gooey">
				<span class="dot"></span>
				<div class="dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>

		<template v-else>

			<!-- <div class="row row-cols-md-4 g-4">
				<div class="col" v-for="film in mainPage.films" :key="film.id">
					<div class="card card-film" style="width: 17rem; min-height:670px; max-height: 670px; max-width:100%;">
						<div class="card-head">
							<div class="overlay" :style="{ backgroundImage: `url(${film.link_img})` }"></div>
							<a style="cursor: pointer;" @click="$router.push('/film/'+film.id)">
								<div class="card-image-container">
									<img :src="film.link_img" alt="Film" class="card-img-top rounded mr-3 card-image" style="object-fit: cover;">
								</div>
							</a>
						</div>
						<div class="card-body card-film">
							<h3 class="dropdown-item-title d-flex justify-content-between">
								<div class="d-flex filmname w-75">
									<a class="fw-bold" style="cursor: pointer;" @click="$router.push('/film/'+film.id)">{{ film.name }}</a>
								</div>
								<p>{{ film.age }}+</p>
							</h3>
							<div class="d-flex flex-column justify-content-end">
								<p class="text-sm">Оценка: {{ film.ratingAvg }}</p>
								<p class="text-sm">{{ film.duration }} мин.</p>
							</div>
						</div>
						<div class="card-footer d-flex mt-auto justify-content-between">
							<i v-if="profileStore.favoritesData.some(favorite => favorite.film.id === film.id)"
								class="fas fa-heart text-danger"
								@click.prevent="profileStore.removeFavoritesData(film.id)"
							></i>
							<i v-else
								class="fa-regular fa-heart"
								@click.prevent="profileStore.likeFilm(film.id)"
							></i>
							<button @click="$router.push('/film/'+film.id)" class="btn btn-outline-primary">Смотреть</button>
						</div>
					</div>
				</div>
			</div> -->


			<div class="row row-cols-md-4 g-4 mt-5">
				<div class="col" v-for="film in filmsStore.films" :key="film.id">
					<div class="card card-film" style="width: 17rem; min-height:670px; max-height: 670px; max-width:100%;">
						<div class="card-head">
							<div class="overlay" :style="{ backgroundImage: `url(${film.link_img})` }"></div>
							<a style="cursor: pointer;" @click="$router.push('/film/'+film.id)">
								<div class="card-image-container">
									<img :src="film.link_img" alt="Film" class="card-img-top rounded mr-3 card-image" style="object-fit: cover;">
								</div>
							</a>
						</div>
						<div class="card-body card-film">
							<h3 class="dropdown-item-title d-flex justify-content-between">
								<div class="d-flex filmname w-75">
									<a class="fw-bold" style="cursor: pointer;" @click="$router.push('/film/'+film.id)">{{ film.name }}</a>
								</div>
								<p>{{ film.age }}+</p>
							</h3>
							<div class="d-flex flex-column justify-content-end">
								<p class="text-sm">Оценка: {{ film.ratingAvg }}</p>
								<p class="text-sm">{{ film.duration }} мин.</p>
								<!-- <div class="categories-text">
									<p v-if="film.categories.length != 0">
										<template v-for="(genre, index) in film.categories" :key="genre.id">
											{{ (index != film.categories.length - 1) ? genre.name+', ' : genre.name }}
										</template>
									</p>
									<p class="text-muted" v-else>Нет жанров</p>
								</div> -->
							</div>
						</div>
						<div class="card-footer d-flex mt-auto justify-content-between">

							<i v-if="profileStore.favoritesData.some(favorite => favorite.film.id === film.id)"
								:class="[ 'fas fa-heart icon-love-active icon-love' ]"
								@click.prevent="profileStore.removeFavoritesData(film.id)"
							></i>

							<i v-else
								:class="[ 'fa-regular fa-heart icon-love' ]"
								@click.prevent="profileStore.likeFilm(film.id)"
							></i>

							<button @click="$router.push('/film/'+film.id)" class="btn-watch">Смотреть</button>
						</div>
					</div>
				</div>
			</div>


			<nav class="d-flex justify-content-center pagenation-containter" aria-label="Page navigation example">
				<ul class="pagination">
					<li class="page-item">
						<a class="page-link mx-1"
							:class="{'disabled': filmsStore.page - 1 == 0}"
							href="#"
							tabindex="-1"
							aria-disabled="true"
							@click.prevent="filmsStore.changePage(filmsStore.page - 1)">
							«
						</a>
					</li>

					<template v-for="page in getPageLinks(filmsStore.page, Math.ceil(filmsStore.total / filmsStore.size))" :key="page">
						<li class="page-item">
							<a class="page-link mx-1"
								:class="{'active': page === filmsStore.page}"
								href="#"
								@click.prevent="filmsStore.changePage(page)">
								{{ page }}
							</a>
						</li>
					</template>

					<li class="page-item">
						<a class="page-link mx-1"
							:class="{'disabled': filmsStore.page === Math.ceil(filmsStore.total / filmsStore.size)}"
							href="#"
							@click.prevent="filmsStore.changePage(filmsStore.page + 1)">
							»
						</a>
					</li>
				</ul>
			</nav>

		</template>

	</div>

</template>