// pages/my_address/my_address.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        my_address_arr: [],
        page: 1,
    },
    //点击设置为默认地址
    my_address_choose_fun: function (e) {
        var that = this;
        var oindex = e.currentTarget.dataset.index;
        var my_address_arr = that.data.my_address_arr;
        var token = that.data.token;
        wx.showLoading({
            title: '设置中',
            mask: true
        })
        wx.request({
            url: url + "api/User/useDefault",
            data: {
                token: token,
                address_id: my_address_arr[oindex].address_id
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    for (var i = 0; i < my_address_arr.length; i++) {
                        if (i == oindex) {
                            my_address_arr[i].is_default = true;
                        } else {
                            my_address_arr[i].is_default = false;
                        }
                    }
                    that.setData({
                        my_address_arr: my_address_arr
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        image: "../../img/errer.png",
                        duration: 1500,
                        mask: true
                    })
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: "网络错误",
                    image: "../../img/errer.png",
                    duration: 1500,
                    mask: true
                })
            }
        })
    },
    edit_address: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../edit_address/edit_address?id=' + id
        })
    },
    //点击跳转到增加收货地址页面
    goto_add_address: function () {
        wx.navigateTo({
            url: '../add_address/add_address'
        })
    },
    delete_address: function (e) {
        var input = e.currentTarget.dataset.index;
        var that = this;
        var token = that.data.token;
        var my_address_arr = that.data.my_address_arr;
        var address_id = my_address_arr[input].address_id;
        wx.showLoading({
            title: '删除中',
            mask: true
        })
        wx.request({
            url: url + "api/User/deleteAddress",
            data: {
                token: token,
                address_id: address_id
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (res.data.data.data.result == 1) {
                        if (my_address_arr.length != 1) {
                            if (my_address_arr[input].is_default == true) {
                                my_address_arr.splice(input, 1);
                                my_address_arr[0].is_default = true;
                            } else {
                                my_address_arr.splice(input, 1);
                            }
                        } else {
                            my_address_arr.splice(input, 1);
                        }
                        if(my_address_arr.length>=10){
                            var page = that.data.page;
                            page++
                            wx.getStorage({
                                key: 'userinfo',
                                success: function (res) {
                                    var token = res.data.token;
                                    wx.request({
                                        url: url + "api/User/addressList",
                                        data: {
                                            token: token,
                                            page: page
                                        },
                                        method: "POST",
                                        success: function (res) {
                                            wx.hideLoading();
                                            if (res.data.code == 200) {
                                                if (res.data.data.data.length!=0){
                                                    my_address_arr.push(res.data.data.data[0]);
                                                }
                                                that.setData({
                                                    my_address_arr: my_address_arr
                                                })
                                                wx.showToast({
                                                    title: '删除成功',
                                                    icon: "success",
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
                            })
                        }else{
                            that.setData({
                                my_address_arr: my_address_arr
                            })
                            wx.showToast({
                                title: '删除成功',
                                icon: "success",
                                duration: 1500,
                                mask: true
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '删除失败',
                            image: "../../../img/errer.png",
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        var that = this;
        var page = that.data.page;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/addressList",
                    data: {
                        token: token,
                        page: page
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            
                            var addressall = res.data.data.data;
                            for (var i = 0; i < addressall.length;i++){
                                var address = addressall[i].address.split("#");
                                addressall[i].address = address[0]+" "+address[1];
                                console.log(addressall[i].address)
                            }
                            that.setData({
                                token: token,
                                my_address_arr: addressall
                            })
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
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/addressList",
                    data: {
                        token: token,
                        page: 1
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                page:1,
                                token: token,
                                my_address_arr: res.data.data.data,
                            })
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
        var that = this;
        var page = that.data.page;
        var my_address_arr = that.data.my_address_arr;
        page++;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/addressList",
                    data: {
                        token: token,
                        page: page
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            if (res.data.data.data.length!=0){
                                for (var i = 0; i < res.data.data.data.length; i++) {
                                    my_address_arr.push(res.data.data.data[i])
                                }
                                that.setData({
                                    page: page,
                                    my_address_arr: my_address_arr
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
        })
    }
})