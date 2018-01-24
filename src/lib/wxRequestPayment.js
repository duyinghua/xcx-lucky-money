import {http, apis} from '../lib/inter.js'
let wxRequestPayment = function (payParam, cb) {
    wx.requestPayment({
        'timeStamp': payParam.timeStamp,
        'nonceStr': payParam.nonceStr,
        'package': payParam.package,
        'signType': payParam.signType,
        'paySign': payParam.paySign,
        success: async (res) => {
            (typeof cb === 'function') && cb(res);
        },
        fail: function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
                wx.showToast({
                    title: '支付已取消',
                    icon: 'none'
                })
            } else {
                wx.showModal({
                    content: '支付失败，请重试',
                    showCancel: false,
                });
            }
        }
    })

}
export default wxRequestPayment
