<script setup lang="ts">
import { ref } from 'vue'

interface Flow {
  name: string
  steps: string[]
  error_path: string
}

interface Spec {
  vision: string
  users: string
  features: string[]
  flows: Flow[]
  architecture: string
  requirements: string
}

const props = defineProps<{
  spec: Spec
}>()

const copied = ref(false)

const getMarkdownText = () => {
  return `
# Especificación Técnica del Producto

## 1. Visión y Alcance
${props.spec.vision}

## 2. Usuarios Objetivo
${props.spec.users}

## 3. Funcionalidades Principales
${props.spec.features.map(f => `- ${f}`).join('\n')}

## 4. Flujos del Sistema
${props.spec.flows.map((f, i) => `
### Flujo ${i + 1}: ${f.name}
Pasos:
${f.steps.map((s, j) => `  ${j + 1}. ${s}`).join('\n')}
Ruta de Error:
  - ${f.error_path}
`).join('\n')}

## 5. Arquitectura
${props.spec.architecture}

## 6. Requisitos (Funcionales y No Funcionales)
${props.spec.requirements}
`.trim()
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(getMarkdownText())
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const downloadMarkdown = () => {
  const blob = new Blob([getMarkdownText()], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'especificacion-tecnica.md'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="spec-container space-y-8 animate-fade-in-up relative">
    
    <!-- Barra de acciones flotante -->
    <div class="sticky top-4 z-10 flex justify-end mb-4 pointer-events-none">
      <div class="flex space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-gray-100 pointer-events-auto">
        <button 
          @click="copyToClipboard" 
          title="Copiar al portapapeles"
          class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
        >
          <svg v-if="!copied" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <svg v-else class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button 
          @click="downloadMarkdown" 
          title="Descargar Markdown"
          class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 1. Visión -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Visión del Producto</h2>
      </div>
      <div class="prose prose-lg prose-blue max-w-none">
        <p class="text-gray-700">{{ spec.vision }}</p>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 2. Usuarios -->
      <section class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center space-x-3 mb-4">
          <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Usuarios Objetivo</h3>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 prose prose-blue max-w-none">
          <p>{{ spec.users }}</p>
        </div>
      </section>

      <!-- 6. Arquitectura -->
      <section class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center space-x-3 mb-4">
          <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Arquitectura y Stack</h3>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 prose prose-emerald max-w-none">
          <p>{{ spec.architecture }}</p>
        </div>
      </section>
    </div>

    <!-- 3. Funcionalidades -->
    <section class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div class="flex items-center space-x-3 mb-6">
        <div class="p-2 bg-orange-100 rounded-lg text-orange-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900">Funcionalidades Principales</h3>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="(feature, index) in spec.features" :key="index" class="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
          <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-gray-700 font-medium">{{ feature }}</span>
        </li>
      </ul>
    </section>

    <!-- 4. Flujos -->
    <section class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div class="flex items-center space-x-3 mb-6">
        <div class="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900">Flujos del Sistema</h3>
      </div>
      <div class="space-y-6">
        <div v-for="(flow, idx) in spec.flows" :key="idx" class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 font-bold text-gray-800">
            {{ idx + 1 }}. {{ flow.name }}
          </div>
          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Camino Feliz -->
            <div>
              <h4 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Flujo Principal (Happy Path)</h4>
              <ol class="space-y-2">
                <li v-for="(step, sIdx) in flow.steps" :key="sIdx" class="flex items-start text-gray-700 text-sm">
                  <span class="flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 text-xs font-bold mr-2 flex-shrink-0 mt-0.5">{{ sIdx + 1 }}</span>
                  {{ step }}
                </li>
              </ol>
            </div>
            <!-- Camino de Error -->
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
              <h4 class="text-sm font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Flujo Alterno / Error
              </h4>
              <p class="text-red-700 text-sm">{{ flow.error_path }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Requisitos -->
    <section class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-2 bg-teal-100 rounded-lg text-teal-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900">Requisitos</h3>
      </div>
      <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 prose prose-teal max-w-none">
        <p>{{ spec.requirements }}</p>
      </div>
    </section>

    <!-- 8. Botones de Acción Finales -->
    <div class="flex flex-col sm:flex-row justify-center gap-4 pt-4 pb-8">
      <button 
        @click="copyToClipboard" 
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
      >
        <svg v-if="!copied" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        <svg v-else class="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? '¡Copiado!' : 'Copiar especificación' }}
      </button>
      <button 
        @click="downloadMarkdown" 
        class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Descargar .md
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
