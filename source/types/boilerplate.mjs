import chalk from "chalk";
import path from "path";
import { URL } from "url";

export class BoilerCommandlineInterface {
    /**
     * Arguments passed into the file. These do not include the environment, the filename and the node parameters.
     * 
     * Starts from `process.argv[2]`.
     * @type {string[]} 
     **/ args;
    /** 
     * Raw arguments passed into the boiler runner. These include the 'node' and 'filename' parameters.
     * @type {string[]}
     **/ rawArgs;
}
export class ApplicationStatus {
    /** @type {number} Exit code of the application. */ exitCode;
    /** @type {number} Total uptime of the application, in milliseconds. */ totalUptime;
    /** @type {NodeJS.Process} The 'process' environment variable of the application. */ process;
};
export class ApplicationEnvironment {
    /**
     * Returns the commandline arguments passed into the application
     * @returns {...string} `string[]` */ GetCommandlineArgs() { return process.argv.slice(2); };
    get variables() { return process.env };
    /**
     * Returns the working directory of the application
     * @returns {string} `BoilerDir<process.cwd()>;` */ get workingdir() { return process.cwd(); };
    /**
     * Returns the directory of the application
     * @returns {string} `BoilerDir<__dirname>;` */ get appdir() { return path.resolve(new URL('.', import.meta.url).pathname, '..', '..'); };
    /**
     * Returns the filename of the application
     * @returns {string} `BoilerFile<__filename>;`*/ get filename() { return path.resolve(this.appdir) + '/main.mjs'; };
};
export class Application {
    /**
     * The command-line interface options passed into Boiler.
     * @type {BoilerCommandlineInterface} */ cli = new BoilerCommandlineInterface();
    /** @desc The main method to execute when starting the application.*/ run() { console.log(chalk.bold.yellow('[the provided index is not constructive]')) };
    /**
     * @desc The method to execute before exiting the application.
     * @param {ApplicationStatus} data */ beforeExit(data) {};
    /**
     * The Application's environment. This utility provides the environment information.
     * @type {ApplicationEnvironment} */ Environment = new ApplicationEnvironment();
    /**
     * Haults the application execution for the given amount of time, in seconds.
     * @param {number} ms `Time to wait, in milliseconds.`
     */ 
    async haultexec(ms) {
        const start = Date.now() + ms;
        while (Date.now() != start); 
    }
};

