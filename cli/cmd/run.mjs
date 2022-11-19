import { InterfaceCommand } from "../cli.mjs";
import fs from 'fs';
import chalk from "chalk";
import { logger } from "../../util/log.mjs";
import { files } from "../../util/files.mjs";
export class runCommand extends InterfaceCommand {
    name = 'run';
    desc = 'runs the current project index';
    isParameter = false;
    showHelp = false;
    run(args = [""]) {
        let FileCheck = files.imposter(process.cwd() + '/out', process.cwd() + '/out/boil', process.cwd() + '/out/boil/start.mjs', process.cwd() + '/boiler.boil.mjs', process.cwd() + '/boilerconf.json', process.cwd() + '/.boiler');
        if (FileCheck) { logger.print('cannot launch broken project:', logger.code(FileCheck.replace(process.cwd() + '/', '')), 'is missing.'); return logger.print('run', logger.code('boiler repair'), 'to fix your project.'); };
        async function runProj() {
            let ProjectFile = await import(process.cwd() + '/main.mjs');
            if (isNaN(ProjectFile.Main) && !ProjectFile.Main && !ProjectFile.isModule) return logger.print('The ' + logger.code('Main') + ' class cannot be found in the project.');
            if (isNaN(ProjectFile.Main) && !ProjectFile.Main && ProjectFile.isModule) return logger.print('The project is a module, it cannot be executed.');
            let j = await import(process.cwd() + '/out/boil/start.mjs');
            j.setArguments(process.argv.slice(3)); 
            j.runNow();
        };
        runProj();
    };
};
export default new runCommand();