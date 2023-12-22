<script setup>
import { computed, ref } from '@vue/reactivity'
import { inject } from 'vue'

const locale = inject('locale')
const date = inject('date')

const minYear = 1000
const decade = ref(Math.floor(date.value.getFullYear() / 10) * 10)
const shift = computed(() => (Number(String(decade.value).at(-2) || 0) % 2 === 0 ? 1 : 3))
const years = computed(() =>
  Array.from({ length: 16 }, (_, i) => new Date(decade.value - shift.value + i, 0, 1))
)
function hundleClickOnYear(newDate) {
  date.value = newDate
  emits('update:view', 'month')
}

const emits = defineEmits(['update:view'])
</script>
<template>
  <div class="date-picker">
    <div class="date-picker__header">
      <span>
        {{ new Date(decade, 0, 1).toLocaleDateString(locale, { year: 'numeric' }) }} -
        {{ new Date(decade + 9, 0, 1).toLocaleDateString(locale, { year: 'numeric' }) }}
      </span>
      <button @click="() => (decade -= 10)" :disabled="decade - 10 < minYear">prev</button>
      <button @click="() => (decade += 10)">next</button>
    </div>
    <div class="date-picker__table">
      <button
        class="cell cell-td"
        v-for="[i, date] of years.entries()"
        :key="i"
        @click="() => hundleClickOnYear(date)"
        :class="{ 'cell--muted': date.getFullYear() < decade || date.getFullYear() > decade + 10 }"
      >
        {{ date.toLocaleDateString(locale, { year: 'numeric' }) }}
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
