// pages/scrvice_pay/scrvice_pay.js
var md5 = require('../../utils/md5.js');
var url = require('../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_state:null,       //入口页面  0商品页面 1订单页面
        store_id:null,
        subscribe_id:"",
        Platform:1,//1平台   2店铺   
        stute: 0,//0服务付款   1商品付款
        shop_id:null,
        shopimg: "",   //商品图片
        shopname: "",       //商品名称
        shopPrice: 0,    //单价
        shopnum: 0,        //购买数量
        fwname: "",     //服务名字
        express: 0,      //快递费
        cunexpress:0,   //暂存快递费值
        all: "0",       //共计
        sale: "0",      //优惠
        num: "0",       //实付
        actual_fee: 0,//合计
        actual_fee2: null,  //账户余额支付-输入支付密码弹窗-合计
        payfor: [
            {
                name: "1",
                item_border: 'payfor_item_border',
                ico: 'icon-0023 pay_weixin',
                value: "微信支付",
                checked: true
            },
            {
                name: "2",
                item_border: '',
                ico: 'icon-yue pay_yue',
                value: "账户余额",
                checked: false
            } 
            
        ],
        goodsreceipt: [
            {

                name: "1",
                item_border: 'payfor_item_border',
                ico: 'icon-kuaidi',
                value: "快递邮寄",
                checked: true
            }, {
                name: "2",
                item_border: '',
                ico: 'icon-ziqu pay_yue',
                value: "上门自取",
                checked: false
            }
        ],
        discountnum: 0,     //可用优惠券张数
        discountstate: "",      
        discountid:0,       //优惠券id
        button_text: '去付款',
        payment_mode: 0,    //支付方式
        wallets_password_flag: false,//密码输入遮罩
        wallets_password: null,
        isFocus: false//控制input 聚焦
    },
    //点击优惠券一行跳转到优惠券列表
    goto_used_coupon:function(){
        var that = this;
        wx.navigateTo({
            url: '../discount_coupon/Usediscount_coupon?store_id=' + that.data.store_id + '&&stute=' + that.data.stute + '&&money=' + (that.data.all - that.data.express)+'&platform='+that.data.Platform,
        })
    },

    //点击切换收货方式
    goodsreceiptradioChange:function(e){
        var that = this;
        var goodsreceipt = that.data.goodsreceipt;
        let checked_2 = e.detail.value;
        console.log(checked_2)
        for (var i = 0; i < goodsreceipt.length; i++) {
            if (checked_2.indexOf(i + 1 + "") != -1) {
                goodsreceipt[i].checked = true;
            } else {
                goodsreceipt[i].checked = false;
            }
        }
        if (checked_2==2){
            var express = 0;
            var shopPrice = Number(that.data.shopPrice);
            var shopnum = Number(that.data.shopnum);
            var all = shopPrice * shopnum + express;
            var sale = that.data.sale;
            console.log(all)
            console.log(express)
            that.setData({
                express: express,
                all: all.toFixed(2),
                num: (all - sale).toFixed(2),
                actual_fee: (all - sale).toFixed(2)
            })
        }else{
            var shopPrice = Number(that.data.shopPrice);
            var express = Number(that.data.cunexpress);
            var shopnum = Number(that.data.shopnum);
            var all = shopPrice * shopnum + express;
            var sale = Number(that.data.sale);
            console.log(all)
            console.log(express)
            that.setData({
                all: all.toFixed(2),
                express: express.toFixed(2),
                num: (all - sale).toFixed(2),
                actual_fee: (all - sale).toFixed(2)
            })
        }
        that.setData({
            goodsreceipt: goodsreceipt
        })    },
    //点击选择付款方式
    radioChange: function (e) {
        var that = this;
        var payfor = that.data.payfor;
        let checked_2 = e.detail.value;
        for (var i = 0; i < payfor.length; i++) {
            if (checked_2.indexOf(i + 1 + "") != -1) {
                payfor[i].checked = true;
                var payment_mode = i;
            } else {
                payfor[i].checked = false;
            }
        }
        that.setData({
            payfor: payfor,
            payment_mode: payment_mode
        })
    },
    //密码输入框输入时执行的操作
    set_wallets_password: function (e) {
        console.log(e.detail.value)
        this.setData({
            wallets_password: e.detail.value
        })
    },
    //点击6个小输入框然后输入框获得焦点
    set_Focus: function () {
        this.setData({
            isFocus: true
        })
    },
    //密码输入完毕然后点击确定付款时
    suretopay: function () {
        var that = this;
        var wallets_password = that.data.wallets_password;  //获取输入的密码
        console.log(wallets_password);
        if (wallets_password.length < 6){    //判断是否够6位
            wx.showToast({
                title: '密码不足6位',
                image:'../../img/errer.png',
                duration:1500,
                mask:true,
                success:function(){
                    //重新获取焦点
                    that.setData({
                        isFocus: true
                    })
                }
            })
        }else{
            var stute = that.data.stute;        //订单类型
            // that.setData({
            //     isFocus: false,//失去焦点
            //     wallets_password_flag: false,
            //     wallets_password:null
            // })
            if (stute == 0) {       //如果是服务订单
                //获取token
                wx.getStorage({
                    key: 'userinfo',
                    success: function(res) {
                        //请求接口
                        wx.showLoading({
                            title: '请稍候',
                        })
                        wx.request({
                            url: url +'api/User/walletPay',
                            data:{
                                token:res.data.token,
                                subscribe_id: that.data.subscribe_id,
                                pay_password:md5.hexMD5(that.data.wallets_password),
                                use_coupon: that.data.discountid
                            },
                            method:"POST",
                            success:function(res){
                                wx.hideLoading();
                                if(res.data.code == 200){
                                    wx.redirectTo({
                                        url: '../QR/QR?into_type=0&subscribe_id='+res.data.data.data.subscribe_id,
                                    })
                                    that.setData({
                                        isFocus: false,//失去焦点
                                        wallets_password_flag: false,
                                        wallets_password: null
                                    })
                                }else{
                                    wx.showToast({
                                        title: res.data.msg,
                                        image:"../../img/errer.png",
                                        duration:1500,
                                        mask:true
                                    })
                                }
                            },
                            error:function(){
                                wx.hideLoading();
                                wx.showToast({
                                    title: "网络错误",
                                    image:"../../img/errer.png",
                                    duration:1500,
                                    mask:true
                                })
                            }
                        })
                    },
                })
            } else {                //如果是商品订单
                //获取token
                wx.getStorage({
                    key: 'userinfo',
                    success: function(rest) {
                        wx.showLoading({
                            title: '请稍候',
                        })

                        var shipping = 1;
                        for (var i = 0; i < that.data.goodsreceipt.length;i++){
                            if (that.data.goodsreceipt[i].checked) {
                                shipping = that.data.goodsreceipt[i].name;
                                break;
                            }
                        }
                        
                        wx.request({
                            url: url +'api/User/walletPayOrderForm',
                            data:{
                                token:rest.data.token,
                                order_form_id:that.data.subscribe_id,
                                pay_password: md5.hexMD5(wallets_password),
                                shipping: shipping,
                                coupon_id:that.data.discountid
                            },
                            method:"POST",
                            success:function(res){
                                wx.hideLoading();
                                if(res.data.data.result == 1){
                                    wx.showToast({
                                        title: '支付成功',
                                        duration:1500,
                                        mask:true,
                                        success:function(){
                                            wx.redirectTo({
                                                url: '../shop/Orderdetails/Orderdetails?states=0&id='+that.data.subscribe_id,
                                            })
                                        }
                                    })
                                    that.setData({
                                        isFocus: false,//失去焦点
                                        wallets_password_flag: false,
                                        wallets_password: null
                                    })
                                }else{
                                    wx.showToast({
                                        title: res.data.msg,
                                        image: '../../img/errer.png',
                                        duration: 1500,
                                        mask: true
                                    })
                                }
                            },
                            fail:function(){
                                wx.hideLoading();
                                wx.showToast({
                                    title: '网络错误',
                                    image:'../../img/errer.png',
                                    duration:1500,
                                    mask:true
                                })
                            }
                        })
                    },
                })
                
                
            }
        }
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var that = this;
        //option.stute      0：服务订单 1：商品订单
        //option.subscribe_id   订单id
        //options.into_state   0:商品页面进来 1:订单页面进来
        console.log(options.is_terrace)
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                that.setData({
                    paystatue: res.data.data.pay,
                })
            }
        })
        //设置本页面所要支付的订单的订单类型，是服务订单还是商品订单
        that.setData({
            stute: options.stute,       //0 服务 1商品
            subscribe_id:options.id,      //订单id
            shopnum:options.num,        //商品数量
            Platform:options.is_terrace,        //1平台 2店铺
            into_state:options.into_state,     //入口方式
            store_id:options.store_id
        })

        //判断stute，如果是服务订单，那请求服务订单的去支付接口；如果是商品订单，就请求商品订单的去支付接口
        //服务订单去支付接口
        if (options.stute == 0){
            // 请求接口,先获取token
            wx.getStorage({
                key: 'userinfo',
                success: function (rest) {
                    wx.showLoading({
                        title: '请稍候',
                    })  
                    console.log(rest.data.data.pay)
                    //获取服务订单的订单信息
                    wx.request({
                        url: url + 'api/User/payOrderForm',
                        data: {
                            token: rest.data.token,
                            subscribe_id: options.id           //获取id，zjy传的是id
                        },
                        method: "POST",
                        success: function (res) {
                            wx.hideLoading();
                            if (res.data.code == 200) {
                                // 如果返回成功并取到值,就修改本页面的值
                                that.setData({
                                    all: res.data.data.data.money,
                                    favourable: res.data.data.data.favourable,
                                    num: res.data.data.data.true_money,
                                    fwname: res.data.data.data.service_name,
                                    subscribe_id: res.data.data.data.subscribe_id, 
                                    store_id: res.data.data.data.store_id,
                                    actual_fee: res.data.data.data.true_money,
                                    actruall_fee2: res.data.data.data.true_money
                                })

                                //请求优惠券数量列表
                                wx.showLoading({
                                    title: '加载中',
                                })
                                console.log(that.data.Platform)
                                wx.request({
                                    url: url+"api/User/getDiscountnum",
                                    data:{
                                        token:rest.data.token,
                                        store_id:that.data.store_id,
                                        money: that.data.all - that.data.express,
                                        type:Number(that.data.stute)+1,
                                        platform:that.data.Platform
                                    },
                                    method:"POST",
                                    success:function(res){
                                        wx.hideLoading();
                                        if(res.data.code == 200){
                                            that.setData({
                                                discountnum:res.data.data.discountnum
                                            })
                                        }else{
                                            wx.showToast({
                                                title: res.data.msg,
                                                image:'../../errer.png',
                                                duration:1500,
                                                mask:true
                                            })
                                        }
                                    },
                                    fail:function(){
                                        wx.hideloading();
                                        wx.showToast({
                                            title: '网络错误',
                                            image:"../../errer.png",
                                            duration:1500,
                                            mask:true
                                        })
                                    }
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
        }
        //如果是商品订单，请求商品订单去支付接口
        if(options.stute == 1){
            if (options.into_state == 1) {     //如果是已下单尚未支付的订单
                //获取token
                wx.getStorage({
                    key: 'userinfo',
                    success: function (rest) {
                        wx.showLoading({
                            title: '请稍候',
                        })
                        
                        //请求商品订单-去支付接口
                        wx.request({
                            url: url + 'api/User/OrderFormGoPay',
                            data: {
                                token: rest.data.token,
                                order_form_id: options.id
                            },
                            method: "POST",
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data.code == 200) {
                                    that.setData({
                                        subscribe_id: res.data.data.order_form_id,
                                        shopimg: res.data.data.img,
                                        shopname: res.data.data.goods_name,
                                        shopPrice: res.data.data.shop_price,
                                        shopnum: res.data.data.number,
                                        discountid: 0,
                                        sale: 0,
                                        express:res.data.data.express_price,
                                        cunexpress: res.data.data.express_price,
                                        store_id: res.data.data.platform_id,
                                        Platform: res.data.data.platform_id==0?"1":"2"
                                    });
                                    var Platform = res.data.data.platform_id==0 ? "1" : "2";
                                    var goodsreceipt = that.data.goodsreceipt;
                                    console.log(res.data.data.platform_id == 0 ? "1" : "2");
                                    if (Platform == 1) {
                                        goodsreceipt[0].item_border = "";
                                        goodsreceipt.pop();
                                        that.setData({
                                            goodsreceipt: goodsreceipt
                                        })
                                    }
                                    

                                    if (res.data.data.shipping == 2) {      //如果是收货方式是上门自取
                                        that.setData({
                                            goodsreceipt: [
                                                {
                                                    name: "1",
                                                    item_border: 'payfor_item_border',
                                                    ico: 'icon-kuaidi',
                                                    value: "快递邮寄",
                                                    checked: false
                                                }, {
                                                    name: "2",
                                                    item_border: '',
                                                    ico: 'icon-ziqu pay_yue',
                                                    value: "上门自取",
                                                    checked: true
                                                }
                                            ],
                                            express:0
                                        })
                                        var shopPrice = that.data.shopPrice;
                                        var express = that.data.express;
                                        var shopnum = that.data.shopnum;
                                        var all = Number(shopPrice) * Number(shopnum);
                                        var sale = that.data.sale;
                                        that.setData({
                                            all: all.toFixed(2),
                                            num: (all - sale).toFixed(2),
                                            actual_fee: Number(all - sale).toFixed(2)
                                        })
                                    }else{
                                        var shopPrice = that.data.shopPrice;
                                        var express = that.data.express;
                                        var shopnum = that.data.shopnum;
                                        var all = Number(shopPrice) * Number(shopnum) + Number(express);
                                        var sale = that.data.sale;
                                        that.setData({
                                            all: all.toFixed(2),
                                            num: (all - sale).toFixed(2),
                                            actual_fee: Number(all - sale).toFixed(2)
                                        })
                                    }
                                    if(res.data.data.pay_type == 1){        //如果收货方式是快递
                                        console.log(res.data.data.pay_type)
                                        that.setData({
                                            payfor: [
                                                {
                                                    name: "1",
                                                    item_border: 'payfor_item_border',
                                                    ico: 'icon-yue pay_yue',
                                                    value: "账户余额",
                                                    checked: false
                                                },
                                                {
                                                    name: "2",
                                                    item_border: '',
                                                    ico: 'icon-0023 pay_weixin',
                                                    value: "微信支付",
                                                    checked: true
                                                }
                                            ]
                                        })
                                        
                                    }
                                    //有了商品id，请求优惠券数量列表
                                    console.log(that.data.all)
                                    console.log(that.data.express)
                                    var money ;
                                    if (res.data.data.shipping == 2) {
                                        var money = that.data.all;
                                    }else{
                                        var money = that.data.all - that.data.express;
                                    }
                                    wx.request({
                                        url: url + 'api/User/getDiscountnum',
                                        data: {
                                            token: rest.data.token,
                                            store_id: that.data.store_id,
                                            money: money,
                                            type: Number(that.data.stute) + 1,
                                            platform:that.data.Platform
                                        },
                                        method: "POST",
                                        success: function (res) {
                                            wx.hideLoading();
                                            if (res.data.code == 200) {
                                                that.setData({
                                                    discountnum: res.data.data.discountnum
                                                })
                                            } else {
                                                wx.showToast({
                                                    title: res.data.msg,
                                                    image: '../../img/errer.png',
                                                    duration: 1500,
                                                    mask: true
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

                                } else {
                                    wx.showToast({
                                        title: res.data.msg,
                                        img: '../../img/errer.png',
                                        duration: 1500,
                                        mask: true
                                    })
                                }
                            },
                            error: function () {
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
                })
            }
            if (options.into_state == 0){      //店铺商品-选择商品下单进入本页面
                //获取token
                
                wx.getStorage({
                    key: 'userinfo',
                    success: function(resa) {
                        wx.showLoading({
                            title: '请稍候',
                        })
                        //有商品id，获取商品信息
                        wx.request({
                            url: url +'api/User/getGoodsInfo',
                            data:{
                                token: resa.data.token,
                                goods_id:options.goods_id,
                                type:2
                            },
                            method:"POST",
                            success: function (res) {
                                wx.hideLoading();
                                if(res.data.code == 200){
                                    that.setData({
                                        shop_id: res.data.data.goods_id,
                                        shopname: res.data.data.goods_name,
                                        express: res.data.data.express_price,
                                        cunexpress: res.data.data.express_price,
                                        shopimg: res.data.data.top_image,
                                        shopPrice: Number(res.data.data.goods_money)
                                        // discountnum: res.data.data.discountnum,
                                    })

                                    var shopPrice = that.data.shopPrice;
                                    var express = that.data.express;
                                    var shopnum = that.data.shopnum;
                                    var all = Number(shopPrice) * Number(shopnum) + Number(express);
                                    var sale = that.data.sale;
                                    that.setData({
                                        all: all.toFixed(2),
                                        num: (all - sale).toFixed(2),
                                        actual_fee: Number(all - sale).toFixed(2)
                                    })
                                    
                                }else{
                                    wx.showToast({
                                        title: res.data.msg,
                                        image: "../../img/errer.png",
                                        duration: 1500,
                                        mask: true
                                    })
                                }

                                //获取优惠券个数
                                wx.request({
                                    url: url + 'api/User/getDiscountnum',
                                    data: {
                                        token: resa.data.token,
                                        store_id: options.store_id,
                                        money: that.data.all - that.data.express,
                                        type: Number(that.data.stute)+1,
                                        platform:that.data.Platform
                                    },
                                    method: "POST",
                                    success: function (res) {
                                        wx.hideLoading();
                                        if (res.data.code == 200) {
                                            that.setData({
                                                discountnum: res.data.data.discountnum
                                            })
                                        } else {
                                            wx.showToast({
                                                title: res.data.msg,
                                                image: '../../img/errer.png',
                                                duration: 1500,
                                                mask: true
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
                            fail:function(){
                                wx.hideLoading();
                                wx.showToast({
                                    title: '网络错误',
                                    image:"../../img/errer.png",
                                    duration:1500,
                                    mask:true
                                })
                            }
                        })
                    },
                })
                var stute = options.stute;
                var Platform = that.data.Platform;
                console.log(Platform)
                var goodsreceipt = that.data.goodsreceipt;
                if (Platform == 1) {
                    goodsreceipt[0].item_border = "";
                    goodsreceipt.pop();
                    that.setData({
                        goodsreceipt: goodsreceipt
                    })
                }
                if (stute == 1) {
                    var shopPrice = that.data.shopPrice;
                    var express = that.data.express;
                    var shopnum = that.data.shopnum;
                    var all = shopPrice * shopnum + express;
                    var sale = that.data.sale;
                    that.setData({
                        all: all.toFixed(2),
                        num: (all - sale).toFixed(2),
                        actual_fee: Number(all - sale).toFixed(2)
                    })
                }
            }
        }
        


        
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        this.pcice();
    },
    pcice: function (e) {
        let actual_fee = this.data.actual_fee;
        let actual_fee2 = Number(actual_fee).toFixed(2);
        this.setData({
            actual_fee2: actual_fee2
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var stute = this.data.stute;
        var that =this;
        var goodsreceipt = that.data.goodsreceipt;
        if (stute==0){
            var all = that.data.all;
            var sale = that.data.sale;
            that.setData({
                num: (all - sale).toFixed(2),
                actual_fee: (all - sale).toFixed(2)
            })
        }else{
            if (goodsreceipt[0].checked) {
                var shopPrice = that.data.shopPrice;
                var express = that.data.express;
                var shopnum = that.data.shopnum;
                var all = shopPrice * shopnum + (express * 1);
                var sale = that.data.sale;
                that.setData({
                    all: all.toFixed(2),
                    num: (all - sale).toFixed(2),
                    actual_fee: Number(all - sale).toFixed(2)
                })
            } else {
                var shopPrice = that.data.shopPrice;
                var shopnum = that.data.shopnum;
                var all = shopPrice * shopnum ;
                var sale = that.data.sale;
                that.setData({
                    all: all.toFixed(2),
                    num: (all - sale).toFixed(2),
                    actual_fee: Number(all - sale).toFixed(2)
                })
            }

            
        }

        console.log(that.data.discountid);
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



    close_wallets_password: function () {//关闭钱包输入密码遮罩
        this.setData({
            isFocus: false,//失去焦点
            wallets_password_flag: false,
            wallets_password: null
        })
    },

    //点击去付款以后
    pay: function () {
        var that = this;
        var shipping = null;        //收货方式
        for (var i = 0; i < that.data.goodsreceipt.length; i++) {
            if (that.data.goodsreceipt[i].checked == true) {
                shipping = that.data.goodsreceipt[i].name;
            }
        }
        var paoyment_type = null;       //支付方式
        for (var i = 0; i < that.data.payfor.length; i++) {
            if (that.data.payfor[i].checked == true) {
                paoyment_type = that.data.payfor[i].name;
            }
        }
        //判断订单类型 0服务订单 1商品订单
        if (that.data.stute == 0) {   //服务订单
            var subscribe_id = that.data.subscribe_id;
            if (paoyment_type == 1){        //微信支付
                //获取token
                wx.getStorage({
                    key: 'userinfo',
                    success: function(rest) {
                        that.wechat_pay_service(rest.data.token, subscribe_id);
                        // if (that.wechat_pay_service(rest.data.token, subscribe_id)) {       //请求微信支付
                        //     wx.showToast({
                        //         title: '支付成功',
                        //         duration:1500,
                        //         mask:true,
                        //         success:function(){
                        //             wx.redirectTo({
                        //                 url: '../QR/QR?states=0&subscribe_id=' + subscribe_id,
                        //             })
                        //         }
                        //     })
                        // }else{
                        //     console.log(1111)
                        //     wx.showToast({
                        //         title: '支付失败',
                        //         image:'../../img/errer.png',
                        //         duration: 1500,
                        //         mask: true
                        //     })
                        // }
                    },
                })
                
            }
            if (paoyment_type == 2){ 
                if (that.data.paystatue==0){
                    wx.showModal({
                        title: '提示',
                        content: '请设置支付密码',
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../Setup/Setup',
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    return false;
                }       //钱包支付
                that.pcice();       //出现输入密码弹窗
                console.log('钱包支付');
                that.setData({
                    wallets_password_flag: true,
                    isFocus: true
                })
            }
        }
        if (that.data.stute == 1){       //商品订单
            //判断入口 0 商品进入 1 订单进入  商品订单的功能，因为从商品进来和从订单进来不同之处就是商品点击支付才生成订单，而从订单进来的话不需要再生成订单
            if (that.data.into_state == 0) {    //商品进入
                that.setData({
                    into_state: 1
                })
                wx.getStorage({
                    key: 'userinfo',
                    success: function (rest) {
                        wx.showLoading({
                            title: '请稍候',
                        })
                        //发起请求
                        wx.request({
                            url: url + 'api/User/buyGoods',
                            data: {
                                token: rest.data.token,
                                goods_id: that.data.shop_id,
                                number: that.data.shopnum,
                                shipping: shipping,
                                store_id: that.data.store_id,
                                terrace: that.data.Platform,
                                coupon_id: that.data.discountid,
                                pay_type: paoyment_type
                            },
                            method: "POST",
                            success: function (res) {
                                wx.hideLoading();
                                if(res.data.code==200){
                                    if (res.data.data.result == 1) {
                                        that.setData({
                                            subscribe_id: res.data.data.order_form_id
                                        })

                                        if (paoyment_type == 1) {    //微信支付
                                            // 微信自带密码输入框
                                            console.log('微信支付')
                                            var express;
                                            if (that.data.goodsreceipt[0].checked == true) {
                                                express = that.data.express;
                                            } else {
                                                express = 0;
                                            }
                                            console.log(express);
                                            //将订单id传入微信支付方法中，得到返回值
                                            if (that.wechat_pay_product(rest.data.token, subscribe_id, that.data.discountid, express)) {
                                                wx.redirectTo({
                                                    url: '../shop/Orderdetails/Orderdetails?states=0&id=' + subscribe_id,
                                                })
                                            }

                                        } else if (paoyment_type == 2) {     //钱包支付
                                            if (that.data.paystatue == 0) {
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '请设置支付密码',
                                                    success: function (res) {
                                                        if (res.confirm) {
                                                            wx.redirectTo({
                                                                url: '../Setup/Setup',
                                                            })
                                                        } else if (res.cancel) {
                                                            console.log('用户点击取消')
                                                        }
                                                    }
                                                })
                                                return false;
                                            }
                                            that.pcice();       //出现输入密码弹窗
                                            that.setData({
                                                wallets_password_flag: true,
                                                isFocus: true
                                            })
                                        }
                                    } else {
                                        that.setData({
                                            into_state: 0
                                        })
                                        wx.showToast({
                                            title: res.data.msg,
                                            image: '../../img/errer.png',
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                } else if (res.data.code == 444){
                                    that.setData({
                                        into_state: 0
                                    })
                                    wx.showModal({
                                        title: '提示',
                                        content: "请设置默认地址",
                                        success: function (res) {
                                            if (res.confirm) {
                                                wx.redirectTo({
                                                    url: '../personal/my_address/my_address',
                                                })
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })
                                }else{
                                    that.setData({
                                        into_state: 0
                                    })
                                }
                            },
                            fail: function () {
                                that.setData({
                                    into_state: 0
                                })
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
                })
            } else {        //订单进入
                if (paoyment_type == 1) {    //微信支付
                    // 微信自带密码输入框
                    //先获取token
                    var subscribe_id = that.data.subscribe_id;
                    wx.getStorage({
                        key: 'userinfo',
                        success: function (rest) {
                            wx.showLoading({
                                title: '请稍候',
                            })
                            var express;
                            if (that.data.goodsreceipt[0].checked == true) {
                                express = that.data.express;
                            } else {
                                express = 0;
                            }
                            //将订单id传入微信支付方法中，得到返回值
                            if (that.wechat_pay_product(rest.data.token, subscribe_id, that.data.discountid, express)) {
                                wx.redirectTo({
                                    url: '../shop/Orderdetails/Orderdetails?states=0&id=' + subscribe_id,
                                })
                            }
                        },
                    })
                } else if (paoyment_type == 2) {     //钱包支付
                    if (that.data.paystatue == 0) {
                        wx.showModal({
                            title: '提示',
                            content: '请设置支付密码',
                            success: function (res) {
                                if (res.confirm) {
                                    wx.redirectTo({
                                        url: '../Setup/Setup',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                        return false;
                    } 
                    that.pcice();       //出现输入密码弹窗
                    console.log('钱包支付');
                    that.setData({
                        wallets_password_flag: true,
                        isFocus: true
                    })
                }
            }
        }
    },
    //微信支付方法，需传入订单id和token      商品的
    wechat_pay_product: function (token, subscribe_id, coupon_id, express){
        var that = this;
        var wechat_pay_state = false;
        var payment = null;
        for (var i = 0; i < that.data.goodsreceipt.length;i++){
            if (that.data.goodsreceipt[i].checked == true){
                payment = that.data.goodsreceipt[i].name;
            }
        }
        

        wx.request({            //获取商品订单微信支付参数
            url: url + 'api/User/getPayParam',
            data: {
                coupon_id: coupon_id,
                express: express,
                token: token,
                order_form_id: that.data.subscribe_id,
                shipping: payment*1
            },
            method: "POST",
            success: function (respay) {
                if (respay.data.code == 200) {
                    wx.showLoading({
                        title: '请稍候',
                    })
                    wx.requestPayment({     //调起微信支付
                        'timeStamp': respay.data.data.data.timestamp+"",
                        'nonceStr': respay.data.data.data.nonceStr,
                        'package': respay.data.data.data.package,
                        'signType': 'MD5',
                        'paySign': respay.data.data.data.paySign,
                        'success': function (res) {
                            wx.hideLoading();
                            wx.showToast({
                                title: '支付成功',
                                duration: 1500,
                                mask: true,
                                success: function () {
                                    wechat_pay_state = true;

                                    wx.redirectTo({
                                        url: '../shop/Orderdetails/Orderdetails?states=0&id=' + that.data.subscribe_id,
                                    })
                                }
                            })
                            return wechat_pay_state;
                        },
                        'fail': function (res) {
                            console.log(res)
                            wx.hideLoading();
                            wx.showToast({
                                title: ' 支付失败',
                                image: '../../img/errer.png',
                                duration: 1500,
                                mask: true
                            })
                            that.setData({
                                into_state:1
                            })
                            return wechat_pay_state;
                        }
                    })
                }
            },
            fail: function () {
                console.log(res);
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误',
                    image: '../../img/errer.png',
                    duration: 1500,
                    mask: true
                })
                return wechat_pay_state;
            }
        })
        
    }
    ,//微信支付方法，需传入订单id和token      服务的
    wechat_pay_service: function (token, subscribe_id) {
        var that = this;
        var wechat_pay_state = false;
        var coupon_id = that.data.discountid;
        wx.request({
            url: url + 'api/User/pay',
            data: {
                coupon_id: coupon_id,
                token: token,
                subscribe_id: that.data.subscribe_id
            },
            method: "POST",
            success: function (respay) {
                if (respay.data.code == 200) {
                    wx.showLoading({
                        title: '请稍候',
                    })
                    wx.requestPayment({
                        'timeStamp': respay.data.data.data.timestamp + "",
                        'nonceStr': respay.data.data.data.nonceStr,
                        'package': respay.data.data.data.package,
                        'signType': 'MD5',
                        'paySign': respay.data.data.data.paySign,
                        'success': function (res) {
                            wx.hideLoading();
                            wx.showToast({
                                title: '支付成功',
                                duration: 1500,
                                mask: true,
                                success: function () {
                                    wechat_pay_state = true;
                                    
                                    wx.redirectTo({
                                        url: '../QR/QR?states=0&subscribe_id=' + that.data.subscribe_id,
                                    })
                                }
                            })
                            return wechat_pay_state;
                        },
                        'fail': function (res) {
                            console.log(res)
                            wx.hideLoading();
                            wx.showToast({
                                title: ' 支付失败',
                                image: '../../img/errer.png',
                                duration: 1500,
                                mask: true
                            })
                            return wechat_pay_state;
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
                return wechat_pay_state;
            }
        })
        
    }
})
