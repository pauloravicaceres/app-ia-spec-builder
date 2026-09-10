<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-extrabold text-gray-900">AI Spec Builder</h1>
      <p class="mt-2 text-sm text-gray-600">Crea tu cuenta para comenzar a generar especificaciones</p>
    </div>
    <SignUp routing="path" path="/sign-up" sign-in-url="/sign-in" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>
