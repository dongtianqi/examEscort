//index.js
Page({
  data: {
   
  },
  //事件处理函数
  toStep1: function (e) {
    //由于没后台，本地跳转moni用————————————————
    try {
      wx.setStorageSync('lastTime', "2017-02-22 17：09");
      wx.setStorageSync('logined', "logined");
      wx.setStorageSync('username', "董天琦");
      wx.setStorageSync('role', "试卷押送人员");
      wx.setStorageSync('position', "丰台区总部基地");
    } catch (e) {
      console.log("setStorage异常原因：" + e)
    }
    wx.switchTab({
      url: '../step1/step1'
    })
//——————————————————————————————
    console.log('登录form发生submit数据为：', e.detail.value)
    var data = e.detail.value;
    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: data,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (res) => {
    //     console.log("提交手机密码后，服务器返回数据："+res.data);
    //     if(res.data){
    //       try {
    //         //将用户信息存在本地
    //         wx.setStorageSync('logined', "logined");
    //         wx.setStorageSync('userid', res.data.userid);
    //         wx.setStorageSync('username', res.data.username);
    //         wx.setStorageSync('role', res.data.role);
    //         wx.setStorageSync('position', res.data.position);
    //         wx.setStorageSync('lastTime', res.data.lastTime);

    //       } catch (e) {
    //         console.log("setStorage异常原因："+e)
    //       }
    //       wx.switchTab({
    //         url: '../step1/step1'
    //       })
    //     }
    //   },
    //   fail: function () {
    //     wx.showToast({
    //       title: '登录失败，请检查网络连接',
    //       duration: 2000
    //     })
    //   }
    // })

  },
  onLoad: function () {
    
  }
})
