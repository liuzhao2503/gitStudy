// index.js
//获取应用实例
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var url = require('../../app.js').url
const app = getApp();
var qqmapsdk;
Page({
    data: {
        actionSheetHidden:true,
        sfdw: true,
        // actionSheetHidden:false,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        page: 1,
        page1: 1,
        sousuo: "",
        region: [],
        imgUrls: [],
        tabber: true,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 200,
        indexlist: []
    },
    showactionsheet:function(){
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    actionSheetbindchange: function (e) {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    bindaddress:function(e){
        var address = e.currentTarget.dataset.address;
        var that = this;
        if(address==1){
            that.internetafter();
            that.setData({
                sfdw:true
            })
        }
        that.setData({
            actionSheetHidden: !that.data.actionSheetHidden
        })
    },
    goto_imgxq: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../img_xq/img_xq?id=' + id
        })
    },
    sousuobtn: function () {
        var tabber = this.data.tabber;
        var latitude = this.data.latitude;
        var token = this.data.token;
        var longitude = this.data.longitude;
        var sousuo = this.data.sousuo;
        if (tabber) {
            this.indexhomedata(token, latitude, longitude, 1, 1, sousuo)
        } else {
            this.indexhomedata(token, latitude, longitude, 1, 2, sousuo)
        }

    },
    sousuoinput: function (e) {
        this.setData({
            sousuo: e.detail.value
        })
    },
    //事件处理函数
    bindRegionChange: function (e) {
        console.log(e)
        this.setData({
            region: e.detail.value
        })
        var that = this;
        var tabber = that.data.tabber;
        var token = that.data.token;
        var address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.request({
            url: url + "api/code/getCityByPid",
            data: {
                province: e.detail.value[0],
                city: e.detail.value[1]
            },
            method: "POST",
            success: function (res) {
                if (res.data.code == 200) {
                    wx.request({
                        url: url + "api/User/Carousel",
                        data: {
                            city_id: res.data.data.city_id,
                            token: token
                        },
                        method: "POST",
                        success: function (res) {
                            if (res.data.code == 200) {
                                that.setData({
                                    sfdw: false,
                                    imgUrls: res.data.data
                                })
                            } else {
                                wx.showToast({
                                    title: '网络错误',
                                    image: '../../img/errer.png',
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: '网络错误',
                                image: '../../img/errer.png',
                                duration: 1500,
                                mask: true
                            })
                        }
                    })
                }
            },
            fail: function (res) {

            }
        })
        qqmapsdk.geocoder({
            address: address,
            success: function (res) {
                console.log(res.result.location);
                that.setData({
                    latitude: res.result.location.lat,
                    longitude: res.result.location.lng
                })
                if (tabber) {
                    that.indexhomedata(token, res.result.location.lat, res.result.location.lng, 1, 1)
                } else {
                    that.indexhomedata(token, res.result.location.lat, res.result.location.lng, 1, 2)
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: '../../img/errer.png',
                    duration: 1500,
                    mask: true
                })
            }
        });
    },
    inputtabber1: function () {
        var latitude = this.data.latitude;
        var longitude = this.data.longitude;
        var token = this.data.token;
        this.setData({
            page: 1,
            page1: 1,
            tabber: true
        })
        this.indexhomedata(token, latitude, longitude, 1, 1)
    },
    ercode: function () {
        var that = this;
        wx.scanCode({
            success: function (res) {
                console.log(res)
                var id = res.result;
                var gotoshop = that.GetQueryString("id", id);
                console.log(gotoshop)
                wx.navigateTo({
                    url: '../shop/shop_home/shop_home?id=' + gotoshop
                })
            },
            fail: function () {

            }
        })
    },
    inputtabber2: function () {
        var latitude = this.data.latitude;
        var longitude = this.data.longitude;
        var token = this.data.token;
        this.setData({
            page: 1,
            page1: 1,
            tabber: false
        })
        this.indexhomedata(token, latitude, longitude, 1, 2)
    },
    //点击跳转到店铺主页
    goto_shop_home: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../shop/shop_home/shop_home?id=' + id,
        })
    },
    //首页信息获取
    indexhomedata: function (token, latitude, longitude, page, type, search) {
        var that = this;

        wx.request({
            url: url + "api/User/storeList",
            data: {
                token: token,
                longitude: longitude,
                latitude: latitude,
                page: page,
                search: search,
                type: type
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        token: token,
                        indexlist: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '网络错误',
                        image: '../../img/errer.png',
                        duration: 1500,
                        mask: true
                    })
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: '../../img/errer.png',
                    duration: 1500,
                    mask: true
                })
            }
        })
    },
    GetQueryString: function (name, src) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = src.substr(35).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    onLoad: function (options) {
        qqmapsdk = new QQMapWX({
            key: 'YWJBZ-RIT3O-6G6WF-SZI5Z-O332Z-7GFZV'
        });
        var that = this;
        var nickName;
        var avatarUrl;
        var zfid = options.id;
        var gotoshop = decodeURIComponent(options.q);
        gotoshop = that.GetQueryString("id", gotoshop);
        if (!gotoshop) {
            gotoshop = zfid;
        }

        // 获取用户信息
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.getUserInfo({
            success: res => {
                var userInfo = res.userInfo;
                nickName = userInfo.nickName;
                avatarUrl = userInfo.avatarUrl;
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                }
                wx.checkSession({
                    success: function () {
                        //session 未过期，并且在本生命周期一直有效
                        wx.getStorage({
                            key: 'userinfo',
                            success: function (res) {
                                wx.request({
                                    url: url + "api/User/getInfo",
                                    data: {
                                        token: res.data.token
                                    },
                                    method: "POST",
                                    header: {
                                        'content-type': 'application/json' // 默认值
                                    },
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            wx.setStorage({
                                                key: "userinfo",
                                                data: res.data.data,
                                                success: function () {
                                                    if (gotoshop == null) {
                                                        that.internetafter();
                                                    } else {
                                                        wx.navigateTo({
                                                            url: '../shop/shop_home/shop_home?id=' + gotoshop
                                                        })
                                                    }
                                                },
                                                fail: function () {
                                                    wx.hideLoading();
                                                    wx.showToast({
                                                        title: '网络错误',
                                                        image: '../../img/errer.png',
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                }
                                            })
                                        }
                                    },
                                    fail: function () {
                                        wx.hideLoading();
                                        wx.showToast({
                                            title: '网络错误',
                                            image: '../../img/errer.png',
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                })
                            },
                            fail: function () {
                                wx.login({
                                    success: res => {
                                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                        var code = res.code;
                                        console.log(code)
                                        wx.request({
                                            url: url + "api/User/getInfo",
                                            data: {
                                                code: code,
                                                username: nickName,
                                                interlinking: avatarUrl
                                            },
                                            method: "POST",
                                            header: {
                                                'content-type': 'application/json' // 默认值
                                            },
                                            success: function (res) {
                                                wx.hideLoading();
                                                if (res.data.code == 200) {
                                                    wx.setStorage({
                                                        key: "userinfo",
                                                        data: res.data.data,
                                                        success: function () {
                                                            if (gotoshop == null) {
                                                                that.internetafter();
                                                            } else {
                                                                wx.navigateTo({
                                                                    url: '../shop/shop_home/shop_home?id=' + gotoshop
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            },
                                            fail: function () {
                                                wx.hideLoading();
                                                wx.showToast({
                                                    title: '网络错误',
                                                    image: '../../img/errer.png',
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    },
                    fail: function () {
                        wx.hideLoading();
                        //登录态过期
                        wx.login({
                            success: res => {
                                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                var code = res.code;
                                console.log(code)
                                wx.request({
                                    url: url + "api/User/getInfo",
                                    data: {
                                        code: code,
                                        username: nickName,
                                        interlinking: avatarUrl
                                    },
                                    method: "POST",
                                    header: {
                                        'content-type': 'application/json' // 默认值
                                    },
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            wx.setStorage({
                                                key: "userinfo",
                                                data: res.data.data,
                                                success: function () {
                                                    if (gotoshop == null) {
                                                        that.internetafter();
                                                    } else {
                                                        wx.navigateTo({
                                                            url: '../shop/shop_home/shop_home?id=' + gotoshop
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            },
            fail: function () {
                wx.hideLoading();
                wx.reLaunch({
                    url: '../ts/ts'
                })
            }
        })
    },
    internetafter: function () {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                console.log(token)
                that.setData({
                    tabber: true,
                    sousuo: "",
                    token: token
                })
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        var latitude = res.latitude;
                        var longitude = res.longitude;
                        console.log(latitude)
                        console.log(longitude)
                        that.setData({
                            latitude: latitude,
                            longitude: longitude
                        })
                        wx.setStorage({
                            key: 'Location',
                            data: [latitude, longitude]
                        })
                        that.indexhomedata(token, latitude, longitude, 1, 1);
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: latitude,
                                longitude: longitude
                            },
                            success: function (res) {
                                console.log(res);
                                var region = [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
                                that.setData({
                                    region: region,
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
                                            wx.request({
                                                url: url + "api/User/Carousel",
                                                data: {
                                                    city_id: res.data.data.city_id,
                                                    token: token
                                                },
                                                method: "POST",
                                                success: function (res) {
                                                    if (res.data.code == 200) {
                                                        that.setData({
                                                            imgUrls: res.data.data
                                                        })
                                                    } else {
                                                        wx.showToast({
                                                            title: '网络错误',
                                                            image: '../../img/errer.png',
                                                            duration: 1500,
                                                            mask: true
                                                        })
                                                    }
                                                },
                                                fail: function (res) {
                                                    wx.showToast({
                                                        title: '网络错误',
                                                        image: '../../img/errer.png',
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                }
                                            })
                                        }
                                    },
                                    fail: function (res) {

                                    }
                                })
                            },
                            fail: function (res) {
                                console.log(res);
                            }
                        });
                    },
                    fail: function () {
                        that.setData({
                            latitude: 38.0428000000,
                            longitude: 114.5112900000
                        })
                        wx.setStorage({
                            key: 'Location',
                            data: [38.0428000000, 114.5112900000]
                        })
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: 38.0428000000,
                                longitude: 114.5112900000
                            },
                            success: function (res) {
                                console.log(res);
                                var region = [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
                                that.setData({
                                    region: region
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
                                            wx.request({
                                                url: url + "api/User/Carousel",
                                                data: {
                                                    city_id: res.data.data.city_id,
                                                    token: token
                                                },
                                                method: "POST",
                                                success: function (res) {
                                                    if (res.data.code == 200) {
                                                        that.setData({
                                                            imgUrls: res.data.data
                                                        })
                                                    } else {
                                                        wx.showToast({
                                                            title: '网络错误',
                                                            image: '../../img/errer.png',
                                                            duration: 1500,
                                                            mask: true
                                                        })
                                                    }
                                                },
                                                fail: function (res) {
                                                    wx.showToast({
                                                        title: '网络错误',
                                                        image: '../../img/errer.png',
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                }
                                            })
                                        }
                                    },
                                    fail: function (res) {

                                    }
                                })
                            },
                            fail: function (res) {
                                console.log(res);
                            }
                        });
                        that.indexhomedata(token, 38.0428000000, 114.5112900000, 1, 1);
                    }
                })
            },
            fail: function () {
                console.log(222)
                that.onLoad();
            }
        })

    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        var that = this;
        var sfdw = that.data.sfdw;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        that.setData({
            page: 1,
            tabber: true,
            sousuo: "",
            page1: 1
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var token = res.data.token;
                if (sfdw) {
                    that.internetafter();
                }
                wx.request({
                    url: url + "api/User/getInfo",
                    data: {
                        token: token
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            wx.setStorage({
                                key: "userinfo",
                                data: res.data.data
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络错误',
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            }, fail: function () {
                console.log(111)
            }
        })

    },
    /**
 * 页面上拉触底事件的处理函数
 */
    onReachBottom: function () {
        var that = this;
        var token = that.data.token;
        var latitude = that.data.latitude;
        var longitude = that.data.longitude;
        var tabber = that.data.tabber;
        var page = that.data.page;
        var page1 = that.data.page1;
        var search = that.data.search;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        if (tabber) {
            page++;
            wx.request({
                url: url + "api/User/storeList",
                data: {
                    token: token,
                    longitude: longitude,
                    latitude: latitude,
                    page: page,
                    search: search,
                    type: 1
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.length != 0) {
                            var list = indexlist.concat(res.data.data);
                            that.setData({
                                page: page,
                                indexlist: list
                            })
                        } else {
                            wx.showToast({
                                title: '没有更多数据',
                                image: "../../img/wu.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '网络错误',
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络错误',
                        image: '../../img/errer.png',
                        duration: 1500,
                        mask: true
                    })
                }
            })
        } else {
            page1++;
            wx.request({
                url: url + "api/User/storeList",
                data: {
                    token: token,
                    longitude: longitude,
                    latitude: latitude,
                    page: page1,
                    search: search,
                    type: 2
                },
                method: "POST",
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        if (res.data.data.length != 0) {
                            var list = indexlist.concat(res.data.data);
                            that.setData({
                                page1: page1,
                                indexlist: list
                            })
                        } else {
                            wx.showToast({
                                title: '没有更多数据',
                                image: "../../img/wu.png",
                                duration: 1500,
                                mask: true
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '网络错误',
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络错误',
                        image: '../../img/errer.png',
                        duration: 1500,
                        mask: true
                    })
                }
            })
        }
    }
})
