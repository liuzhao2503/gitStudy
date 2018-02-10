// pages/service_details/service_details.js
var url = require('../../app.js').url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // banner_photo: [
        //   {path:'../../img/shop_banner.jpg'},
        //   {path:'../../img/shop_banner.jpg'}
        // ],
        banner_photo: "",
        Banner_indicatorDots: true,
        Banner_interval: 5000,
        Banner_duration: 1000,
        the_name: "",
        the_pcice: "480",
        paragraph: "",
        stata_img: [],
        hairdresser_list: []
    },

    to_hairdresser_details: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../hairdresser_details/hairdresser_details?id='+id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var service_id = options.id;
        var that = this;
        wx.showLoading({
            title: '加载中'
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token
                that.setData({
                    token: res.data.token
                })
                wx.request({
                    url: url + "api/User/service_info",
                    data: {
                        token: token,
                        service_id: service_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                banner_photo: res.data.data.top_img,
                                the_name: res.data.data.service_name,
                                the_pcice: res.data.data.money,
                                paragraph: res.data.data.content,
                                stata_img: res.data.data.attachment,
                                store_id: res.data.data.store_id,
                                hairdresser_list: res.data.data.barber
                            })
                            wx.setNavigationBarTitle({
                                title: res.data.data.service_name
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
                    fail: function (res) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络错误',
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            },
            fail:function(){
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: '../../img/errer.png',
                    duration: 1500,
                    mask: true
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