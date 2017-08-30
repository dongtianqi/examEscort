// BMdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {
      "name": "白晨星",
      "sex": "男",
      "date": "2000年8月",
      "djwz": "汉字",
      "num": "312423",
      "zkz": "314234213",
      "city": "南开大学附属中学",
      "pos": "天津南开区109号",
      "kch": "12",
      "zw": "1号",
      "rxinfo":[
        {
          "photo":"",
        "sj" : "试卷一",
        "sbjg":"识别通过",
        "ajsj":"2017-09-31"
        },
        {
          "photo":"",
          "sj": "试卷二",
          "sbjg": "识别通过",
          "ajsj": "2017-09-31"
        },
        {
          "photo": "",
          "sj": "试卷三",
          "sbjg": "识别通过",
          "ajsj": "2017-09-31"
        },
        {
          "photo": "",
          "sj": "试卷四",
          "sbjg": "识别通过",
          "ajsj": "2017-09-31"
        }

      ]
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    var data = {
      index: index
    }
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        this.setData({
          dataList: res.data
        });

      }
    })
  }
})