"use strict";


// HTTP 307 - moved temporarily
// HTTP 308 - moved permanently

module.exports = {
    poa: {
        nets: {
            core: {
                host: '35.169.195.82',
                port: 4000,
            },
            sokol: {
                host: '52.206.143.149',
                port: 4000,
            },
            xdai: {
                aliases: ['dai'],
                host: '3.231.47.141',
                port: 4000,
            },
        },
    },

    eth: {
        nets: {
            kovan: {
                host: '52.72.221.22',
                port: 4000,
            },
            ropsten: {
                redirect: {
                    code: 307,
                    location: 'https://ropsten.etherscan.io$PATH_WO_PREFIX',
                }
            },
            rinkeby: {
                redirect: {
                    code: 307,
                    location: 'https://rinkeby.etherscan.io$PATH_WO_PREFIX',
                }
            },
            goerli: {
                redirect: {
                    code: 307,
                    location: 'https://goerli.etherscan.io$PATH_WO_PREFIX',
                }
            },
            mainnet: {
                host: '3.232.138.54',
                port: 4000,
            },
        },
    },

    etc: {
        nets: {
            mainnet: {
                host: '54.146.157.206',
                port: 4000,
            },
        },
    },

    lukso: {
        nets: {
            l14: {
                host: '100.25.92.109',
                port: 4000,
            },
        },
    },

    rsk: {
        nets: {
            mainnet: {
                host: '34.227.216.167',
                port: 4000,
            },
        },
    },

    artis: {
        nets: {
            sigma1: {
                host: 'explorer.sigma1.artis.network',
                port: 443,
                // send headers with https and do health checks over https
                valid_ssl: true,
            },
            tau1: {
                host: 'explorer.tau1.artis.network',
                port: 443,
                valid_ssl: true,
            },
        },
    },
};
