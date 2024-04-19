<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					<img width="40" height="40" src="~/public/img/logo3.png" alt="">
					Fusion
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarScroll">
					<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Link</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Link
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li><hr class="dropdown-divider"></li>
								<li><a class="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li>
					</ul>
					<form class="d-flex gap-2">
						<button class="btn btn-primary" type="submit">Login</button>
						<button class="btn btn-success" type="submit">Register</button>
					</form>
				</div>
			</div>
		</nav>
		
		<div class="container py-2 mb-auto" style="min-height: calc(100vh-190px);">
			<slot />
			
		</div>

		<footer class="d-flex flex-wrap justify-content-between content align-items-center py-3 my-4 border-top">
			<div class="col-md-4 d-flex align-items-center">
				<a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
					<svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
				</a>
				<span class="mb-3 mb-md-0 text-body-secondary">© 2024 Fusion, Inc</span>
			</div>
		</footer>
		
	</div>
</template>

<style>


</style>