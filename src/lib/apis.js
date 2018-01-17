import {ENV, SSOHOST, APIHOST, IMAGEHOST} from '../lib/env.js'
const config = {
  apiHost: APIHOST[ENV],
  ssoHost: SSOHOST[ENV],
  imageHost: IMAGEHOST[ENV]
}

export default {
  login: `${config.ssoHost}/user/oauth/lite/login`,
  uploadImage: `${config.imageHost}/upload/v2/direct?scope=koudai&fileType=image`,
  mine: `${config.apiHost}/fxx/homepage/main`,//我的
  myUserComment: `${config.apiHost}/fxx/user_comment/list_new`, //我的评价列表
  favoriteGoods: `${config.apiHost}/fxx/homepage/favorite/stu`, // 我收藏的商品
  setFavorite: `${config.apiHost}/fxx/udc/favorite`,// 收藏商品
  categoryList: `${config.apiHost}/fxx/category/main`,  // 榜单品类
  categorySub: `${config.apiHost}/fxx/category/sub`,  // 榜单二级品类
  getGoodsListSort: `${config.apiHost}/fxx/item/orderedCategory/list`,  // 品类商品列表
  getGoodsData: `${config.apiHost}/fxx/item/rush/detail`, //商品详情
  getGoodsComment: `${config.apiHost}/fxx/udc/third_comment/detail`, //商品评价
  addUserComment: `${config.apiHost}/fxx/udc/user_comment/create_new`, //添加评价
  delUserComment: `${config.apiHost}/fxx/udc/user_comment/delete`, //删除评价
  likeComment: `${config.apiHost}/fxx/forum/like`, //点赞评价
  getSuggestList: `${config.apiHost}/fxx/suggestion/word`,//搜索联想
  getSearchData: `${config.apiHost}/fxx/evaluation/item_search_category`

}
