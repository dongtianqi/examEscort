// BMlist.js
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
    var sfz = options.sfz;
    var zkz = options.zkz;
    var student = options.student;
    var data = {
      "examineeVo.licence": zkz,
      "examineeVo.identity": sfz,
      "examineeVo.examineeName": student
    }
    console.log("查询前端传值：", data);
    wx.request({
      url: weburl + 'SHSFKS/wx/findExamineeByInfo.action', //仅为示例，并非真实的接口地址
      data: data,
      method:"POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log("后台查询返回值：", res.data)
        if (res.data != null) {
          var dataMain = res.data.dataMain;
          if (res.data.dataStatus == "1") {
            if (dataMain && dataMain.length == 1) {
              wx.redirectTo({
                url: "../BMdetail/BMdetail?zkz=" + dataMain[0].licence
              })
            } else if (dataMain && dataMain.length > 1) {
              this.setData({
                dataList: dataMain
              })
            } else {
              wx.showToast({
                title: "输入信息有误，请重新输入！",
                duration: 2500
              })
            }

          } else {
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
      fail: function () {
        wx.showToast({
          title: '查询失败，请检查网络连接',
          duration: 2000
        })
      }
    })

  },
  toDetail: function (e) {
    var zkz = e.currentTarget.dataset.zkz;
    console.log("详情前端获取zkz：", zkz);
    // var data = this.data.dataList[index];
    // console.log(data)
    wx.navigateTo({
      url: "../BMdetail/BMdetail?zkz=" + zkz
    })
  }


})