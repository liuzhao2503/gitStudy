// pages/shop_home/shop_home.js
var url = require('../../../app.js').url;
var QR = require("../../../utils/qrcode.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcode: "",
        QRcode_state: false,
        store_home_love_store_text: "收藏店铺",
        love_store: false,
        imgurls: "",
        Banner_indicatorDots: true,
        Banner_interval: 5000,
        Banner_duration: 1000,
        tel: "",
        time: "",
        add: "",
        hairdresser_list: [],
        serve_list: [],
        recommend_list: []
    },
    //erweima
    setCanvasSize: function () {
        var that = this;
        var size = {};
        try {
            var res = wx.getSystemInfoSync();
            var scale = 750 / 500;//不同屏幕下canvas的适配比例；设计稿是750宽
            var width = res.windowWidth / scale;
            var height = width;//canvas画布为正方形
            size.w = width;
            size.h = height;
        } catch (e) {
        }
        return size;
    },
    createQrCode: function (url, canvasId, cavW, cavH) {
        //调用插件中的draw方法，绘制二维码图片
        var that = this;
        QR.qrApi.draw(url, canvasId, cavW, cavH);
        that.setData({ QRcode_state: true })
        // wx.showLoading({
        //     mask: true,
        //     title: "生成中"
        // })
        // var st = setTimeout(function(){
        //     wx.hideLoading();
        //     that.canvasToTempImage();
        //     clearTimeout(st);
        // },1000)
    },
    previewImg: function (e) {
        var img = this.data.qrcode
        wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
        })
      },
    canvasToTempImage: function () {
        var that = this;
        wx.canvasToTempFilePath({
            canvasId: 'mycanvas',
            width: 500,
            height: 500,
            destWidth: 500,
            destHeight: 500,
            fileType: "jpg",
            success: function (res) {
                var tempFilePath = res.tempFilePath;
                console.log("********" + tempFilePath);
                that.setData({
                    qrcode: tempFilePath,
                });
            },
            fail: function (res) {
                console.log(res);
            }
        });
    },
    imgurl:function(){
        var that = this;
        var imgurls = that.data.imgurls;
        wx.previewImage({
            current: imgurls,
            urls: [imgurls]
        })
    },
    makePhoneCalltel: function () {
        var that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.tel
        })
    },
    to_discount_coupon: function () {
        var id = this.data.store_id;
        wx.navigateTo({
            url: '../../discount_coupon/collardiscount_coupon?id=' + id
        })
    },
    to_fuwu_list: function () {
        var id = this.data.store_id;
        wx.navigateTo({
            url: '../../service_list/service_list?id=' + id
        })
    },
    to_hairdresser_details: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../hairdresser_details/hairdresser_details?id=' + id
        })
    },
    to_fuwu_details: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../service_details/service_details?id=' + id
        })
    },
    //点击二维码按钮显示二维码弹窗
    // shop_home_hide_code_show:function(){
    //     this.setData({
    //         QRcode_state: false
    //     })
    //     console.log(10);
    // },
    // shop_home_image_click:function(){
    //     console.log(2);
    // }
    // ,
    shop_home_hide_code: function () {
        var that = this;
        var store_id = that.data.store_id;
        var token = that.data.token;
        if (this.data.QRcode_state == false) {
            wx.showLoading({
                mask: true,
                title: "加载中"
            })
            wx.request({
                url: url + "api/User/getStoreQRcode",
                data: {
                    store_id: store_id,
                    token: token
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        // that.setData({
                        //     qrcode:res.data.data.qr_url,
                        //     QRcode_state:true
                        // })
                        wx.previewImage({
                            urls: [res.data.data.qr_url] // 需要预览的图片http链接列表
                        })
                        // var size = that.setCanvasSize();
                        // var initUrl = res.data.data.qr_url;
                        // that.createQrCode(initUrl, "mycanvas", size.w, size.h);
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

        } else {
            this.setData({
                QRcode_state: false
            })
        }
    },
    //点击收藏店铺进行收藏
    store_home_love_store: function () {
        var that = this;
        if (that.data.love_store == false) {
            that.store_sc(1)
        } else {
            that.store_sc(2)
        }
    },
    store_sc: function (type) {
        var that = this;
        var token = that.data.token;
        var store_id = that.data.store_id;
        wx.showLoading({
            mask: true,
            title: "收藏中"
        })
        wx.request({
            url: url + "api/User/collection_store",
            data: {
                token: token,
                store_id: store_id,
                type: type
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    if (type == 1) {
                        that.setData({
                            love_store: true,
                            store_home_love_store_text: "已收藏"
                        })
                    } else {
                        that.setData({
                            love_store: false,
                            store_home_love_store_text: "收藏店铺"
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
    gotomap: function (e) {
        var that = this;
        var Shopname = that.data.store_name;
        var Shopaddress = that.data.add;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28,
                    name: Shopname,
                    address: Shopaddress
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var store_id = options.id;
        var that = this;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                that.setData({
                    token: token,
                    store_id: store_id
                })
                wx.request({
                    url: url + "api/User/store_info",
                    data: {
                        token: token,
                        store_id: store_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                love_store: res.data.data.is_collect == 0 ? false : true,
                                store_id: res.data.data.store_id,
                                store_name: res.data.data.store_name,
                                imgurls: res.data.data.img,
                                tel: res.data.data.telephone,
                                time: res.data.data.shop_hours,
                                add: res.data.data.address,
                                hairdresser_list: res.data.data.barber,
                                serve_list: res.data.data.service,
                                recommend_list: res.data.data.goods

                            })
                            wx.setNavigationBarTitle({
                                title: res.data.data.store_name
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
            },
            fail: function (res) {
                wx.hideLoading();
                console.log(res)
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
        var token = that.data.token;
        if (token){
            wx.showLoading({
                mask: true,
                title: "加载中"
            })
            var store_id = that.data.store_id;            
            wx.request({
                url: url + "api/User/store_info",
                data: {
                    token: token,
                    store_id: store_id
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        that.setData({
                            love_store: res.data.data.is_collect == 0 ? false : true,
                            store_id: res.data.data.store_id,
                            store_name: res.data.data.store_name,
                            imgurls: res.data.data.img,
                            tel: res.data.data.telephone,
                            time: res.data.data.shop_hours,
                            add: res.data.data.address,
                            hairdresser_list: res.data.data.barber,
                            serve_list: res.data.data.service,
                            recommend_list: res.data.data.goods

                        })
                        wx.setNavigationBarTitle({
                            title: res.data.data.store_name
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

    },
    onShareAppMessage:function(res){
        var that = this;
        var store_id = that.data.store_id;
        var store_name = that.data.store_name;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: store_name,
            path: '/pages/index/index?id=' + store_id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})