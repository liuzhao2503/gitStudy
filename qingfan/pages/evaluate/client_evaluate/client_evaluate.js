var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        evaluate_list: [],
        page:1
    },
    previewImageall: function (e) {
        var index = e.currentTarget.dataset.index;
        var that = this;
        var urls = [];
        var evaluate_list = that.data.evaluate_list;
        for (var i = 0; i < evaluate_list[index].img.length;i++){
            urls.push(evaluate_list[index].img[i].comment_info) 
        }
        
        var current = e.currentTarget.dataset.img;
        wx.previewImage({
            current: current,
            urls: urls
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var barber_id = options.id;
        var that = this;
        console.log(barber_id)
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                console.log(res)
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/barber_comment",
                    data: {
                        token: token,
                        barber_id: barber_id,
                        page: 1
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if(res.data.code==200){
                            that.setData({
                                barber_id: barber_id,
                                token: token,
                                evaluate_list:res.data.data
                            })
                        }else{
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
        var barber_id = that.data.barber_id;
        var page = that.data.page;
        var evaluate_list = that.data.evaluate_list;
        page++;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                wx.request({
                    url: url + "api/User/barber_comment",
                    data: {
                        token: token,
                        barber_id: barber_id,
                        page: page
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            if (res.data.data.length != 0) {
                                var list = evaluate_list.concat(res.data.data);
                                that.setData({
                                    page: page,
                                    evaluate_list: list
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