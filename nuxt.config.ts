// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@pinia/nuxt'],
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: '/css/bootstrap.min.css',
				},
				{
					rel: 'stylesheet',
					href: '/css/main.css',
				},
				{
					rel: 'stylesheet',
					href: '/css/all.min.css',
				},
			],
			script: [
				{
					src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
					tagPosition: 'bodyClose',
				},
				{
					src: '/js/jquery.min.js',
					tagPosition: 'bodyClose',
				},
				{
					src: '/js/main.js',
					tagPosition: 'bodyClose',
				},
				{
					src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
					tagPosition: 'bodyClose',
				},
			],
		},
	},
});


// export default defineNuxtConfig({
// 	devtools: { enabled: true },
// 	modules: ['@pinia/nuxt'],
// 	app: {
// 		head: {
// 			link: [
// 				{
// 					rel: 'stylesheet',
// 					href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
// 				},
// 				{
// 					rel: 'stylesheet',
// 					href: '~/public/css/main.css',
// 				},
// 			],
// 			script: [
// 				{
// 					src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
// 					tagPosition: 'bodyClose',
// 				},
// 			],
// 		},
// 	},
// });


// // export default defineNuxtConfig({
// // 	devtools: { enabled: true },
// // 	modules: ['@pinia/nuxt'],
// // 	app: {
// // 		head: {
// // 			link: [
// // 				{
// // 					rel: 'stylesheet',
// // 					href: '/css/bootstrap.min.css',
// // 				},
// // 				{
// // 					rel: 'stylesheet',
// // 					href: '/css/main.css',
// // 				},
// // 			],
// // 			script: [
// // 				{
// // 					src: '/js/bootstrap.bundle.min.js',
// // 					tagPosition: 'bodyClose',
// // 				},
// // 			],
// // 		},
// // 	},
// // });
