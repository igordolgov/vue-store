<template>
  <AppFormField :title="title" 
    :error="error"
  >
    <input v-model="dataValue"
      class="form__input"
      :type="type"
      name="name"
      :placeholder="placeholder"
    />
  </AppFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  name: 'AppFormText',
  props: { 
    type: {
      default: 'text'
    }
  },    
  mixins: [formFieldMixin]
}
</script>