import chalk from "chalk";
import { highlight } from 'cli-highlight';
import * as BoilerAnimations from "./anim.mjs";
export class BoilerLog {
    /** @param {any[]} params */ print(...params) { console.log(chalk.red('[boiler:main]'), ...params) };
    /** @param {any[]} params */ code(...params) { return chalk.bold.bgBlack.magenta(...params); }
    animations = BoilerAnimations;
    highlight($data = "") {
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }
        //replace all instances of '#' in $data with '\n'
        let $split = $data.split('\n')
        function replaceAll(str2, match, replacement, case_sensitive) {
            let str = str2.toString();
            return str.replace(new RegExp(escapeRegExp(match), 'g' + (case_sensitive ? '' : 'i')), ()=>replacement);
        };
        $split.forEach(line => {

                /**
                 * @type {Array<{find: string | Array, clr?: string, case_sensitive: boolean}>}
                 */
            let highlight = [
                {find: 'boiler', clr: 'red', case_sensitive: true},
                {find: 'Boiler', clr: 'red', case_sensitive: true},
                {find: 'error', clr: 'red', case_sensitive: false},
                {find: 'success', clr: 'green', case_sensitive: false},
                {find: 'err', clr: 'red', case_sensitive: false},
                {find: 'notice', clr: 'blue', case_sensitive: false},
                {find: 'err', clr: 'red', case_sensitive: false},
                {find: '*', clr: 'yellow', case_sensitive: false},
                {find: '-', clr: 'red', case_sensitive: false},
                {find: '+', clr: 'green', case_sensitive: false},
                {find: '#', clr: 'red', case_sensitive: false},
                {find: '$', clr: 'cyan', case_sensitive: false},
                {find: '@', clr: 'magenta', case_sensitive: false},
                {find: '%', clr: 'blue', case_sensitive: false},
                {find: '^', clr: 'gray', case_sensitive: false},
                {find: '&', clr: 'black', case_sensitive: false},
                {find: '!', clr: 'gray', case_sensitive: false},
                {find: '?', clr: 'gray', case_sensitive: false},
                {find: '~', clr: 'gray', case_sensitive: false},
                {find: '~', clr: 'gray', case_sensitive: false},
                {find: '~', clr: 'gray', case_sensitive: false},
                {find: '`', clr: 'gray', case_sensitive: false},
                {find: 'cli', clr: 'red', case_sensitive: false},
                {find: '(', clr: 'gray', case_sensitive: false},
                {find: ')', clr: 'gray', case_sensitive: false},
                {find: ';', clr: 'gray', case_sensitive: false},
                {find: ':', clr: 'gray', case_sensitive: false},
                {find: '.', clr: 'gray', case_sensitive: false},
                {find: '©', clr: 'gray', case_sensitive: false},
                {find: '®', clr: 'gray', case_sensitive: false},
                {find: 'Release notes for ', clr: 'blue', case_sensitive: false},
                {find: ['Mybutton Corporation', 'Mybutton AB', 'Mybutton Specifications', 'Mybutton LLC'], clr: 'cyan', case_sensitive: false},
                {find: 'logger', clr: 'yellow', case_sensitive: false},
                {find: 'Document updated', clr: 'blue', case_sensitive: false},
            ]; 
            let $result20 = line;
            highlight.forEach(j => {
                if (typeof j.find === 'object') return j.find.forEach(j2 => {
                    $result20 = replaceAll($result20, j2, chalk.bold[j.clr](j2), j.case_sensitive);
                });
                $result20 = replaceAll($result20, j.find, chalk.bold[j.clr](j.find), j.case_sensitive);
            });  
            if (line.startsWith('# ')) return console.log(chalk.bold.yellow($result20.replace('#', '').replace(' ', '')));
            if (line.startsWith('$ ')) return console.log(chalk.bold.green($result20.replace('$', '').replace(' ', '')));     
            console.log($result20);
        })
    };
    syntax(data = "", lang = "js") {
        return highlight(data, {language: lang, ignoreIllegals: false});
    };
};
export const logger = new BoilerLog();