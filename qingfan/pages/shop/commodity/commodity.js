// pages/shop/commodity/commodity.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_terrace: "",
        page: 1,
        commodityimg: "",
        title: "",
        oldprice: 0,
        newprice: 0,
        newpriceBefore: 0,
        newpriceafter: 0,
        Monthlysales: 0,
        commodityname: "",
        express: 0,
        navactive: 1,
        detailsimage: [],
        num: 0,
        evaluatelist: []
    },
    Placeanorder: function () {
        var that = this;
        var store_id = that.data.store_id;
        var goods_id = that.data.goods_id;
        var is_terrace = that.data.is_terrace;
        if (that.data.num > 0) {
            wx.showLoading({
                title: '下单中',
            })
            setTimeout(function () {
                wx.hideLoading();
                wx.navigateTo({
                    url: '../../scrvice_pay/scrvice_pay?into_state=0&stute=1&goods_id=' + goods_id + '&store_id=' + store_id + '&num=' + that.data.num + "&is_terrace=" + is_terrace
                })
            }, 1500)
        } else {
            wx.showToast({
                title: '请选择购买数量',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
        }
    },
    details: function () {
        this.setData({
            page: 1,
            navactive: 1
        })
    },
    evaluate: function () {
        this.setData({
            navactive: 2
        })
        var that = this;
        var token = that.data.token
        var goods_id = that.data.goods_id;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.request({
            url: url + "api/User/getGoodsCommentList",
            data: {
                token: token,
                goods_id: goods_id,
                page: 1
            },
            method: "post",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        evaluatelist: res.data.data
                    })
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络错误',
                        image: '../../../img/errer.png',
                        duration: 1500,
                        mask: true
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
    plus: function () {
        var num = this.data.num;
        num++;
        this.setData({
            num: num
        })

    },
    minus: function () {
        var num = this.data.num;
        if (num != 0) {
            num--;
        }
        this.setData({
            num: num
        })
    },
    previewImageall: function (e) {
        var index = e.currentTarget.dataset.index;
        var imgindex = e.currentTarget.dataset.imgindex;
        console.log(index)
        var that = this;
        var evaluatelist = that.data.evaluatelist;
        wx.previewImage({
            current: evaluatelist[index].img[imgindex],
            urls: evaluatelist[index].img
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var goods_id = options.id;
        var store_id = options.store_id;
        var that = this;
        var express = this.data.express;

        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                that.setData({
                    token: token
                })
                wx.request({
                    url: url + "api/User/getGoodsInfo",
                    data: {
                        token: token,
                        goods_id: goods_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                is_terrace: res.data.data.is_terrace,
                                store_id: store_id,
                                goods_id: res.data.data.goods_id,
                                commodityname: res.data.data.goods_name,
                                newprice: res.data.data.goods_money,
                                title: res.data.data.goods_name,
                                oldprice: res.data.data.goods_price,
                                Monthlysales: res.data.data.month_sales,
                                express: res.data.data.express_price,
                                commodityimg: res.data.data.top_image,
                                detailsimage: res.data.data.img
                            })
                            console.log(res.data.data.img)
                            wx.setNavigationBarTitle({
                                title: that.data.title//页面标题为路由参数
                            })
                            // express = express.toFixed(2)
                            var newprice = that.data.newprice;
                            var newpriceBefore = parseInt(newprice);
                            var newpriceafter = parseInt((newprice * 100) - (newpriceBefore * 100));
                            if (newpriceafter < 10) {
                                newpriceafter = "0" + newpriceafter;
                            }
                            that.setData({
                                newpriceBefore: newpriceBefore,
                                newpriceafter: newpriceafter
                            })
                        } else {
                            wx.hideLoading();
                            wx.showToast({
                                title: '网络错误',
                                image: '../../../img/errer.png',
                                duration: 1500,
                                mask: true
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
        var navactive = that.data.navactive;
        var evaluatelist = that.data.evaluatelist;
        if (navactive == 2) {
            var page = that.data.page;
            page++;
            var token = that.data.token
            var goods_id = that.data.goods_id;
            wx.showLoading({
                mask: true,
                title: "加载中"
            })
            wx.request({
                url: url + "api/User/getGoodsCommentList",
                data: {
                    token: token,
                    goods_id: goods_id,
                    page: page
                },
                method: "post",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.length != 0) {
                            var list = evaluatelist.concat(res.data.data);
                            that.setData({
                                page: page,
                                evaluatelist: list
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
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络错误',
                            image: '../../../img/errer.png',
                            duration: 1500,
                            mask: true
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
        }
    }
})