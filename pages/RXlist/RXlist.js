// BMlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{
      "name": "白晨星",
      "sex": "男",
      "date": "2000年8月",
      "djwz": "汉字",
      "num": "312423",
      "zkz": "314234213",
      "city": "南开大学附属中学",
      "pos": "天津南开区109号",
      "kch": "12",
      "zw": "1号"
    }, {
      "name": "白晨星",
      "sex": "男",
      "date": "2000年8月",
      "djwz": "汉字",
      "num": "312423",
      "zkz": "314234213",
      "city": "南开大学附属中学",
      "pos": "天津南开区109号",
      "kch": "12",
      "zw": "2号"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sfz = options.sfz;
    var zkz = options.zkz;
    var student = options.studnet;
    var data = {
      sfz: sfz,
      zkz: zkz,
      student: student
    }
    console.log("查询前段传智：" + data);
    wx.request({
      url: '', //仅为示例，并非真实的接口地址
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success: res => {
        console.log(res.data)
        this.setData({
          dataList: res.data
        })
      }
    })

  },
  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    // var data = this.data.dataList[index];
    // console.log(data)
    wx.redirectTo({
      url: '../RXdetail/RXdetail?index=' + index
    })
  }


})