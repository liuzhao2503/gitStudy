// pages/shop/Orderdetails/Orderdetails.js
var url = require('../../../app.js').url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subscribe_id:null,
        states: 0,
        Redeemnum:"",
        addressname: "",
        addresstel: "",
        address: "",
        commodityimg: "",
        commodityname: "",
        commodityPrice: 80,
        commoditynum: 11,
        Coupon: 11,
        Actual: 111,
        expressnum: 111111,
        expressCompany:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var states = options.states;
        var order_form_id = options.id;
        var that = this;
        
        if (states == 1) {
            var title = "待收货订单详情"
        } else if(states==0){
            var title = "待发货订单详情"
        }else{
            var title = "自取订单详情"
        }
        that.setData({
            states: states,
            subscribe_id:options.id
        })
        wx.setNavigationBarTitle({
            title: title
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
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
                        if (res.data.code==200){
                            if(res.data.data != null){
                                that.setData({
                                    expressCompany: res.data.data.express_name,
                                    addressname: res.data.data.username,
                                    addresstel: res.data.data.telephone,
                                    address: res.data.data.address,
                                    commodityimg: res.data.data.img,
                                    commodityPrice: res.data.data.goods_price,
                                    commodityname: res.data.data.goods_name,
                                    commoditynum: res.data.data.number,
                                    Actual: res.data.data.true_money,
                                    order_form_id: res.data.data.order_form_id,
                                    Coupon: res.data.data.favourable,
                                    Redeemnum: res.data.data.write_off_code,
                                    expressnum: res.data.data.express_number,
                                    express: res.data.data.express
                                })
                            }
                        }else{
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
    orderdetailsbtn:function(){
        var that = this;
        var states = that.data.states;
        if (states == 0 || states == 2){
            wx.redirectTo({
                url: '../Refundapplication/Refundapplication?id='+that.data.subscribe_id
            })
        } else if (states == 1){
            wx.getStorage({
                key: 'userinfo',
                success: function (res) {
                    //发起请求
                    wx.request({
                        url: url + 'api/User/confirmReceiving',
                        data: {
                            token: res.data.token,
                            order_form_id: that.data.order_form_id
                        },
                        method: "POST",
                        success: function (res) {
                            if (res.data.code == 200) {
                                if (res.data.data.data.result == 1) {
                                    wx.showToast({
                                        title: '收货成功！',
                                        icon: 'success',
                                        duration: 1500,
                                        mask: true
                                    })
                                    setTimeout(function(){
                                        wx.navigateBack({
                                            delta: 1,
                                        })
                                    },1500)
                                } else {
                                    wx.showToast({
                                        title: res.data.msg,
                                        image: "../../img/errer.png",
                                        duration: 1500,
                                        mask: true
                                    })
                                }
                            } else {
                                wx.showToast({
                                    title: res.data.msg,
                                    image: "../../img/errer.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        },
                        fail: function () {
                            wx.showToast({
                                title: '网络错误',
                                image: "../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    })
                },
            })
        }
       
        
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