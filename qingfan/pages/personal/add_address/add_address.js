// pages/add_address/add_address.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add_address_user_name: "",
        add_address_user_phone: "",
        add_address_detailed: "",
        add_address_set_default: false,
        add_address_choose_city: []
    },
    add_name: function (e) {
        this.setData({
            add_address_user_name: e.detail.value
        })
    },
    add_phone: function (e) {
        this.setData({
            add_address_user_phone: e.detail.value
        })
    },
    add_detailed: function (e) {
        this.setData({
            add_address_detailed: e.detail.value
        })
    },
    //选择省市区地址
    add_address_choosed_city: function (e) {
        var that = this;
        that.setData({
            add_address_choose_city: e.detail.value
        })
    },
    // 选择是否设置为默认地址
    add_address_choose_default: function () {
        var that = this;
        if (that.data.add_address_set_default == true) {
            that.setData({
                add_address_set_default: false
            })
        } else {
            that.setData({
                add_address_set_default: true
            })
        }
    },
    addaddress_btn: function () {
        var that = this;
        var token = that.data.token;
        var add_address_user_name = that.data.add_address_user_name;
        var add_address_user_phone = that.data.add_address_user_phone;
        var add_address_set_default = that.data.add_address_set_default;
        var add_address_choose_city = that.data.add_address_choose_city;
        var add_address_detailed = that.data.add_address_detailed;
        var address = add_address_choose_city[0] + "-" + add_address_choose_city[1] + "-" + add_address_choose_city[2] + "#" + add_address_detailed;
        if (add_address_user_name == "") {
            wx.showToast({
                title: '名字不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        if (add_address_user_phone == "") {
            wx.showToast({
                title: '电话不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        if (add_address_choose_city.length == 0) {
            wx.showToast({
                title: "请选择地址",
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        if (add_address_detailed == "") {
            wx.showToast({
                title: '地址不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/addAddress",
            data: {
                token: token,
                name: add_address_user_name,
                telephone: add_address_user_phone,
                address: address,
                is_default: add_address_set_default,
                type: 1
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    wx.showToast({
                        title: "添加成功",
                        duration: 1500,
                        mask: true
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    },1500)
                } else {
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
                    title: "网络错误",
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
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                that.setData({
                    token: token
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