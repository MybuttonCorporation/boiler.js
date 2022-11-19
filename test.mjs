let check_sent_words = new Map();
app.get('/boiler/api_stream/:name/:expected', async (req, res) => {
    let params = req.params;
    if (!params.name || !params.expected) { res.status(201).write('a name and expected_list must be provided as parameters.'); res.end() };
    let stream_open = true;
    /**
     * @type {Array<string>}
     */
    let words = params.expected.split('_');
    check_sent_words.set(params.name, []);
    while (stream_open) {
        let input_words = check_sent_words.get(params.name);
        if (input_words.length > 1) {
            for (let j = 0; j < input_words.length; j++) {
                let get_word = input_words[j];
                input_words = input_words.slice(1);
                let expected = words.includes(get_word);
                res.write('stream recieved input: ' + get_word + (expected ? '(expected)' : '(unexpected)'));
                if (get_word == '!endstream') stream_open = false;
            };
        }
    };
    check_sent_words.delete(params.name);
    res.write('stream ended due to interrupt request: !endstream.');
    res.status(200);
    res.end();
});

app.post('/boiler/api_stream/send_input', async (req, res) => {
    let body = req.body;
    if (!body.name || !body.input) return res.status(201).send('bad body parameters. Provide a [body.name and body.input]');
    else if (!check_sent_words.has(body.name)) return res.status(201).send('No such api stream');
    else {
        let r = check_sent_words.get(body.name);
        r.push(body.input);
        return res.status(200).send('input sent');
    };
});