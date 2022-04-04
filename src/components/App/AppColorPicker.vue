<template>
  <ul>
    <li class="colors__item" 
      v-for="color in colors" 
      :key="color.id"
    >
      <label class="colors__label">
        <input class="colors__radio sr-only" 
          type="radio" 
          :value="color.id" 
          v-model="pickerColor">
        <span class="colors__value" 
          :style="{'background-color': color.color.code, 'border': '1px solid lightgrey'}" 
          :title="color.title">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: ['colors', 'currentColor'],
  computed: {
    pickerColor: { 
      get() {
        return this.currentColor
      },
      set(value) {
        this.$emit('update:currentColor', value)
      }
    }
  },
}
</script>