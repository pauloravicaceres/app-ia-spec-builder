<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'result', spec: any): void
}>()

const description = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const currentLoadingMessage = ref('')

const loadingMessages = [
  'Analizando tu idea de producto...',
  'Estructurando historias de usuario...',
  'Diseñando la arquitectura técnica...',
  'Definiendo flujos del sistema...',
  'Escribiendo requerimientos y detalles...'
]
let loadingInterval: any = null

const charCount = computed(() => description.value.length)
const wordCount = computed(() => {
  const text = description.value.trim()
  return text === '' ? 0 : text.split(/\s+/).length
})

const sampleIdea = "Una aplicación móvil tipo SaaS para que paseadores de perros independientes puedan gestionar su agenda. Deben poder registrar clientes, ver un mapa con las rutas del día, y cobrar automáticamente con Stripe a fin de mes. Los dueños de los perros necesitan una vista web simple para ver fotos de los paseos y pagar."

const fillSampleData = () => {
  description.value = sampleIdea
  errorMessage.value = ''
}

const submitForm = async () => {
  if (!description.value.trim() || description.value.length < 20) {
    errorMessage.value = 'Por favor, proporciona una descripción más detallada (mínimo 20 caracteres).'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  
  // Start rotating loading messages
  let messageIndex = 0
  currentLoadingMessage.value = loadingMessages[0]
  loadingInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length
    currentLoadingMessage.value = loadingMessages[messageIndex]
  }, 2500)

  try {
    const response = await $fetch('/api/generate-spec', {
      method: 'POST',
      body: { description: description.value }
    })

    if (response && response.data) {
      emit('result', response.data)
    } else {
      throw new Error('Respuesta inválida del servidor')
    }
  } catch (error: any) {
    console.error('Error generando spec:', error)
    errorMessage.value = error.data?.message || error.message || 'Ocurrió un error inesperado al generar la especificación.'
  } finally {
    isLoading.value = false
    if (loadingInterval) clearInterval(loadingInterval)
  }
}

onUnmounted(() => {
  if (loadingInterval) clearInterval(loadingInterval)
})
</script>

<template>
  <div class="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Construye tu Especificación</h2>
      <p class="text-gray-500">Transforma tu idea cruda en una especificación técnica estructurada y lista para el equipo de desarrollo.</p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <div class="flex justify-between items-end mb-2">
          <label for="idea-description" class="font-medium text-gray-700">Descripción del Producto</label>
          <button 
            type="button" 
            @click="fillSampleData"
            class="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center transition-colors"
          >
            💡 Usar un ejemplo
          </button>
        </div>
        
        <div class="relative">
          <textarea
            id="idea-description"
            v-model="description"
            :disabled="isLoading"
            rows="6"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="Describe tu idea de producto... Por ejemplo: una app para que freelancers gestionen sus facturas."
          ></textarea>
          <div class="absolute bottom-3 right-3 text-xs font-medium flex space-x-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md" :class="charCount < 20 ? 'text-gray-400' : 'text-green-600'">
            <span>{{ charCount }} caracteres</span>
            <span class="border-l border-gray-300 pl-3">{{ wordCount }} palabras</span>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start animate-fade-in-up">
        <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isLoading || description.trim().length < 20"
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 min-w-[240px]"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span v-if="isLoading" class="animate-pulse">{{ currentLoadingMessage }}</span>
          <span v-else>Generar especificación</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
