const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");

const analyticsProxy = createProxyMiddleware({
    target: "http://localhost:6000",
    changeOrigin: true,
    pathRewrite: {
        [`^/api/analytics`]: '',
    },
    on: {
        proxyReq: fixRequestBody,
    },
});

module.exports = analyticsProxy;
