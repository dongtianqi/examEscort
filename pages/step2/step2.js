// step2.js
var app = getApp();
var util = require('../../utils/util.js')
var weburl = app.globalData.weburl;
var canUseNow = app.globalData.canUseNow;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //事件处理函数
  //一
  toBMqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../BMqPage/BMqPage'
    })
    }
  },
  toZKZqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../ZKZqPage/ZKZqPage'
    });
    }
  },
  toRXqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../RXqPage/RXqPage'
    })
  }
  },
  //二
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
  toWJfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../WJfPage/WJfPage'
    })
    }
  },
  toWJqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../WJqPage/WJqPage'
    })
    }
  },
  //三
  toQKfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../QKfPage/QKfPage'
    })
    }
  },
  toQKqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../QKqPage/QKqPage'
    })
    }
  },
//四
  toQDqPage:function(){

    wx.navigateTo({
      url: '../QDqPage/QDqPage'
    })
    
  },
  zhuxiao:function(){
    try {
      wx.clearStorageSync();
      wx.navigateTo({
        url: '../login/login'
      })
    } catch (e) {
    }
  }
})