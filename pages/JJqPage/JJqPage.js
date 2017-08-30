// YClist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      {
        name: "白晨星",
        sex: "男",
        zkz: "1324123423",
        date: "2017-09-31 21：00",
        pos: "北京市总部基地1",
        time: "2017-09-31 21：00"
      }, {
        name: "白晨星",
        sex: "男",
        zkz: "1324123423",
        date: "2017-09-31 21：00",
        pos: "北京市总部基地2",
        time: "2017-09-31 21：00"
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          dataList: res.data
        });
      }
    })
  }
})