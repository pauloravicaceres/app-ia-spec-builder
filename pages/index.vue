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
      <SpecInputPitch v-if="!specResult" @success="handleSpecGenerated" />
      
      <!-- Resultado generado por la IA -->
      <div v-else class="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-sm border border-gray-100 prose prose-blue lg:prose-lg">
        <div class="flex justify-end mb-4">
          <button @click="resetFlow" class="text-sm text-gray-500 hover:text-blue-600 underline">
            Iniciar de nuevo
          </button>
        </div>
        
        <div v-html="formattedSpec"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const specResult = ref('')

const formattedSpec = computed(() => {
  // En un caso real usaríamos una librería como marked para parsear markdown
  // Por ahora como MVP, inyectaremos texto base (se sugiere agregar npm i marked)
  return specResult.value.replace(/\n/g, '<br>')
})

const handleSpecGenerated = (response: any) => {
  if (response && response.data) {
    specResult.value = response.data
  }
}

const resetFlow = () => {
  specResult.value = ''
}
</script>
