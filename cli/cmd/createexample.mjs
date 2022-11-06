import chalk from "chalk";
import { InterfaceCommand } from "../cli.mjs";
import { logger } from '../../util/log.mjs'
export class ExampleCreator extends InterfaceCommand {
    name = 'create-example';
    desc = 'Creates an example method to use.';
    isParameter = false;
    showHelp = true;
    help() {
        console.log(
            chalk.bold.yellow(logger.code('boiler create-example <example_type>')), '\n',
            chalk.magenta('Creates an example method.'), '\n\n',
            chalk.bold.green('$ ') + chalk.bold.yellow('Methods:'), '\n',
            chalk.bold.red('module'), chalk.bold.gray('Creates an example module.'), '\n',
            chalk.bold.red('beforeexit'), chalk.bold.gray('Creates an example before-exit method.'), '\n',
            chalk.bold.red('input'), chalk.bold.gray('Creates an example input method.')
        )
    };
    run(args = [""]) {
        let examples = [
            {name: 'input', index: `
await Boiler.iostream.getinput('Enter your age: ').then(age => {
        console.log('You are ' + age + ' years old!');          
});                                                             `},
            {name: 'module', index: `
import * as Boiler from './.boiler/index.mjs';                                                              
import logger from './.boiler/index.mjs';                                                                   
                                                                                                            
export const isModule = true;                                                                               
export class ExampleModule extends Boiler.InterfaceCommand {                                                
    name = 'example-module-name';                                                                           
    desc = 'example-module-desc';                                                                           
    isParameter = false;                                                                                    
    showHelp = false; // set to true if app needs params                                                    
    help() {}; // initialize if app needs params, method executed when less than 1 argument is provided.    
    run(args = [""]) {                                                                                      
        // main method to execute.                                                                          
        console.log('hello there!');                                                                        
    };                                                                                                      
};                                                                                                          
                                                                                                            
export default new ExampleModule();                                                                         `},
{name: 'beforeexit', index: `
// put to class Main                                                                        
/**                                                                                         
 * @desc Method to execute when the application exits                                       
 * @param {Boiler.ApplicationStatus} info Information passed into the method                
 * @returns {void} \`unknown\` */ beforeExit(info) {                                          
    logger.warn('The application exited with the code ' + logger.num(info.exitCode) + '.'); 
};                                                                                         `}
        ];
        let exmpl = examples.find(t => t.name == args[0]);
        if (exmpl == null) return logger.print('Unknown example.');
        console.log(chalk.bold.yellow(exmpl.name) + ' - example method:');
        console.log(chalk.bgBlack(logger.syntax(exmpl.index)));
    };
};

export default new ExampleCreator();