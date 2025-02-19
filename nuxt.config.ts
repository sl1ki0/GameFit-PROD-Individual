// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-02-19',
  devtools: { enabled: true },
  nitro: {
    output: {
      publicDir: 'public'
    }
  },
  app: {
    baseURL: '/'
  },
  modules: ['nuxt3-localforage', '@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  vite: {
    optimizeDeps: {
      include: ['localforage'],
    },   
  },
  css: [
    'primeicons/primeicons.css', // Add this line
    // Optionally include the PrimeVue base styles if needed:
    // 'primevue/resources/primevue.min.css'
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
}
})