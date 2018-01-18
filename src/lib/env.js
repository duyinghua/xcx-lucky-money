const ENV = {
    dev: 'develop',
    pre: 'beta',
    prod: 'stable'
}.prod;

const SSOHOST = {
    develop: 'https://sso-daily.test.weidian.com',
    stable: 'https://sso.weidian.com'
}

const APIHOST = {
    develop: 'https://api.immocha.com',
    stable: 'https://develop.immocha.com'
}

const IMAGEHOST = {
    develop: 'https://mediaapi.daily.weidian.com',
    stable: 'https://media.api.weidian.com'
}

const WEBVIEW_HOST = {
    fangxin: 'https://m.fangxin.com'
}

export {ENV, SSOHOST, APIHOST, IMAGEHOST, WEBVIEW_HOST}
