// pages/Settled/Settled.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address_id:{},
        tstext: "为了更快的审核通过，请填写正确的信息",
        statue: 0,
        timea: "",
        timeb: "",
        startime: "00:00",
        endtime: "23:59",
        region: [],
        imageLista: [],
        imageListb: [],
        imageListc: [],
        imageListd: [],
        imageListe: [],
        imageListf: [],
        imageListaa: [],
        imageListbb: [],
        imageListcc: [],
        imageListdd: [],
        imageListee: [],
        imageListff: [],
        sourceTypeIndex: 2,
        sizeTypeIndex: 0,
        count: 1,
        name: "",
        tel: "",
        address: ""
    },
    namedata: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    teldata: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },
    addressdata: function (e) {
        this.setData({
            address: e.detail.value
        })
    },
    //   营业时间
    bindTimeChangeb: function (e) {
        console.log(e.detail.value)
        this.setData({
            timeb: e.detail.value,
            endtime: e.detail.value
        })
    },
    bindTimeChangea: function (e) {
        this.setData({
            timea: e.detail.value,
            startime: e.detail.value
        })
    },
    chooseImage: function (e) {
        var index = e.currentTarget.dataset.image;
        var that = this;
        this.data.count = 1;
        var imageListb = that.data.imageListb;
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: this.data.count,
            success: function (res) {
                console.log(res.tempFilePaths)
                var tempFilePaths = res.tempFilePaths
                if (index == 1) {
                    that.setData({
                        imageLista: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 1)
                } else if (index == 2) {
                    that.setData({
                        imageListb: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 2)
                } else if (index == 3) {
                    that.setData({
                        imageListc: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 3)
                } else if (index == 4) {
                    that.setData({
                        imageListd: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 4)
                } else if (index == 5) {
                    that.setData({
                        imageListe: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 5)
                } else if (index == 6) {
                    that.setData({
                        imageListf: tempFilePaths
                    })
                    that.loadFile(tempFilePaths, 6)
                }
            }
        })
    },
    loadFile: function (tempFilePaths, type) {
        var that = this;
        var imageListaa = that.data.imageListaa;
        var imageListbb = that.data.imageListbb;
        var imageListcc = that.data.imageListcc;
        var imageListdd = that.data.imageListdd;
        var imageListee = that.data.imageListee;
        var imageListff = that.data.imageListff;
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
                    console.log(i);
                    console.log(data)
                    wx.hideLoading()
                    //do something
                    if (type == 1) {
                        console.log(i)
                        imageListaa[i] = data;
                        console.log(imageListaa)
                        that.setData({
                            imageListaa: imageListaa
                        })
                    } else if (type == 2) {
                        imageListbb[i] = data;
                        console.log(imageListbb)
                        that.setData({
                            imageListbb: imageListbb
                        })
                    } else if (type == 3) {
                        imageListcc[i] = data;
                        that.setData({
                            imageListcc: imageListcc
                        })
                    } else if (type == 4) {
                        imageListdd[i] = data;
                        that.setData({
                            imageListdd: imageListdd
                        })
                    } else if (type == 5) {
                        imageListee[i] = data;
                        that.setData({
                            imageListee: imageListee
                        })
                    } else if (type == 6) {
                        imageListff[i] = data;
                        that.setData({
                            imageListff: imageListff
                        })
                    }
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

        // for (var i = 0; i < tempFilePaths.length; i++) {
        //     console.log(tempFilePaths[i])
        //     wx.uploadFile({
        //         url: url + 'api/code/upload',
        //         filePath: tempFilePaths[i],
        //         name: 'files',
        //         formData: {
        //             'files': tempFilePaths[i]
        //         },
        //         success: function (res) {
        //             var data = res.data
        //             console.log(data)
        //             wx.hideLoading()
        //             //do something
        //             if (type==1){
        //                 console.log(i)
        //                 imageListaa[i] = data;
        //                 console.log(imageListaa)
        //                 that.setData({
        //                     imageListaa: imageListaa
        //                 })
        //             } else if (type == 2){
        //                 imageListbb[i] = data;
        //                 that.setData({
        //                     imageListbb: imageListbb
        //                 })
        //             } else if (type == 3){
        //                 imageListcc[i] = data;
        //                 that.setData({
        //                     imageListcc: imageListcc
        //                 })
        //             } else if (type == 4){
        //                 imageListdd[i] = data;
        //                 that.setData({
        //                     imageListdd: imageListdd
        //                 })
        //             } else if (type == 5){
        //                 imageListee[i] = data;
        //                 that.setData({
        //                     imageListee: imageListee
        //                 })
        //             }
        //         },
        //         fail:function(){
        //             console.log(i)
        //         }
        //     })
        // }

    },
    previewImage: function (e) {
        var index = e.currentTarget.dataset.image;
        var current = e.target.dataset.src;
        if (index == 1) {
            wx.previewImage({
                current: current,
                urls: this.data.imageLista
            })
        } else if (index == 2) {
            wx.previewImage({
                current: current,
                urls: this.data.imageListb
            })
        } else if (index == 3) {
            wx.previewImage({
                current: current,
                urls: this.data.imageListc
            })
        } else if (index == 4) {
            wx.previewImage({
                current: current,
                urls: this.data.imageListd
            })
        } else if (index == 5) {
            wx.previewImage({
                current: current,
                urls: this.data.imageListe
            })
        } else if (index == 6) {
            wx.previewImage({
                current: current,
                urls: this.data.imageListf
            })
        }
    },
    submitbtn: function () {
        var that = this;
        var city_id = that.data.address_id.city_id;
        var token = that.data.token;
        var name = that.data.name;
        var tel = that.data.tel;
        var address = that.data.address;
        var timea = that.data.timea;
        var timeb = that.data.timeb;
        var region = that.data.region;
        var imageLista = that.data.imageLista;
        var imageListb = that.data.imageListb;
        var imageListc = that.data.imageListc;
        var imageListd = that.data.imageListd;
        var imageListe = that.data.imageListe;
        var imageListf = that.data.imageListf;
        var imageListaa = that.data.imageListaa;
        var imageListbb = that.data.imageListbb;
        var imageListcc = that.data.imageListcc;
        var imageListdd = that.data.imageListdd;
        var imageListee = that.data.imageListee;
        var imageListff = that.data.imageListff;
        var statue = that.data.statue;
        if (statue == 0 || statue == 2) {
            if (name != "") {
                if (tel != "" && tel.length == 11) {
                    if (region.length != 0) {
                        if (address != "") {
                            if (timea != "") {
                                if (timeb != "") {
                                    if (imageLista.length != 0) {
                                        if (imageListb.length != 0) {
                                            if (imageListf.length != 0) {
                                                if (imageListc.length != 0) {
                                                    if (imageListd.length != 0) {
                                                        if (imageListe.length != 0) {
                                                            var address_all = region[0] + "-" + region[1] + "-" + region[2] + "#" + address;
                                                            var imglist = [
                                                                { path: imageListaa, type: 1 },
                                                                { path: imageListbb, type: 2 },
                                                                { path: imageListff, type: 6 },
                                                                { path: imageListcc, type: 3 },
                                                                { path: imageListdd, type: 4 },
                                                                { path: imageListee, type: 5 }];
                                                            var time = timea + "-" + timeb;
                                                            wx.showLoading({
                                                                mask: true,
                                                                title: '上传中',
                                                            });
                                                            wx.request({
                                                                url: url + "api/User/addStore",
                                                                data: {
                                                                    token: token,
                                                                    city_id: city_id,
                                                                    store_name: name,
                                                                    store_telephone: tel,
                                                                    address: address_all,
                                                                    start_time: time,
                                                                    attachment: imglist
                                                                },
                                                                method: "POST",
                                                                success: function (res) {
                                                                    if (res.data.code == 200) {
                                                                        wx.hideLoading();
                                                                        that.setData({
                                                                            tstext: "申请入驻中",
                                                                            statue: 1
                                                                        })
                                                                        wx.showToast({
                                                                            title: '申请成功',
                                                                            icon: 'success',
                                                                            mask: true,
                                                                            duration: 1500
                                                                        })
                                                                        setTimeout(function () {
                                                                            wx.switchTab({
                                                                                url: '../index/index'
                                                                            })
                                                                        }, 1500)
                                                                    } else {
                                                                        wx.showToast({
                                                                            title: res.data.msg,
                                                                            image: '../../img/errer.png',
                                                                            duration: 2000,
                                                                        })
                                                                    }
                                                                },
                                                                fail: function (res) {
                                                                    wx.hideLoading();
                                                                    wx.showToast({
                                                                        title: '网络错误',
                                                                        image: '../../img/errer.png',
                                                                        duration: 2000,
                                                                    })
                                                                }
                                                            })

                                                        } else {
                                                            wx.showToast({
                                                                title: '手持证件照有误',
                                                                image: '../../img/errer.png',
                                                                duration: 2000,
                                                            })
                                                        }
                                                    } else {
                                                        wx.showToast({
                                                            title: '身份证反面有误',
                                                            image: '../../img/errer.png',
                                                            duration: 2000,
                                                        })
                                                    }
                                                } else {
                                                    wx.showToast({
                                                        title: '身份证正面有误',
                                                        image: '../../img/errer.png',
                                                        duration: 2000,
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: '门头照有误',
                                                    image: '../../img/errer.png',
                                                    duration: 2000,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '店面照有误',
                                                image: '../../img/errer.png',
                                                duration: 2000,
                                            })
                                        }
                                    } else {
                                        wx.showToast({
                                            title: '营业执照有误',
                                            image: '../../img/errer.png',
                                            duration: 2000,
                                        })
                                    }
                                } else {
                                    wx.showToast({
                                        title: '请输入营业时间',
                                        image: '../../img/errer.png',
                                        duration: 2000,
                                    })
                                }
                            } else {
                                wx.showToast({
                                    title: '请输入营业时间',
                                    image: '../../img/errer.png',
                                    duration: 2000,
                                })
                            }
                        } else {
                            wx.showToast({
                                title: '输入不能为空',
                                image: '../../img/errer.png',
                                duration: 2000,
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '请选择地区',
                            image: '../../img/errer.png',
                            duration: 2000,
                        })
                    }
                } else {
                    wx.showToast({
                        title: '手机号输入有误',
                        image: '../../img/errer.png',
                        duration: 2000,
                    })
                }
            } else {
                wx.showToast({
                    title: '输入不能为空',
                    image: '../../img/errer.png',
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '入驻成功',
                icon: 'success',
                duration: 2000
            })
        }
    },

    bindRegionChange: function (e) {
        var that = this;
        var region = e.detail.value;
        that.setData({
            region: e.detail.value
        })
        wx.request({
            url: url + "api/code/getCityByPid",
            data: {
                province: region[0],
                city: region[1]
            },
            method: "POST",
            success: function (res) {
                if (res.data.code == 200) {
                    console.log(res.data.data)
                    that.setData({
                        address_id: res.data.data
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        qqmapsdk = new QQMapWX({
            key: 'YWJBZ-RIT3O-6G6WF-SZI5Z-O332Z-7GFZV'
        });
        var statue;
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                statue = res.data.data.settled_state;
                if (!statue) {
                    statue = 0;
                }
                console.log(statue)
                that.setData({
                    token: token,
                    statue: statue
                })
                if (statue == 0) {

                } else if (statue == 1) {
                    that.setData({
                        mask: true,
                        tstext: "申请入驻中"
                    })
                    wx.showLoading({
                        mask: true,
                        title: '申请入驻中',
                        mask: true
                    })
                } else if (statue == 3) {
                    that.setData({
                        tstext: "入驻成功！请登录商家端"
                    })
                    wx.showToast({
                        title: '入驻成功',
                        icon: 'success',
                        mask: true,
                        duration: 2000
                    })
                } else if (statue == 2) {
                    that.setData({
                        tstext: "入驻失败！请重新申请"
                    })
                    wx.showToast({
                        title: '入驻失败',
                        image: "../../img/errer.png",
                        mask: true,
                        duration: 2000
                    })
                }
            },
            fail: function (res) { }
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