// pages/discount_coupon/discount_coupon.js
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ymclick: true,
        coupon_list: []
    },

    jump: function (e) {
        var that = this;
        var token = that.data.token;
        var store_id = that.data.store_id;
        var coupon_id = e.currentTarget.dataset.id;
        if (that.data.ymclick) {
            that.setData({
                ymclick: false
            })
            wx.showLoading({
                title: '领取中'
            })

            wx.request({
                url: url + "api/User/receive_conpon",
                data: {
                    token: token,
                    coupon_id: coupon_id,
                    store_id: store_id
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.result==1){
                            wx.showToast({
                                title: '领取成功',
                                icon: 'success',
                                duration: 1500,
                            })
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 1500)
                        }else{
                            wx.showToast({
                                title: "领取失败",
                                image: '../../img/errer.png',
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var that = this;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                that.setData({
                    token: token,
                    store_id: id
                })
                wx.request({
                    url: url + "api/User/coupon",
                    data: {
                        token: token,
                        store_id: id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                coupon_list: res.data.data
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