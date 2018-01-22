import {ENV, SSOHOST, APIHOST, IMAGEHOST} from '../lib/env.js'
const config = {
    apiHost: APIHOST[ENV],
    ssoHost: SSOHOST[ENV],
    imageHost: IMAGEHOST[ENV]
}

export default {
    login: `${config.apiHost}/wap/redpackagelite/user/login`,
    // wxToken: `${config.apiHost}/wap/redpackagelite/access/token`,//wx token
    wxQrCode: `${config.apiHost}/wap/redpackagelite/share/qrcode`,
    qiniuToken: `${config.apiHost}/open/qiniu/token/redpackagelite?data=%7B%22cur_uid%22%3A3254493%7D`,///open/qiniu/wap/image/token?data=%7B%22cur_uid%22%3A3254493%7D

    //我的
    balanceInfo: `${config.apiHost}/wap/redpackagelite/user/banlance/info`,//余额信息
    receiveList: `${config.apiHost}/wap/redpackagelite/receiveList`,//收取列表
    sendList: `${config.apiHost}/wap/redpackagelite/sendList`,//发送列表
    sendDetailList: `${config.apiHost}/wap/redpackagelite/detail`,//发送红包详情
    //出题
    recharge: `${config.apiHost}/wap/redpackagelite/user/banlance/chargepay`,//支付
    rechargeResult: `${config.apiHost}/wap/redpackagelite/user/banlance/chargepay/result`,//支付结果
    buyRedPack: `${config.apiHost}/wap/redpackagelite/publish`,//购买红包
    incompleteRedPack: `${config.apiHost}/wap/redpackagelite/qa/history`,//未完成红包恢复
    recommendQuestion: `${config.apiHost}/wap/redpackagelite/rec/qa`,//推荐问答
    commitQuestion: `${config.apiHost}/wap/redpackagelite/qa/save`,//保存问答
    finishQuestion: `${config.apiHost}/wap/redpackagelite/qa/finish`,//完成出题
    //答题
    questionList: `${config.apiHost}/wap/redpackagelite/qalist`,//答题列表
    gameResult: `${config.apiHost}/wap/redpackagelite/result`,//答题结束

    relive: `${config.apiHost}/wap/redpackagelite/share/callback`,//分享复活
}
