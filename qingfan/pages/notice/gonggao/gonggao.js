// pages/gongao/gonggao.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        gonggaolist: []
    },
    jump: function (e) {
        const id = e.currentTarget.dataset.id;
        // let id = this.data.gonggaolist[index].id;
        wx.navigateTo({
            url: '../gonggao_details/gonggao_details?id=' + id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/notice", //仅为示例，并非真实的接口地址
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
                                token: token,
                                gonggaolist: res.data.data.data
                            })
                        } else {
                            wx.showToast({
                                title: '网络错误',
                                image: "../../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络错误',
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
        page++;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/notice", //仅为示例，并非真实的接口地址
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
                        var list = gonggaolist.concat(res.data.data.data);
                        that.setData({
                            page: page,
                            gonggaolist: list
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
                        title: '网络错误',
                        image: "../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            },
            fail: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: "../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        })
    }
})