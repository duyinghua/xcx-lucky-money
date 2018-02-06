export default class Utils {
    static newClass(object) {
        if (typeof object !== 'object') {
            console.error('参数不是一个对象');
            return object;
        }
        let objStr = JSON.stringify(object);
        return JSON.parse(objStr);
    }

    static sleep(s) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise resolved')
            }, s * 1000)
        })
    }

    static debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var immediate = immediate === undefined ? true : immediate
        if (null == wait) wait = 200;
        var later = function () {
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }

}
