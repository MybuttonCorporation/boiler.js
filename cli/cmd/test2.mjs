import { InterfaceCommand } from "../cli.mjs";

class test2 extends InterfaceCommand {
    name = 'test2';
    desc = 'Test2 command';
    isParameter = false;
    showHelp = true;
    /** @param {string[]} args */ async run(args) {}; 
}
export default new test2();