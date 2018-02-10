// pages/Collection/Collection.js
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexlist: [],
        page: 1
    },
    gotoshop: function (e) {
        var id = e.currentTarget.dataset.id;
        console.log(e)
        wx.navigateTo({
            url: '../shop/shop_home/shop_home?id=' + id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var longitude = "";
        var latitude = "";
        var that = this;
        var page = that.data.page;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.getStorage({
            key: 'Location',
            success: function (res) {
                longitude = res.data[1];
                latitude = res.data[0];
                console.log(longitude)
                console.log(latitude)
                wx.getStorage({
                    key: 'userinfo',
                    success: function (res) {
                        var token = res.data.token;
                        that.setData({
                            token: res.data.token
                        })
                        wx.request({
                            url: url + "api/User/myCollect",
                            data: {
                                token: res.data.token,
                                page: page,
                                longitude: longitude,
                                latitude: latitude
                            },
                            method: "POST",
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data.code == 200) {
                                    console.log(res.data)
                                    that.setData({
                                        indexlist: res.data.data.data,
                                        longitude: longitude,
                                        latitude: latitude,
                                        token: token
                                    })
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
                    }, fail: function () {
                        console.log("获取token错误")
                    }
                })
            }, fail: function () {
                console.log("获取经纬度错误")
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
        var longitude = "";
        var latitude = "";
        var that = this;
        var page = 1;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.getStorage({
            key: 'Location',
            success: function (res) {
                longitude = res.data[1];
                latitude = res.data[0];
                console.log(longitude)
                console.log(latitude)
                wx.getStorage({
                    key: 'userinfo',
                    success: function (res) {
                        var token = res.data.token;
                        that.setData({
                            token: res.data.token
                        })
                        wx.request({
                            url: url + "api/User/myCollect",
                            data: {
                                token: res.data.token,
                                page: 1,
                                longitude: longitude,
                                latitude: latitude
                            },
                            method: "POST",
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data.code == 200) {
                                    console.log(res.data)
                                    that.setData({
                                        page:1,
                                        indexlist: res.data.data.data,
                                        longitude: longitude,
                                        latitude: latitude,
                                        token: token
                                    })
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
                    }
                })
            }
        })
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
        var that = this;
        var page = that.data.page;
        page++;
        var longitude = that.data.longitude;
        var latitude = that.data.latitude;
        var token = that.data.token;
        var indexlist = that.data.indexlist;
        wx.request({
            url: url + "api/User/myCollect",
            data: {
                token: token,
                page: page,
                longitude: longitude,
                latitude: latitude
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (res.data.data.data.length != 0) {
                        var list = indexlist.concat(res.data.data.data);
                        that.setData({
                            page: page,
                            indexlist: list
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
    }
})