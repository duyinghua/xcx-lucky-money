import wepy from 'wepy'
import {http, apis} from '../lib/inter.js'
import utils from '../lib/utils.js'
class Login {
    /*static async doLogin(cb) {

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
     }*/
    static doLogin() {
        return new Promise(async(resolve, reject) => {
            let that = this;
            if (wepy.$instance.globalData.userInfo) {
                return resolve();
            }
            let loginRes = await wepy.login();
            if (loginRes.code) {
                wx.getUserInfo({
                    async success(wxUserRes) {
                        await that.serverLogin(loginRes.code, wxUserRes)
                        resolve();
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
                        reject();
                    }
                })
            } else {
                console.log('微信获取用户登录态失败！' + loginRes.errMsg)
                reject();
            }
        }).then(function () {
            return true;
        }, function () {
            return false;
        });


    }

    static async serverLogin(wxLoginCode, wxUserRes) {
        return new Promise(async(resolve, reject) => {
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
                resolve();
            } else {
                wx.showModal({
                    title: '提示',
                    content: '登录异常，请稍后再试',
                    showCancel: false
                })
                reject();
            }
        }).then(function () {
            return true;
        }, function () {
            return false;
        });


    }

}

export default Login;
module.exports = Login;
