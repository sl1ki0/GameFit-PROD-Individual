export default defineNuxtRouteMiddleware((to) => {
  const isVisited: String | null = localStorage.getItem("isVisited");

  if (!isVisited && !(to.path.toLowerCase() === '/welcome' || to.path.toLowerCase() === '/createuser')) {
    return navigateTo("/welcome");
  } else if (isVisited && (to.path.toLowerCase() === '/welcome' || to.path.toLowerCase() === '/createuser')) {
    return navigateTo('/')
  }
});