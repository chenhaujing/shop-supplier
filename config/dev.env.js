let merge = require('webpack-merge');
let prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://10.100.50.59:8080"',
});
