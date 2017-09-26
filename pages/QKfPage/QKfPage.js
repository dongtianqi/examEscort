// SJCFfPage.js
var util = require('../../utils/util.js')
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.js');
var app = getApp();
var weburl = app.globalData.weburl;
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
    var date = new Date();
    var datefm = util.formatTime(date);
    this.setData({
      time: datefm
    })
    this.getAddress();
    this.getLocation();
    try {
      var username = wx.getStorageSync('username');
      var placeid = wx.getStorageSync('placeid');
      var placename = wx.getStorageSync('placename');
      this.getdata(username,placeid, placename);
      }catch(e){
      }
  },
  getdata: function (username,placeid, placename){
    console.log(111)
    var data = {
      "examineeMissVo.creater": username,
      "examineeMissVo.examPlaceId": placeid
      // "examineeMissVo.examPlaceName": placename,
    }
    console.log("load传后台",data)
    wx.request({
      url: weburl + 'SHSFKS/wx/findExamMiss.action',
      data: data,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      dataType: '',
      success: (res) => {
        console.log("缺考页面load后台数据", res.data)
        if (res.data != null) {
          if (res.data.dataStatus == "1") {
            this.setData({
              dataList: res.data.dataMain
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
      complete: () => {
        wx.hideLoading();
      }
    })
  },
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  getAddress: function () {
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'KxvCAjHu94fsEDMBYtrUMt8e5QDWqPc2'
    });
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      //location: this.data.latitude + "," +this.data.longitude,
      fail: (data) => {
        console.log("解析地址失败" + data)
      },
      success: (data) => {
        this.setData({
          markers: data.wxMarkerData
        });
      }
    })
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    if (data) {
      try {
        // var username = wx.getStorageSync("username");
        var username = wx.getStorageSync("username");
        var placeid = wx.getStorageSync("placeid");
        var placename = wx.getStorageSync("placename");
        var area = wx.getStorageSync("area");
          // data["examExceptionVo.linkManName"] = username;
          data["examineeMissVo.creater"] = username;
          // data["examineeMissVo.moveAddr"] = this.data.markers[0].address,
          //   data["examineeMissVo.moveLat"] = this.data.latitude,
          //   data["examineeMissVo.moveLng"] = this.data.longitude,
            data["examineeMissVo.examPlaceId"] = placeid,
            data["examineeMissVo.examPlaceName"] = placename,
            data["examineeMissVo.examArea"] = area,
          console.log("缺考上报前端传值", data);
          wx.request({
            url: weburl + 'SHSFKS/wx/updateExamMiss.action', //仅为示例，并非真实的接口地址
            data: data,
            method: "POST",
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("缺考上报后台返值：", res)
              if (res.data != null) {
                var dataMain = res.data.dataMain;
                if (res.data.dataStatus == "1") {
                  wx.showToast({
                    title: "上报成功",
                    duration: 2000
                  })
                  wx.redirectTo({
                    url: '../QKqPage/QKqPage',
                  })
                }
                else {
                  if (res.data.errorMsg != null
                    && res.data.errorMsg.length > 0) {
                    wx.showToast({
                      title: res.data.errorMsg,
                      duration: 2000
                    })
                  }
                }
              }
              //返回上一个页面
              //wx.navigateBack();
            },
            fail:function(){
              console.log("fail")
            }
          })

      } catch (e) {
      }
    } else {
      wx.showToast({
        title: '请填写必要信息',
        duration: 2000
      })
    }
  }

})