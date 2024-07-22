// vue.config.js
const fs = require('fs');
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8081,
        https: {
          key: fs.readFileSync('.certs/key.pem'),
          cert: fs.readFileSync('.certs/cert.pem'),
        },
        hot: "only",
      },
  }