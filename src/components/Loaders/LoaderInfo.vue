<template>
  <div class="b-popup">
    <div class="b-popup-content">
      <div class="holder">{{ title }}
      <div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>        
    </div>  
  </div>
</template>

<script>
export default {
  name: 'LoaderInfo',
  props: ['title']
}
</script>