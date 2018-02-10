// pages/evaluate/addevaluate/addevaluate.js
var url = require('../../../app.js').url
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageList:[],
        imageLista: [],
        sourceTypeIndex: 2,
        sizeTypeIndex: 0,
        count: 3,
        comment: "",
        starstutes: 0
    },

    clickstar: function (e) {
        // console.log(e.currentTarget.dataset.star)
        var star = e.currentTarget.dataset.star;
        var x = e.detail.x - e.currentTarget.offsetLeft
        var width = 81 * (wx.getSystemInfoSync().windowWidth / 750);
        var starstutes = this.data.starstutes;
        var bl = x / width;
        if (bl > 0.5) {
            bl = 1;
        } else if (bl <= 0.5) {
            bl = 0.5;
        }
        if (star == 0) {
            if (bl == 0.5) {
                starstutes = 1
            } else {
                starstutes = 2
            }
        } else if (star == 1) {
            if (bl == 0.5) {
                starstutes = 3
            } else {
                starstutes = 4
            }
        } else if (star == 2) {
            if (bl == 0.5) {
                starstutes = 5
            } else {
                starstutes = 6
            }
        } else if (star == 3) {
            if (bl == 0.5) {
                starstutes = 7
            } else {
                starstutes = 8
            }
        } else if (star == 4) {
            if (bl == 0.5) {
                starstutes = 9
            } else {
                starstutes = 10
            }
        }
        this.setData({
            starstutes: starstutes
        })
    },
    textcontent: function (e) {
        this.setData({
            comment: e.detail.value
        })
    },
    addevaluate: function () {
        var that = this;
        var token = that.data.token;
        var subscribe_id = that.data.subscribe_id;
        var star = that.data.starstutes;
        var comment = that.data.comment;
        var attachment = that.data.imageList;
        var order_type = that.data.order_type;
        console.log(subscribe_id)
        if (comment == "") {
            wx.showToast({
                title: '输入不能为空',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return false;
        }
        wx.showLoading({
            mask: true,
            title: "上传中"
        })
        if (order_type == 1) {      
            wx.request({
                url: url + "api/User/commentOrderForm",
                data: {
                    token: token,
                    subscribe_id: subscribe_id,
                    star: star,
                    comment: comment,
                    attachment: attachment
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '评论成功',
                            icon: 'success',
                            duration: 1500,
                            mask: true
                        })
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1500)
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
            wx.request({
                url: url + "api/User/postComment",      
                data: {
                    token: token,
                    order_form_id: subscribe_id,
                    star: star,
                    comment: comment,
                    attachment: attachment
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '评论成功',
                            icon: 'success',
                            duration: 1500,
                            mask: true
                        })
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1500)
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
    chooseImage: function (e) {
        var that = this;
        var imageList = that.data.imageList;
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: this.data.count,
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                that.setData({
                    imageLista: tempFilePaths
                })

                wx.showLoading({
                    mask: true,
                    title: "上传中"
                })

                var i = 0;
                uploadFiles();
                console.log(i);
                function uploadFiles() {
                    wx.uploadFile({
                        url: url + 'api/code/upload',
                        filePath: tempFilePaths[i],
                        name: 'files',
                        formData: {
                            'files': tempFilePaths[i]
                        },
                        success: function (res) {
                            var data = res.data
                            wx.hideLoading()
                            //do something
                            imageList[i] = data;
                            that.setData({
                                imageList: imageList
                            })

                            i++;
                            if (i < tempFilePaths.length) {
                                uploadFiles();
                            }
                        },
                        fail: function () {
                            console.log(i)
                        }
                    })
                }
            }
        })
    },
    previewImage: function (e) {
        var index = e.currentTarget.dataset.image;
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: this.data.imageLista
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var subscribe_id = options.id;
        console.log(subscribe_id)
        var order_type = options.order_type;
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                that.setData({
                    order_type: order_type,
                    token: token,
                    subscribe_id: subscribe_id
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