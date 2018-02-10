// pages/QR/QR.js
var url = require('../../app.js').url;
var QR = require("../../utils/qrcode.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        QR: '../../img/QR.jpg',
        combo: "",
        convert: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                //请求接口
                wx.showLoading({
                    title: '请稍候',
                })
                wx.request({
                    url: url + 'api/User/consumption',
                    data: {
                        token: res.data.token,
                        subscribe_id: options.subscribe_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            that.setData({
                                QR: res.data.data.data.qecode,
                                combo: res.data.data.data.service_name,
                                convert: res.data.data.data.verification
                            })

                            // var size = that.setCanvasSize();
                            // var initUrl = res.data.data.data.qecode;
                            // console.log(initUrl)
                            // that.createQrCode(initUrl, "mycanvas", size.w, size.h);

                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                image: "../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    },
                    error: function () {
                        wx.hideLoading();
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
    },
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
    // createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    // var that = this;
    // QR.qrApi.draw(url, canvasId, cavW, cavH);
    // that.setData({ QRcode_state: true })
    // wx.showLoading({
    //     mask: true,
    //     title: "生成中"
    // })
    // var st = setTimeout(function(){
    //     wx.hideLoading();
    //     that.canvasToTempImage();
    //     clearTimeout(st);
    // },1000)
    // },
    qrimg: function (e) {
        var img = this.data.QR
        wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
        })
    },
    //   canvasToTempImage: function () {
    //       var that = this;
    //       wx.canvasToTempFilePath({
    //           canvasId: 'mycanvas',
    //           width: 500,
    //           height: 500,
    //           destWidth: 500,
    //           destHeight: 500,
    //           fileType: "jpg",
    //           success: function (res) {
    //               var tempFilePath = res.tempFilePath;
    //               console.log("********" + tempFilePath);
    //               that.setData({
    //                   qrcode: tempFilePath,
    //               });
    //           },
    //           fail: function (res) {
    //               console.log(res);
    //           }
    //       });
    //   },
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