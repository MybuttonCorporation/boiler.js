import chalk from "chalk";
import { copyFileSync, existsSync, fstat, mkdir, mkdirSync, readFileSync, writeFileSync } from "fs";
import { logger } from "../../util/log.mjs";
import { ins, packageOptions, put } from "../../util/packages.mjs";
import { InterfaceCommand } from "../cli.mjs"
import { files } from "../../util/files.mjs"
import path from "path";
export class LibrarySystem extends InterfaceCommand {
    name = 'lib';
    isParameter = false;
    showHelp = true;
    desc = 'Installs an api/type from the Furnace Package Manager.';
    help() {
        console.log(
            chalk.bold.yellow('boiler lib'), chalk.bold.gray(this.desc), '\n\n' +
            chalk.bold.bgBlack.magenta('boiler lib test-package'), chalk.bold.gray('Installs test-package and creates '+logger.code('furnaceconf.json')+'.'), '\n' +
            chalk.bold.bgBlack.magenta('boiler lib pub'), chalk.bold.gray('Publishes test-package.'),
            '\n\n' +
            chalk.bold.yellow('# To create a package'), '\n' +
            chalk.bold.gray(`run ${logger.code('sudo boiler lib --i')} in a Boiler Project Directory. This will create ${logger.code('furnaceconf.json')}.`),
            '\n' + chalk.bold.gray('It should look like this:\n') +
            logger.syntax(`{
    "name": "19660845378613",
    "version": "v1.0.0",
    "author": "234045692342",
    "index": "${process.cwd()}/main.mjs",
    "dependencies": []
}`, 'json'),
            chalk.bold.gray('\nEdit the', logger.code('name & version'), 'to fit your project.'),
            chalk.bold.red(`\nNOTE: ${chalk.bold.gray('do not change the ' + logger.code('author') + ' object. It is the security check for projects.')}`)
        );
    };
    /**
     * Install package.
     * @param {Array<string>} args 
     */
    async run(args) {
        files.setbasedir(process.cwd());
        let fc = files.imposter('.boiler', 'out', 'out/boil', '.boiler/api', '.boiler/types', '.boiler/index.mjs', 'boilerconf.json', 'main.mjs');
        if (fc != null) return logger.print('Sorry, can\'t use furnace in a bad project.\n' + logger.code('/' +fc.replace(process.cwd(), '')) + ' is missing.');
        if (args[0] == '--i') {
            let conf = {
                name: Math.random().toString().substring(2),
                version: 'v1.0.0',
                index: process.cwd() + '/main.mjs',
                author: Math.random().toString().substring(2),
                dependencies: []
            };
            writeFileSync(process.cwd() + '/furnaceconf.json', JSON.stringify(conf, null, 4));
            logger.print('Created new boilerplate configuration.');
            return;
        }
        if (args[0] == 'pub') {
            let conf = {}
            if (!existsSync(process.cwd() + '/furnaceconf.json')) {
                logger.print("The configuration file is missing.");
                logger.print("Use", logger.code("boiler lib"), "to create a base configuration.");
                return 0;
            };
            conf = JSON.parse(readFileSync(`${process.cwd()}/furnaceconf.json`));
            logger.print("Publishing " + conf.name + '...');
            
            let createData = {
                name: conf.name,
                version: conf.version,
                author: conf.author,
                index: conf.index,
                dependencies: conf.dependencies
            };
            let post = await put(createData);
            if (typeof post.data == 'string') console.log(chalk.bold.red('[remote]'), chalk.bold.gray(post.data));
            if (post.status != 200) return;
            writeFileSync(process.cwd() + '/furnaceconf.json', JSON.stringify(createData, null, 4));
            return;
        };
        logger.print('Installing ' + args[0] + '...');
        let name = await ins(args[0]);
        if (typeof name.data == 'string') console.log(chalk.bold.red('[remote]'), chalk.bold.gray(name.data));
        if (name.status != 200) return;
        let config = existsSync(process.cwd() + '/furnaceconf.json') ? JSON.parse(readFileSync(process.cwd() + '/furnaceconf.json')) : {
            name: Math.random().toString().substring(3),
            version: 'v1.0.0',
            dependencies: [],
            author: Math.random().toString().substring(2)
        };
        if (name.data.name == config.name) return console.log(chalk.bold.red('[remote]'), chalk.bold.gray('cannot install self as library'))
        logger.print('Sending...');
        const __dirname = new URL('.', import.meta.url).pathname;
        if (!existsSync(process.cwd() + '/.boiler/lib')) mkdirSync(process.cwd() + '/.boiler/lib');
        writeFileSync(`${process.cwd()}/.boiler/lib/${name.data.name}.mjs`, `${name.data.index}`);
        files.copyfolder(`${path.resolve(__dirname, '..', '..')}/source`, `${process.cwd()}/.boiler/lib/.boiler`);
        copyFileSync(`${path.resolve(__dirname, '..')}/cli.mjs`, `${process.cwd()}/.boiler/lib/.boiler/types/cli.mjs`);
        let pkg_name = name.data.name;
        /**
         * @type {packageOptions}
         */

        if (!config.dependencies.includes(pkg_name)) config.dependencies.push(pkg_name);

        writeFileSync(process.cwd() + '/furnaceconf.json', JSON.stringify(config, null, 4));
        logger.print('Installing dependencies...');
        await install_dependency(pkg_name);
        logger.print('Installation complete.');
        logger.print('To use this library, add the following line of code to your main.mjs:');
        console.log(chalk.bold.red('import') + ' ' + chalk.bold.magenta('*') + ' ' + chalk.bold.red('as') + ' ' + chalk.bold.blue(name.data.name) + ' ' + chalk.bold.red('from') + ' ' + chalk.bold.green("'./.boiler/lib/"+name.data.name+".mjs'") + chalk.bold.gray(';'));
    };
};

/**
 * Installs a dependency.
 * @param {string} name 
 */
export async function install_dependency(name) {
    logger.print('installing dependency: ', name);
    /**
     * @type {{data: packageOptions | string}}
     */
    let req = await ins(name);
    if (typeof req.data == 'string') console.log('\u001b[A\r', req.data, ' '.repeat(process.stdout.columns - req.data.length));
    if (req.status != 200) {
        logger.print('EABORT: remote rejected. ', chalk.bold.bgBlack.yellow('Boiler', chalk.bold.gray('::'), 'RemoteDependency', chalk.bold.gray('<'), chalk.bold.red(name), chalk.bold.gray('>.'), chalk.bold.red('install'), chalk.bold.gray('();')));
        return process.exit(1);
    };
    let deps = req.data.dependencies;
    deps.forEach(element => {
        install_dependency(element);
    });
    logger.print('\u001b[A\rinstalled dependency: ', name + ' ');
    let config = existsSync(process.cwd() + '/furnaceconf.json') ? JSON.parse(readFileSync(process.cwd() + '/furnaceconf.json')) : {
        name: Math.random().toString().substring(3),
        version: 'v1.0.0',
        dependencies: [],
        author: Math.random().toString().substring(2)
    };
    if (!existsSync(process.cwd() + '/.boiler/lib/.boiler/lib')) mkdirSync(process.cwd()+ '/.boiler/lib/.boiler/lib');
    writeFileSync(process.cwd() + '/.boiler/lib/.boiler/lib/' + req.data.name + '.mjs', `${req.data.index}`);
    if (!config.dependencies.includes(name)) config.dependencies.push(name);
    writeFileSync(process.cwd() + '/furnaceconf.json', JSON.stringify(config, null, 4));
};

export default new LibrarySystem();