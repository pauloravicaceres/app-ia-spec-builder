import { ref } from 'vue'
import type { Spec, HistorySpecItem } from '~/types/spec'

const SPEC_HISTORY_STORAGE_KEY = 'ai_spec_builder_history'

// Shared state across component instances
const history = ref<HistorySpecItem[]>([])
const isInitialized = ref(false)

export const useSpecHistory = () => {
  const loadHistory = () => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(SPEC_HISTORY_STORAGE_KEY)
      if (stored) {
        history.value = JSON.parse(stored)
      } else {
        history.value = []
      }
    } catch (err) {
      console.error('Error loading spec history from localStorage:', err)
      history.value = []
    } finally {
      isInitialized.value = true
    }
  }

  const saveHistory = () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(SPEC_HISTORY_STORAGE_KEY, JSON.stringify(history.value))
    } catch (err) {
      console.error('Error saving spec history to localStorage:', err)
    }
  }

  const addSpecToHistory = (spec: Spec, customName?: string): HistorySpecItem => {
    if (!isInitialized.value) {
      loadHistory()
    }

    // Generate fallback project name if not provided
    let defaultName = customName?.trim()
    if (!defaultName) {
      if (spec.vision) {
        // Use first few words or sentence from vision
        const firstSentence = spec.vision.split('.')[0]?.trim()
        defaultName = firstSentence && firstSentence.length > 5 && firstSentence.length <= 40
          ? firstSentence
          : firstSentence?.slice(0, 35) + '...'
      }
      if (!defaultName) {
        defaultName = `Proyecto ${new Date().toLocaleDateString('es-ES')}`
      }
    }

    const newItem: HistorySpecItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: defaultName,
      createdAt: new Date().toLocaleString('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      spec: JSON.parse(JSON.stringify(spec)) // clone to prevent reference mutations
    }

    history.value.unshift(newItem)
    saveHistory()
    return newItem
  }

  const renameSpec = (id: string, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed) return

    const item = history.value.find(h => h.id === id)
    if (item) {
      item.name = trimmed
      saveHistory()
    }
  }

  const deleteSpec = (id: string) => {
    history.value = history.value.filter(h => h.id !== id)
    saveHistory()
  }

  const getSpec = (id: string): Spec | null => {
    const item = history.value.find(h => h.id === id)
    return item ? JSON.parse(JSON.stringify(item.spec)) : null
  }

  return {
    history,
    isInitialized,
    loadHistory,
    addSpecToHistory,
    renameSpec,
    deleteSpec,
    getSpec
  }
}
