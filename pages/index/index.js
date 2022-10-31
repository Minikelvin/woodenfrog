// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    flashOpt: "off",
    device: 'back',
    checked: false,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    showModalStatus: false,
    show: false,
    touchS: [0, 0],
    touchE: [0, 0],
    flash: 0,
    nowDay: '',
    week: '',
    coins: 0,
    sacleAnimation: {},
    rotateAnimation: {},
    flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_0.png',
    fishSound: '/common/video/sound_frog_0_0.wav',
    fishTxt:'',
    frogTxt:''
    // scaleStyle:''
  },
  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  openPop() {
    this.setData({
      show: true
    })
  },
  closePop() {
    this.setData({
      show: false
    })
  },
  goDay() {
    wx.navigateTo({
      url: '../day/day'
    })
  },
  onLoad(options) {
    //加载蛙声图片 
    this.loadFlog();
    // 加载声音
    this.ctx = wx.createCameraContext();
    this.getNowData();
  },
  checkOpts(e) {
    console.log(e);
    if (e.currentTarget.dataset.num === '1') {
      const flag = this.data.flashOpt == 'off' ? 'torch' : 'off'
      this.setData({
        flashOpt: flag
      })
    } else {
      const flag = this.data.flashOpt == 'off' ? 'on' : 'off'
      this.setData({
        flashOpt: flag
      })
    }
  },
  changeType(value) { // 切换开关

  },
  touchStart: function (e) {
    // console.log(e);
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchMove: function (e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  onShow(){
    console.log('初始动画实例');
    this.animation=wx.createAnimation({
      delay: 200,
      timingFunction:'linear',
      success:function(res){
         console.log(res);
      }
    }) 
  },
  bindClick() {
    let _this = this;
    // 加载音频
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = this.laodFish();
    innerAudioContext.play();
    
    this.animation.scale(0).step()
    this.setData({
      flash:this.data.flash+1,
      sacleAnimation:this.animation.export()
    })
    var timer=setTimeout(()=>{
      _this.animation.scale(1.6).step()
      this.setData({
        sacleAnimation:this.animation.export()
      })
    },1000)

    // const animation = wx.createAnimation({
    //   delay: 1000,
    //   timingFunction: "linear"
    // })
    //  animation.scale(1.6).step({duration:200});
    //   this.setData({
    //     flash:this.data.flash+1,
    //     sacleAnimation:animation.export()
    //   })
    // this.setData({
    //   flash: this.data.flash + 1,
    //   scaleStyle: '',
    //   rotateStyle: ''
    // })
    // 动画效果
    // setTimeout(function () {
    //   _this.setData({
    //     scaleStyle: '-webkit-animation: ripple 0.1s linear;animation:ripple 0.1s linear;',
    //     rotateStyle: '-webkit-animation: rotate 0.1s linear;animation:rotate 0.1s linear;',
    //   })
    // }, 10)
  },
  getNowData() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let days = date.getDay();
    let arr = ["日", "一", "二", "三", "四", "五", "六"];
    let week = '周' + arr[days];
    this.setData({
      nowDay: year + '.' + month + '.' + day,
      week: week
    })
  },
  // touchEnd: function (e) {
  //   let start = this.data.touchS
  //   let end = this.data.touchE
  //   console.log(start, '上划')
  //   // console.log(end,'下滑')
  //   if (start[0] < end[0] - 50) {
  //     console.log('右滑')
  //   } else if (start[0] > end[0] + 50) {
  //     console.log('左滑')
  //   } else {
  //     console.log('静止')
  //   }
  // },
  goFish() {
    wx.navigateTo({
      url: '../fish/fish',
    })
  },
  goFrog() {
    wx.navigateTo({
      url: '../frog/frog',
    })
  },
  laodFish() {
    let fish = wx.getStorageSync('fish');
    this.setData({fishTxt:fish})
    switch (fish) {
      case '1':
        return '/common/video/sound_frog_0_0.wav'
      case '2':
        return '/common/video/sound_frog_1_0.wav'
      case '3':
        return '/common/video/sound_frog_2_0.wav'
      case '4':
        return '/common/video/sound_frog_3_0.wav'
      case '5':
        return '/common/video/sound_frog_4_0.wav'
      case '6':
        return '/common/video/sound_frog_5_0.wav'
      case '7':
        return '/common/video/sound_frog_6_0.wav'
      case '8':
        return '/common/video/sound_frog_7_0.wav'
      case '9':
        return '/common/video/sound_frog_8_0.wav'
      case '10':
        return '/common/video/sound_frog_9_0.wav'
      case '11':
        return '/common/video/sound_frog_10_0.wav'
    }
    
  },
  loadFlog() {
    let flog = wx.getStorageSync('flog');
    this.setData({frogTxt:flog})
    if (flog == '1') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_0.png'
      })
    } else if (flog == '2') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_1.png'
      })
    } else if (flog == '3') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_2.png'
      })
    } else if (flog == '4') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_3.png'
      })
    } else if (flog == '5') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_4.png'
      })
    } else if (flog == '6') {
      this.setData({
        flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_5.png'
      })
    }
  }
})