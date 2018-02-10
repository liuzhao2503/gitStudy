// pages/add_address/add_address.js
var url = require('../../../app.js').url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        edit_address_user_name: "",
        edit_address_user_phone: "",
        edit_address_set_default: true,
        edit_address_choose_city: [],
        edit_address_user_address: ""
    },
    edit_name: function (e) {
        this.setData({
            edit_address_user_name: e.detail.value
        })
    },
    edit_phone: function (e) {
        console.log(e)
        this.setData({
            edit_address_user_phone: e.detail.value
        })
    },
    edit_detailed: function (e) {
        this.setData({
            edit_address_user_address: e.detail.value
        })
    },
    //选择省市区地址
    edit_address_choosed_city: function (e) {
        var that = this;
        that.setData({
            edit_address_choose_city: e.detail.value
        })
    },
    // 选择是否设置为默认地址
    edit_address_choose_default: function () {
        var that = this;
        var edit_address_set_default = that.data.edit_address_set_default;
        if (edit_address_set_default){
            wx.showToast({
                title: '在收货地址修改',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
        }else{
            if (that.data.edit_address_set_default == true) {
                that.setData({
                    edit_address_set_default: false
                })
            } else {
                that.setData({
                    edit_address_set_default: true
                })
            }
        }
    },
    submit_btn: function () {
        var that = this;
        var id = that.data.id;
        var token = that.data.token;
        var edit_address_user_name = that.data.edit_address_user_name;
        var edit_address_user_phone = that.data.edit_address_user_phone;
        var edit_address_set_default = that.data.edit_address_set_default;
        var edit_address_choose_city = that.data.edit_address_choose_city;
        var edit_address_user_address = that.data.edit_address_user_address;
        var address = edit_address_choose_city[0] + "-" + edit_address_choose_city[1] + "-" + edit_address_choose_city[2] + "#" + edit_address_user_address;
        if (edit_address_user_name==""){
            wx.showToast({
                title: '名字不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        if (edit_address_user_phone == "") {
            wx.showToast({
                title: '电话不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return fasle;
        }
        if (edit_address_user_address == "") {
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
                name: edit_address_user_name,
                telephone: edit_address_user_phone,
                address: address,
                is_default: edit_address_set_default,
                type:2,
                address_id: id
            },
            method: "POST",
            success: function(res) {
                wx.hideLoading();
                if(res.data.code==200){
                    wx.showToast({
                        title: "修改成功",
                        duration: 1500,
                        mask: true
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1500)
                }else{
                    wx.showToast({
                        title:res.data.msg,
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

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var id = options.id;
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/getAddressInfo",
                    data: {
                        token: token,
                        address_id: id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            var address = res.data.data.data.address;
                            var address_choose_city = address.split("#");
                            var edit_address_choose_city = address_choose_city[0].split("-");
                            that.setData({
                                id: id,
                                token: token,
                                edit_address_user_name: res.data.data.data.name,
                                edit_address_user_phone: res.data.data.data.telephone,
                                edit_address_set_default: res.data.data.data.is_default,
                                edit_address_choose_city: edit_address_choose_city,
                                edit_address_user_address: address_choose_city[1]
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