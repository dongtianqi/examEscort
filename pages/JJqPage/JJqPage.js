// YClist.js
var app = getApp();
var weburl = app.globalData.weburl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var userid = wx.getStorageSync('userid')
      if (userid) {
        wx.request({
          url: weburl + 'SHSFKS/wx/findPaperMoveInfo.action', //仅为示例，并非真实的接口地址
          data: { "papermoveVo.linkManId": userid },
          method: "POST",
          header: {
            "content-type": 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log("jj查询后台返值：", res)
            if (res.data != null) {
              var dataMain = res.data.dataMain;

              if (res.data.dataStatus == "1") {
                this.setData({
                  dataList: dataMain
                });
                if (dataMain.length == 0) {
                  wx.showToast({
                    title: "查询结果为空",
                    duration: 2000
                  })
                }
              }
              else {
                if (res.data.errorMsg != null
                  && res.data.errorMsg.length > 0) {
                  wx.showToast({
                    title: res.data.errorMsg,
                    duration: 2000
                  })
                }
              }
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '查询失败，请检查网络连接',
              duration: 2000
            })
            return;
          }
        })
      }
    } catch (e) {
    }
  }
})