import chalk from "chalk";
export class LoadBar {
    /** @param {number} length @param {string} string @param {number} speed */ constructor(length, string, speed, prefix) { this.prefix = prefix; this.progressLength = length; this.stringData = string; this.speed = speed; };
    /** @param {string} newString */ setString(newString) { this.stringData = newString; };
    async start() {
        let datas = [this.progressLength, this.stringData, this.prefix];
        return new Promise(async function(resolve, reject) {
            let i = 0; // 0 = | , 1 = / , 2 = - , 3 = \ , resets back to 0;
            let progress = 0;
            let j = setInterval(async function waiter(str, p) {
                if (progress == 101) { console.log('\u001b[A\r' + p + ' ' + chalk.bold.rgb(0, 255, 0)('✔︎'), chalk.bold.magenta(str), chalk.bold.green('[%'+(progress-1)+' - COMPLETED]')); clearInterval(j); return resolve(true) };
                if (i == 0) console.log(chalk.bold.red(`|`), chalk.bold.magenta(str), chalk.bold.gray('[%'+progress+']'));
                if (i == 1) console.log('\u001b[A\r' + p + ' ' +chalk.bold.green(`/`), chalk.bold.magenta(str), chalk.bold.gray('[%'+progress+']'));
                if (i == 2) console.log('\u001b[A\r' + p  + ' ' +chalk.bold.blue(`-`), chalk.bold.magenta(str), chalk.bold.gray('[%'+progress+']'));
                if (i == 3) console.log('\u001b[A\r' + p + ' ' +chalk.bold.yellow(`\\`), chalk.bold.magenta(str), chalk.bold.gray('[%'+progress+']'));
                if (i == 4) { i = 0; console.log('\u001b[A\r' + p + ' ' +chalk.bold.red(`|`), chalk.bold.magenta(str), chalk.bold.gray('[%'+progress+']')); };
                i++;
                progress++;
            }, ...datas);
        })
    };
};