// BMdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {
      "wbh": "32423[汉文]",
      "city": "上海",
      "name": "白晨星",
      "sex": "男",
      "sfzlb": "第二代居民身份证",
      "sfz": "230908199609213243",
      "date": "2000年8月",
      "nation": "汉",
      "hjszd": "福建省",
      "education": "本科",
      "party": "中国共产党",
      "zy": "法学",
      "school": "闽南师范大学",
      "bysj": "2013-09",
      "cyzk": "其他",
      "gzdw": "巨星贸易（上海）有限公司",
      "txdz": "上海市闵行区1204"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    var data ={
      index:index
    }
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: data,
      method:"POST",
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