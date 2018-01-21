import wepy from 'wepy'

export default class shareMixin extends wepy.mixin {
    data = {}
    methods = {}


    onShareAppMessage() {
        let rand = parseInt(Math.random() * 3) + 1;
        return {
            title: wepy.$instance.globalData.appName,
            path: 'pages/index',
            imageUrl: `../img/share-title${rand}.png`
        }
    }
}
