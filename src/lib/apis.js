import {ENV, SSOHOST, APIHOST, IMAGEHOST} from '../lib/env.js'
const config = {
    apiHost: APIHOST[ENV],
    ssoHost: SSOHOST[ENV],
    imageHost: IMAGEHOST[ENV]
}

export default {
    config: `${config.apiHost}/wap/redpackagelite/config/param`,
    rules: `${config.apiHost}/wap/redpackagelite/config/rules`,

    login: `${config.apiHost}/wap/redpackagelite/user/login`,
    // wxToken: `${config.apiHost}/wap/redpackagelite/access/token`,//wx token
    wxQrCode: `${config.apiHost}/wap/redpackagelite/share/qrcode`,
    qiniuToken: `${config.apiHost}/open/qiniu/token/redpackagelite?data=%7B%22cur_uid%22%3A3254493%7D`,///open/qiniu/wap/image/token?data=%7B%22cur_uid%22%3A3254493%7D

    //我的
    balanceInfo: `${config.apiHost}/wap/redpackagelite/user/balance/info`,//余额信息
    receiveList: `${config.apiHost}/wap/redpackagelite/receiveList`,//收取列表
    sendList: `${config.apiHost}/wap/redpackagelite/sendList`,//发送列表
    sendDetailList: `${config.apiHost}/wap/redpackagelite/detail`,//发送红包详情
    withdraw: `${config.apiHost}/wap/redpackagelite/user/balance/withdraw`,//提现

    //出题
    freeRedPack: `${config.apiHost}/wap/redpackagelite/publish/byreview`,//免费出题
    recharge: `${config.apiHost}/wap/redpackagelite/publish/byorderpay`,//支付
    rechargeResult: `${config.apiHost}/wap/redpackagelite/user/balance/chargepay/result`,//支付结果
    buyRedPack: `${config.apiHost}/wap/redpackagelite/publish/bybalance`,//购买红包
    incompleteRedPack: `${config.apiHost}/wap/redpackagelite/qa/history`,//未完成红包恢复
    recommendQuestion: `${config.apiHost}/wap/redpackagelite/rec/qa`,//推荐问答
    commitQuestion: `${config.apiHost}/wap/redpackagelite/qa/save`,//保存问答
    finishQuestion: `${config.apiHost}/wap/redpackagelite/qa/finish`,//完成出题
    squareList: `${config.apiHost}/wap/redpackagelite/square/list`,//广场红包墙

    //答题
    canIAnswer: `${config.apiHost}/wap/redpackagelite/check/cando`,//能否答题
    questionList: `${config.apiHost}/wap/redpackagelite/qalist`,//答题列表
    answerQuestion: `${config.apiHost}/wap/redpackagelite/do/answer`,//答题
    redpackResult: `${config.apiHost}/wap/redpackagelite/result`,//答题结束
    //复活
    relive: `${config.apiHost}/wap/redpackagelite/share/callback`,//分享复活
    reliveCheck: `${config.apiHost}/wap/redpackagelite/user/servivecard/info`,//复活卡查询
    reliveRecharge: `${config.apiHost}/wap/redpackagelite/user/servivecard/chargepay`,//复活卡购买
    servivecard: `${config.apiHost}/wap/redpackagelite/user/servivecard/info`,//复活卡查询

}
