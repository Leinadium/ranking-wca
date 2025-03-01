export function debounce(fn: Function, delay: number) { // Delay em milissegundos
    return setTimeout(() => fn(), delay);
}