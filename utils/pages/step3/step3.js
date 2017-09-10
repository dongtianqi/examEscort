// step3.js
var app = getApp();
var weburl = app.globalData.weburl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    quanXian:false,
    modalHidden:false,
    isSelState:false,
    isSelectAll:false,
    msgNums:[],
    msgIds:[]

  },
  onPullDownRefresh: function () {
    console.log("刷新")
    this.getLXR();
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var roleCode = wx.getStorageSync('roleCode')
      var username = wx.getStorageSync('username')
      var userid = wx.getStorageSync('userid')
      if (roleCode == '1' || roleCode == '2' || roleCode == '3') {
        this.setData({
          quanXian: true,
          userid: userid,
          username: username
        })
      }
    } catch (e) {
    }
    this.getLXR();
  }, 
  getLXR:function(){
    wx.showLoading({
      title: '加载中',
    })
    try {
      var value = wx.getStorageSync('userid')
      var data = {
        "linkManVo.id": value
      }
      if (value) {
        wx.request({
          url: weburl + 'SHSFKS/wx/findWxLinkManJsonList.action', //仅为示例，并非真实的接口地址
          data: data,
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            console.log("联系人：", res.data)
            if (res.data != null) {
              if (res.data.dataStatus == "1") {
                this.setData({
                  groupList: res.data.dataMain
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
              title: '加载联系人失败，请检查网络连接',
              duration: 2000
            })
            return;
          },
          complete: () =>{
            wx.hideLoading();
          }
        })
      }
    } catch (e) {
    }
  },

  tel :function(e){
var tel = e.target.dataset.tel;
console.log(e)
wx.makePhoneCall({
  phoneNumber: tel //仅为示例，并非真实的电话号码
})
  },
  msg : function (e) {
    var tel = e.target.dataset.tel;
    var id = e.target.dataset.id;
    var msgNums=this.data.msgNums;
    var msgIds = this.data.msgIds;
    msgNums[0]=tel;
    msgIds[0] = id;
    this.setData({
      modalHidden: !this.data.modalHidden,
      msgNums:msgNums,
      msgIds: msgIds
    });

  },
  groSelEvent:function(e){
    var groupindex = e.currentTarget.dataset.groupindex;
    if(this.data){
      var groupList = this.data.groupList;
      var isGroupSel= groupList[groupindex].isGroupSel = !groupList[groupindex].isGroupSel; 
      var personList = groupList[groupindex].personList;
      //如果不是选择状态
      if (!this.data.isSelState && personList){
        for (var i = 0; i < personList.length; i++) {
        personList[i].isPersonShow = !personList[i].isPersonShow;
      }
      }

      //如果选中状态，组内人员都选中
      if (isGroupSel == true && personList){
        for (var i = 0; i < personList.length;i++){
        personList[i].isPersonSel = true;
      }
      }else{
        if (personList){
        for (var i = 0; i < personList.length; i++) {
          personList[i].isPersonSel = false;
        }
      }
      }
      //更改全选状态
      var count=0;
      for(var i=0;i<groupList.length;i++){
        if (groupList[i].isGroupSel==true){
          count+=1;
        }
      }
      if (count == groupList.length){
        this.setData({
          isSelectAll: true
        })
      }else{
        this.setData({
          isSelectAll: false
        })
      }
        this.setData({
          groupList: groupList
        })
    }
  },
  perSelEvent:function(e){
    var tel = e.currentTarget.dataset.tel;
    if (this.data) {
      var groupList = this.data.groupList;
      for (var i = 0; i < groupList.length; i++) {
        var personList = groupList[i].personList;
        //定义count用于计数
        var count=0;
        if (personList){
        for (var j = 0; j < personList.length; j++){
          if (personList[j].tel==tel){
            personList[j].isPersonSel = !personList[j].isPersonSel;``
          }
//如果person全是true选中，如果走了，那组就不全选。如果一次没走，
          if (personList[j].isPersonSel==false){
            count+=1;
            groupList[i].isGroupSel = false;
          }
          //那么count是0，组就全选
          if (count == 0){
            groupList[i].isGroupSel = true;
          }       
        }
        }
      }
      //更改全选状态开始
      var countAll = 0;
      for (var i = 0; i < groupList.length; i++) {
        if (groupList[i].isGroupSel == true) {
          countAll += 1;
        }
      }
      if (countAll == groupList.length) {
        this.setData({
          isSelectAll: true
        })
      } else {
        this.setData({
          isSelectAll: false
        })
      }
//全选结束
      this.setData({
        groupList: groupList
      })
    }
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    this.setData({
      modalHidden: !this.data.modalHidden
    })
    var data = {};
      data = {
        "smsTaskVo.receiverList": this.data.msgIds,
        // 'msgNums': this.data.msgNums,
        "smsTaskVo.creater":this.data.username,
        'smsTaskVo.smsDescribe': e.detail.value.textarea
      }
      if (data["smsTaskVo.smsDescribe"]){
        console.log("短信发送传后台数据:", data)
     wx.request({
       url: weburl+'SHSFKS/wx/saveWxSmsTask.action',
   data: data,
   header: { "Content-Type": "application/x-www-form-urlencoded" },
   method: 'POST',
   dataType: '',
   success:(res) => {
     console.log("短信提交后台返值：", res)
     if (res.data != null) {
       if (res.data.dataStatus == "1") {
         wx.showToast({
           title: '信息发送成功',
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
         title: '信息发送失败，请检查网络连接',
         duration: 2000
       })
     return;
},
    complete: () => {
    //   this.setData({
    //     msgNums:[],
    //     msgIds: []  
    // })
      this.cancel();
    }
 })
      }else{
        wx.showToast({
          title: '短信内容不能为空',
          duration: 2000
        })
      }
    // this.setData({
    //   msgNums:[],
    //   msgIds: []
    // })
  },
  //取消
  formReset: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      msgNums: [],
      msgIds: []
    })
  },
  selectAll:function () {
    this.setData({
      isSelState: true,
      isSelectAll: !this.data.isSelectAll
    })
    if (this.data.isSelectAll==true){
      if (this.data) {
        var groupList = this.data.groupList;
        for (var i = 0; i < groupList.length; i++){
          var personList = groupList[i].personList;
            groupList[i].isGroupSel =true;
            if (personList) {
           for (var j = 0; j < personList.length; j++) {
             personList[j].isPersonSel = true;
             personList[j].isPersonShow = true;
           }
            }
        }
      }
    } else if (this.data.isSelectAll == false){
      if (this.data) {
        var groupList = this.data.groupList;
        for (var i = 0; i < groupList.length; i++) {
          var personList = groupList[i].personList;
          groupList[i].isGroupSel = false;
          if (personList) {
          for (var j = 0; j < personList.length; j++) {
            personList[j].isPersonSel = false;
            personList[j].isPersonShow = true;
          }
          }
        }
      }
    }
    this.setData({
      groupList: groupList
    })
  },
  cancel:function(){
    console.log("调用cancel方法");
    this.setData({
      isSelState: false,
      isSelectAll: false,
      msgNums:[],
      msgIds: []
    })
    if (this.data) {
      var groupList = this.data.groupList;
      for (var i = 0; i < groupList.length; i++) {
        var personList = groupList[i].personList;
        if (personList) {
        for (var j = 0; j < personList.length; j++) {
          personList[j].isPersonShow = false;
        }
        }
      }
    }
    this.setData({
      groupList: groupList
    })
  },
  //多选编辑短信
  edit:function(){
    var msgNums=this.data.msgNums;
    var msgIds = this.data.msgIds;
    var groupList = this.data.groupList;
for(var i=0;i<groupList.length;i++){
  var personList = groupList[i].personList;
  if (personList) {
  for (var j = 0; j < personList.length; j++){
    if (personList[j].isPersonSel==true){
      msgNums.push(personList[j].tel)
      msgIds.push(personList[j].linkManId)
      
    }
  }  
  } 
}
if (msgNums.length !== 0) {
  this.setData({
    modalHidden: !this.data.modalHidden
  })
}else{
      wx.showToast({
        title: '请先选择要发送的联系人',
        duration: 2000
      })
}
  }
})