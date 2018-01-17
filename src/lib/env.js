const ENV = {
  dev: 'develop',
  pre: 'beta',
  prod: 'stable'
}.prod;

const SSOHOST = {
  develop: 'https://sso-daily.test.weidian.com',
  beta: 'https://sso-pre.test.weidian.com',
  stable: 'https://sso.weidian.com'
}

const APIHOST = {
  develop: 'https://gwh5.test.api.fangxin.com',
  beta: 'https://gwh5.test.api.fangxin.com',
  stable: 'https://gwh5.api.fangxin.com'
}

const IMAGEHOST = {
  develop: 'https://mediaapi.daily.weidian.com',
  beta: 'https://mediaapi.pre.weidian.com',
  stable: 'https://media.api.weidian.com'
}

const WEBVIEW_HOST = {
  fangxin: 'https://m.fangxin.com'
}

export {ENV, SSOHOST, APIHOST, IMAGEHOST, WEBVIEW_HOST}
