export default function(value) {
    let result = (typeof value === 'number') ? new Intl.NumberFormat().format(value) : ''
    return result
}