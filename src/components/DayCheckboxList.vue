<script setup>
import { reactive } from 'vue'
const days = reactive(['M', ' T', 'W', 'T', 'F', 'S', 'S'])
</script>
<template>
  <ul>
    <li :key="day" v-for="(day, i) of days">
      <label :for="i" tabindex="0">
        <input type="checkbox" name="" :id="i" />
        {{ day }}
      </label>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
@use 'sass:map';
@import '@/assets/scss/variables';
label {
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;

  border-radius: 100%;
  background-color: var(--bg-color-secondary);
  color: var(--text-color-secondary);
  font-weight: bold;
  font-size: 10px;
  cursor: pointer;

  &:has(> input:checked) {
    background: var(--bg-color-primary);
    color: white;
  }
}
input {
  display: none;
}
li {
  display: inline-block;
  margin-right: map.get($spacings, '2');
}
</style>
