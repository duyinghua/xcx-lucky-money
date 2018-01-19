import {ENV, SSOHOST, APIHOST, IMAGEHOST} from '../lib/env.js'
const config = {
    apiHost: APIHOST[ENV],
    ssoHost: SSOHOST[ENV],
    imageHost: IMAGEHOST[ENV]
}

export default {
    login: `${config.apiHost}/wap/redpackagelite/user/login`,
    wxToken: `${config.apiHost}/wap/redpackagelite/access/token`,//wx token
    wxQrCode: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=`,
    qiniuToken: `${config.apiHost}/open/qiniu/token/redpackagelite?data=%7B%22cur_uid%22%3A3254493%7D`,///open/qiniu/wap/image/token?data=%7B%22cur_uid%22%3A3254493%7D
    receiveList: `${config.apiHost}/wap/redpackagelite/receiveList `,//收取列表
    sendList: `${config.apiHost}/wap/redpackagelite/sendList `,//发送列表
    sendDetailList: `${config.apiHost}/wap/redpackagelite/detail `,//发送列表

}
