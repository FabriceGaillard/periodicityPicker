export default {
  mounted(el, binding) {
    el.clickOutsideEvent = function (e) {
      if (e.target != el && !el.contains(e.target)) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
