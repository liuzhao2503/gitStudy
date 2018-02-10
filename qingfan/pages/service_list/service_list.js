// pages/service_list/service_list.js
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        serve_list: []
    },

    to_fuwu_details: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../service_details/service_details?id='+id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var store_id = options.id;
        var that = this;
        var page = 1;
        wx.showLoading({
            title: '加载中'
        })
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/getStoreServiceList",
                    data: {
                        token: token,
                        page: 1,
                        store_id: store_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                token: token,
                                store_id: store_id,
                                serve_list:res.data.data
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
        var store_id = this.data.store_id;
        var that = this;
        var page = that.data.page;
        var serve_list = that.data.serve_list;
        page++;
        var token = that.data.token;
        wx.showLoading({
            title: '加载中'
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/getStoreServiceList",
                    data: {
                        token: token,
                        page: page,
                        store_id: store_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            if (res.data.data.length != 0) {
                                var list = serve_list.concat(res.data.data);
                                that.setData({
                                    page: page,
                                    serve_list: list
                                })
                            } else {
                                wx.showToast({
                                    title: '没有更多数据',
                                    image: "../../img/wu.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        } else {
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
            fail: function () {
                wx.hideLoading();
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