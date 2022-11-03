// pages/prayer/prayer.js
Page({

  /**
   * Page initial data
   */
  data: {
    listData: [
    
    ],
    startX: 0, // 开始坐标
    delIndex: -1 // 当前滑动的元素下标位置
  },
  delItem(e){
    this.data.listData.splice(e.currentTarget.dataset.index,1)
    wx.setStorageSync('listArr', this.data.listData)
    this.setData({listData:this.data.listData})
  },
  // 手指触摸开始动作 记录起点X坐标
  touchstart(e){
    this.setData({
      startX:e.changedTouches[0].clientX,
      delIndex:-1
    })
  },
  jumpPrayerPage(e){
    let name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../prayerData/prayerData?name='+name
    })
  },
  // 滑动事件处理
  touchmove(e){
    let self=this,
    index=e.currentTarget.dataset.index,
    startX=self.data.startX,
    touchMoveX=e.changedTouches[0].clientX,
    delIndex=self.data.delIndex;
    if(touchMoveX>startX){
      // 右滑动
      delIndex=-1
    }else{
      delIndex=index
    }
    self.setData({delIndex})
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  jumpPrayerData(){
    // wx.setStorageSync('listArr', [])
    wx.navigateTo({
      url: '../prayerData/prayerData',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.loadList();
  },
  loadList(){
    let data=wx.getStorageSync('listArr');
    this.setData({
      listData:data
    })
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