// step3.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden:false,
    isSelState:false,
    isSelectAll:false,
    msgNums:[],
    groupList:   [
        {

          "groupName": "常用联系人",
          "isGroupSel": false,
          "personList": [
            {
              "familyName": "张",
              "name": "张三",
              "tel": "15116957120",
              "isPersonShow":false,
              "isPersonSel": false
            },
            {
              "familyName": "李",
              "name": "李四",
              "tel": "15116957121",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "李",
              "name": "李四",
              "tel": "15116957126",
              "isPersonShow": false,
              "isPersonSel": false
            }
          ]
        },
        {
          "groupName": "bu常用联系人",
          "isGroupSel": false,
          "isGroupShow": true,
          "personList": [
            {
              "familyName": "张",
              "name": "张yi1",
              "tel": "15116957122",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "李",
              "name": "李四",
              "tel": "15116957123",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "张",
              "name": "张yi1",
              "tel": "15116347122",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "李",
              "name": "李四",
              "tel": "15114557123",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "张",
              "name": "张yi1",
              "tel": "18716957122",
              "isPersonShow": false,
              "isPersonSel": false
            },
            {
              "familyName": "李",
              "name": "李四",
              "tel": "10916957123",
              "isPersonShow": false,
              "isPersonSel": false
            }
          ]
        }
      ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://127.0.0.1:8020/%E6%94%AF%E4%BB%98/groupJson.json', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success:(res) => {
    //     console.log(res.data)
    //     this.setData({
    //       groupList: res.data.groupList
    //     });
    //   }
    // })
  
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
    var msgNums=this.data.msgNums;
    msgNums[0]=tel;
    this.setData({
      modalHidden: !this.data.modalHidden,
      msgNums:msgNums
    });

  },
  groSelEvent:function(e){
    var groupindex = e.currentTarget.dataset.groupindex;
    if(this.data){
      var groupList = this.data.groupList;
      var isGroupSel= groupList[groupindex].isGroupSel = !groupList[groupindex].isGroupSel; 
      var personList = groupList[groupindex].personList;
      var length = personList.length;
      //如果不是选择状态
      if (!this.data.isSelState){
      for (var i = 0; i < length; i++) {    
        personList[i].isPersonShow = !personList[i].isPersonShow;
      }
      }

      //如果选中状态，组内人员都选中
      if (isGroupSel==true){
      for(var i=0;i<length;i++){
        personList[i].isPersonSel = true;
      }
      }else{
        console.log("000");
        for (var i = 0; i < length; i++) {
          personList[i].isPersonSel = false;
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
        'msgNums': this.data.msgNums,
        'text': e.detail.value.textarea
      }
      if(data.text){
      console.log("短信发送传后台数据:" + this.data.msgNums, e.detail.value.textarea)
//      wx.request({
//    url: '',
//    data: data,
//    header: {'content-type': 'application/json'},
//    method: 'POST',
//    dataType: '',
//    success:(res) => {
//     this.setData({
//       msgNums:[] 
//     })
// },
//    fail: (res)=> {
//     this.setData({
//       msgNums:[] 
//     }),
//        wx.showToast({
//          title: '群发信息失败，请检查网络连接',
//          duration: 2000
//        })
//      return;
// }
//  })
      }else{
        wx.showToast({
          title: '短信内容不能为空',
          duration: 2000
        })
      }
    this.setData({
      msgNums:[]
    })
  },
  //取消
  formReset: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      msgNums: [] 
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
           for (var j = 0; j < personList.length; j++) {
             personList[j].isPersonSel = true;
             personList[j].isPersonShow = true;
           }
        }
      }
    } else if (this.data.isSelectAll == false){
      if (this.data) {
        var groupList = this.data.groupList;
        for (var i = 0; i < groupList.length; i++) {
          var personList = groupList[i].personList;
          groupList[i].isGroupSel = false;
          for (var j = 0; j < personList.length; j++) {
            personList[j].isPersonSel = false;
            personList[j].isPersonShow = true;
          }
        }
      }
    }
    this.setData({
      groupList: groupList
    })
  },
  cancel:function(){
    this.setData({
      isSelState: false,
      isSelectAll: false,
      msgNums:[]
    })
    if (this.data) {
      var groupList = this.data.groupList;
      for (var i = 0; i < groupList.length; i++) {
        var personList = groupList[i].personList;
        for (var j = 0; j < personList.length; j++) {
          personList[j].isPersonShow = false;
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
    var groupList = this.data.groupList;
for(var i=0;i<groupList.length;i++){
  var personList = groupList[i].personList;
  for (var j = 0; j < personList.length; j++){
    if (personList[j].isPersonSel==true){
      msgNums.push(personList[j].tel)
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