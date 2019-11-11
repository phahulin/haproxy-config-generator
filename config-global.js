"use strict";

module.exports = {
    // stats_auth: 'user:NxgYjfYdqh2mE4',
    stats_uri: '/gQVQBBbRep9zoIBiA8jEi0vbrWCleeJ1dx0BQ6Iy',
    ssl_cert_path: '/etc/ssl/private/cloudflare-origin.pem',
    default_endpoint: {
        net_type: 'poa',
        net_name: 'xdai'
    },
    content_security_policy_srcs: {
        "connect-src": [
            "'self'",
            "wss://*.blockscout.com",
            "wss://blockscout.com",
        ],
        "default-src": [
            "'self'",
            "*.google-analytics.com",
            "*.googleapis.com",
            "*.gstatic.com",
            "*.googletagmanager.com",
        ],
        "script-src":  [
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://blockscout.matomo.cloud",
            "https://cdn.jsdelivr.net",
            "https://www.google-analytics.com",
            "https://ajax.cloudflare.com",
            "https://www.googletagmanager.com",
            "https://nico-amsterdam.github.io",
        ],
        "style-src": [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://blockscout.matomo.cloud",
            "https://cdn.jsdelivr.net",
            "https://fonts.googleapis.com",
            "https://nico-amsterdam.github.io",
        ],
        "img-src": [
            "'self'",
            "data:",
            "*",
        ],
        "font-src": [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "data:",
            "https://cdn.jsdelivr.net",
            "https://fonts.gstatic.com",
        ],
    },


};
