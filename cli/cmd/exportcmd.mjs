import { logger } from "../../util/log.mjs";
import { InterfaceCommand } from "../cli.mjs";
import { BoilerConfig, files } from '../../util/files.mjs';
import tar from 'tar';
import fs, { createWriteStream, readFileSync, writeFileSync } from "fs";
import path from "path";
import archiver from 'archiver'
class _extendApp extends InterfaceCommand {
    name = 'export';
    desc = 'Exports the current project as an application.';
    showHelp = false;
    isParameter = false;
    async run() {
      /**
         * @param {String} sourceDir: /some/folder/to/compress
         * @param {String} outPath: /path/to/created.zip
         * @returns {Promise}
         */
        async function zipDirectory(sourceDir, outPath) {
          const archive = archiver('zip', { zlib: { level: 9 }});
          const stream = fs.createWriteStream(outPath);
        
          return new Promise((resolve, reject) => {
            archive
              .directory(sourceDir, false)
              .on('error', err => reject(err))
              .pipe(stream);
            stream.on('close', () => resolve());
            archive.finalize();
          });
        }
        let fc = files.imposter(process.cwd() + '/out', process.cwd() + '/out/boil', process.cwd() + '/boilerconf.json', process.cwd() + '/out/boil/start.mjs');
        if (fc) return logger.print('Cannot export bad project: ' + logger.code(fc.replace(process.cwd(), '')) + ' is missing.');
        logger.print('Exporting project...');
        files.copyfolder(process.cwd(), process.cwd() + '/out/export', {skip_files: ['out']});
        let ExportCCM = new logger.animations.LoadBar(100, 'Boiler::ExportTree::CreateExportSystem', 10, 'Exporting...');
        ExportCCM.start().then(async on => {
          let j = readFileSync(process.cwd() +'/boilerconf.json', {encoding: 'utf-8'});
          /** @type {BoilerConfig} */let js = JSON.parse(j);
            logger.print('Zipping directory...');
            zipDirectory(process.cwd(), process.cwd() + '/out/export/' + js.config?.name + '.tgz').then(j => {
              fs.copyFileSync(process.cwd() + '/out/export/' + js.config?.name + '.tgz', process.cwd() + '/' + js.config.name + '.tgz');
            });
            logger.print('The project has been built. Boiler is no longer required to run this program.');
            logger.print('To share this application, send the ' + logger.code(js.config?.name + '.tgz') + ' file.');
            logger.print('To run the application, extract the file and run ' + logger.code('sh ./start.sh') + ' while in the extracted folder.');
          });
        writeFileSync(process.cwd() + '/start.bat', `@node $~dp0out/boil/start.mjs %*`);
        writeFileSync(process.cwd() + '/start.sh', `node ./out/boil/start.mjs`);
    };
};

export default new _extendApp();