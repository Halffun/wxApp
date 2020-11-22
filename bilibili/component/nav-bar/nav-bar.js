// component/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    img: "../../imgs/loading.png",
    statusBarStyle: "",
    navBarStyle: "",
    topHeight: 0
  },

  lifetimes: {
    attached: function () {
      let statusBarStyle = `height:${wx.db.statusBarHeight}; color: #fff`
      let navBarStyle = `height:${wx.db.navBarHeight}; color: #fff`
      let topHeight = wx.db.navBarHeight + wx.db.statusBarHeight
      this.setData({
        navBarStyle,
        statusBarStyle,
        topHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
