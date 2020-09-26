// pages/index/index.js
const app = getApp() //实例化应用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: []
  },

  toAudio(e) {
    // console.log(e);
    // wx.navigateTo({
    //   url:`../play/play?id=${e.currentTarget.dataset.id}`
    // })
    wx.setStorage({
      key: 'songId',
      data: e.currentTarget.dataset.id,
      success() {
        wx.navigateTo({
          url:`../play/play`
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const self = this
    // console.log(app.globalData)  // 获取排行榜前20的歌曲 /top/list    idx: 1
    wx.request({
      url:`${app.globalData.url}/top/list`, // app.globalData.url+'/top/list'
      data:{
        idx: 1,
      },
      success:(res) => {
        console.log(res)
        let songList = res.data.playlist.tracks.slice(0, 20)        
        this.setData({
          songList
        })
        app.globalData.playList = songList
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})