export default defineNuxtRouteMiddleware((to, from) => {
    const firstVisit: String | null = localStorage.getItem('firstVisit')

    if (!firstVisit) {
        navigateTo('/welcome')
    }
  })
  