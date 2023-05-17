<script setup>
import { ref } from 'vue'

const { id, items } = defineProps({
  listboxId: String,
  items: Array
})

const activeDescendant = ref(0)
const expended = ref(false)
const select = ref(null)

const next = function () {
  activeDescendant.value = (activeDescendant.value + 1) % items.length
}
const previous = function () {
  activeDescendant.value = (!activeDescendant.value ? items.length : activeDescendant.value) - 1
}

const handleEscape = function () {
  expended.value = false
  select.value.focus()
}

let keyBuffer = ''
let timeout = null

const targetNextByLetter = function (e) {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => (keyBuffer = ''), 500)
  keyBuffer += e.key

  let i = 1
  while (i < items.length + 1) {
    const index = (activeDescendant.value + i) % items.length
    if (items[index].label.slice(0, keyBuffer.length).toLowerCase() === keyBuffer) {
      activeDescendant.value = index
      return
    }
    i += 1
  }
}
</script>

<template>
  <div class="select" v-click-out="() => (expended = false)">
    <button
      aria-haspopup="listbox"
      aria-labelledby="exp_elem exp_button"
      v-bind="$attrs"
      ref="select"
      class="input"
      :aria-expanded="expended"
      @click="expended = !expended"
      @keydown.esc.prevent="handleEscape"
      @keydown.down.prevent="next"
      @keydown.page-down="next"
      @keydown.up.prevent="previous"
      @keydown.page-up="previous"
      @keypress="targetNextByLetter"
    >
      {{ items[activeDescendant].label }}
    </button>

    <ul
      role="listbox"
      tabindex="-1"
      :id="listboxId"
      :aria-activedescendant="`${listboxId}-item-${activeDescendant}`"
      v-show="expended"
      @keydown.esc.prevent="handleEscape"
      @keydown.enter.prevent="handleEscape"
      @keydown.down.prevent="next"
      @keydown.page-down="next"
      @keydown.up.prevent="previous"
      @keydown.page-up="previous"
      @keypress="targetNextByLetter"
    >
      <li
        role="option"
        v-for="[i, item] of items.entries()"
        :key="i"
        :id="`${listboxId}-item-${i}`"
        :class="{ selected: activeDescendant === i }"
        @click="() => (activeDescendant = i)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins';
.select {
  position: relative;
  ul {
    position: absolute;
    top: 100%;
    box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 5px 5px;
    padding: 5px 0;
    background: white;
    width: 100%;
    min-width: fit-content;
  }
  li {
    padding: 0 15px;
    line-height: 32px;
    cursor: pointer;
    &.selected {
      background-color: rgb(232, 240, 254);
    }
  }

  li:hover:not(.selected) {
    background-color: rgb(245, 245, 245);
  }
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  button::after {
    @include spin-button(4px);
    content: ' ';
    margin-left: 10px;
    transition: transform 150ms ease-in-out;
  }

  button[aria-expanded='true']:after {
    transform: rotate(180deg);
  }
}
</style>
