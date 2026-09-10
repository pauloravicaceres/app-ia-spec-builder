export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@clerk/nuxt"],
  clerk: {
    signInUrl: '/sign-in',
    signUpUrl: '/sign-up',
    signInFallbackRedirectUrl: '/',
    signUpFallbackRedirectUrl: '/',
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY || process.env.NUXT_CLERK_SECRET_KEY,
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
  },
  nitro: {
    preset: "vercel"
  }
})

