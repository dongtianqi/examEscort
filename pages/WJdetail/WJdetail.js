// BMdetail.js
var app = getApp();
var weburl = app.globalData.weburl;
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array0: ['科目一', '科目二', '科目三', '科目四'],
    array1: ["违反规定随身携带书籍、笔记、报纸、稿纸、电子用品、通讯工具等物品进入考场的",
"考试开始前答题或者考试结束后继续答题的",
"考试开始三十分钟后仍未按规定在试卷、答卷（答题卡）标明的位置填写、填涂姓名、准考证号或者不粘贴条形码的",
"考试期间交头接耳、左顾右盼的",
"在考场内喧哗、走动或者有其他影响考试秩序行为的",
"未在与本人准考证号相符的位置就座答题的",
"答题用笔不符合规定的",
"抄写试题或者本人答案带出考场的",
"考试期间违反规定擅自出入考场的",
"有需要给予相应处理的其他违纪行为的",
      "违反规定随身携带书籍、笔记、报纸、稿纸、电子用品、通讯工具等物品进入考场的",
      "考试开始前答题或者考试结束后继续答题的",
      "考试开始三十分钟后仍未按规定在试卷、答卷（答题卡）标明的位置填写、填涂姓名、准考证号或者不粘贴条形码的",
      "考试期间交头接耳、左顾右盼的",
      "在考场内喧哗、走动或者有其他影响考试秩序行为的",
      "未在与本人准考证号相符的位置就座答题的",
      "答题用笔不符合规定的",
      "抄写试题或者本人答案带出考场的",
      "考试期间违反规定擅自出入考场的",
      "有需要给予相应处理的其他违纪行为的",
      "抄袭、查看、偷听违规带进考场的与考试内容有关的文字、视听资料的",
      "考试开始后被查出携带电子作弊设备的",
      "以讨论、互打手势等方式传递答题信息的",
      "与他人交换试卷、答卷(答题卡)的",
      "偷看、抄袭他人答案或者同意、默许、协助他人抄袭本人答案的",
      "在答卷(答题卡)上作提示标记或者在非署名处署名的",
      "故意损毁试卷、答卷(答题卡) 、条形码或者将试卷、答卷(答题卡)带出考场的",
      "有需要给予相应处理的其他违纪行为的",
      "由他人冒名顶替或者互以对方身份参加考试的",
      "在考试过程中使用通讯工具、电子用品接收或者发送与考试内容相关信息的",
      "故意妨碍监考人员或者其他考试工作人员履行职责的",
      "威胁、侮辱、殴打监考人员或者其他考试工作人员的",
      "有其他严重作弊或者严重扰乱考场秩序行为的。有前款规定情形，构成违反治安管理行为的，移交公安机关处理",
      "由他人冒名顶替或者互以对方身份参加考试，情节严重的",
      "在考试过程中使用通讯工具、电子用品接收或者发送与考试内容相关信息，情节严重的",
      "指使、组织考试作弊或者参与有组织作弊的",
      "有其他特别严重作弊行为的"],
      array2:[
        "警告处理和终止当场考试",
        "取消本场考试成绩并责令其离开考场",
        "当年考试成绩无效",
        "当年考试成绩无效，两年内不得报名参加国家司法考试",
        "当年考试成绩无效，终身不得报名参加国家司法考试"
      ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    this.getAddress();
    var zkz = options.zkz;
    var data = {
      "examineeVo.licence": zkz
    }
    wx.request({
      url: weburl + 'SHSFKS/wx/findExamineeByInfo.action', //仅为示例，并非真实的接口地址
      data: data,
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log("wjdetail后台返值",res.data)
        if (res.data != null) {
          var dataMain = res.data.dataMain;
          if (res.data.dataStatus == "1") {
            this.setData({
              dataList: dataMain[0],
            });
            if (dataMain.length==0){
              wx.showToast({
                title: "查询结果为空",
                duration: 2000
              })
            }
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
  bindPickerChange0: function (e) {
    this.setData({
      index0: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  formSubmit: function (e) {
    var data ={}
    data["examineePunishVo.subject"]=this.data.array0[this.data.index0];
    data["examineePunishVo.punishActionName"] = this.data.array1[this.data.index1];
    data["examineePunishVo.punishName"] = this.data.array2[this.data.index2];
    if (data["examineePunishVo.subject"] && 
    data["examineePunishVo.punishActionName"]&&
    data["examineePunishVo.punishName"]){
    try {
      var userid = wx.getStorageSync('userid');
      var username = wx.getStorageSync('username');
      
        data["examineePunishVo.loginAddr"] = this.data.markers[0].address;
        data["examineePunishVo.loginLat"] = this.data.latitude;
        data["examineePunishVo.loginLng"] = this.data.longitude;
        data["examineePunishVo.examineeVo.licence"] = this.data.dataList.licence;
      data["examineePunishVo.linkManId"] = userid;
        data["examineePunishVo.alterUserName"] = username;
        data["examineePunishVo.photoPath"] = weburl + "SHSFKS/wxPhoto/" + this.data.imgurl,
    console.log("wj提交前端传值：", data);
      if (userid && username) {
        wx.request({
          url: weburl+'SHSFKS/wx/addExamPunishInfo.action', //仅为示例，并非真实的接口地址
          data: data,
          method: "POST",
          header: {
            "content-type": 'application/x-www-form-urlencoded'
          },
          success: (res) => {
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
          },
          fail:() => {
            wx.showToast({
              title: "上报失败，请检查网络连接",
              duration: 2000
            })
          }
        })
      }
    } catch (e) {
    }
    }else {
      wx.showToast({
        title: "请填写必要信息",
        duration: 2000
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
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
            console.log("yc照片后台返回值：", dataMain)
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