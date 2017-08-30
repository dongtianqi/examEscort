//index.js
var app = getApp();
var weburl = app.globalData.weburl;

Page({
  data: {
  },
  onLoad: function () {
  this.login();
  this.getUserInfo();
  this.getSystemInfo();
  },
  login: function() {
    console.log("调用login")
  wx.login({
    success:(res) => {
      console.log("code"+res.code)
      if (res.code) {
        //发起网络请求
        wx.request({
          url: weburl +'SHSFKS/wx/getOpenIdByCode.action',
          data: {
            appid:"wx1ec99efaa20bb33d",
            secret:"a01ce133cf2e8480746516bb72f4201a",
            jsCode: res.code
          },
          success:(res) => {
            if (res.data != null) {
              if (res.data.dataStatus == "1") {
            console.log("wx.login返回值：", res.data.dataMain)
            this.setData({
              openid: res.data.dataMain
            })
                try {
                  wx.setStorageSync('openid', res.data.dataMain)
                } catch (e) {
                }
            console.log(this.data.openid);
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
          }, fail: function (data) {
            console.log("loginre失败",data)
          }
  });
      }
      },
    fail:function(){
      console.log("login失败")
    }
  })
  },
    getSystemInfo: function() {
      //获取设备型号
      wx.getSystemInfo({
        success: res => {
          var model = res.model;
          var system = res.system;
          this.setData({
            model: model,
            system: system
          });

        }
      })
    },
    getUserInfo:function(){
    wx.getUserInfo({
      success:(res) => {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        this.setData({
          nickName: nickName
        })
      }
    })
    },
  //事件处理函数
  toStep1: function (e) {
    //由于没后台，本地跳转moni用————————————————
    // try {
    //   wx.setStorageSync('lastTime', "2017-02-22 17：09");
    //   wx.setStorageSync('logined', "logined");
    //   wx.setStorageSync('username', "董天琦");
    //   wx.setStorageSync('role', "试卷押送人员");
    //   wx.setStorageSync('position', "丰台区总部基地丰台区总部基地丰台区总部基地丰台区总部基地");
    // } catch (e) {
    //   console.log("setStorage异常原因：" + e)
    // }
    // wx.switchTab({
    //   url: '../step1/step1'
    // })
//——————————————————————————————
    console.log('登录form发生submit数据为：', e.detail)
   
    console.log(this.data.openid);
    var data = e.detail.value;
    data["linkManVo.phoneModel"] = this.data.model;
    data["linkManVo.phoneOs"] = this.data.system;
    data["linkManVo.weixinName"] = this.data.nickName;
    data["linkManVo.weixinId"] =this.data.openid;
    wx.request({
      url: weburl +'SHSFKS/wx/findLinkManByUserPass.action', //仅为示例，并非真实的接口地址
      data: data,
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      success: (res) => {
     console.log("登录后台传值",res);
     if (res.data != null) {
       if (res.data.dataStatus == "1") {
         var dataMain = res.data.dataMain;
          try {
            //将用户信息存在本地
            wx.setStorageSync('logined', "logined");
            wx.setStorageSync('userid', dataMain.id);
            wx.setStorageSync('username', dataMain.name);
            wx.setStorageSync('role', dataMain.linkGroup.name);           
            wx.setStorageSync('roleCode', dataMain.linkGroup.roleCode);
            wx.setStorageSync('position', dataMain.lastLoginAddr);
            wx.setStorageSync('lastTime', dataMain.lastLoginDate);

          } catch (e) {
            console.log("setStorage异常原因："+e)
          }
          wx.switchTab({
            url: '../step1/step1'
          })
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
          title: '登录失败，请检查网络连接',
          duration: 2000
        })
      }
    })

  }
})
