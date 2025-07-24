
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5267, hash: 'bef40705f3da09550cb6263879f78c90c16c86a68ced157da93cbd1a2cc820a0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1210, hash: '5dcf03ef5be09f96e6fac15ef6ea36063c60a4e73bcbc616f8378349990654fb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 35772, hash: 'b3f228ec2f095d66842e667e28d7091b4a6d5015d9eab61a4c3ff350678ead2b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W7U235PN.css': {size: 230903, hash: 'rMnTeEqGmqA', text: () => import('./assets-chunks/styles-W7U235PN_css.mjs').then(m => m.default)}
  },
};
