// step2.js
var app=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //事件处理函数
  //一
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
  toRXqPage: function () {
    wx.navigateTo({
      url: '../RXqPage/RXqPage'
    })
  },
  //二
  toYCfPage: function () {
    wx.navigateTo({
      url: '../YCfPage/YCfPage'
    })
  },
  toYCqPage: function () {
    wx.navigateTo({
      url: '../YCqPage/YCqPage'
    })
  },
  toWJfPage: function () {
    wx.navigateTo({
      url: '../WJfPage/WJfPage'
    })
  },
  toWJqPage: function () {
    wx.navigateTo({
      url: '../WJqPage/WJqPage'
    })
  },
  //三
  toSJCFfPage: function () {
    wx.navigateTo({
      url: '../SJCFfPage/SJCFfPage'
    })
  },
  toSJDDfPage: function () {
    wx.navigateTo({
      url: '../SJDDfPage/SJDDfPage'
    })
  },
  toJJqPage: function () {
    wx.navigateTo({
      url: '../JJqPage/JJqPage'
    })
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