#!/usr/bin/env node
import * as cli from './cli.mjs';
import * as path from 'path';
import { URL } from 'url';
import * as fs from 'fs';
import chalk from 'chalk';
import os from 'os';
import { files } from '../util/files.mjs';
import { logger } from '../util/log.mjs';
/** @type {Array<cli.InterfaceCommand>} */ let subcommandsList = [];
const __dirname = new URL('.', import.meta.url).pathname;
// -----------------------------------------------------------------------------------------------------------
let type = os.type();
if (type != 'Windows_NT' && process.getuid() != 0 && process.argv[1].includes('/usr/local/bin/boiler')) { console.log(chalk.bold.red('[boiler]'), chalk.bold.gray('please run boiler as root.\n' + logger.code('sudo boiler <...arguments>'))); process.exit(0); };
files.copyfolder(path.resolve(__dirname, '..') + '/source', path.resolve(__dirname, '..') + '/module/.boiler');
fs.copyFileSync(__dirname + '/cli.mjs', path.resolve(__dirname, '..') + '/module/.boiler/types/cli.mjs');
// ^^ copy the Boiler Source System 
setTimeout(() => {
    let subcommandFolder = fs.readdirSync(__dirname + '/cmd').filter(j => j.endsWith('.mjs'));
    subcommandFolder.forEach(async j => {
        /** @type {cli.ExportInterfaceCommand} */ 
        let j2 = await import(__dirname + '/cmd/' + j);
        subcommandsList.push(j2.default);
    })
    let moduleFolder = fs.readdirSync(path.resolve(__dirname, '..') + '/module').filter(j => j.endsWith('.mjs') && j != 'module_database.mjs');
    moduleFolder.forEach(async j => {
        /** @type {cli.ExportInterfaceCommand} */ 
        let j2 = await import(path.resolve(__dirname, '..') + '/module/' + j);
        subcommandsList.push(j2.default);
    });
}, 3);
setTimeout(() => {
    if (!process.argv.slice(2)[0]) return console.log(chalk.bold.red('[boiler]'), chalk.bold.gray('welcome to boiler. to get started, run', logger.code('boiler new') + '.'));
    let command = subcommandsList.find(j => j.name === process.argv.slice(2)[0]);
    async function runCommand() {
        if (command === undefined) return console.log(chalk.bold.red('[boiler] unknown command: ' + process.argv.slice(2)[0] + ' (try again if you think this is an error)')); 
        if (command.showHelp) { if (await command.testArguments(process.argv.slice(3)) == true) return; };
        command.run(process.argv.slice(3));
    };
    runCommand();
}, 200);