<script setup lang="ts">
import { ref } from 'vue'
import type { Spec, HistorySpecItem } from '~/types/spec'
import { useSpecHistory } from '~/composables/useSpecHistory'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', spec: Spec): void
}>()

const { history, renameSpec, deleteSpec } = useSpecHistory()

// State for inline renaming
const editingId = ref<string | null>(null)
const editName = ref('')

// State for deletion confirmation
const confirmingDeleteId = ref<string | null>(null)

const startRename = (item: HistorySpecItem) => {
  editingId.value = item.id
  editName.value = item.name
  confirmingDeleteId.value = null
}

const confirmRename = (id: string) => {
  if (editName.value.trim()) {
    renameSpec(id, editName.value.trim())
  }
  editingId.value = null
  editName.value = ''
}

const cancelRename = () => {
  editingId.value = null
  editName.value = ''
}

const promptDelete = (id: string) => {
  confirmingDeleteId.value = id
  editingId.value = null
}

const cancelDelete = () => {
  confirmingDeleteId.value = null
}

const executeDelete = (id: string) => {
  deleteSpec(id)
  confirmingDeleteId.value = null
}

const handleSelect = (item: HistorySpecItem) => {
  if (editingId.value || confirmingDeleteId.value) return
  emit('select', item.spec)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity" 
        @click="emit('close')"
      />

      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <!-- Panel lateral / Drawer -->
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200">
          
          <!-- Encabezado -->
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-900">Historial de Specs</h2>
                <p class="text-xs text-gray-500">
                  {{ history.length }} {{ history.length === 1 ? 'especificación guardada' : 'especificaciones guardadas' }}
                </p>
              </div>
            </div>

            <button 
              @click="emit('close')"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              title="Cerrar panel"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Contenido / Lista de specs -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Estado Vacío -->
            <div v-if="history.length === 0" class="text-center py-16 px-4">
              <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-base font-semibold text-gray-800 mb-1">No hay specs guardadas</h3>
              <p class="text-sm text-gray-500 max-w-xs mx-auto">
                Cada especificación que generes se guardará automáticamente en este panel para que puedas consultarla en cualquier momento.
              </p>
            </div>

            <!-- Lista de elementos del historial -->
            <div 
              v-for="item in history" 
              :key="item.id"
              class="group relative bg-white border border-gray-200 rounded-xl p-4 transition-all hover:shadow-md hover:border-blue-300"
            >
              <!-- Modo de Edición (Renombrar) -->
              <div v-if="editingId === item.id" class="space-y-3">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Renombrar especificación
                </label>
                <div class="flex items-center space-x-2">
                  <input 
                    v-model="editName"
                    @keyup.enter="confirmRename(item.id)"
                    @keyup.esc="cancelRename"
                    type="text" 
                    class="flex-1 px-3 py-1.5 text-sm border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del proyecto"
                    autofocus
                  />
                  <button 
                    @click="confirmRename(item.id)"
                    class="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                    title="Guardar nombre"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button 
                    @click="cancelRename"
                    class="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                    title="Cancelar"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Modo Confirmación de Eliminación -->
              <div v-else-if="confirmingDeleteId === item.id" class="bg-red-50 -m-4 p-4 rounded-xl border border-red-200">
                <p class="text-xs font-semibold text-red-800 mb-2">
                  ¿Eliminar "{{ item.name }}" del historial?
                </p>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="executeDelete(item.id)"
                    class="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700 transition-colors shadow-xs"
                  >
                    Sí, eliminar
                  </button>
                  <button 
                    @click="cancelDelete"
                    class="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              <!-- Vista Regular del Item -->
              <div v-else class="flex items-start justify-between">
                <div 
                  @click="handleSelect(item)" 
                  class="flex-1 cursor-pointer pr-3"
                  title="Haz clic para recuperar esta especificación"
                >
                  <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {{ item.name }}
                  </h4>
                  <div class="flex items-center text-xs text-gray-400 mt-1 space-x-2">
                    <span class="flex items-center">
                      <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ item.createdAt }}
                    </span>
                    <span>•</span>
                    <span class="text-blue-600 font-medium group-hover:underline">Recuperar</span>
                  </div>
                </div>

                <!-- Botones de Acción (Renombrar y Eliminar) -->
                <div class="flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button 
                    @click.stop="startRename(item)"
                    class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Renombrar"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click.stop="promptDelete(item.id)"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar del historial"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pie del Panel -->
          <div class="p-4 border-t border-gray-100 bg-gray-50 text-center">
            <p class="text-xs text-gray-400 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Persistido localmente en tu navegador
            </p>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>
