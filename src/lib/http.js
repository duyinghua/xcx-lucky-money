import wepy from 'wepy'
// import login from './login.js'

export default class HTTP {
  static get(url, params, externalApi) {
    return this.request('GET', url, params, externalApi)
  }

  static put(url, params, externalApi) {
    return this.request('PUT', url, params, externalApi)
  }

  static post(url, params, externalApi) {
    return this.request('POST', url, params, externalApi)
  }

  static patch(url, params, externalApi) {
    return this.request('PATCH', url, params, externalApi)
  }

  static del(url, params, externalApi) {
    return this.request('DELETE', url, params, externalApi)
  }

  static async request(method, url, params, externalApi) {
    const req = {
      method: method,
      url: url
    }
    if (externalApi) {
      req.data = params
    } else {
      let reqHeader = {}, authHeader = {};
      const userInfo = wepy.$instance.globalData.userInfo
      if (userInfo) {
        authHeader = {
          WD_b_wduss: userInfo.uss,
          WD_b_id: userInfo.userId,
          token: userInfo.token,
          isweapp: 1
        }
      }
      if (req.method === 'POST') {
        reqHeader['content-type'] = 'application/x-www-form-urlencoded'
      }
      req.header = {...reqHeader, ...authHeader}
      req.data = {param: JSON.stringify(params.param)};
      if (params.public) {
        req.data.public = JSON.stringify(Object.assign(params.public, authHeader))
      } else {
        req.data.public = JSON.stringify(authHeader)
      }
    }

    // console.log(`HTTP REQUEST DATA IS:\n ${JSON.stringify(req)}`)
    wepy.showLoading({title: '加载中'})
    const res = await wepy.request(req)
    wepy.hideLoading()
    if (res.statusCode === 200) {
      let result = Object.assign({_result: res.data.result}, {_status: res.data.status});
      //如果接口返回result直接是一个对象或数组，则直接暴露到最外层使用（数组也可以）；普通string、number、bool基本类型则使用时候要从_result中取得
      if (typeof res.data.result == 'object') {
        result = Object.assign(result, res.data.result)
      }
      let statusCode = res.data.status.status_code;
      if (statusCode == 0) {
        result._ok = true;
      } else if (statusCode == -3) {
        wx.showModal({
          title: '提示',
          content: '服务器异常，请稍后重试',
          showCancel: false
        })
      } else if (statusCode == 120 || statusCode == 40004) {// 未登录或登录过期
        wx.showModal({
          title: '提示',
          content: '登录信息已过期，请重新登录后重试',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              wepy.$instance.globalData.userInfo = '';
              wx.setStorageSync('USER_INFO', '');
              let login = require('./login.js');
              login.doLogin(async () => {
                /*let pages = getCurrentPages();
                 let page = pages[pages.length - 1];
                 let options = [];
                 for (let key in page.options) {
                 options.push(`${key}=${page.options[key]}`)
                 }
                 wx.reLaunch({
                 url: page.route.replace('pages/', '') + (options.length ? ('?' + options.join('&')) : '')
                 })*/
                wx.showToast({
                  title: '重新登录成功'
                });
              })
            }
          }
        })
      }
      console.log('response::', result);
      return result;
    } else {
      console.error(method, url, params, res)
    }
  }
}
