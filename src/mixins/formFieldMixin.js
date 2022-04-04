import AppFormField from '@/components/App/AppFormField.vue'
export default {
    props: ['title', 'error', 'placeholder', 'value'],
    components: {AppFormField},
    computed: {
        dataValue: {
            get() {
                return this.value   
            },
            set(value) {
                this.$emit('input', value)
            }
        },
    },
}