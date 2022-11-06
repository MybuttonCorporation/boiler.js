import readline from 'readline';
/**
 * 
 * @param {string} prompt
 * @param {any} param1
 * @returns {Promise<string>}
 */
export async function getinput(prompt) {
    let intfc = readline.createInterface({ input: process.stdin, output: process.stdout });
    /**
     * @type {Promise<string>}
     */
    return new Promise(async (resolve, reject) => {
        intfc.question(prompt, async function returnResponse(res) {
            intfc.close();
            return resolve(res);
        })
    });
};
/**
 * Responds to an input interaction
 * 
 * 
 * Referred to in `Boiler.iostream.getinput(prompt);`
 * @param {string} response Response to the input.
 */
export async function respond(response) {
    let __spacing;
    let length = (process.stdout.columns - response.length);
    __spacing = " ".repeat(length);
    console.log('\u001b[A\r' + response + __spacing);
};

export * as stdout from './stdout.mjs';