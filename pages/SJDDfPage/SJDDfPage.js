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
    array: ['科目一', '科目二', '科目三', '科目四']
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
  //this.data.markers[0].address
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    var data = {};
    if (this.data.array[this.data.index]) {
      try {
        // var username = wx.getStorageSync("username");
        var userid = wx.getStorageSync("userid");
        if (userid) {
          // data["examExceptionVo.linkManName"] = username;
          data["papermoveVo.linkManId"] = userid;
          data["papermoveVo.moveAddr"] = this.data.markers[0].address,
            data["papermoveVo.moveLat"] = this.data.latitude,
            data["papermoveVo.moveLng"] = this.data.longitude,
            data["papermoveVo.subjectName"] = this.data.array[this.data.index],
            data["papermoveVo.moveType"] = "2",
            data["papermoveVo.photoPath"] = weburl + "SHSFKS/wxPhoto/" + this.data.imgurl,
            console.log("上报前端传值", data);
          //data.photo = this.data.photo;
          wx.request({
            url: weburl + 'SHSFKS/wx/addPaperMoveInfo.action', //仅为示例，并非真实的接口地址
            data: data,
            method: "POST",
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("异常上报后台返值：", res)
              if (res.data != null) {
                var dataMain = res.data.dataMain;
                if (res.data.dataStatus == "1") {
                  wx.showToast({
                    title: "上报成功",
                    duration: 2000
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
            }
          })
        }
      } catch (e) {
      }
    } else {
      wx.showToast({
        title: '请填写必要信息',
        duration: 2000
      })
    }
  },
  chooseImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log("前台tempFilePaths：", tempFilePaths)
        this.setData({
          imageList: tempFilePaths
        })
        wx.uploadFile({
          url: weburl + 'SHSFKS/wx/wxUploadImg.action', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'upload',
          formData: {},
          success: (res) => {
            var data = JSON.parse(res.data);
            var dataMain = data.dataMain;
            console.log("yc照片后台返回值：", res, dataMain)
            this.setData({
              imgurl: dataMain
            })
          }
        })

      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.imageList
    })
  }

})