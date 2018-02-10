// pages/img_xq/img_xq.js
var url = require('../../app.js').url;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var carousel_id = options.id;
      wx.getStorage({
          key: 'userinfo',
          success: function (res) {
              var token = res.data.token
              that.setData({
                  token: token
              })
              wx.showLoading({
                  title: '加载中',
                  mask: true
              })
              wx.request({
                  url: url + "api/User/carouselInfo", //仅为示例，并非真实的接口地址
                  data: {
                      token: token,
                      carousel_id: carousel_id
                  },
                  method: "POST",
                  header: {
                      'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                      wx.hideLoading();
                      if (res.data.code == 200) {
                          var article = res.data.data.content;
                          console.log(article)
                          WxParse.wxParse('article', 'html', article, that, 5);

                      } else {
                          wx.showToast({
                              title: res.data.msg,
                              image: "../../img/errer.png",
                              duration: 1500,
                              mask: true
                          })
                      }
                  },
                  fail: function () {
                      wx.hideLoading();
                      wx.showToast({
                          title: "网络错误",
                          image: "../../img/errer.png",
                          duration: 1500,
                          mask: true
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
  
  }
})