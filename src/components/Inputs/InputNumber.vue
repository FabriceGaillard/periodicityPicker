<script setup>
import ObjectHelper from '@/helpers/ObjectHelper.js'
import { computed, ref, useAttrs } from 'vue'
import Arrow from '../Icons/Arrow.vue'
import InputBase from '@/components/Inputs/InputBase.vue'
const { modelValue, min, max } = defineProps({
  min: Number,
  max: Number,
  suffix: Object,
  prefix: Object,
  modelValue: [String, Number],
  disabled: Boolean
})

defineOptions({ inheritAttrs: false })
const emit = defineEmits(['update:modelValue'])

const handleRestrictedValue = function (v) {
  let newValue = v
  if (min !== undefined && v < min) newValue = min
  else if (max !== undefined && v > max) newValue = max
  handleValue(newValue)
}

const handleValue = function (newValue) {
  value.value = newValue
  emit('update:modelValue', newValue)
}

const attrs = useAttrs()
const adaptive = computed(() => {
  if (!attrs.adaptive) return false

  return {
    maxChar: attrs.adaptive.maxChar ?? (max && String(max).length),
    minChar: attrs.adaptive.minChar ?? (min && String(min).length)
  }
})

const value = ref(modelValue)

const adaptiveInput = ref(null)
defineExpose({ input: computed(() => adaptiveInput.value?.input) })
</script>
<template>
  <div class="d-flex" :class="$attrs.class">
    <label class="input d-flex align-items-center me-2">
      <span v-if="prefix" class="ms-2">
        {{ Math.abs(value) > 1 ? prefix.pluriel : prefix.singulier }}
      </span>
      <InputBase
        ref="adaptiveInput"
        type="number"
        v-bind="ObjectHelper.omit($attrs, ['class', 'adaptive'])"
        :value="value"
        :min="min"
        :max="max"
        :disabled="disabled"
        :adaptive="adaptive"
        @input="handleValue($event.target.valueAsNumber)"
        @change="handleRestrictedValue($event.target.valueAsNumber)"
      />
      <span v-if="suffix" class="me-2">
        {{ Math.abs(value) > 1 ? suffix.pluriel : suffix.singulier }}
      </span>
    </label>
    <div class="d-flex flex-column justify-content-between" :class="{ disabled }">
      <button v-mouse-pressed="() => handleRestrictedValue(value + 1)">
        <Arrow width="14" height="14" direction="up" />
      </button>
      <button v-mouse-pressed="() => handleRestrictedValue(value - 1)">
        <Arrow width="14" height="14" direction="down" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
  text-align: right;
}

button {
  width: 14px;
  height: 14px;
  border-radius: 100%;
  padding: 0;
  display: block;
  text-align: center;
  background: none;
  background: var(--bg-color-secondary);

  svg {
    margin: auto;
  }

  &:hover {
    background-color: red;
  }
  &:active {
    background-color: yellow;
  }
}

label {
  cursor: text;
}

.disabled {
  opacity: 0.8;
}
</style>
