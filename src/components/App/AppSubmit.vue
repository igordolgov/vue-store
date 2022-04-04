<template>
  <button type="submit" 
    v-if="!loader"
  >
    {{ title }}
  </button>
  <button type="submit" 
    class="loader-img" 
    v-else
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'AppSubmit',
  props: ['title', 'loader'],
}
</script>
<style scoped>
  .loader-img {
    background-image: url("../../../public/img/icons/loader.gif");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>