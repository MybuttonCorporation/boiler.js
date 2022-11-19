import fs from 'fs';
import path from 'path';
/** @type {string} */ let basedir;
/**
 * @desc find the nonexistant file in a list of file names.
 * @param {...string} files The list of file names, in strings.
 * @returns {string | undefined} `string | undefined`
 */
export function imposter(...files) {
    let nonExistant = files.find(j => !fs.existsSync((basedir?.length > 1 ? basedir + '/': '') + j));
    return nonExistant;
};
/**
 * @desc sets the new base directory
 * @param {string} __b new base directory to be used by methods
 * @returns {void} `void`
 */
export function setbasedir(__b) {
    basedir = __b;
}
/**
 * Copys a directory.
 * @param {string} from folder to copy from
 * @param {string} to where to copy the folder 
 */
export function copyfolder(from, to, options = {/** @type {Array<string>} */ skip_files: []}) {
    let files = fs.readdirSync(from);
    if (!fs.existsSync(to)) fs.mkdirSync(to);
    files.forEach(element => {
        if (element == to) return;
        if (options.skip_files.includes(element)) return;
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
             copyfolder(path.join(from, element), path.join(to, element));
        }
    });
}