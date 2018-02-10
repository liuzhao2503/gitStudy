// pages/general_evaluate/general_evaluate.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        page1: 1,
        order_list: [],
        commodity_list: [],
        cut: true
    },
    evaluate_listimg:function(e){
        var index = e.currentTarget.dataset.index;
        var that = this;
        var evaluatelist = that.data.evaluatelist;
        var cut = that.data.cut;
        var list;
        var current = e.currentTarget.dataset.img;
        if (cut){
            list = that.data.order_list;
        }else{
            list = that.data.commodity_list;
        }
        wx.previewImage({
            current: current,
            urls: list[index].img
        })
    },
    to_order: function (e) {
        this.commentList(1, 1)
        this.setData({
            page: 1,
            page1: 1,
            cut: true
        })
    },
    to_commodity: function (e) {
        this.commentList(2, 1)
        this.setData({
            page:1,
            page1:1,
            cut: false
        })
    },
    commentList:function(type,page){
        var that = this;
        var token = that.data.token;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/commentList",
            data: {
                token: token,
                page: page,
                type: type
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (type==1){
                        that.setData({
                            order_list: res.data.data.data
                        })
                    }else{
                        that.setData({
                            commodity_list: res.data.data.data
                        })
                    }
                    
                } else {
                    wx.showToast({
                        title: '网络错误',
                        image: "../../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: "../../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var page = that.data.page;
        
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                that.setData({
                    token: token
                })
                that.commentList(1, 1)
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
        var cut = that.data.cut;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        if (cut){
            var page = that.data.page;
            page++;
            var order_list = that.data.order_list;
            wx.request({
                url: url + "api/User/commentList",
                data: {
                    token: token,
                    page: page,
                    type: 1
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.data.length!=0){
                            var list = order_list.concat(res.data.data.data);
                            that.setData({
                                page: page,
                                order_list: list
                            })
                        }else{
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
                            image: "../../../img/errer.png",
                            duration: 1500,
                            mask: true
                        })
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络错误',
                        image: "../../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            })
        }else{
            var page1 = that.data.page1;
            page1++;
            var commodity_list = that.data.commodity_list;
            wx.request({
                url: url + "api/User/commentList",
                data: {
                    token: token,
                    page: page1,
                    type: 2
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.data.length != 0) {
                            var list = commodity_list.concat(res.data.data.data);
                            that.setData({
                                page1: page1,
                                commodity_list: list
                            })
                        }else{
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
                            image: "../../../img/errer.png",
                            duration: 1500,
                            mask: true
                        })
                    }
                },
                fail: function (res) {
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
    }
})