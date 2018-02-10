// pages/my_wallet/my_wallet.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        my_wallet_money: 0,
        moneylist: [],
        page: 1,
        noclicks:true
    },
    goto_paybtn: function () {
        var that = this;
        var noclicks = that.data.noclicks;
        if (noclicks){
            that.setData({
                noclicks:false
            })
            wx.navigateTo({
                url: '../../personal/recharge/recharge',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token
                that.setData({
                    token: token,
                    my_wallet_money: res.data.data.total
                })
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/consumeList", //仅为示例，并非真实的接口地址
                    data: {
                        token: token,
                        page: 1
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                moneylist: res.data.data.data
                            })

                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                image: "../../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: "网络错误",
                            image: "../../../img/errer.png",
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
        var that = this;
        that.setData({
            noclicks: true
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/getInfo",
                    data: {
                        token: token
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            wx.setStorage({
                                key: "userinfo",
                                data: res.data.data,
                                success:function(res){
                                    wx.getStorage({
                                        key: 'userinfo',
                                        success: function(res) {
                                            that.setData({
                                                my_wallet_money: res.data.data.total
                                            })
                                        }
                                    })
                                }
                            })
                        }
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
                wx.request({
                    url: url + "api/User/consumeList", //仅为示例，并非真实的接口地址
                    data: {
                        token: token,
                        page: 1
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                page: 1,
                                moneylist: res.data.data.data
                            })
                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                image: "../../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: "网络错误",
                            image: "../../../img/errer.png",
                            duration: 1500,
                            mask: true
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
        var token = that.data.token;
        var page = that.data.page;
        var moneylist = that.data.moneylist;
        page++;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/consumeList", //仅为示例，并非真实的接口地址
            data: {
                token: token,
                page: page
            },
            method: "POST",
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (res.data.data.data.length != 0) {
                        var list = moneylist.concat(res.data.data.data);
                        that.setData({
                            page: page,
                            moneylist: list
                        })
                    } else {
                        wx.showToast({
                            title: '没有更多数据',
                            image: "../../../img/wu.png",
                            duration: 1500,
                            mask: true
                        })
                    }
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        image: "../../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            },
            fail: function () {
                wx.hideLoading();
                wx.showToast({
                    title: "网络错误",
                    image: "../../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        })
    }

})