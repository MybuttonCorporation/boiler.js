/**
 * Appends with newline to the standard output.
 * @param {string} str Text to append to the standard output. 
 */
export async function appendln(str) {
    process.stdout.write(str + '\n');
};
/**
 * Appends to the standard output.
 * @param {string} str Text to append.
 */
export async function append(str) {
    process.stdout.write(str);
}
/**
 * `NodeJS.WritableStream` of the process.
 */
export const stream = process.stdout;
/**
 * `NodeJS.ReadableStream` of the process.
 */
export const stdin = process.stdin;