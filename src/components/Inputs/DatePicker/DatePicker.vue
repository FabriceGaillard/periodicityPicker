<script setup>
import { ref, provide } from 'vue'
import { computed } from '@vue/reactivity'
import InputBase from '@/components/Inputs/InputBase.vue'
import DayPicker from './DayPicker.vue'
import YearPicker from './YearPicker.vue'
import MonthPicker from './MonthPicker.vue'

const { locale, date } = defineProps({
  locale: { type: String, required: true },
  date: { type: Date, default: new Date() }
})

const input = ref(null)
defineExpose({ input: computed(() => input.value?.input) })

const datePick = ref(date)
const dateRef = ref(date)
const show = ref(false)
const view = ref('day')

function reset() {
  dateRef.value = datePick.value
  show.value = false
  view.value = 'day'
}

provide(/* key */ 'date', /* value */ dateRef)
provide(/* key */ 'locale', /* value */ locale)

function handlePick() {
  datePick.value = dateRef.value
  show.value = false
}
</script>
<template>
  <div class="date-picker" v-click-out="reset">
    <InputBase
      type="text"
      v-bind="$attrs"
      :value="
        datePick.toLocaleDateString?.(locale, {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      "
      ref="input"
      class="date-picker__input"
      :disabled="disabled"
      :adaptive="true"
      @click="show = true"
    />
    <div class="date-picker__picker" v-show="show">
      <DayPicker v-show="view === 'day'" v-model:view="view" @pick="handlePick" />
      <MonthPicker v-show="view === 'month'" v-model:view="view" />
      <YearPicker v-show="view === 'year'" v-model:view="view" />
    </div>
  </div>
</template>
<style lang="scss">
.date-picker {
  position: relative;
  &__header {
    display: flex;
    align-items: center;
    padding: 0 0 0 0.5rem;
    button:nth-child(2) {
      margin-left: auto;
    }
    button {
      padding: 0.5rem;
    }
  }
  &__table {
    display: flex;
    flex-wrap: wrap;
    .cell {
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      &-td:hover {
        background-color: yellow;
      }

      &--muted {
        color: grey;
      }
    }
  }

  &__picker {
    position: absolute;
    top: 100%;
    background-color: var(--bg-color-light);
    padding: 0.5rem;
    padding: 5px;
    z-index: 1;
    width: 320px;
    border-radius: 5px;
    z-index: 1;
  }
}
</style>
