//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    payWayData: 0,//是按次还是按时购买，1按次，2按时
    numItem: [1, 5, 10, 15],//按次的购买按钮选择
    timeItem: [1, 2, 3, 5],//按时的购买按钮选择
    COSTEACHTIME: 0.5,//按次购买的单价
    COSTEACHHOUR: 15,//按时购买的单价
    hlNumValue: 1,
    hlTimeValue: 1,
    inputValue: '',
    cost: 0,
    payStage: 0,//0是关闭，1是成功，2是失败
  },
  //事件处理函数
  backToHomePageFn: function() {
    this.setData({
      payStage: 0
    });
    wx.navigateTo({
      url: '../index/index'
    })
  },
  closeTipsFn: function(){
    this.setData({
      payStage: 0
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //按时，按次的事件处理
  payWay: function(e) {
    console.log(e)
    if (e.target.id == 'numPay'){
      this.setData({
        payWayData: 1
      })
    } else if (e.target.id == 'timePay'){
      this.setData({
        payWayData: 2
      })
    }else{
      this.setData({
        payWayData: 0
      })
    }
  },
  //选择某个次数或者某个时长
  chooseFn: function(e) {
    console.log(e)
    this.setData({
      inputValue: ""
    });
    if (this.data.payWayData == 1){
      this.setData({
        hlNumValue: e.target.dataset.choseResult
      });
    } else if (this.data.payWayData == 2){
      this.setData({
        hlTimeValue: e.target.dataset.choseResult
      });
    }
  },
  //获取input框的值
  bindKeyInput: function(e){
    console.log(e)
    this.setData({
      inputValue: e.detail.value
    });
  },
  //支付按钮事件
  payMoneyNowFn: function(e){
    let cost = 0,
        times = 0;

    if(this.data.payWayData == 1){//按次数购买
      times = (this.data.inputValue) ? this.data.inputValue : this.data.hlNumValue;//如果输入框不为空，则用输入框的值
      cost = times * this.data.COSTEACHTIME;
    }else{
      times = (this.data.inputValue) ? this.data.inputValue : this.data.hlTimeValue;
      cost = times * this.data.COSTEACHHOUR;
    }

    this.data.cost = cost;
    console.log(this.data.cost)
    this.setData({
      payStage: 1
    });

    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //     console.log(1)
    //   },
    //   'fail': function (res) {
    //     console.log(2)
    //   }
    // })
  }
})
