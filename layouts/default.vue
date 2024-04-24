<script lang="ts" setup>
const authStore = useAuthStore();

</script>



<template>
<div class="">
	<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top m-sm-auto">
		<div class="container-fluid">
			<img class="logo" src="~/public/img/logo3.png" alt="Logo">
			<NuxtLink to="/" class="navbar-brand">
					Fusion
			</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarScroll">
				<ul id="nav_bar" class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Главная</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Популярное</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Топ фильмов</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Все категории
						</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><hr class="dropdown-divider"></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
				</ul>
				<span class="line"></span>
				<template v-if="!authStore.authData">
					<div class="login-container">
						<div class="d-flex gap-3 login-form" >
							<button class="btn btn-login" type="submit" @click="$router.push('/login')">Login</button>
							<button class="btn btn-register" type="submit" @click="$router.push('/register')">Register</button>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="login-container">
						<div class="d-flex gap-3 login-form" >
							<button class="btn btn-login" type="button" @click="authStore.logout(), $router.push('/')">Logout</button>
							<a href="#" @click="$router.push('/profile')" class="nav-link user-name my-2">{{ authStore.authData.fio }}</a>
						</div>
					</div>
					<a href="#" @click="$router.push('/profile')" class="nav-link settings">
						<i class="fa-solid fa-gear"></i>
					</a>
				</template>
				
			</div>
		</div>
	</nav>
</div>
	
	<div class="container py-2 content">
		<slot />
		
	</div>
	
	<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
		<div class="col-md-4 d-flex align-items-center">
			<a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
				<svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
			</a>
			<span class="mb-3 mb-md-0 text-body-secondary">© 2024 Fusion, Inc</span>
		</div>
	</footer>
		
</template>
