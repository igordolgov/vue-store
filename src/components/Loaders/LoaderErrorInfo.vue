<template>
  <div>{{ title }}
    <p>
      <a class="errLink"
        @click.prevent="reloadAgain" 
      >Попробовать ещё раз</a>
    </p>
    <div class="loader-img">
      <img src="../../../public/img/icons/SVG-Animation-404-Page.gif"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderErrorInfo',
  props: ['title'],
  methods: {
    reloadAgain() {
      this.$emit('reload')
    },
  }
}
</script>

<style scoped>
.errLink {
  text-decoration: underline;
  cursor: pointer;
}
</style>