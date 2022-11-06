import chalk from "chalk";
import util from 'util';
/**
 * Writes to the console.
 * @param {string} consoleMessage 
 * @param {...any} params 
 */
export async function print(consoleMessage, ...params) { console.log(chalk.bold.red('[thread:main/' + chalk.bold.blue('INFO') + ']'), chalk.bold.gray(consoleMessage), ...params) };
export async function report(...data) { console.log(chalk.bold.rgb(255,128,0).red('[thread:main/' + chalk.bold.rgb(255,128,0)('REPORT') + ']'), ...data)};
export async function warn(...data) { console.log(chalk.bold.rgb(255,128,0).red('[thread:main/' + chalk.bold.rgb(255,128,0)('WARN') + ']'), ...data)};
export async function error(errinfo) { console.log(chalk.bold.red('[thread:main/ERR]'), chalk.bold.gray(errinfo))};
export function num(number) { return chalk.bold.yellow(number); };
export function str(string) { return chalk.bold.green(string); };
export function bool(boolean) { return chalk.bold.magenta(boolean); };
export function func(method = function() {}) { return chalk.bold.cyan('[method '+method.name+'()]'); };
export function clss(template = class {}) { return chalk.bold.red(template.name + chalk.bold.yellow(` {
${Object.getOwnPropertyNames(template.prototype).map(j => `\t${chalk.bold.red(j)}: ${chalk.bold.gray(util.format(template.prototype[j]))}${chalk.bold.yellow(';')}\n`).join('')}}`) + chalk.bold.gray(';')) };