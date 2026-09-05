export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  },
  nitro: {
    preset: "vercel"
  }
})
