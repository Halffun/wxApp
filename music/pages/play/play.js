// pages/play/play.js
let time = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song:{},
    songUrl:'',
    animationData: [],
    stickAnimation: [],
    isStop: false,
    statusImg:'../../images/pause.png'
  },

  createAudio() {
    let _this = this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    const options = {
      onWaiting() {
        wx.showLoading({
          title: '音频加载中...'
        })
        _this.isWaiting = true
      }
    }
    app.globalData.backgroundAudioManager = backgroundAudioManager
    backgroundAudioManager.title = this.data.song.name
    backgroundAudioManager.epname = this.data.song.name
    backgroundAudioManager.singer = this.data.song.ar[0].name - this.data.song.al.name
    backgroundAudioManager.coverImgUrl = this.data.song.al.picUrl
    backgroundAudioManager.src = this.data.songUrl

    backgroundAudioManager.onPlay(res => {
      this.beginAnimation() // 播放音乐
    })
    // 绑定一些回调
    backgroundAudioManager.onTimeUpdate(res => {
      if (!_this.data.isMovingSlider) {
        _this.setData({
          sliderMax: Math.floor(backgroundAudioManager.duration),
          currentProcess: time.formatSecond(backgroundAudioManager.currentTime),
          currentTime: backgroundAudioManager.currentTime,
          totalProcess: time.formatSecond(backgroundAudioManager.duration),
          sliderValue: Math.floor(backgroundAudioManager.currentTime)
        })
      }
    });
    backgroundAudioManager.onWaiting(() => {
      if (_this.isWaiting) {
        _this.isWaiting = false;
        setTimeout(() => {
          wx.hideLoading();
        }, 300);
      }
    })
    backgroundAudioManager.onEnded(() => {
      this.stopAnimation()
      this.next()
    })
  },

  beginAnimation() {
    var _this = this
    var animation = wx.createAnimation({
      duration: 200000,
      timingFunction: 'linear'
    })
    var stickAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      transformOrigin: 'top'
    })
    animation.rotate(3600).step();
    stickAnimation.rotate(20).step();
    this.setData({
      animationData: animation.export(),
      stickAnimation: stickAnimation.export()
    })
  },
  stopAnimation() {
    var animation = wx.createAnimation({
      duration: 500000
    })
    var stickAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      transformOrigin: 'top'
    })
    this.animation = animation;
    animation.rotate(0).step()
    stickAnimation.rotate(-20).step()
    this.setData({
      animationData: animation.export(),
      stickAnimation: stickAnimation.export()
    })
  },

  changeStatus() { // 播放暂停
    // 播放 backgroundAudioManager.play()
    // 暂停 backgroundAudioManager.pause()
    let backgroundAudioManager = app.globalData.backgroundAudioManager
    if( this.data.isStop == true ){
      backgroundAudioManager.play()
      this.setData({
        statusImg:'../../images/pause.png',
        isStop:false
      })
    }else{ 
      backgroundAudioManager.pause()
      this.setData({
        statusImg:'../../images/play.png',
        isStop:true
      })
    }
  },
  next() {
    if(app.globalData.index == app.globalData.playList.length-1){
      return 
    }
    wx.setStorage({
      key: 'songId',
      data: ++app.globalData.index,
      success(){
        wx.redirectTo({
          url:'./play'
        })
      }
    })
  },
  pre() {
    if(app.globalData.index == 0){
      return 
    }
    wx.setStorage({
      key: 'songId',
      data: --app.globalData.index,
      success(){
        wx.redirectTo({
          url:'./play'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  // '/song/url'    id: xxx
    // console.log(options)
    const self = this
    wx.getStorage({
      key:'songId',
      success(res){
        console.log(res);
        const id = app.globalData.playList[res.data].id
        app.globalData.index = res.data
        wx.request({
          url:app.globalData.url+'/song/url',
          data:{
            id:id
          },
          success(result){
           self.setData({
             songUrl:result.data.data[0].url
           }),
           wx.request({
             url:app.globalData.url+'/song/detail',
             data:{
              ids:id
            },
            success(data){
             self.setData({
               song:data.data.songs[0]
             })
             self.createAudio()
            }
           })
          }
        })

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