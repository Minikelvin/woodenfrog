// pages/prayerData/prayerData.js
Page({

    /**
     * Page initial data
     */
    data: {
        listData: [],
        txt: '',
        defaultItem: ''
    },
    getData(e) {
        let _data = e.detail.value;
        if (_data) {
            this.setData({
                txt: _data
            })
        }
    },
    save() {

        if (!this.data.defaultItem) {
            if (!this.data.txt) {
                wx.showToast({
                    title: '请输入祈福内容',
                    icon: 'error'
                })
                return
            }
            let data = wx.getStorageSync('listArr') || [];
            data.push(this.data.txt);
            wx.setStorageSync('listArr', data);
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.loadList();
            wx.navigateBack({
                delta: 1,
            })
        } else {
            let _data = wx.getStorageSync('listArr')
            const index = _data.findIndex(item => item === this.data.defaultItem);
            _data[index] = this.data.txt;
            wx.setStorageSync('listArr', _data)
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.loadList();
            wx.navigateBack({
                delta: 1,
            })
        }
    },
    goBack() {
        wx.navigateBack({
            delta: 1,
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        let name = options.name
        this.setData({
            defaultItem: name
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