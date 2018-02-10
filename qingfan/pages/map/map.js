// pages/map/map.js
var url = require('../../app.js').url
Page({
  /**
   * 页面的初始数据
   */
  data: {
      Shopname:"这里添店名",
      Shopaddress:"店地址店地址店地址店地址店地址店地址店地址店地址店地址店地址店地址店地址店地址店地" ,
      markers: [{
          iconPath: "../../img/zb.png",
          id: 0,
          latitude: 38.0344744135,
          longitude: 114.4808435440,
          width: 32,
          height:32
      }],
    //   polyline: [{
    //       points: [{
    //           longitude: 113.3245211,
    //           latitude: 23.10229
    //       }, {
    //           longitude: 113.324520,
    //           latitude: 23.21229
    //       }],
    //       color: "#FF0000DD",
    //       width: 2,
    //       dottedLine: true
    //   }],
      controls: [{
          id: 1,
          iconPath: '../../img/dw.png',
          position: {
              left:1000,
              top: 31000,
              width: 48,
              height: 48
          },
          clickable: true
      }]
    },
    click: function (e) {
        var that = this;
        var latitude = that.data.latitude*1;
        var longitude = that.data.longitude*1;
        var Shopname = that.data.Shopname;
        var Shopaddress = that.data.Shopaddress;
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 18,
            name: Shopname,
            address: Shopaddress
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var store_id = options.id;
        var that = this;
        var controls = that.data.controls;
        wx.getSystemInfo({
            success: function(res) {
                var windowWidth = res.windowWidth-70;
                var windowHeight = res.windowHeight*0.8-90; 
                controls[0].position.left = windowWidth;
                controls[0].position.top = windowHeight;
                that.setData({
                    controls: controls
                })
            }
        })
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                wx.request({
                    url: url +"api/User/navigation",
                    data: {
                        token: token,
                        store_id: store_id
                    },
                    method: "POST",
                    success: function(res) {
                        if(res.data.code==200){
                            var markers = that.data.markers;
                            markers[0].latitude = res.data.data.latitude;
                            markers[0].longitude = res.data.data.longitude;

                            that.setData({
                                latitude: res.data.data.latitude,
                                longitude: res.data.data.longitude,
                                Shopname:res.data.data.store_name,
                                Shopaddress: res.data.data.address,
                                markers: markers
                            })
                        }else{
                            wx.showToast({
                                title: '网络错误',
                                image: '../../img/errer.png',
                                duration: 1500,
                                mask: true
                            })
                        }
                    },
                    fail: function(res) {
                        wx.showToast({
                            title: '网络错误',
                            image: '../../img/errer.png',
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

    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    },
    controltap: function () {
        this.mapCtx.moveToLocation()
    }
})