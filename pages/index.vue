<script lang="ts" setup>
	import { useFilmsStore } from '~/stores/useFilmsStore';

	const filmsStore = useFilmsStore();

	filmsStore.fetchFilms();
</script>

<style>

</style>

<template>
	<div class="row my-4">
		<div class="col col-md-4">
			<select class="form-select form-select-lg" aria-label=".form-select-lg example">
				<option selected>Open Genre</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</div>
		<div class="col col-md-4">
			<select class="form-select form-select-lg" aria-label=".form-select-lg example">
				<option selected>Open Country</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</div>
		<div class="col col-md-3">
			<select class="form-select form-select-lg" aria-label=".form-select-lg example">
				<option selected>Sort by...</option>
				<option value="name">Name</option>
				<option value="year">Year</option>
				<option value="rating">Rating</option>
			</select>
		</div>
		<div class="col col-md-1">
			<button class="btn btn-outline-warning">Reset</button>
		</div>
	</div>
	
	<div class="row row-cols-1 row-cols-md-3 g-4">
		<div class="col" v-for="film in filmsStore.films" :key="film.id">		
			<div class="card-deck">
				<a class="link-underline-opacity-0 link-underline" href="">
					<div class="card">
						<img class="card-img-top" :src="film.link_img" alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title">{{ film.name }}</h5>
							<p class="text-muted">{{ film.ratingAvg }} Оценка</p>
							<p class="text-muted">{{ film.duration }} мин.</p>
							<p v-if="film.categories.length != 0">
								<template v-for="(genre, index) in film.categories" :key="genre.id">
									{{ (index != film.categories.length - 1) ? genre.name+', ' : genre.name }}
								</template>
							</p>
							<p class="text-muted" v-else>Нет жанров</p>
							<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
	
	<nav aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item disabled">
				<a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
			</li>
			<li class="page-item"><a class="page-link" href="#">1</a></li>
			<li class="page-item"><a class="page-link" href="#">2</a></li>
			<li class="page-item"><a class="page-link" href="#">3</a></li>
			<li class="page-item">
				<a class="page-link" href="#">Next</a>
			</li>
		</ul>
	</nav>

</template>

