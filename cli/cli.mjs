import chalk from "chalk";

export class InterfaceCommands {
    /**
     * @type {Map<string, InterfaceCommand>}
     */
    commands = new Map();
    /** @param {string[]} args; */ constructor(args) { this.arguments = args; };
    /** @param {string[]} args */ async run(args='') { let j = this.commands.get(args[0]); j.run(args.slice(1)); };
    test = new class TestCommand extends InterfaceCommand {
        constructor() { super(false, 'Test command for the cli', "test", false); };
        run() { console.log(this.name); };
    };
    /** @param {InterfaceCommand} command */ add(command) { this.commands.set(command.name, command); };
};
export class InterfaceCommand {
    /**
     * 
     * @param {boolean} argumentHelp 
     * @param {string} commandDescription 
     * @param {string} commandName 
     * @param {boolean} parameter
     */
    constructor(argumentHelp, commandDescription, commandName, parameter) { this.showHelp = argumentHelp; this.desc = commandDescription, this.name = commandName; this.isParameter = parameter; };
    /**
     * @param {string[]} args;
     */
    async run(args=[]) { console.log(chalk.bold.red('['+this.name+' is not constructive]') )};
    async help() { console.log(`${chalk.bold.yellow('[default help menu]\n')}` + this.name + ':', this.desc) };
    /** @param {string[]} arglist */ async testArguments(arglist) { if (arglist.length < 1 && this.showHelp) { this.help(); return true }; return false };
};
export class ExportInterfaceCommand {
    /** @type {InterfaceCommand} */ default;
};
const Interface = new InterfaceCommands(process.argv.slice(2));
export default Interface;