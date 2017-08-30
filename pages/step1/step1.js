// step1.js
var util = require('../../utils/util.js')
Page({
  onPullDownRefresh: function () {
    console.log("刷新")
    wx.stopPullDownRefresh()
  },
  /**
   * 页面的初始数据
   */
  data: {
  showTitle:false,
  modalHidden:false,
  timeList:[
    {time:"2017-09-08 12:00",
    person:"张三",
    tel:"18209876781",
    done:"做了什么做了什么做了什么做了什么做了什么做了什么做了什么"},
    {
      time: "2017-09-03 13:00",
      person: "张三",
      tel: "18209876782",
      done: "做了什么shi"
    },
    {
      time: "2017-09-03 14:00",
      person: "张三",
      tel: "18209876783",
      done: "做了什么333"
    },
    {
      time: "2017-09-08 12:00",
      person: "张三",
      tel: "18209876781",
      done: "做了什么"
    },
    {
      time: "2017-09-08 12:00",
      person: "张三",
      tel: "18209876781",
      done: "做了什么"
    },
    {
      time: "2017-09-08 12:00",
      person: "张三",
      tel: "18209876781",
      done: "做了什么"
    },
  ]
  },
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('logined');
      // var lastTime = wx.getStorageSync('lastTime');
      // var position = wx.getStorageSync('position');
      // console.log("首页加载时getstorage的value:"+value)
   //判断是否第一次登陆
      if (!value) {
        wx.redirectTo({
          url: '../login/login'
        });
      }
//       //如果没网，签到时间地点从本地获取
//       if (lastTime && popsition){
// this.setData({
//   lastTime: lastTime,
//   popsition:position
// })
//       }
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
    //自动签到
    this.qiandao();
    //用websocket获取时间轴数据
    // wx.connectSocket({
    //   url: 'test.php'
    // })

    // wx.onSocketMessage((res) => {
    //   console.log('收到服务器内容：' + res.data)
    //   this.setData({
    //     timeList:res.data
    //   })
    // })
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
      console.log("首页显示时getstorage的value:" + value + lastTime + position)
      //如果没网，签到时间地点从本地获取

        this.setData({ 
          username: username,
          role: role,
          lastTime: lastTime,
          position: position
        })
      
    } catch (e) {
      console.log("首页getStorage的异常原因：" + e)
    }
  },
  //屏幕卷去高度时触发
  scroll :function(e){
    var scrollTop = e.detail.scrollTop;
    if (scrollTop >= 0 && scrollTop<200){
      this.setData({
         //opacity: 1 - scrollTop/162,
        showTitle:false
      });
    }else if (scrollTop >= 200){
      this.setData({
         //opacity:0,
        showTitle:true
      });
    } 
 
  },
  //事件处理函数
  toBMqPage: function () {
    wx.navigateTo({
      url: '../BMqPage/BMqPage'
    })
  },
  toZKZqPage: function () {
    wx.navigateTo({
      url: '../ZKZqPage/ZKZqPage'
    });
  },
  toWJfPage: function () {
    wx.navigateTo({
      url: '../WJfPage/WJfPage'
    })
  },
  toJJfPage:function(){
    wx.navigateTo({
      url: '../JJfPage/JJfPage'
    })
  },
  //二
  toRXqPage:function(){
    wx.navigateTo({
      url: '../RXqPage/RXqPage'
    })
  },
  toYCfPage: function () {
    wx.navigateTo({
      url: '../YCfPage/YCfPage'
    })
  },
    //获取位置
  getLocation:function(){
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log("签到位置")
          this.setData({
            latitude: latitude,
            longitude: longitude
          });
          this.QDajax();
        }
      })
  },
  getSystemInfo:function(){
    //获取设备型号
    wx.getSystemInfo({
      success: res => {
        var model=res.model;
        this.setData({
          model: model
        });
        this.getLocation();
      }
    })
  },
  QDajax:function(){
    var date = new Date();
    var datefm = util.formatTime(date);
    var data = {
      date: datefm,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      model: this.data.model
    }
    console.log("签到前端传值：" + data.date + "维度：" + data.latitude + "精度：" + data.longitude + "手机" + data.model)

    wx.request({
      url: '',
      data: data,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: '',
      success: (res) => {
        try {
          wx.setStorageSync('lastTime', datefm);
          wx.setStorageSync('position', res.position);
        } catch (e) {
        }
        this.setData({
          lastTime: datefm,
          position: res.position
        });
        wx.showToast({
          title: '签到成功',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '签到失败，请检查网络连接',
          duration: 2000
        })
        return;
      }
    })
  },

  qiandao:function(){
    console.log("签到")
    this.getSystemInfo();
  },
  toMore:function(){
    wx.switchTab({
      url: '../step2/step2'
    })
  },
  //回复
  reply:function(e){
var tel = e.target.dataset.tel;
  this.setData({
    modalHidden: !this.data.modalHidden,
    telnum:tel
  });
  } ,
  //
  detail:function(e){
    var done = e.target.dataset.done;
    console.log("done:"+done);
    //模态窗
    wx.showModal({
      title: '详情',
      content: done,
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
         // console.log('用户点击确定')
        }
      }
    })
  },
  formSubmit: function (e) {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
    var data={
      "tel":this.data.telnum,
      "textarea": e.detail.value.textarea
    }
    if (data.textarea && data.tel){
         wx.request({
   url: '',
   data: data,
   header: { 'content-type': 'application/json'},
   method: 'POST',
   dataType: '',
   success:(res) => {
    this.setData({
      telnum:""
    })
},
   fail: (res)=> {
    this.setData({
      telnum:""
    }),
    wx.showToast({
           title: '回复信息失败，请检查网络连接',
           duration: 2000
         })
                return;
}
 })
    }else{
      wx.showToast({
        title: '回复内容不能为空',
        image:'./img/warn.svg',
        duration: 2000
      })
       return;
    }
    console.log("回复传后台数据：" + this.data.telnum, e.detail.value.textarea)
  },
  formReset: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  }
})