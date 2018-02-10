// pages/Setup/modifytel/modifytel.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tel: 0,
        yz: "",
        yzbtntext: "获取验证码",
        yzbtnstutes: false,
        newtel: 0,
        newyz: "",
        newyzbtntext: "获取验证码",
        newyzbtnstutes: false
    },
    // teldata: function (e) {
    //     this.setData({
    //         tel: e.detail.value
    //     })
    // },
    yzdata: function (e) {
        this.setData({
            yz: e.detail.value
        })
    },
    yzbtn: function (e) {
        var tel = this.data.tel;
        var that = this;
        var userinfo = that.data.userinfo;
        var token
        var yzbtnstutes = that.data.yzbtnstutes;
        if (tel.length == 11) {
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
                                    title: '验证码获取失败',
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
                title: '手机号输入错误',
                image: "../../../img/errer.png",
                duration: 1500,
                mask: true
            })
        }
    },
    newteldata: function (e) {
        this.setData({
            newtel: e.detail.value
        })
    },
    newyzdata: function (e) {
        this.setData({
            newyz: e.detail.value
        })
    },
    newyzbtn: function (e) {
        var newtel = this.data.newtel;
        var that = this;
        var newyzbtnstutes = this.data.newyzbtnstutes;
        var userinfo = that.data.userinfo;
        var token = that.data.token;
        if (newtel.length == 11) {
            if (!newyzbtnstutes) {
                newyzbtnstutes = true;
                that.setData({
                    newyzbtnstutes: newyzbtnstutes
                })
                wx.request({
                    url: url + "api/User/useTel",
                    data: {
                        token: token,
                        telephone: newtel
                    },
                    method: "POST",
                    success: function (res) {
                        if (res.data.code == 200) {
                            if (res.data.data.data.is == 1) {
                                wx.request({
                                    url: url + "api/code/sendCode", //仅为示例，并非真实的接口地址
                                    data: {
                                        telephone: newtel,
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
                                                    newyzbtntext: time + "s后获取",
                                                    newyzbtnstutes: newyzbtnstutes
                                                })
                                                var newsetintervaltime = setInterval(function () {

                                                    if (time == 0) {
                                                        newyzbtnstutes = false;
                                                        that.setData({
                                                            newyzbtntext: "获取验证码",
                                                            newyzbtnstutes: newyzbtnstutes
                                                        })
                                                        clearInterval(newsetintervaltime);
                                                    } else {
                                                        time--;
                                                        that.setData({
                                                            newyzbtntext: time + "s后获取"
                                                        })
                                                    }
                                                }, 1000)
                                            } else {
                                                newyzbtnstutes = false;
                                                that.setData({
                                                    newyzbtnstutes: newyzbtnstutes
                                                })
                                                wx.showToast({
                                                    title: '网络错误',
                                                    image: "../../../img/errer.png",
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        } else {
                                            newyzbtnstutes = false;
                                            that.setData({
                                                newyzbtnstutes: newyzbtnstutes
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
                                        newyzbtnstutes = false;
                                        that.setData({
                                            newyzbtnstutes: newyzbtnstutes
                                        })
                                        wx.showToast({
                                            title: '网络错误',
                                            image: "../../../img/errer.png",
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                })
                            } else {
                                newyzbtnstutes = false;
                                that.setData({
                                    newyzbtnstutes: newyzbtnstutes
                                })
                                wx.showToast({
                                    title: '新手机号不可用',
                                    image: "../../../img/errer.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        } else {
                            newyzbtnstutes = false;
                            that.setData({
                                newyzbtnstutes: newyzbtnstutes
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
                        newyzbtnstutes = false;
                        that.setData({
                            newyzbtnstutes: newyzbtnstutes
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
                title: '新手机号输入错误',
                image: "../../../img/errer.png",
                duration: 1500,
                mask: true
            })
        }
    },
    bangtelbtn: function () {
        var yz = this.data.yz;
        var newtel = this.data.newtel;
        var newyz = this.data.newyz;
        var userinfo = this.data.userinfo;
        var token = this.data.token;
        var that = this;
        if (yz != "") {
            if (newtel.length == 11) {
                if (newyz != "") {
                    wx.request({
                        url: url + "api/User/replaceTel",
                        data: {
                            token: token,
                            telephone: userinfo.telephone,
                            phone: newtel,
                            telephone_code: yz,
                            phone_code: newyz
                        },
                        method: "POST",
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success: function (res) {
                            if (res.data.code == 200) {
                                wx.getStorage({
                                    key: 'userinfo',
                                    success: function (res) {
                                        var userinfo = res.data;
                                        userinfo.data.telephone = newtel;
                                        wx.setStorage({
                                            key: 'userinfo',
                                            data: userinfo
                                        })
                                        wx.showToast({
                                            title: '修改成功',
                                            icon: 'success',
                                            duration: 1500,
                                            mask: true
                                        })
                                        setTimeout(function(){
                                            wx.navigateBack({
                                                delta: 1
                                            })
                                        },1500)
                                    }
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
                    title: '新手机号输入错误',
                    image: "../../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        } else {
            wx.showToast({
                title: '验证码不能为空',
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
                    userinfo: res.data.data,
                    tel: res.data.data.telephone
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