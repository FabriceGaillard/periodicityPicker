<script setup>
import DayCheckboxList from '@/components/DayCheckboxList.vue'
import ReccurencyChoice from '@/components/ReccurencyChoice.vue'
import EndRadioList from '@/components/EndRadioList.vue'
</script>
<template>
  <!--   <div class="container p-4">
    <div class="title mb-4">Custom reccurence</div>
    <ReccurencyChoice class="mb-4 pt-2" />
    <div class="mb-4">
      <div class="mb-3">Repeat on</div>
      <DayCheckboxList />
    </div>
    <div class="mb-4">
      <div class="mb-3">Ends</div> -->
  <EndRadioList />
  <!--     </div>
    <div class="d-flex">
      <button type="button" class="ms-auto me-2">Cancel</button>
      <button type="submit">Done</button>
    </div>
  </div> -->
</template>
<style lang="scss" scoped>
@import './assets/scss/variables';
.container {
  width: 385px;
  max-width: 385px;
  border-radius: var(--border-radius);
  background: var(--bg-color-light);

  input,
  select {
    height: 30px;
  }
}

.title {
  font-weight: bold;
  font-size: 16px;
}
</style>
