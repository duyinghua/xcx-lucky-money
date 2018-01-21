import wepy from 'wepy'
// import login from './login.js'

export default class HTTP {
    static get(url, params, externalApi, showLoading) {
        return this.request('GET', url, params, externalApi, showLoading)
    }

    static put(url, params, externalApi, showLoading) {
        return this.request('PUT', url, params, externalApi, showLoading)
    }

    static post(url, params, externalApi, showLoading) {
        return this.request('POST', url, params, externalApi, showLoading)
    }

    static patch(url, params, externalApi, showLoading) {
        return this.request('PATCH', url, params, externalApi, showLoading)
    }

    static del(url, params, externalApi, showLoading) {
        return this.request('DELETE', url, params, externalApi, showLoading)
    }

    static async request(method, url, params = {}, externalApi = false, showLoading = true) {
        const req = {
            method: method,
            url: url
        }
        if (externalApi) {
            req.data = params
        } else {
            let reqHeader = {}, authInfo = {};
            let userInfo = wepy.$instance.globalData.userInfo
            if (!userInfo && !params.iv) {
                let login = require('./login.js');
                let loginRes = await login.doLogin();
                if (loginRes) {
                    userInfo = wepy.$instance.globalData.userInfo
                } else {
                    return {};
                }
            }
            authInfo = {
                tToken: userInfo.tToken,
                cur_uid: userInfo.id,
            }
            if (req.method === 'POST') {
                reqHeader['content-type'] = 'application/x-www-form-urlencoded'
            }
            req.header = reqHeader
            params = {...params, ...authInfo}
            req.data = {data: JSON.stringify(params)};
        }
        showLoading && wepy.showLoading({title: '加载中'})
        const res = await wepy.request(req)
        showLoading && wepy.hideLoading()
        if (res.statusCode === 200) {
            // console.log(res.data)
            let result = Object.assign({_result: res.data.data}, {_code: res.data.code});
            //如果接口返回result直接是一个对象或数组，则直接暴露到最外层使用（数组也可以）；普通string、number、bool基本类型则使用时候要从_result中取得
            if (typeof res.data.data == 'object') {
                result = Object.assign(result, res.data.data);
                if (res.data.data instanceof Array) {
                    result.length = res.data.data.length;
                }
            }
            let statusCode = res.data.code;
            if (statusCode == 0) {
                result._ok = true;
            } else if (statusCode == 12) {// 未登录或登录过期
                wx.showModal({
                    title: '提示',
                    content: '登录信息已过期，请重新登录后重试',
                    showCancel: false,
                    success: async(res) => {
                        if (res.confirm) {
                            wepy.$instance.globalData.userInfo = '';
                            wx.setStorageSync('USER_INFO', '');
                            let pages = getCurrentPages();
                            let page = pages[pages.length - 1];
                            let options = [];
                            for (let key in page.options) {
                                options.push(`${key}=${page.options[key]}`)
                            }
                            wx.reLaunch({
                                url: page.route.replace('pages/', '') + (options.length ? ('?' + options.join('&')) : '')
                            })
                        }
                    }
                })
            } else {
                wx.showModal({
                    content: typeof res.data.data == 'string' ? res.data.data : '服务器异常',
                    showCancel: false
                })
            }
            console.log('response::', result);
            return result;
        } else {
            console.error(method, url, params, res)
            let result = res;
            result._ok = false;
            return result;
        }
    }
}
