// pages/shop/Returninformation/Returninformation.js
var url = require('../../../app.js').url
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Companyid:[],
        Companyids:"",
        Companyarray: [],
        index: 0,
        Company: "",
        address: "",
        name: "",
        tel: "",
        counum: "",
        Logcom: "",
        smcontent: "",
        order_form_id: null,
        rejected_id: null
    },
    bindPickerChange: function (e) {
        var Companyarray = this.data.Companyarray;
        var Companyid = this.data.Companyid;
        this.setData({
            index: e.detail.value,
            Company: Companyarray[e.detail.value],
            Companyids: Companyid[e.detail.value]
        })
    },
    couriernumber: function (e) {
        this.setData({
            counum: e.detail.value
        })
    },
    Logisticscompany: function (e) {
        this.setData({
            Logcom: e.detail.value
        })
    },
    contenttext: function (e) {
        this.setData({
            smcontent: e.detail.value
        })
    },
    returninformation_btn: function () {
        var that = this;
        var token = that.data.token;
        var order_form_id = that.data.order_form_id;
        var Companyids = that.data.Companyids;
        var Company = that.data.Company;
        var counum = that.data.counum;
        var smcontent = that.data.smcontent;
        if (Companyids == "") {
            wx.showToast({
                title: '请选择物流公司',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return false;
        }
        if (counum == "") {
            wx.showToast({
                title: '快递单号不能空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return false;
        }
        if (smcontent == "") {
            wx.showToast({
                title: '说明不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return false;
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/User/returnrInformation",
            data: {
                token: token,
                order_form_id: order_form_id,
                rejected_company: Company,
                express_id: Companyids,
                tracking_number: counum,
                explain: smcontent,
                rejected_id: that.data.rejected_id
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (res.data.data.data.result == 1) {
                        wx.showToast({
                            title: '提交成功',
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
                            image: '../../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var order_form_id = options.id;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: url + "api/code/getExpress",
            method: "POST",
            success: function (res) {
                if (res.data.code == 200) {
                    var Company = res.data.data;
                    var Companys = [];
                    var Companyid = [];
                    for (var i = 0; i < Company.length; i++) {
                        Companyid.push(Company[i].express_id);
                        Companys.push(Company[i].express_name);
                    }
                    that.setData({
                        Companyid: Companyid,
                        Companyarray: Companys
                    })
                }
            },
            fail: function (res) {

            }
        })
        //页面加载初始数据-地址、收货人、联系电话
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/consignee",
                    data: {
                        token: token,
                        order_form_id: order_form_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            if (res.data.data != null) {
                                that.setData({
                                    token: token,
                                    order_form_id: res.data.data.order_form_id,
                                    address: res.data.data.receiver_address,
                                    name: res.data.data.receiver_name,
                                    tel: res.data.data.receiver_telephone,
                                    rejected_id: res.data.data.rejected_id
                                })
                            } else {
                                wx.showToast({
                                    title: '网络出错啦',
                                    image: '../../../img/errer.png',
                                    duration: 1500,
                                    mask: true
                                })
                            }

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