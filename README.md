## Usage
1. install dependencies
```bash
npm install
```

2. there are two configuration files:
    * `./config-global.js` for [global haproxy settings](#global-settings)
    * `./config-endpoints.js` for [configuring endpoints](#endpoints-settings)

3. generate `haproxy.cfg`
```bash
npm run start
```

4. (optional) if you have `haproxy` itself installed, use
```bash
haproxy -c -f haproxy.cfg
```
to check syntax of the `haproxy.cfg`.

## For development
[EJS templating engine](https://github.com/mde/ejs) is used (see `haproxy.cfg.ejs`).
If you make any changes, it is a good idea to check that ejs syntax is correct:
```
npm run check-ejs
```

## Global settings
  * `stats_uri`: path for haproxy statistics page. If not set statistics is not enabled
  * `stats_auth`: if set, statistics page will closed behind basic authentication. Format: `'user:password'`,
  * `ssl_cert_path`: absolute path to blockscout SSL certificate on the server (e.g. AWS origin certificate)
  * `default_endpoint`: default network to redirect to if user opens main page e.g. https://blockscout.com
  * `content_security_policy_srcs`: list of sources for Content-Security-Policy header

## Endpoints settings
General structure of the file is the following:
```js
module.exports = {
    net_type1: {
        nets: {
            // corresponds to https://blockscout.com/net_type1/net_name1
            net_name1: {
                // options
            },
            // corresponds to https://blockscout.com/net_type1/net_name2
            net_name2: {
                // options
            },
            // ...
        },
    },

    net_type2: {
        nets: {
            // corresponds to https://blockscout.com/net_type2/net_name3
            net_name3: {
                // options
            },
            // corresponds to https://blockscout.com/net_type2/net_name4
            net_name4: {
                // options
            },
            // ...
        },
    },
    // ...
}
```
For example, the following config corresponds to a single `/poa/core` endpoint (assuming blockscout server is running on 192.0.0.1:4000):
```js
module.exports = {
    poa: {
        nets: {
            core: {
                host: '192.0.0.1',
                port: 4000,
            },
        },
    },
}
```
If we also wanted `/poa/sokol` endpoint, we would add it into `poa.nets` section
```js
module.exports = {
    poa: {
        nets: {
            core: {
                host: '192.0.0.1',
                port: 4000,
            },
            sokol: {
                host: '192.0.0.2',
                port: 4000,
            },
        },
    },
}
```

List of possible configuration options:
1. redirect. This setting acts first and overwrites any other settings
```js
{
    redirect: {
        code: Number /* HTTP code to use for redirect,
            e.g. `307` for temporal redirect, `308` for permanent redirect
        */,
        location: String /*Full url to redirect to, e.g. `https://etherscan.io`.
            A variable `$PATH_WO_PREFIX` can be used here to represent original url without network prefix,
            e.g. if `location: 'https://etherscan.io$PATH_WO_PREFIX'` then when user opens `https://blockscout.com/eth/mainnet/blocks/12345/transactions` he will be redirected to `https://etherscan.io/blocks/12345/transactions`
        */,
    },
},
```
Complete example:
```js
module.exports = {
    eth: {
        nets: {
            ropsten: {
                redirect: {
                    code: 307,
                    location: 'https://ropsten.etherscan.io$PATH_WO_PREFIX',
                }
            },
        },
    },
}
```
2. host and port. The `host` and `port` options are mandatory, others are optional:
```js
{
    aliases: Array(String), /* OPTIONAL. A list of urls that would redirect to this endpoint,
        e.g. if in `xdai` endpoint there is `aliases: ['dai']`, then `https://blockscout.com/dai` redirects to `https://blockscout.com/xdai`
    */,
    host: String, // Host name/IP
    port: Number, // Port number
    valid_ssl: Boolean, /* OPTIONAL. If set to `true`, haproxy assumes that the Host has a valid, not self-signed SSL certificate.
        As a result, `https` will be used in headers instead of `http` and health checks will be performed over https.
    */,
},
```
Complete example:
```js
module.exports = {
    poa: {
        nets: {
            xdai: {
                aliases: ['dai'],
                host: 'xdai-backend.blockscout.com',
                port: 443,
                valid_ssl: true,
            },
        },
    },
}
```
