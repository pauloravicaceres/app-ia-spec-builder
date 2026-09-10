export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/sign-in', '/sign-up']
  if (publicRoutes.some(route => to.path.startsWith(route))) {
    return
  }

  const { userId } = useAuth()
  if (!userId.value) {
    return navigateTo('/sign-in')
  }
})
