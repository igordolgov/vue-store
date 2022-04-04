<template>
  <AppFormField :title="title" 
    :error="error"
  >
    <textarea v-model="dataValue"
      class="form__input form__input--area"
      name="name"
      :placeholder="placeholder"
    />
  </AppFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  name: 'AppFormTextarea',
  mixins: [formFieldMixin]
}
</script>