// qpage.js
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
    // var index = options.index;
    // this.setData({
    //   index: index
    // });
  },
  saoma: function () {
    wx.scanCode({
      success: (res) => {
        console.log("saomaneirong" + res.result)
        this.setData({
          result: res.result
        })
      }
    })
  },
  search: function (e) {
    //请求数据
    var data = e.detail.value;
    if (data.zkz || data.sfz || data.student) {
      wx.redirectTo({
        url: '../RXlist/RXlist?zkz=' + data.zkz + '&sfz' + data.sfz + '&student' + data.student
      })
    } else {
      wx.showToast({
        title: '查询信息不能为空',
        duration: 2000
      })
    }
  }

})