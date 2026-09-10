<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-extrabold text-gray-900">AI Spec Builder</h1>
      <p class="mt-2 text-sm text-gray-600">Inicia sesión para acceder al generador de especificaciones</p>
    </div>
    <SignIn routing="path" path="/sign-in" sign-up-url="/sign-up" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>
