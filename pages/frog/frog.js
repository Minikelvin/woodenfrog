// pages/frog/frog.js
Page({

  /**
   * Page initial data
   */
  data: {
    num:'1',
    list: [{id: '1',isClick: true,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_0.png',name:'福'},
      {id: '2',isClick: false,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_1.png',name:'禄'},
      {id: '3',isClick: false,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_2.png',name:'寿'},
      {id: '4',isClick: false,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_3.png',name:'喜'},
      {id: '5',isClick: false,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_4.png',name:'财'},
      {id: '6',isClick: false,image:'https://woodenfrog.oss-cn-hangzhou.aliyuncs.com/frog/frog_alpha/frog_alpha_5.png',name:'运'},
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
      let num=wx.getStorageSync('flog');
      console.log(num);
      this.setData({
        num:num
      })
  },
  close(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  clickRadio(e){
    let num=e.target.dataset.num;
    this.setData({
      num:num,
    });
    wx.setStorageSync('flog', num)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})