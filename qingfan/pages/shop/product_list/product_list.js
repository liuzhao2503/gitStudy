// pages/shop/shoplsit.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cuntype:1,
        page:1,
        active: 1,
        classactive: false,
        classactiveall:0,
        activeitemall:[],
        Price: 0,
        Pricejt: ["../../../img/jtx.png", "../../../img/jtx1.png", "../../../img/jtx2.png", "../../../img/jtx3.png"],
        list: [],
        activeitemall:[],
        dxclass:["../../../img/dx.png","../../../img/dx2.png"],
        classlsitall: [
            // {
            //     active:0,
            //     goods_pid:1,
            //     goods_pname: "洗护日化",
            //     type_name: [
            //         {
            //             name: "修护水养",
            //             id: 1,
            //             active:true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 2,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 3,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 4,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 5,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 6,
            //             active: true
            //         }
            //     ]
            // },
            // {
            //     active: 1,
            //     classname: "洗护日化",
            //     classlist: [
            //         {
            //             name: "修护水养",
            //             id: 7,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 8,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 9,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 10,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 11,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 12,
            //             active: true
            //         }
            //     ]
            // },
            // {
            //     active: 1,
            //     classname: "洗护日化",
            //     classlist: [
            //         {
            //             name: "干枯发质急救",
            //             id: 13,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 14,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 15,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 16,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 17,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 18,
            //             active: true
            //         }
            //     ]
            // },
            // {
            //     active: 1,
            //     classname: "洗护日化",
            //     classlist: [
            //         {
            //             name: "干枯发质急救",
            //             id: 19,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 20,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 21,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 22,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 23,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 24,
            //             active: true
            //         }
            //     ]
            // },
            // {
            //     active: 1,
            //     classname: "洗护日化",
            //     classlist: [
            //         {
            //             name: "干枯发质急救",
            //             id: 25,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 26,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 27,
            //             active: true
            //         },
            //         {
            //             name: "修护水养",
            //             id: 28,
            //             active: true
            //         },
            //         {
            //             name: "垂顺质感",
            //             id: 29,
            //             active: true
            //         },
            //         {
            //             name: "干枯发质急救",
            //             id: 30,
            //             active: true
            //         }
            //     ]
            // }
        ]
    },
    goto_show:function(e){
        var id = e.currentTarget.dataset.id;
        var store_id = this.data.store_id;
        wx.navigateTo({
            url: '../commodity/commodity?id=' + id + '&store_id=' + store_id
        })
    },
    classactiveallstute:function(){
        var classlsitall = this.data.classlsitall;
        var classactiveall = this.data.classactiveall;
        var all = 0;
        for (var i = 0; i < classlsitall.length; i++){
            var s = 0;
            for (var a = 0; a < classlsitall[i].type_name.length;a++){
                if (classlsitall[i].type_name[a].active){
                    s++;
                    if (s == classlsitall[i].type_name.length){
                        classlsitall[i].active=1;
                    }else{
                        classlsitall[i].active = 0;
                    }
                }else{
                    classlsitall[i].active = 0;
                    classactiveall = 0;
                }
            }
            if (classlsitall[i].active == 1){
                all++;
                if (all == classlsitall.length){
                    classactiveall = 1
                }else{
                    classactiveall = 0;
                }
            }else{
                classactiveall=0;
            }
        }
        this.setData({
            classactiveall: classactiveall,
            classlsitall: classlsitall
        })
    },
    classzbtn:function(e){
        var oneindex = e.currentTarget.dataset.oneindex;
        var twoindex = e.currentTarget.dataset.twoindex;
        var classlsitall = this.data.classlsitall;
        if (classlsitall[oneindex].type_name[twoindex].active){
            classlsitall[oneindex].type_name[twoindex].active=false;
            this.setData({
                classlsitall: classlsitall
            })
        }else{
            classlsitall[oneindex].type_name[twoindex].active = true;
            this.setData({
                classlsitall: classlsitall
            })
        }
        this.classactiveallstute();
    },
    shoplistnav: function (e) {
        var that = this;
        var active = e.currentTarget.dataset.nav;
        if (active == 3) {
            var Price = this.data.Price;
            if (Price == 2) {
                var cuntype = 3;
                this.setData({
                    cuntype, cuntype,
                    Price: 3,
                    active: active
                })

                this.allshop(1, cuntype, that.data.activeitemall)
            } else {
                var cuntype= 4;
                this.setData({
                    cuntype: cuntype,
                    Price: 2,
                    active: active
                })
                this.allshop(1, cuntype, that.data.activeitemall)
            }

        } else if (active == 4) {
            this.setData({
                Price: 0,
                classactive: true,
                active: active
            })
        } else if (active == 1) {
            var cuntype = 1;
            this.setData({
                cuntype: cuntype,
                Price: 0,
                active: active
            })
            this.allshop(1, cuntype, that.data.activeitemall)
        } else if (active == 2) {
            var cuntype = 2;
            this.setData({
                cuntype: cuntype,
                Price: 0,
                active: active
            })
            this.allshop(1, cuntype, that.data.activeitemall)
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    cloneclass:function(){
        this.setData({
            classactive:false
        })
    },
    shoplistallactive:function(){
        var classlsitall = this.data.classlsitall;
        var classactiveall = this.data.classactiveall;
        if (classactiveall==1){
            classactiveall = 0;
            for (var i = 0; i < classlsitall.length; i++) {
                classlsitall[i].active = 0;
                for (var a = 0; a < classlsitall[i].type_name.length; a++) {
                    classlsitall[i].type_name[a].active = false;
                }
            }
        } else if (classactiveall == 0){
            classactiveall = 1;
            for (var i = 0; i < classlsitall.length; i++) {
                classlsitall[i].active = 1;
                for (var a = 0; a < classlsitall[i].type_name.length; a++) {
                    classlsitall[i].type_name[a].active = true;
                }
            }
        }
        this.setData({
            classactiveall: classactiveall,
            classlsitall: classlsitall
        })
    },
    twoshoplistactive:function(e){
        var oneindex = e.currentTarget.dataset.oneindex;
        var classlsitall = this.data.classlsitall;
        if (classlsitall[oneindex].active==1){
            classlsitall[oneindex].active = 0;
            for (var i = 0; i < classlsitall[oneindex].type_name.length; i++) {
                classlsitall[oneindex].type_name[i].active = false;
            }
        } else if (classlsitall[oneindex].active == 0){
            classlsitall[oneindex].active = 1;
            for (var i = 0; i < classlsitall[oneindex].type_name.length; i++) {
                classlsitall[oneindex].type_name[i].active = true;
            }
        }
        this.setData({
            classlsitall: classlsitall
        })
        this.classactiveallstute();
    },
    qdclassbtn:function(){
        var classlsitall = this.data.classlsitall;
        var activeitemall=[];
        var cuntype = this.data.cuntype;
        for (var i = 0; i < classlsitall.length;i++ ){
            for (var a = 0; a < classlsitall[i].type_name.length; a++) {
                if (classlsitall[i].type_name[a].active == 1){
                    activeitemall.push(classlsitall[i].type_name[a].id)
                }
            }
        }
        this.setData({
            activeitemall: activeitemall
        })
        if (activeitemall.length==0){
            wx.showToast({
                title: '请选择后再点击',
                image: '../../../img/errer.png',
                duration: 1500,
                mask: true
            })
            return false;
        }
        console.log(activeitemall)
        this.allshop(1, cuntype, activeitemall)
        this.setData({
            activeitemall: activeitemall,
            classactive: false
        })
    },
    allshop: function (page, type, type_id){
        var that = this;
        var token = that.data.token;
        var store_id = that.data.store_id;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.request({
            url: url + "api/User/getAllGoods",
            data: {
                token: token,
                page: page,
                type: type,
                type_id: type_id,
                store_id: store_id
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if(res.data.code==200){
                    console.log(res.data.data)
                    that.setData({
                        type_id: type_id,
                        type: type,
                        page: page,
                        list: res.data.data
                    })
                }else{
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
    onLoad: function (options) {
        // var classlsitall = this.data.classlsitall;
        // for (var i = 0; i < classlsitall.length; i++){
        //     classlsitall[i].active = 0;
        //     for (var a = 0; a < classlsitall[i].classlist.length;a++){
        //         classlsitall[i].classlist[a].active = true;
        //     }
        // }
        // console.log(classlsitall)
        var that = this;
        var store_id = options.store_id;
        var cuntype = 1;
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token;
                that.setData({
                    cuntype: cuntype,
                    token: token,
                    store_id: store_id
                })
                that.allshop(1, cuntype, that.data.activeitemall);
                wx.request({
                    url: url +"api/User/getGoodsType",
                    data: {
                        token: token
                    },
                    method: "POST",
                    success: function(res) {
                        wx.hideLoading();
                        if(res.data.code==200){
                            console.log(res.data)
                            that.setData({
                                classlsitall:res.data.data
                            })
                        }else{
                            wx.showToast({
                                title: '网络错误',
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
            fail: function(res) {
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
        var token = that.data.token;
        var page = that.data.page;
        page++;
        var type = that.data.type;
        var type_id = that.data.type_id;
        var store_id = that.data.store_id;
        var list = that.data.list;
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.request({
            url: url + "api/User/getAllGoods",
            data: {
                token: token,
                page: page,
                type: type,
                type_id: type_id,
                store_id: store_id
            },
            method: "POST",
            success: function (res) {
                wx.hideLoading();
                if (res.data.code == 200) {
                    console.log(res.data.data)
                    // that.setData({
                    //     type_id: type_id,
                    //     type: type,
                    //     page: page,
                    //     list: res.data.data
                    // })
                    if (res.data.data.length != 0) {
                        var alllist = list.concat(res.data.data);
                        that.setData({
                            page: page,
                            list: alllist
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