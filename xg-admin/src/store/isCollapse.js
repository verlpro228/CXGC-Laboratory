import { defineStore } from 'pinia'
import { ref } from 'vue'
export const isCollapse = defineStore('isCollapse', () => {
  const isCollapsed = ref(false)

  function changeCollapse() {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, changeCollapse }
})