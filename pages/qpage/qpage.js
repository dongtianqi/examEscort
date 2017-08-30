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
      var index = options.index;
      this.setData({
          index:index
      });
      
  },
  saoma: () => {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  search: function(){
    var inputValue = this.data.inputValue;
    console.log(inputValue)
    //请求数据
    wx.request({
      url: '', //仅为示例，并非真实的接口地址
      data: {
        inputValue: inputValue
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        this.setData({
          tableData: res.data
        })
      }
    })
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })

  }

})