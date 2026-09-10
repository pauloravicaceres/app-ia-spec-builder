<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Barra superior / Header con botón de Historial -->
      <div class="flex justify-end mb-6">
        <button 
          @click="isHistoryOpen = true"
          class="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-xs text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Ver historial de especificaciones"
        >
          <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Historial</span>
          <span 
            v-if="history.length > 0" 
            class="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full"
          >
            {{ history.length }}
          </span>
        </button>
      </div>

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
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-gray-400">
            ✓ Esta especificación ha sido guardada en tu historial local
          </span>
          <button @click="resetFlow" class="text-sm font-medium text-gray-500 hover:text-blue-600 underline flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Nueva especificación
          </button>
        </div>
        
        <SpecOutput :spec="specResult" />
      </div>

      <!-- Drawer lateral de historial -->
      <SpecHistoryDrawer 
        :is-open="isHistoryOpen" 
        @close="isHistoryOpen = false" 
        @select="handleSelectFromHistory" 
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Spec } from '~/types/spec'
import { useSpecHistory } from '~/composables/useSpecHistory'

const specResult = ref<Spec | null>(null)
const isHistoryOpen = ref(false)

const { history, loadHistory, addSpecToHistory } = useSpecHistory()

onMounted(() => {
  loadHistory()
  const saved = localStorage.getItem('latestSpec')
  if (saved) {
    try {
      specResult.value = JSON.parse(saved)
    } catch (e) {
      localStorage.removeItem('latestSpec')
    }
  }
})

const handleSpecGenerated = (spec: Spec) => {
  specResult.value = spec
  localStorage.setItem('latestSpec', JSON.stringify(spec))
  // Guarda automáticamente en el historial local
  addSpecToHistory(spec)
}

const handleSelectFromHistory = (spec: Spec) => {
  specResult.value = spec
  localStorage.setItem('latestSpec', JSON.stringify(spec))
}

const resetFlow = () => {
  specResult.value = null
  localStorage.removeItem('latestSpec')
}
</script>
