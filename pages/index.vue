<script lang="ts" setup>
import { useFilmsStore } from '~/stores/useFilmsStore';
import { useCategoriesStore } from '~/stores/useCategoriesStore';
import { useCountriesStore } from '~/stores/useCountriesStore';

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
	<div class="row my-4">
		<div class="col col-md-4">
			<select multiple class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="category">
				<option selected :value="null">Open Genre</option>
				<option 
					v-for="category in categoriesStore.categories" 
					:key="category.id" 
					:value="category.id"
					>{{ category.name }} ({{ category.filmCount }})
				</option>
			</select>
		</div>
		<div class="col col-md-4">
			<select class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="country">
				<option selected :value="null">Open Country</option>
				<option 
					v-for="country in countriesStore.countries" 
					:key="country.id" 
					:value="country.id"
					>{{ country.name }}
				</option>
			</select>
		</div>
		<div class="col col-md-3">
			<select class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="sortBy">
				<option selected :value="name">Sort by... <p class="text-muted">Name</p></option>
				<option value="year">Sort by... <p class="text-muted">Year</p></option>
				<option value="rating">Sort by... <p class="text-muted">Rating</p></option>
			</select>
		</div>
		<div class="col col-md-1">
			<button class="btn btn-outline-warning" @click="resetParams">Reset</button>
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

		<div class="row row-cols-md-4 g-4">
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
								<a style="cursor: pointer;" @click="$router.push('/film/'+film.id)">{{ film.name }}</a>
							</div>
							<p>{{ film.age }}+</p>
						</h3>
						<div class="d-flex flex-column justify-content-end">
							<p class="text-sm">Оценка: {{ film.ratingAvg }}</p>
							<p class="text-sm">{{ film.duration }} мин.</p>
							<div class="categories-text">
								<p v-if="film.categories.length != 0">
									<template v-for="(genre, index) in film.categories" :key="genre.id">
										{{ (index != film.categories.length - 1) ? genre.name+', ' : genre.name }}
									</template>
								</p>
								<p class="text-muted" v-else>Нет жанров</p>
							</div>
						</div>
          </div>
					<div class="card-footer d-flex flex-column align-items-end mt-auto justify-content-end">
							<button @click="$router.push('/film/'+film.id)" class="btn btn-outline-primary">Смотреть</button>
					</div>
        </div>
			</div>
		</div>


		<nav class="my-4" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item">
					<a class="page-link"
						:class="{'disabled': filmsStore.page - 1 == 0}"
						href="#"
						tabindex="-1"
						aria-disabled="true"
						@click.prevent="filmsStore.changePage(filmsStore.page - 1)">
						Previous
					</a>
				</li>

				<template v-for="page in getPageLinks(filmsStore.page, Math.ceil(filmsStore.total / filmsStore.size))" :key="page">
					<li class="page-item">
						<a class="page-link"
							:class="{'active': page === filmsStore.page}"
							href="#"
							@click.prevent="filmsStore.changePage(page)">
							{{ page }}
						</a>
					</li>
				</template>

				<li class="page-item">
					<a class="page-link"
						:class="{'disabled': filmsStore.page === Math.ceil(filmsStore.total / filmsStore.size)}"
						href="#"
						@click.prevent="filmsStore.changePage(filmsStore.page + 1)">
						Next
					</a>
				</li>
			</ul>
		</nav>

	</template>

</template>