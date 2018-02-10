// pages/recharge/recharge.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recharge_num: null
    },
    submit_btn: function () {
        var that = this;
        var recharge_num = that.data.recharge_num;
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '充值中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/rechange",
                    data: {
                        token: token,
                        money: recharge_num
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            console.log(res.data.data)
                            wx.requestPayment({
                                timeStamp: res.data.data.data.timestamp,
                                nonceStr: res.data.data.data.nonceStr,
                                package: res.data.data.data.package,
                                signType: 'MD5',
                                paySign: res.data.data.data.paySign,
                                success: function(res) {
                                    console.log(res)
                                    
                                    wx.showToast({
                                        title: "充值成功",
                                        duration: 1500,
                                        mask: true
                                    })
                                    setTimeout(function(){
                                        wx.navigateBack({
                                            delta: 1,
                                        })
                                    },1500)
                                },
                                fail: function(res) {
                                    console.log(res)
                                    wx.showToast({
                                        title: "充值失败",
                                        image: "../../../img/errer.png",
                                        duration: 1500,
                                        mask: true
                                    })
                                },
                                complete: function(res) {

                                }
                            })
                            // wx.navigateTo({
                            //     url: '../recharge_success/recharge_success',
                            // })
                        }else{
                            wx.showToast({
                                title: res.data.msg,
                                image: "../../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }

                    },
                    fail: function (res) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '充值失败',
                            image: "../../../img/errer.png",
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            },
            fail:function(){
                wx.hideLoading();
                x.showToast({
                    title: '充值失败',
                    image: "../../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        })
        
    },
    moneyinput: function (e) {
        this.setData({
            recharge_num: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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