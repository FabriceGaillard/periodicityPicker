export default {
  mounted(el, binding) {
    el.mousedownEvent = function () {
      document.addEventListener('mouseup', el.mouseupEvent)
      binding.value()
      el.mousePressedInterval = setInterval(() => {
        binding.value()
      }, 100)
    }
    el.mouseupEvent = function () {
      el.removeEventListener('mousedown', el.mouseupEvent)
      clearInterval(el.mousePressedInterval)
    }
    el.addEventListener('mousedown', el.mousedownEvent)
  },

  unmounted(el) {
    clearInterval(el.mousePressedInterval)
    el.removeEventListener('mousedown', el.mousedownEvent)
    el.removeEventListener('mousedown', el.mouseupEvent)
  }
}
