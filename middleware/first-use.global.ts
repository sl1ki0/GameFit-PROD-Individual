export default defineNuxtRouteMiddleware((to) => {
      const firstVisit: String | null = localStorage.getItem("firstVisit");

      if (!firstVisit && to.path === '/welcome') {
        localStorage.setItem("firstVisit", "visited");
        return
      } else if (!firstVisit) {
        localStorage.setItem("firstVisit", "visited");
        return navigateTo("/welcome");
      }

  });