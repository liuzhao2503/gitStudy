// pages/personal_page/personal_page.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noclicks: true,
        personalimg: "",
        personalName: "",
        personalPhone: "",
        QRcode_model: false,
        qrcode_img: ""
    },
    tongzhi: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../../notice/gonggao/gonggao'
            })
        }
    },
    shezhi: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../../Setup/Setup'
            })
        }
    },
    goto_seeyh: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../../discount_coupon/Seediscount_coupon'
            })
        }
    },
    goto_kefercode: function () {
        var that = this;
        var token = that.data.token;

        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/wxService",
            data: {
                token: token
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    // that.setData({
                    //     QRcode_model: true
                    // })
                    // that.setData({
                    //     qrcode_img: res.data.data.interlinking
                    // })

                    wx.previewImage({
                        urls: [res.data.data.interlinking],
                    })
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: '../../../img/errer.png',
                    duration: 1500,
                    mask: true
                })
            }
        })
    },
    hide_code: function () {
        var that = this;
        that.setData({
            QRcode_model: false
        })
    },
    goto_kef: function () {
        var that = this;
        var token = that.data.token;
        wx.request({
            url: url + "api/User/serviceTel",
            data: {
                token: token
            },
            method: "POST",
            success: function (res) {
                if (res.data.code == 200) {
                    wx.makePhoneCall({
                        phoneNumber: res.data.data.telephone
                    })
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '网络错误',
                    image: '../../../img/errer.png',
                    duration: 1500,
                    mask: true
                })
            }
        })

    },
    //点击跳转到我的订单页
    goto_order: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.switchTab({
                url: '../../Orderlist/Orderlist'
            })
        }
    },
    //点击跳转到我的钱包页面
    goto_my_wallet: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../my_wallet/my_wallet'
            })
        }
    },
    //点击跳转到收货地址页面
    goto_my_address: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../my_address/my_address'
            })
        }
    },
    //点击跳转到我的收藏页面
    goto_my_collection: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../../Collection/Collection'
            })
        }
    },
    goto_my_pj: function () {
        var noclicks = this.data.noclicks;
        if (noclicks) {
            this.setData({
                noclicks: false
            })
            wx.navigateTo({
                url: '../../evaluate/general_evaluate/general_evaluate'
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
                console.log(res)
                var personalPhone = "";
                if (res.data.data.telephone != 0) {
                    personalPhone = res.data.data.telephone;
                }
                that.setData({
                    token: res.data.token,
                    personalimg: res.data.data.interlinking,
                    personalName: res.data.data.username,
                    personalPhone: personalPhone
                })
            }
        })


        // var that = this;
        // wx.getUserInfo({
        //     success: function (res) {
        //         var userInfo = res.userInfo
        //         var nickName = userInfo.nickName
        //         var avatarUrl = userInfo.avatarUrl
        //         console.log(nickName)
        //         console.log(avatarUrl)                                                                      
        //         that.setData({
        //             personalimg: avatarUrl,
        //             personalName: nickName
        //         })
        //     }
        // })
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
        this.setData({
            noclicks: true
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

    }
})
