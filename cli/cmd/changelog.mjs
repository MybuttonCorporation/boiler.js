import { readFileSync } from 'fs';
import { InterfaceCommand } from '../cli.mjs';
import { logger } from '../../util/log.mjs'
import path from 'path';
export class Changelog extends InterfaceCommand {
    name = 'changelog';
    isParameter = false;
    showHelp = false;
    desc = 'Shows the changelog for the app.';
    async run() {
        const __dirname = new URL('.', import.meta.url).pathname;
        const packagedata = JSON.parse(readFileSync(path.resolve(__dirname, '..', '..') + '/package.json', {encoding: 'utf-8'}))
        logger.print('Boiler Release v' + packagedata.version);
        let changes = readFileSync(path.resolve(__dirname, '..', '..') + '/CHANGELOG.md', {encoding: 'utf-8'});
        logger.highlight(changes);
    }
}
export default new Changelog();