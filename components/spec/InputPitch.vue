<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Crea tu Especificación Técnica</h2>
    <p class="text-gray-600 mb-6">Describe la visión de tu producto en lenguaje natural. Sé tan detallado como desees.</p>
    
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="pitch"
        rows="6"
        class="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder='Ej. "Quiero una plataforma tipo Uber pero para tutorías académicas..."'
        :disabled="isGenerating"
      ></textarea>
      
      <div class="mt-4 flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          :disabled="!pitch.trim() || isGenerating"
        >
          <span v-if="isGenerating" class="mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          <span>Analizar y Estructurar</span>
        </button>
      </div>
    </form>
    
    <!-- Error state -->
    <div v-if="error" class="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pitch = ref('')
const isGenerating = ref(false)
const error = ref('')

const emit = defineEmits<{
  (e: 'success', data: any): void
}>()

const handleSubmit = async () => {
  if (!pitch.value.trim()) return
  
  isGenerating.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/generate-spec', {
      method: 'POST',
      body: { pitch: pitch.value }
    })
    emit('success', response)
  } catch (err: any) {
    error.value = err.data?.message || 'Ocurrió un error al procesar tu solicitud.'
  } finally {
    isGenerating.value = false
  }
}
</script>
