import eventBus from '@/eventBus'

export default function(pageName, pageParams) {
    eventBus.$emit('gotoPage', pageName, pageParams)
}