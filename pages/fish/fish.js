// pages/fish/fish.js
Page({

  /**
   * Page initial data
   */
  data: {
    num:1,
    list: [{id: '1',isClick: true},
      {id: '2',isClick: false},
      {id: '3',isClick: false},
      {id: '4',isClick: false},
      {id: '5',isClick: false},
      {id: '6',isClick: false},
      {id: '7',isClick: false},
      {id: '8',isClick: false},
      {id: '9',isClick: false},
      {id: '10',isClick: false},
      {id: '11',isClick: false},
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
      let fish=wx.getStorageSync('fish');
      this.setData({
        num:fish
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },
  close(){
    // console.log(this.data.choose);
    // return
    wx.navigateTo({
      url: '../index/index'
    })
  },
  clickRadio(e){
    let num=e.target.dataset.num;
    this.setData({
      num:num,
    })
    wx.setStorageSync('fish', num)
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