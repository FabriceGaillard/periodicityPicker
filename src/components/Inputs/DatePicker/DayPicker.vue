<script setup>
import StringHelper from '@/helpers/StringHelper'
import { computed } from '@vue/reactivity'
import { inject, onMounted } from 'vue'

const locale = inject('locale')
const date = inject('date')

const weekDays = computed(() => {
  const startDate = new Date(Date.UTC(2017, 0, 2)) // just a Monday

  return Array.from({ length: 7 }, (_, i) =>
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i
    ).toLocaleDateString(locale, { weekday: 'short' })
  )
})

const dates = computed(() => {
  const startDate = new Date(date.value.getFullYear(), date.value.getMonth(), 1)
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)) // shift on 1rst day to display

  return Array.from(
    { length: 42 },
    (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
  )
})
const iFirstDay = computed(() => dates.value.map((e) => e.getDate()).indexOf(1))
const iLastDay = computed(() => dates.value.map((e) => e.getDate()).lastIndexOf(1) - 1)

const updateMonth = (i) => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + i, 1)
}
function handleClickOnDay(newDate) {
  date.value = newDate
  emits('pick')
}
const emits = defineEmits(['update:view', 'pick'])
</script>
<template>
  <div>
    <div class="date-picker__header" v-bind="$attrs">
      <button @click="() => $emit('update:view', 'month')">
        {{ StringHelper.capitalize(date.toLocaleDateString(locale, { month: 'short' })) }}
        {{ StringHelper.capitalize(date.toLocaleDateString(locale, { year: 'numeric' })) }}
      </button>
      <button @click="() => updateMonth(-1)">prev</button>
      <button @click="() => updateMonth(1)">next</button>
    </div>
    <div class="date-picker__table" v-bind="$attrs">
      <span class="cell cell-th" v-for="[i, weekDay] of weekDays.entries()" :key="i">
        {{ weekDay }}
      </span>
      <button
        class="cell cell-td"
        :class="{ 'cell--muted': i < iFirstDay || i > iLastDay }"
        v-for="[i, date] of dates.entries()"
        :key="i"
        @click="() => handleClickOnDay(date)"
      >
        {{ date.getDate() }}
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.date-picker__table {
  .cell {
    width: calc(100% / 7 - 0.5rem);
    margin: 0.25rem;
  }
}
</style>
