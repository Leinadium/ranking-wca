export function debounce(fn: Function, delay: number) { // delay em milissegundos
    return setTimeout(() => fn(), delay);
}