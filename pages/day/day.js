// pages/day/day.js
var dayjs=require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      start:2,
      dateCount: 60,
      minDate: new Date(2022, 0, 1).getTime(),
      maxDate: '',
      totalFish:'50',
      totalFrog:'4',
      listData:[
          {'date':'2022-08-01','fish':'50','frog':'900'},
          {'date':'2022-08-08','fish':'50','frog':'90'},
          {'date':'2022-09-01','fish':'50','frog':'90'},
          {'date':'2022-08-11','fish':'50','frog':'90'},
          {'date':'2022-08-13','fish':'50','frog':'90'},
          {'date':'2022-10-01','fish':'50','frog':'900'}
        ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    const date=new Date();
    const now=date.getTime();

    this.setData({
      maxDate:now,
      formatter:this.formatter.bind(this)
    })
    this.total();
  },
  // 总计
  total(){
    var sumFish=0,
        sumFrog=0;
    let data=wx.getStorageSync('data');
    // console.log(data);

    for(let i in data){
      if(data.hasOwnProperty(i)){
        sumFish+=parseInt(data[i].fish)
        sumFrog+=parseInt(data[i].frog)  
      }
    }
    this.setData({
      totalFish:sumFish,
      totalFrog:sumFrog
    })
  },
  formatter(day){
    const _day=dayjs(day.date).format('YYYY-MM-DD');
    const data=wx.getStorageSync('data');
    if(data[_day] != void 0){
      day.topInfo= data[_day]['fish']+'青蛙'
      day.bottomInfo= data[_day]['frog']+'木鱼'
    }
    day.className = 'day-item'
    return day
  },
  selectDate(){
    console.log('1');
  },
  closePop(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})