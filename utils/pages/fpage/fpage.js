// fpage.js
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
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          location: res
        })
      }
    })
  
  },
  formSubmit: function (e) {
    console.log(this.data.photo)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    this.setData({
      date: '',
      photo:''
    })
    console.log('form发生了reset事件')
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  choosePhoto : function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:(res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          photo: tempFilePaths
        })
      }
    })
  },
  onShareAppMessage: function () {

    return {

      title: '自定义分享标题',

      desc: '自定义分享描述',

      path: ''

    }

  }

})