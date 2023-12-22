<script setup>
import StringHelper from '@/helpers/StringHelper'
import { computed } from '@vue/reactivity'
import { inject } from 'vue'

const locale = inject('locale')
const date = inject('date')

const months = computed(() =>
  Array.from({ length: 16 }, (_, i) => new Date(date.value.getFullYear(), i, 1))
)

const updateYear = (i) => {
  date.value = new Date(date.value.getFullYear() + i, date.value.getMonth(), 1)
}

function handleClickOnMonth(newDate) {
  date.value = newDate
  emits('update:view', 'day')
}

const emits = defineEmits(['update:view'])
</script>
<template>
  <div class="date-picker">
    <div class="date-picker__header">
      <button @click="() => $emit('update:view', 'year')">
        {{ date.getFullYear() }}
      </button>
      <button @click="() => updateYear(-1)">prev</button>
      <button @click="() => updateYear(1)">next</button>
    </div>
    <div class="date-picker__table">
      <button
        class="cell cell-td"
        :class="{ 'cell--muted': i > 11 }"
        v-for="[i, date] of months.entries()"
        :key="i"
        @click="() => handleClickOnMonth(date)"
      >
        {{ StringHelper.capitalize(date.toLocaleDateString(locale, { month: 'short' })) }}
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.date-picker__table {
  .cell {
    width: calc(100% / 4 - 1.5rem);
    margin: 0.75rem;
  }
}
</style>
