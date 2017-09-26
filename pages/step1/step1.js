// step1.js
var util = require('../../utils/util.js')
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.js');
var app = getApp();
var weburl = app.globalData.weburl;
var canUseNow = app.globalData.canUseNow;
Page({
  onPullDownRefresh: function () {
    console.log("刷新")
    this.SJZajax();
    wx.stopPullDownRefresh()
  },
  /**
   * 页面的初始数据
   */
  data: {
  showTitle:false,
  modalHidden:false
  // ,timeList:[
  //   {time:"2017-09-08 12:00",
  //     linkman:"张三",
  //   tel:"18209876781",
  //   message:"十点集合"},
  //   {
  //     time: "2017-09-03 13:00",
  //     person: "张三",
  //     tel: "18209876782",
  //     done: "做了什么shi"
  //   },
  //   {
  //     time: "2017-09-03 14:00",
  //     person: "张三",
  //     tel: "18209876783",
  //     done: "做了什么333"
  //   },
  //   {
  //     time: "2017-09-08 12:00",
  //     person: "张三",
  //     tel: "18209876781",
  //     done: "做了什么"
  //   },
  //   {
  //     time: "2017-09-08 12:00",
  //     person: "张三",
  //     tel: "18209876781",
  //     done: "做了什么"
  //   },
  //   {
  //     time: "2017-09-08 12:00",
  //     person: "张三",
  //     tel: "18209876781",
  //     done: "做了什么"
  //   },
  // ]
  },
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('logined');
      // console.log("首页加载时getstorage的value:"+value)
   //判断是否第一次登陆
      if (!value) {
        wx.redirectTo({
          url: '../login/login'
        });
      }
    } catch (e) {
      console.log("首页getStorage的异常原因："+e)
    }

    //获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollH: res.windowHeight
        })
      }
    }) 
    //获取时间轴数据
   this.SJZajax();
    //自动签到
    this.qiandao();
    //获取天气
    this.getWeather();
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    try {
      var value = wx.getStorageSync('logined');
      var username = wx.getStorageSync('username');
      var role = wx.getStorageSync('role'); 
      var lastTime = wx.getStorageSync('lastTime');
      var position = wx.getStorageSync('position');
      var placeid = wx.getStorageSync('placeid');
      var placename = wx.getStorageSync('placename');
      
      console.log("首页显示时getstorage的value:" + value + lastTime + position)
      //如果没网，签到时间地点从本地获取
        this.setData({ 
          username: username,
          role: role,
          lastTime: lastTime,
          position: position,
          placeid: placeid,
          placename: placename
        })
      
    } catch (e) {
      console.log("首页getStorage的异常原因：" + e)
    }
  },
    //获取时间轴数据
SJZajax:function(){
  console.log("下拉刷新ajax")
  wx.showLoading({
    title: '加载中',
  })
  try{
  var userid = wx.getStorageSync('userid');
  console.log(userid)
  wx.request({
    url: weburl +'SHSFKS/wx/findWxSmsInfoByLinkManId.action',
    data: {
      "linkManVo.id": userid
    },
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    method: 'POST',
    dataType: '',
    success: (res) => {
      console.log("时间轴后台返回", res.data)
      if (res.data != null) {
        if (res.data.dataStatus == "1") {
          this.setData({
            timeList: res.data.dataMain
          });
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
    fail: (res) => {
      wx.showToast({
        title: '获取列表信息失败，请检查网络连接',
        duration: 2000
      })
      return;
    },
    complete : () => {
      wx.hideLoading();
    } 
  })
  } catch (e) {
  }
},
  //事件处理函数
  // toBMqPage: function () {
  //   wx.navigateTo({
  //     url: '../BMqPage/BMqPage'
  //   })
  // },
  toZKZqPage: function () {
    if (!canUseNow){
    util.canUse();
    }else{
    wx.navigateTo({
      url: '../ZKZqPage/ZKZqPage'
    });
    }
 
  },
  toWJfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../WJfPage/WJfPage'
    })
    }
  },
  toQKqPage:function(){
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../QKqPage/QKqPage'
    })
  }
  },
  toQKfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../QKfPage/QKfPage'
    })
  }
  },
  //二
  toRXqPage:function(){
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../RXqPage/RXqPage'
    })
  }
  },
  toYCfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../YCfPage/YCfPage'
    })
  }
  },
  toYCqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../YCqPage/YCqPage'
    })
  }
  },
    //获取位置
  getLocation:function(){

      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log("签到位置", latitude, longitude)
          this.setData({
            latitude: latitude,
            longitude: longitude
          });
          this.getWeather();
          this.getAddress();
  }
      });
      },
      getAddress :function(){
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
          ak: 'KxvCAjHu94fsEDMBYtrUMt8e5QDWqPc2'
        });
        // 发起regeocoding检索请求 
        BMap.regeocoding({
          //location: this.data.latitude + "," +this.data.longitude,
          fail: (data) => {
            console.log("解析地址失败" + data)
              wx.showToast({
                title: '签到失败，请检查网络连接',
                duration: 2000
              })
              return;    
          },
          success: (data) => {
            this.setData({
              markers: data.wxMarkerData
            });
            this.QDajax();
          }
        })
      },
      getWeather: function(){
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
          ak: 'KxvCAjHu94fsEDMBYtrUMt8e5QDWqPc2'
        });
        // 发起regeocoding检索请求 
        BMap.weather({
          //location: this.data.latitude + "," + this.data.longitude,
          success: (data) => {
            console.log(data)
            this.setData({
              temperature: data.currentWeather[0].temperature,
              weatherDesc: data.currentWeather[0].weatherDesc
            });
          },
          fail: (data) => {
            console.log("解析天气失败" + data.errMsg + data.statusCode)
            console.log("解析天气失败:" + this.data.latitude + "," + this.data.longitude)
          }
        });
      },
  QDajax:function(){
    var date = new Date();
    var datefm = util.formatTime(date);
    try {
      var userid = wx.getStorageSync('userid')
      var openid = wx.getStorageSync('openid')
      if (userid) {
        var data = {
          //date: datefm,
          "linkManVo.lastLoginAddr": this.data.markers[0].address,
          "linkManVo.lastLoginLat": this.data.latitude,
          "linkManVo.lastLoginLng": this.data.longitude,
          "linkManVo.id": userid,
          "linkManVo.weixinId": openid
        }
        console.log("签到前端传值：", data)

        wx.request({
          url: weburl +'SHSFKS/wx/findLinkManLogin.action',
          data: data,
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          dataType: '',
          success: (res) => {
            console.log("签到后台返回", res.data)
            if (res.data != null) {
              if (res.data.dataStatus == "1") {
            try {
              wx.setStorageSync('lastTime', datefm);
              wx.setStorageSync('position', data["linkManVo.lastLoginAddr"]);
            } catch (e) {
            }
            this.setData({
              lastTime: datefm,
              position: data["linkManVo.lastLoginAddr"]
            });
            wx.showToast({
              title: '签到成功',
              duration: 2000
            })
              } else {
                if (data.errorMsg != null
                  && data.errorMsg.length > 0) {
                  wx.showToast({
                    title: data.errorMsg,
                    duration: 2000
                  })
                }
              }
          }},
          fail: (res) => {
            wx.showToast({
              title: '签到失败，请检查网络连接',
              duration: 2000
            })
             return;
          }
    })
      }
    } catch (e) {
    }

    
  },

  qiandao:function(){
    console.log("签到")
    this.getLocation();
  },
  toMore:function(){
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.switchTab({
      url: '../step2/step2'
    })
  }
  },
  //回复和详情的ajax,给后台传消息已读状态。
  repAjax:function(data){
    wx.request({
      url: weburl+'SHSFKS/wx/updateReadFlagAndReplyMsg.action',
      data: data,
      header: { 'content-type': "application/x-www-form-urlencoded" },
      method: 'POST',
      dataType: '',
      success: (res) => {
        console.log("rAndDajax返回值：",res)
        if (res.data != null) {
          if (res.data.dataStatus == "1" && res.data.dataMain) {
        wx.showToast({
          title: res.data.dataMain,
          duration: 2000
        })
        } else {
          if (data.errorMsg != null
            && data.errorMsg.length > 0) {
            wx.showToast({
              title: data.errorMsg,
              duration: 2000
            })
      }
      }
      }
      },
      fail: (res) => {
        wx.showToast({
          title: "回复失败，请检查网络连接",
          duration: 2000
        })
      }
    })
  },
  //回复和详情的ajax,给后台传消息已读状态。
  detAjax: function (data, done) {
    wx.request({
      url: weburl + 'SHSFKS/wx/updateReadFlagAndFindReplyMsg.action',
      data: data,
      header: { 'content-type': "application/x-www-form-urlencoded" },
      method: 'POST',
      dataType: '',
      success: (res) => {
        console.log("rAndDajax返回值：", res)
        if (res.data != null) {
          if (res.data.dataStatus == "1") {
            //模态窗
            var content;
            var rep = res.data.dataMain;
            if (rep) {
              content = done + "\r\n \r\n回复内容:\r\n \r\n" + rep;
            } else {
              content = done;
            }
            wx.showModal({
              title: '详情',
              content: content,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                }
              }
            })
          } else {
            if (data.errorMsg != null
              && data.errorMsg.length > 0) {
              wx.showToast({
                title: data.errorMsg,
                duration: 2000
              })
            }
          }
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "回复失败，请检查网络连接",
          duration: 2000
        })
      }
    })
  },
  //回复
  reply:function(e){
    if (!canUseNow) {
      util.canUse();
    } else {
var tel = e.target.dataset.tel;
    var id = e.target.dataset.id;
  this.setData({
    modalHidden: !this.data.modalHidden,
    telnum:tel,
    id:id
  });
    }
  } ,
  //
  detail:function(e){
    var done = e.target.dataset.done;
    // var rep = e.target.dataset.rep;
    // console.log("done:"+done);
    // console.log("rep" + rep)
    var data = { "smsInfoVo.id": e.target.dataset.id};
    this.detAjax(data, done);
  },
  formSubmit: function (e) {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
    var data={
      "smsInfoVo.id": this.data.id,
      "smsInfoVo.replyMsg": e.detail.value.textarea
    }
    if (data["smsInfoVo.replyMsg"] && data["smsInfoVo.id"]){
      this.repAjax(data);
    }else{
      wx.showToast({
        title: '回复内容不能为空',
        duration: 2000
      })
       return;
    }
    console.log("回复传后台数据：" + this.data.id, e.detail.value.textarea)
  },
  formReset: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  }
})