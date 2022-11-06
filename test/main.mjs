import * as Boiler from './.boiler/index.mjs';
import logger from './.boiler/index.mjs';

export class Main extends Boiler.Application {
    /**
     * @desc Method to execute when the application exits
     * @param {Boiler.ApplicationStatus} info Information passed into the method
     * @returns {void} `unknown` */ beforeExit(info) {
        logger.warn('The application exited with the code ' + logger.num(info.exitCode) + '.');
     };
    /** 
     * @desc Main method to execute
     * @returns {number} The exit code for the application */ async run() { 
        logger.print('Hello, World!');
        return 0;
    };
};