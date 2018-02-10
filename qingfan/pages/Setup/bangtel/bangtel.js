// pages/Setup/bangtel/bangtel.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tel: 0,
        yz: "",
        yzbtntext: "获取验证码",
        yzbtnstutes: false
    },
    teldata: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },
    yzdata: function (e) {
        this.setData({
            yz: e.detail.value
        })
    },
    yzbtn: function (e) {
        var tel = this.data.tel;
        var that = this;
        var token = that.data.token;
        var yzbtnstutes = that.data.yzbtnstutes;
        if (tel.length == 11) {
            wx.request({
                url: url + "api/User/useTel",
                data: {
                    token: token,
                    telephone: tel
                },
                method: "POST",
                success: function (res) {
                    if (res.data.code == 200) {
                        if (res.data.data.data.is == 1) {
                            if (!yzbtnstutes) {
                                yzbtnstutes = true;
                                that.setData({
                                    yzbtnstutes: yzbtnstutes
                                })
                                wx.request({
                                    url: url + "api/code/sendCode", //仅为示例，并非真实的接口地址
                                    data: {
                                        telephone: tel,
                                        type: 2,
                                        item: 1
                                    },
                                    method: "POST",
                                    header: {
                                        'content-type': 'application/json' // 默认值
                                    },
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            if (res.data.data.send == 1) {

                                                var time = 60;
                                                that.setData({
                                                    yzbtntext: time + "s后获取",
                                                    yzbtnstutes: yzbtnstutes
                                                })
                                                var setintervaltime = setInterval(function () {

                                                    if (time == 0) {
                                                        yzbtnstutes = false;
                                                        that.setData({
                                                            yzbtntext: "获取验证码",
                                                            yzbtnstutes: yzbtnstutes
                                                        })
                                                        clearInterval(setintervaltime);
                                                    } else {
                                                        time--;
                                                        that.setData({
                                                            yzbtntext: time + "s后获取"
                                                        })
                                                    }
                                                }, 1000)
                                            } else {
                                                yzbtnstutes = false;
                                                that.setData({
                                                    yzbtnstutes: yzbtnstutes
                                                })
                                                wx.showToast({
                                                    title: '获取验证码失败',
                                                    image: "../../../img/errer.png",
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        } else {
                                            yzbtnstutes = false;
                                            that.setData({
                                                yzbtnstutes: yzbtnstutes
                                            })
                                            wx.showToast({
                                                title: res.data.msg,
                                                image: "../../../img/errer.png",
                                                duration: 1500,
                                                mask: true
                                            })
                                        }
                                    },
                                    fail: function () {
                                        yzbtnstutes = false;
                                        that.setData({
                                            yzbtnstutes: yzbtnstutes
                                        })
                                        wx.showToast({
                                            title: '网络错误',
                                            image: "../../../img/errer.png",
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                })
                            }
                        } else {
                            wx.showToast({
                                title: '手机不可用',
                                image: "../../../img/errer.png",
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
                    wx.showToast({
                        title: '网络错误',
                        image: "../../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            })

        } else {
            wx.showToast({
                title: '手机号输入错误',
                image: "../../../img/errer.png",
                duration: 1500,
                mask: true
            })
        }
    },
    bangtelbtn: function () {
        var tel = this.data.tel;
        var yz = this.data.yz;
        var that = this;
        var token = that.data.token;
        if (tel.length == 11) {
            if (yz != "") {
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/code/vcode", //仅为示例，并非真实的接口地址
                    data: {
                        telephone: tel,
                        code: yz
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        if (res.data.code == 200) {
                            if (res.data.data.send == 1) {
                                wx.request({
                                    url: url + "api/User/boundTel", //仅为示例，并非真实的接口地址
                                    data: {
                                        token: token,
                                        telephone: tel
                                    },
                                    method: "POST",
                                    header: {
                                        'content-type': 'application/json' // 默认值
                                    },
                                    success: function (res) {
                                        wx.hideLoading();
                                        if (res.data.code == 200) {
                                            if (res.data.data.data.result == 1) {
                                                wx.getStorage({
                                                    key: 'userinfo',
                                                    success: function (res) {
                                                        var userinfo = res.data
                                                        userinfo.data.telephone = tel;
                                                        wx.setStorage({
                                                            key: 'userinfo',
                                                            data: userinfo
                                                        })
                                                        wx.showToast({
                                                            title: '绑定成功',
                                                            icon: "success",
                                                            duration: 1500,
                                                            mask: true
                                                        })
                                                        setTimeout(function () {
                                                            wx.navigateBack({
                                                                delta: 1
                                                            })
                                                        }, 1500)
                                                    }
                                                })
                                                
                                            } else {
                                                wx.hideLoading();
                                                wx.showToast({
                                                    title: '绑定失败',
                                                    image: "../../../img/errer.png",
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        } else {
                                            wx.hideLoading();
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
                                            title: '网络错误',
                                            image: "../../../img/errer.png",
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                })


                            } else {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '网络错误',
                                    image: "../../../img/errer.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        } else {
                            wx.hideLoading();
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
            } else {
                wx.showToast({
                    title: '验证码不能为空',
                    image: "../../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        } else {
            wx.showToast({
                title: '手机号输入有误',
                image: "../../../img/errer.png",
                duration: 1500,
                mask: true
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
                that.setData({
                    token: res.data.token,
                    userinfo: res.data.data
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