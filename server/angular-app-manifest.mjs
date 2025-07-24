
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/employee-crud-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/employee-crud-app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5285, hash: '4536949060541d817a6e169fb7e651f852a9d2e1aecc201fe250ab59b79b01aa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1228, hash: 'cb54be17382b11045e4df1e68596d5b2285e1b22a19a69e83a61478f8fce3c61', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 35790, hash: 'a2a80069686731a7d802ca581a45de04c9c0a6ae8eed790823f993f96bedb091', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W7U235PN.css': {size: 230903, hash: 'rMnTeEqGmqA', text: () => import('./assets-chunks/styles-W7U235PN_css.mjs').then(m => m.default)}
  },
};
