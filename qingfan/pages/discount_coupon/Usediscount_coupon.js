// pages/discount_coupon/discount_coupon.js
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stute: 0,//0服务付款   1商品付款
        store_id:"",    //店铺id
        ldclick:true,
        money:0,
        platform:1,  //1 平台 2店铺
        discount_stats: ["店铺商品优惠券","店铺服务优惠券", "平台商品优惠券" ,"平台服务优惠券"],
        coupon_list: [
            // {
            //     discountid:"12345",
            //     price_num: "50",
            //     price_condition: "199",
            //     name_type: "优惠券",
            //     name_condition: '店铺商品优惠券',
            //     shop: "托尼国际美发工作室",
            //     time_limit: "2017.11.25—2017.12.27",
            //     the_type: true
            // }, {
            //     discountid: "12345",
            //     price_num: "10",
            //     price_condition: "199",
            //     name_type: "优惠券",
            //     name_condition: '店铺服务优惠券',
            //     shop: "托尼国际美发工作室",
            //     time_limit: "2017.11.25—2017.12.27",
            //     the_type: true
            // }, {
            //     discountid: "12345",
            //     price_num: "30",
            //     price_condition: "199",
            //     name_type: "优惠券",
            //     name_condition: '平台商品优惠券',
            //     shop: "氣范儿美发平台",
            //     time_limit: "2017.11.25—2017.12.27",
            //     the_type: false
            // }, {
            //     discountid: "12345",
            //     price_num: "20",
            //     price_condition: "199",
            //     name_type: "优惠券",
            //     name_condition: '平台服务优惠券',
            //     shop: "氣范儿美发平台",
            //     time_limit: "2017.11.25—2017.12.27",
            //     the_type: false
            // }
        ]
    },
    //点击优惠券以后
    jump: function (e) {
        var that = this;
        var ind = e.currentTarget.dataset.index;
        var ldclick = that.data.ldclick;
        if (ldclick){
            that.setData({
                ldclick:false
            })
            var coupon_list = this.data.coupon_list;
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];
            console.log(prevPage)
            var discountstate = "";
            // { { coupon_list.type == 1 && coupon_list.use_type == 1 ? "平台服务优惠券" : "" } } { { coupon_list.type == 1 && coupon_list.use_type == 2 ? "平台商品优惠券" : "" } } { { coupon_list.type == 2 && coupon_list.use_type == 1 ? "店铺服务优惠券" : "" } } { { coupon_list.type == 2 && coupon_list.use_type == 2 ? "店铺商品优惠券" : "" } }
            if (coupon_list[ind].type == 1 && coupon_list[ind].use_type == 1){
                discountstate = "平台服务优惠券";
            }
            if (coupon_list[ind].type == 1 && coupon_list[ind].use_type == 2) {
                discountstate = "平台商品优惠券";
            }
            if (coupon_list[ind].type == 2 && coupon_list[ind].use_type == 1) {
                discountstate = "店铺服务优惠券";
            }
            if (coupon_list[ind].type == 2 && coupon_list[ind].use_type == 2) {
                discountstate = "店铺商品优惠券";
            }
            
            that.data.discount_stats[e.currentTarget.dataset.index],
            prevPage.setData({
                sale: coupon_list[e.currentTarget.dataset.index].coupon_start,
                discountstate: discountstate,
                discountid: coupon_list[e.currentTarget.dataset.index].coupon_id,
                // Platform:
            })
            wx.showLoading({
                title: '使用中'
            })

            setTimeout(function () {
                wx.showToast({
                    title: '使用成功',
                    icon: 'success',
                    duration: 1500,
                })
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            }, 2000)
        }
       

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            store_id:options.store_id,
            stute:options.stute,
            money:options.money,
            platform:options.platform
        })

        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                //调起接口
                wx.showLoading({
                    title: '请稍候',
                })
                wx.request({
                    url: url + 'api/User/useCoupon',
                    data: {
                        token: res.data.token,
                        store_id: that.data.store_id,
                        money: Number(that.data.money),
                        use_type: Number(that.data.stute)+1,
                        platform:that.data.platform
                        },
                        method:"POST",
                        success:function(res){
                            wx.hideLoading();
                            if(res.data.code == 200){
                                // var coupon_list = [];
                                // // for(var i=0;i<res.data.data.data.length;i++){
                                // //     var coupon_msg = {
                                // //         discountid: res.data.data.data[i].coupon_id,
                                // //         price_num: res.data.data.data[i].coupon_start,
                                // //         price_condition: res.data.data.data[i].coupon_price,
                                // //         name_type: "优惠券",
                                // //         name_condition: res.data.data.data[i].coupon_name,
                                // //         shop: res.data.data.data[i].store_name,
                                // //         time_limit: res.data.data.data[i].start_time + '-' + res.data.data.data[i].end_time,
                                // //         the_type: true
                                // //     };
                                //     coupon_list.push(coupon_msg);
                                // }
                                that.setData({
                                    coupon_list: res.data.data.data
                                })
                            }else{
                                wx.showToast({
                                    title: res.data.msg,
                                    image:'../../img/errer.png',
                                    duration:1500,
                                    mask:true
                                })
                            }
                        }
                })
            },
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})