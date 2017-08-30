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
    console.log("表单提交后台数据" + e.detail.value, this.data.sex, this.data.photo,this.data.date);
    var data = e.detail.value;
    data.sex=this.data.sex;
    data.photo=this.data.photo;
    data.date=this.data.date
    // wx.request({
    //   url: 'test.php', //仅为示例，并非真实的接口地址
    //   data: data,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    // //返回上一个页面
    //wx.navigateBack();
    //   }
    // })
  },
  formReset: function () {
    this.setData({
      date: '',
      photo: '',
      sex:''
    })
    console.log('form发生了reset事件')
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  choosePhoto: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          photo: tempFilePaths
        })
      }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  }

})