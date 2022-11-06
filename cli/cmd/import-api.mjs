import { InterfaceCommand } from "../cli.mjs";
import { files } from '../../util/files.mjs';
import { logger } from "../../util/log.mjs";
import readline from 'readline';
import fs from 'fs';
import path from "path";
import chalk from "chalk";
const __dirname = new URL('.', import.meta.url).pathname;
let subcommandsList = [];
let subcommandFolder = fs.readdirSync(__dirname).filter(j => j.endsWith('.mjs'));
subcommandFolder.forEach(async j => {
    let j2 = await import(__dirname + '/' + j);
    subcommandsList.push(j2.default);
})
function randomfilename() {
    var S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}; //generate a random file name. Source: boilerjs::fsutil.randomfilename();
export class ImportApi extends InterfaceCommand {
    name = 'import';
    desc = 'Imports the current project as a boiler library';
    showHelp = false;
    isParameter = false;
    async run() {
        files.setbasedir(process.cwd());
        let fileCheck = files.imposter('boilerconf.json', 'boiler.boil.mjs', 'main.mjs');
        if (fileCheck) { return logger.print('cannot import library:', logger.code(fileCheck) + ' is missing.')};
        const file = await import(process.cwd() + '/main.mjs');
        if (file.Main || !file.isModule) return logger.print('The project is not a valid library.');
        let allImports = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..') + '/module/module_database.mjs'));
        if ((allImports.modules.find(j => j.name == file.default.name)) != null || (subcommandsList.find(j => j.name == file.default.name)) != null) {
            if ((subcommandsList.find(j => j.name == file.default.name)) != null) return logger.print(`The CLI-Command name of the file, ` + logger.code(file.default.name) + ', is protected, it may not be modified.');
            logger.print('A command with the name ' + logger.code(file.default.name) + ' already exists.');

            let intf = readline.createInterface({input: process.stdin, output: process.stdout});
            intf.question(`${chalk.bold.yellow('Replace it? (y/n): ')}`, (res) => {
                intf.close();
                let response = res.toLocaleLowerCase();
                if (response.startsWith('n')) { logger.print('aborted module import process.'); return process.exit(0); }
                else if (response.startsWith('y')) return importsStart(allImports.modules.find(j => j.name == file.default.name).filename);
                else process.exit(0);
            })
        } else importsStart();
        async function importsStart(OptFileArg) {
            let fn = OptFileArg ? OptFileArg : randomfilename();
            allImports.modules.push({name: file.default.name, filename: fn});
            fs.writeFileSync(path.resolve(__dirname, '..', '..') + '/module/module_database.mjs', JSON.stringify(allImports, null, 4));
            fs.copyFileSync(process.cwd() + '/main.mjs', path.resolve(__dirname, '..', '..') + `/module/${fn}.mjs`);
            let ProjectInfo = fs.readFileSync(`${process.cwd()}/boilerconf.json`, {encoding: 'utf-8'});
            let proj = JSON.parse(ProjectInfo);
            logger.print(`${logger.code(proj.config.name)} has been imported to boiler.`);
            logger.print(`you may now use it with the Boiler CLI.`);
            logger.print('Module Import ID: ' + logger.code(fn));
            console.log(chalk.bold.dim('* Please note that libraries cannot import external files other than Boiler.'));
            return;
        };
    };
};
export default new ImportApi();
