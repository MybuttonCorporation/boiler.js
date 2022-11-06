import chalk from "chalk";
import { logger } from "../../util/log.mjs";
import { InterfaceCommand } from "../cli.mjs";
import fs from 'fs';
import { exec } from "child_process";
class Build extends InterfaceCommand {
    name = 'build';
    showHelp = false;
    desc = 'Builds the current project';
    isParameter = false;
    run() {
        logger.print('Building project...');
        let anim = new logger.animations.LoadBar(100, 'Boiler::BuildTree::Build', 12, 'Building project...');
        anim.start().then(async () => {
            if (!fs.existsSync(process.cwd() + '/boiler.boil.mjs')) return logger.print('Cannot find a project in ' + logger.code(process.cwd));
            const j = await import(process.cwd() + '/boiler.boil.mjs');
            let BoilerBuild = new j.BoilerBuild();
            BoilerBuild.boil();
            fs.chmodSync(process.cwd() + '/out', '777');
            fs.chmodSync(process.cwd() + '/out/boil', '777');
            console.log('Installing dependencies... [1/2]: chalk ' + chalk.bold.yellow('・・・'));
            let insChalk = exec('npm install chalk');
            insChalk.on('exit', async function chalkInstalled() { 
                console.log('\u001b[A\rInstalling dependencies... [1/2]: chalk ' + chalk.bold.green('✔︎    '));
                setTimeout(() => {
                    console.log('\u001b[A\rInstalling dependencies... [2/2]: @types/node ' + chalk.bold.yellow('・・・'));
                    let insNode = exec('npm install @types/node');
                    insNode.on('exit', async function nodeInstalled() { 
                        console.log('\u001b[A\rInstalling dependencies... [2/2]: @types/node ' + chalk.bold.green('✔︎    '));
                        setTimeout(() => {
                            logger.print('\u001b[A\rThe project has been built.                                                            ') 
                            logger.print('Boiling complete');
                            logger.print('Run the program with: ' + logger.code('boiler run'));
                            logger.print('NOTE: You might need to change the mode of the ' + logger.code('out') + ' folder to 777.');
                            logger.print('To do this execute ' + logger.code('sudo chmod -R 777 ./out') + '.');
                            logger.print('this is only required for macos and linux operating systems.')
                        }, 1500)
                    });
                }, 1500);
            });

        });
    };
};
export default new Build();