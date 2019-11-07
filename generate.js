const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const conf = Object.assign({}, require('./config-global'), require('./config-endpoints'));

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
        ifne: (parts, value) => value? `${parts[0]}${value}${parts[1]}` : '',
    },
});

console.log(haproxy_cfg);
