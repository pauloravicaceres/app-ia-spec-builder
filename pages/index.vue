<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          AI Spec Builder
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          De la Idea al Producto, sin fricción técnica.
        </p>
      </div>
      
      <!-- Componente para ingresar el pitch -->
      <SpecForm v-if="!specResult" @result="handleSpecGenerated" />
      
      <!-- Resultado generado por la IA -->
      <div v-else class="max-w-5xl mx-auto mt-10">
        <div class="flex justify-end mb-4">
          <button @click="resetFlow" class="text-sm font-medium text-gray-500 hover:text-blue-600 underline flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Nueva especificación
          </button>
        </div>
        
        <SpecOutput :spec="specResult" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const specResult = ref<any>(null)

onMounted(() => {
  const saved = localStorage.getItem('latestSpec')
  if (saved) {
    try {
      specResult.value = JSON.parse(saved)
    } catch (e) {
      localStorage.removeItem('latestSpec')
    }
  }
})

const handleSpecGenerated = (spec: any) => {
  specResult.value = spec
  localStorage.setItem('latestSpec', JSON.stringify(spec))
}

const resetFlow = () => {
  const confirmMsg = '¿Estás seguro de que deseas descartar esta especificación? Asegúrate de haberla copiado o descargado.'
  if (window.confirm(confirmMsg)) {
    specResult.value = null
    localStorage.removeItem('latestSpec')
  }
}
</script>
