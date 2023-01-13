const { env } = require('process');
const HttpsAgent = require('agentkeepalive').HttpsAgent;

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:55781';

const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: target,
    secure: false,
    changeOrigin: true,
    agent: new HttpsAgent({
      maxSockets: 100,
      keepAlive: true,
      maxFreeSockets: 10,
      keepAliveMsecs: 100000,
      timeout: 6000000,
      freeSocketTimeout: 90000
    }),
    onProxyRes: proxyRes => {
      const key = "www-authenticate";
      proxyRes.headers[key] = proxyRes.headers[key] &&
        proxyRes.headers[key].split(",");
    }
  }
]

module.exports = PROXY_CONFIG;
