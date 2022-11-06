import axios from "axios";
import chalk from "chalk";
import { InterfaceCommand } from "../cli.mjs";
import remote from "../../util/remote.mjs";
import { createInterface } from "readline";
export class TestsCommand extends InterfaceCommand {
    name = 'run-test';
    desc = 'Runs the Boiler Tests to the API.';
    isParameter = false;
    async run() {
        let timer1 = Date.now();
        remote.clientsay("connecting... " + remote.info('sending packets'))
        const response = await axios.get('http://api.mybutton.org/boiler/api_stream/test_stream/this_is_my_little_son', {
            responseType: "stream"
        });
        let j = response.data;
        j.on('data', (data) => {
            console.log();
            remote.remotesay(data, true);
            getinput();
        })
        let readline = createInterface({input: process.stdin, output: process.stdout});
        j.on('end', () => {
            console.log();
            console.log('\u001b[A\r' + remote.info('remote ended api stream'));
            remote.clientsay('connection lasted for ' + ((Date.now() - timer1) / 1000) + 's');
            readline.close();
            process.exit(0);
        });
        function getinput() {
            readline.question(`${chalk.bold.red('['+chalk.bold.blue('client') +chalk.bold.gray(':')+chalk.bold.yellow('send')+']'+chalk.bold.magenta(':')+chalk.bold.cyan('~')+chalk.bold.green('$'))} `, async(data) => {
                let string = data;
                let response = await axios.post('http://api.mybutton.org/boiler/api_stream_send', {
                    name: 'test_stream',
                    input: string
                })
                remote.say(response.data, `remote:post`);
                getinput();
            });
        };
        process.once('beforeExit', async () => {
            remote.say(`wait quiting`, `remote:quit`);
            let response = await axios.post('http://api.mybutton.org/boiler/api_stream_send', {
                name: 'test_stream',
                input: '!endstream'
            })
            remote.say(response.data, `remote:quit`);
        });
        process.once('SIGINT', async () => {
            console.log();
            remote.say(`wait quiting`, `remote:quit`);
            let response = await axios.post('http://api.mybutton.org/boiler/api_stream_send', {
                name: 'test_stream',
                input: '!endstream'
            })
            remote.say(response.data, `remote:quit`);
            remote.say(`API stream closed`, `remote:quit`);
            readline.close();
            process.exit(0);
        });
    };
};

export default new TestsCommand();