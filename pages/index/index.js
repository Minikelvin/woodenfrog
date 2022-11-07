// index.js
// 获取应用实例
const app = getApp()
var dateData=require("../../utils/date.js");
Page({
  data: {
    animateName: '',
    animateMove: '',
    isAnimated: false,
    flashOpt: "off",
    device: 'back',
    checked: false,
    moveUpName: '功德+1',
    windowHeight: wx.getSystemInfoSync().windowHeight,
    showModalStatus: false,
    show: false,
    touchS: [0, 0],
    touchE: [0, 0],
    flash: 0,
    nowDay: '',
    week: '',
    flogNum: 0,
    sacleAnimation: {},
    rotateAnimation: {},
    flogImg: 'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_0.png',
    fishSound: '/common/video/sound_frog_0_0.wav',
    flogSount:'/common/video_flog/1.mp3',
    fishTxt: '',
    frogTxt: '',
    // scaleStyle:''
    checkHiddenNumber: false,
    hideHeadNumber: true,
    animateCheck: false
  },
  hideNumber({
    detail
  }) {
    this.setData({
      checkHiddenNumber: detail
    });
    console.log(this.data.checkHiddenNumber);
    if (this.data.checkHiddenNumber) {
      wx.setStorageSync('hideNumber', true)
    } else {
      wx.setStorageSync('hideNumber', false)
    }
  },
  animationChange({
    detail
  }) {
    this.setData({
      animateCheck: detail
    })
    if (this.data.animateCheck) {
      wx.setStorageSync('hideAnimation', true)
    } else {
      wx.setStorageSync('hideAnimation', false)
    }
  },
  onChange({
    detail
  }) {
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
    this.hideHeadNum();
    this.loadPrayerData();
  },
  hideHeadNum() {
    let hideNumber = wx.getStorageSync('hideNumber');
    if (hideNumber) {
      this.setData({
        hideHeadNumber: false,
        checkHiddenNumber: true
      })
    } else {
      this.setData({
        hideHeadNumber: true,
        checkHiddenNumber: false
      })
    }
  },
  goDay() {
    wx.navigateTo({
      url: '../day/day'
    })
  },
  onLoad(options) {
    
    console.log(dateData);
    this.recordData()
    // 加载json
    this.getJson();
    //加载蛙声图片 
    this.loadFlog();
    // 加载声音
    this.ctx = wx.createCameraContext();
    this.getNowData();
    this.hideHeadNum();
    // 加载祈福语
    this.loadPrayerData();
    this.loadAnimation();
    // 加载动效状态
  },
  // 显示与隐藏动效开关
  loadAnimation() {
    let hideAnimation = wx.getStorageSync('hideAnimation');
    if (hideAnimation) {
      this.setData({
        animateCheck: true,

      })
    } else {
      this.setData({
        animateCheck: false,
      })
    }

  },
  // 加载祈福文字
  loadPrayerData() {
    let data = wx.getStorageSync('listArr') || [];
    this.prayerData = data;
    /**if (data) {
        this.setData({
            moveUpName: data
        })
    } else {
        this.setData({
            moveUpName: '功德+1'
        })
    }**/
  },
  // 打开手电筒
  openflashlight(e) {
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
  touchStart: function (e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.setData({
      touchS: [sx, sy]
    })
  },
  touchMove: function (e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
    this.setData({
      touchE: [sx, sy]
    })
  },
  touchEnd(e) {
    let vm = this,
      startX = vm.data.touchS[0],
      startY = vm.data.touchS[1],
      endX = vm.data.touchE[0],
      endY = vm.data.touchE[1]
    if (endX == 0 && endY == 0) {
      this.bindClick()
    } else if (endX - startX > 20) {
      console.log('右')
      this.slide()
    } else if (endX - startX < -20) {
      console.log('左')
      this.slide()
    } else if (endY - startY > 20) {
      console.log('下')
      this.slide()
    } else if (endY - startY < -20) {
      console.log('上')
      this.slide()
    }
    vm.setData({
      touchE: [0, 0]
    })
  },
  // 刮一刮音频
  slide() {
    let _this = this;
    let animation = wx.getStorageSync('hideAnimation');

    let fish = wx.getStorageSync('flog');
    const innerAudioContext = wx.createInnerAudioContext();
    fish ? innerAudioContext.src = this.loadFrog() : innerAudioContext.src = this.data.flogSount;
    innerAudioContext.src = this.loadFrog();
    innerAudioContext.play();

    if (!animation) {
      // console.log('false'); false 取消动效
      _this.setData({
        animateName: '',
        animateMove: '',
        flogNum: this.data.flogNum + 1,
      })
    } else {
      if (_this.data.isAnimated) {
        return
      };
      this.setData({
        flogNum: this.data.flogNum + 1,
        animateName: 'heartBeat',
        animateMove: 'textMove',
        isAnimated: true
      });
      var time = setTimeout(() => {
        _this.setData({
          isAnimated: false,
          animateName: '',
          animateMove: '',
        })
      }, 35)

    }
    let count = this.data.flogNum
    if (this.prayerData.length > 0) {
      const str = this.prayerData[count % this.prayerData.length];
      this.setData({
        moveUpName: str
      })
    }
  },
  // 点击敲打木鱼
  bindClick() {
    let _this = this;
    let fish = wx.getStorageSync('fish');
    let data = wx.getStorageSync('listArr');

    let animation = wx.getStorageSync('hideAnimation');
    // 加载音频
    const innerAudioContext = wx.createInnerAudioContext();
    fish ? innerAudioContext.src = this.laodFish() : innerAudioContext.src = this.data.fishSound;
    innerAudioContext.src = this.laodFish();
    innerAudioContext.play();

    if (!animation) {
      // console.log('false'); false 取消动效
      _this.setData({
        animateName: '',
        animateMove: '',
        flash: this.data.flash + 1,
      })
    } else {
      if (_this.data.isAnimated) {
        return
      }
      this.setData({
        flash: this.data.flash + 1,
        animateName: 'heartBeat',
        animateMove: 'textMove',
        isAnimated: true
      })
      var timer = setTimeout(() => {
        _this.setData({
          isAnimated: false,
          animateName: '',
          animateMove: '',
        })
      }, 35)
    }
    // console.log(this.data.flash);
    let count = this.data.flash
    if (this.prayerData.length > 0) {
      const str = this.prayerData[count % this.prayerData.length];
      this.setData({
        moveUpName: str
      })
    }
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
  loadFrog() {
    let flog = wx.getStorageSync('flog');
    this.setData({
      frogTxt: flog
    })
    switch (flog) {
      case '1':
        return '/common/video_flog/1.mp3'
      case '2':
        return '/common/video_flog/2.mp3'
      case '3':
        return '/common/video_flog/3.mp3'
      case '4':
        return '/common/video_flog/4.mp3'
      case '5':
        return '/common/video_flog/5.mp3'
      case '6':
        return '/common/video_flog/6.mp3'
    }
  },
  laodFish() {
    let fish = wx.getStorageSync('fish');
    this.setData({
      fishTxt: fish
    })
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
    this.setData({
      frogTxt: flog
    })
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
  },
  jumpPrayer() {
    wx.navigateTo({
      url: '../prayer/prayer',
    })
  },
  // 分享小程序
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '木鱼青蛙，是一款模拟真实的木鱼敲击，真实木蛙叫声的小程序',
        })
      }, 200)
    })
    return {
      title: '木鱼青蛙，是一款模拟真实的木鱼敲击，真实木蛙叫声的小程序',
      path: '/page/index/index',
      promise
    }
  },
  // getJson
  getJson() {
    const fs = wx.getFileSystemManager()
    const ab = new ArrayBuffer(1024);
    fs.open({
      filePath: `${wx.env.USER_DATA_PATH}/date.json`,
      flag: 'a+',
      success(res) {
        // console.log(res,'1');
        fs.read({
          fd: res.fd,
          ArrayBuffer: ab,
          length: 10,
          success(res) {
            // console.log(res,'2');
          }
        })
      }
    })
  },
  // 记录本地 每天 每月点击次数
  recordData(){
   
  }

})