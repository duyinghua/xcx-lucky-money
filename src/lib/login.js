import wepy from 'wepy'
import {http, apis} from '../lib/inter.js'
class Login {
    static async doLogin(cb) {
        let that = this;
        if (wepy.$instance.globalData.userInfo) {
            (typeof cb == 'function') && cb();
            return;
        }
        let loginRes = await wepy.login()
        // console.log(loginRes.code)
        // return;
        if (loginRes.code) {
            wx.getUserInfo({
                async success(wxUserRes) {
                    that.serverLogin(loginRes.code, wxUserRes, cb)
                },
                fail(res) {
                    wx.showModal({
                        title: '提示',
                        content: '请在设置页面，允许使用您的用户信息进行授权登录',
                        success(res){
                            if (res.confirm) {
                                wx.openSetting()
                            }
                        }
                    })
                }
            })
        } else {
            console.log('微信获取用户登录态失败！' + loginRes.errMsg)
        }
    }

    static async serverLogin(wxLoginCode, wxUserRes, cb) {
        let userInfo = await http.post(apis.login, {
            js_code: wxLoginCode,
            rawData: wxUserRes.rawData,
            signature: wxUserRes.signature,
            encryptedData: wxUserRes.encryptedData,
            iv: wxUserRes.iv
        })

        if (userInfo._ok) {
            wx.setStorageSync('USER_INFO', userInfo._result)
            wepy.$instance.globalData.userInfo = userInfo._result;
            (typeof cb == 'function') && cb();
        } else {
            wx.showModal({
                title: '提示',
                content: '登录异常，请稍后再试',
                showCancel: false
            })
        }
    }

    static getClientType() {
        let systemInfo = wepy.getSystemInfoSync()
        const clientType = systemInfo.system && systemInfo.system.split(' ')[0].toLowerCase()
        return clientType || systemInfo['model']
    }
}

export default Login;
module.exports = Login;
