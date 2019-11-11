const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const conf = Object.assign({}, require('./config-global'), { endpoints: require('./config-endpoints') });

const render_options = {
    compileDebug: true,
    _with: true,
    escape: str => str,
};
const template_file = path.join(__dirname, './haproxy.cfg.ejs');
const template_src = fs.readFileSync(template_file, 'utf8');
const template = ejs.compile(template_src, render_options);

let haproxy_cfg = template({
    conf: conf,
    meta: {
        GENERATED_AT: new Date().toISOString(),
    },
    tags: {
        // performs substitution if @value is not empty, otherwise returs empty string
        ifne: (parts, value) => value? `${parts[0]}${value}${parts[1]}` : '',
    },
    funs: {
        // returns a string for haproxy condition where all elements are negated: `!prefix_element0 !prefix_element1 !prefix_element2`
        none_of: (elements, prefix) => elements.map(e => `!${prefix || ''}${e}`).join(' '),
        // returns a string for haproxy condition where all elements but one are negated: `prefix_value !prefix_element0 !prefix_element1 ...`
        only_one: (elements, value, prefix) => ([`${prefix || ''}${value}`, ...elements.filter(e => e != value).map(e => `!${prefix || ''}${e}`)]).join(' '),
    },
});

console.log(haproxy_cfg);
