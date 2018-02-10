// pages/shop/Refundapplication/Refundapplication.js
var url = require('../../../app.js').url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commoditynum: "",
        commodityimg: "",
        commodityname: "",
        commodityPrice: "",
        RefundsPrice: "",
        actionSheetHidden: true,
        actionSheetItems: [
            { bindtap: 'Menu1', txt: '不想买了' },
            { bindtap: 'Menu2', txt: '信息填写错误' },
            { bindtap: 'Menu3', txt: '临时有事' },
            { bindtap: 'Menu4', txt: '其他原因' }
        ],
        menu: ''
    },
    actionSheetTap: function () {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    actionSheetbindchange: function () {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    bind: function (e) {
        this.setData({
            menu: e.currentTarget.dataset.txt,
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    orderdetailsbtn: function () {
        var that = this;
        var menu = that.data.menu;
        if (menu === "") { 
            wx: wx.showToast({
                title: "请选择取消原因",
                image: "../../../img/errer.png",
                duration: 1500
            })
        }else{
            var order_form_id = that.data.order_form_id;
            var actionSheetItems = that.data.actionSheetItems;
            var token = that.data.token;
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.request({
                url: url +"api/User/sponsorRefund",
                data: {
                    token: token,
                    order_form_id: order_form_id,
                    cancel_reason: actionSheetItems[menu].txt
                },
                method: "POST",
                success: function(res) {
                    wx.hideLoading();
                    if(res.data.code==200){
                        console.log(res.data)
                        wx.showToast({
                            title: '申请成功',
                            icon: 'success',
                            duration: 1500,
                            mask: true
                        })
                        setTimeout(function(){
                            wx.navigateBack({
                                delta: 1
                            })
                        },1500)
                        
                    }else{
                        wx.showToast({
                            title: '网络错误',
                            image: '../../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                },
                fail: function(res) {
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var order_form_id  = options.id;
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/getOrderFormInfo",
                    data: {
                        token: token,
                        order_form_id: order_form_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                token: token,
                                commodityimg: res.data.data.img,
                                commodityPrice: res.data.data.goods_price,
                                commodityname: res.data.data.goods_name,
                                commoditynum: res.data.data.number,
                                favourable: res.data.data.favourable,
                                express: res.data.data.express,
                                RefundsPrice: res.data.data.true_money,
                                order_form_id: res.data.data.order_form_id
                            })
                        } else {
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

    }
})