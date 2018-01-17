export default class drawCanvas {
  static drawLine(ctx, x, y, width, color = '#000', weight = 1, lineDash = [10, 10]) {
    ctx.beginPath();
    ctx.setLineDash(lineDash, lineDash[0] / 2);
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(weight);
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.closePath();
    ctx.stroke();
  }

  static drawText(context, text, x, y, limit, lineHeight = 20) {
    let maxLenght = limit
    let chr = text
    let temp = ''
    let row = []
    for (let a = 0; a < chr.length; a++) {
      if (a < maxLenght) {
        temp += chr[a]
      } else {
        row.push(temp)
        temp = ''
        maxLenght += limit
      }
    }
    row.push(temp)
    for (let b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + b * lineHeight)
    }
    return row.length * lineHeight
  }

  static replaceEmoji(text) {
    const unifiedEmojiRanges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
    ]
    const reg = new RegExp(unifiedEmojiRanges.join('|'), 'g')
    return text.replace(reg, '[表情]')
  }

  static canvasToSave(canvasId) {
    return new Promise(function (resolve, reject) {
      if (!wx.saveImageToPhotosAlbum || !wx.canvasToTempFilePath) {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
          showCancel: false
        })
        reject('版本过低');
      }
      wx.showLoading({
        title: '图片生成中',
        mask: true
      })
      wx.canvasToTempFilePath({
        canvasId: canvasId,
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({
                title: '保存成功',
              });
              resolve(true);
            },
            fail: (res) => {
              console.log(res)
              // ios(auth deny) android(auth denied)提示不同
              if (~res.errMsg.indexOf('auth')) {
                wx.showModal({
                  title: '提示',
                  content: '请在设置页面，允许保存图片到您的相册',
                  success(res){
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  }
                })
              }
              reject('生成失败');
            },
          })
        },
        fail: () => {
          wx.showModal({
            title: '提示',
            content: '卡片生成失败，请稍候再试',
            showCancel: false
          })
          reject('生成失败');
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }).then(function (response) {
      return response;
    }, function (response) {
      console.log(response)
      return null;
    });

  }
}
