import {ENV, SSOHOST, APIHOST, IMAGEHOST} from '../lib/env.js'
const config = {
    apiHost: APIHOST[ENV],
    ssoHost: SSOHOST[ENV],
    imageHost: IMAGEHOST[ENV]
}

export default {
    login: `${config.apiHost}/wap/redpackagelite/user/login`,
    qiniuToken: `${config.apiHost}/open/qiniu/token/redpackagelite?data=%7B%22cur_uid%22%3A3254493%7D`,///open/qiniu/wap/image/token?data=%7B%22cur_uid%22%3A3254493%7D
    mine: `${config.apiHost}/fxx/homepage/main`,//我的

}
