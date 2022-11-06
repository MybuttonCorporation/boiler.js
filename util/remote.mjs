import chalk from "chalk";

class Remote {
    /**
     * Remote
     * @param {string} __ip `ip of the remote`
     */
    constructor(__ip) { this._ip = __ip; };
    /**
     * Set the ip of the remote.
     * @type {string}
     * @param {string} ip `New ip`
     */
    set ip(ip) { this.ip = ip; this.base = ip; };
    /**
     * Output text as the remote.
     * @param {string} text `text to output`
     * @param {boolean} currentln `whether or not to overwrite to the current line`
     * @param {string} startln `whether or not to output to the start of the line`
     */
    async remotesay(text, currentln = false, startln = false) {
        console.log((currentln ? '\u001b[A\r' : '') + (!currentln ? (startln ? '\r' : '') : '') + chalk.bold.red('[remote]'), chalk.bold.gray(text) + (currentln || startln ? " ".repeat(process.stdout.columns - (chalk.bold.red("[remote]").length + text.length)) : ""));
        return void 0; 
    };
    /**
     * Output text as `logger`
     * @param {string} text 
     * @param {string} logger
     * @param {boolean} currentln 
     * @param {boolean} startln 
     */
    async say(text, logger, currentln = false, startln = false) {
        console.log((currentln ? '\u001b[A\r' : '') + (!currentln ? (startln ? '\r' : '') : '') + chalk.bold.red('['+logger+']'), chalk.bold.gray(text) + (currentln || startln ? " ".repeat(process.stdout.columns - (chalk.bold.red("["+logger+"]").length + text.length)) : ""))
    };
    /**
     * Output text as the client.
     * @param {string} text `text to output`
     * @param {boolean} currentln `whether or not to overwrite to the current line`
     * @param {string} startln `whether or not to output to the start of the line`
     */
    async clientsay(text, currentln = false, startln = false) {
        console.log((currentln ? '\u001b[A\r' : '') + (!currentln ? (startln ? '\r' : '') : '') + chalk.bold.red('[client]'), chalk.bold.gray(text) + (currentln || startln ? " ".repeat(process.stdout.columns - (chalk.bold.red("[client]").length + text.length)) : ""))
        return void 0;
    };
    /**
     * Makes text 'info' styled.
     * @param {string} text 
     * @returns 
     */
    info(text) {
        return chalk.bold.yellow('['+text+']');
    }
}
const remote = new Remote();
export default remote;