export function checkIsPlainObject(object: object): boolean {
    return Object.prototype.toString.call(object) === '[object Object]';
}