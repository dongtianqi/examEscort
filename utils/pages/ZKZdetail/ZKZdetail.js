// BMdetail.js
var app = getApp();
var weburl = app.globalData.weburl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // dataList: {
    //   "name": "白晨星",
    //   "sex": "男",
    //   "date": "2000年8月",
    //   "djwz": "汉字",
    //   "num": "312423",
    //   "zkz": "314234213",
    //   "city": "南开大学附属中学",
    //   "pos": "天津南开区109号",
    //   "kch": "12",
    //   "zw": "1号"
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var zkz = options.zkz;
    var data = {
      'examineeVo.licence': zkz
    }
    console.log("详情前端传值：",data)
    wx.request({
      url: weburl + 'SHSFKS/wx/findExamineeByInfo.action', //仅为示例，并非真实的接口地址
      data: data,
      method:"POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success:(res) => {
        if (res.data != null) {
          var dataMain = res.data.dataMain;
          if (res.data.dataStatus == "1") { 
        this.setData({
          dataList: res.data.dataMain[0]
        });
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
      }
    })
  }
})