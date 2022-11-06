> # **Boiler.js** - The extensive Node.js Emulator
###### Boiler.js is an advanced system and it is not recommended to be used by inexperienced developers. To learn Boiler.js, it is recommended to learn `ModuleJS` first.

This file covers: 
- ### Installing Boiler.js
- ### Creating a project
- ### Building a project
- ### Creating a library/module

## **Installation**
Installing Boiler.js is as easy as installing `npm`.<br>
**To install Boiler.js, execute:**
```sh
$ npm install -g @cyberdevs/boiler.js 
```
###### (you might need to use `sudo` to install it on macOS and Linux)
### You have successfully Installed Boiler.js!


## **Creating a Project**
To create a new project, execute:

```sh
$ boiler new <project_name> mjs
```

This will create a new project with the `ModuleJS` base. (es6 and commonjs will be added later)
<br><br>

Doing this will also create the `main.mjs` file.
This file is the 'Codepoint', meaning that it is going to be executed when the program is launched.
<br>

The file's contents should look like this:

```js
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
```

This is the default application. When launched, it will print out 'Hello, World!' and exit with code 0.
The `run()` method returns an `exit code`, which is the status code for the application.
It will be returned as the 'errorlevel' or 'exit code'.
<br><br>

To extend the functionality of the application, write code under the `run()` method.
You can even add more methods to the application with:

```js
//...
/** @param {string} file to check existence of */ checkFileExistence(file) {
    logger.print('Checking file existence of: ' + file);
    return fs.existsSync(file); //The existence of the file is returned by this function.
}; 
```

## **Building a Project**

Now that you created your first Boiler Project, it is time to run it.
<br> The build procedure in Boiler is quite different to other languages.
<br>

### When built, a project does not need to be rebuilt after being modified. The build procedure takes `~4.8` seconds on an average computer.
**To built a project, execute:**

```sh
$ boiler build
``` 


This command will build the project, making it ready to be launched.
<br>
After building your project, run it with `boiler run` and add some parameters to it.
<br>

**For example**: `boiler run hello` will parse `[ 'hello' ]` to the `Boiler::Application.cli.args` object.
---

## **Creating a library/module**

A library or module is a boiler project that compiles into a module.
To create a library/module, run:

```sh
$ boiler new <project_name> mjs
```

This will create your project in the current directory.
After this, go into the main.mjs file. It should look like this:

```js
import * as Boiler from './.boiler/index.mjs';
import logger from './.boiler/index.mjs';

export class Main extends Boiler.Application {
    /** @param {string[]} args `command-line` arguments for the file */ constructor(args) { super(); this.app = {}; this.app.args = args; };
    /** 
     * @desc Main method to execute
     * @returns {number} The exit code for the application */ run() { 
        logger.print('Hello, World!');
        return 0;
    };
}
```

Delete the `Main` class completely. This will leave you with:

```js
import * as Boiler from './.boiler/index.mjs';
import logger from './.boiler/index.mjs';
```

Then, you should use the following boilerplate code:

```js
export const isModule = true; // this is required for your application to be recognized as a module.
export class BoilerCommand extends Boiler.InterfaceCommand {
    name = 'your_subcommand_name' // this name will be used when starting your interface. (CANNOT INCLUDE SPACE)
                                  // Example: boiler testcommandname
    desc = 'This is an example interface for boiler.' // add a description to your command.
    /* OPTIONAL */ help() {}; // enter the method to execute when showHelp is 'true' and no arguments are provided
    /* OPTIONAL */ showHelp = true; // set this value to 'true' if your command requires arguments.
    /* OPTIONAL */ isParameter = false; // set this value to 'true' if your command should be treated like a parameter
    run() {}; // enter the main method to execute, this is run when the interface is launched successfully.
};
```

That's it! Now import it using `boiler import`.
NOTE: values that are marked as 'OPTIONAL' aren't needed to be initilized. 

**Example interface:**

```js
import * as Boiler from './.boiler/index.mjs';
import logger from './.boiler/index.mjs';

export const isModule = true;
export class NumberMultiplier extends Boiler.InterfaceCommand {
    name = 'multiply';
    desc = 'Multiplies a number by 10.';
    isParameter = false;
    showHelp = true; //show help if there are less than 1 argument provided to the application
    help() {
        console.log('example usage:' + 
        '\nboiler multiply 20');
        console.log('this command multiplies a number by 10.');
    }; //help command (triggered if showHelp is enabled)
    /** 
     * @param {string[]} args arguments parsed into the application
    */
    run(args) {
        let number = parseInt(args[0]); //the number as an integer
        let calculation = number * 10;
        logger.print('The result is: ' + calculation);
    }
};
```


<br><br><br></br>

## **License** `MIT`

<br>

## Boiler.js is recommended for use with Command-line interface applications (CLI) and modules that are not packaged. (Discord.js bots, REST listeners and other client-side apps)
## Libraries Used
* `chalk`: Console coloring library [install here](https://www.npmjs.com/package/chalk)
* `tar`: Directory zipping library  [install here](https://www.npmjs.com/package/tar)
* `archiver`: TGZ Zipping library   [install here](https://www.npmjs.com/package/archiver)