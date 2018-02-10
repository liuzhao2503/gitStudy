// pages/shop/Returngoods/Returngoods.js
var url = require('../../../app.js').url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      problem:null,
      Platform:1,
      commoditynum:11,
      commodityimg:"../../../img/img1.jpg",
      commodityname: "海飞丝高效去屑洗发水无硅油洗头水油洗头水海飞丝高海飞丝高效去屑洗发水无硅油洗头水油洗头水海飞丝高",
      commodityPrice: 80,
      Servicetype:"退货",
      Refunds:"原支付返还",
      lxname:null,
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
              value: "到店退货",
              checked: false
          }
      ],
      lxtel:null,
      order_form_id:null
  },
  goodsreceiptradioChange: function (e) {
      var that = this;
      var goodsreceipt = that.data.goodsreceipt;
      let checked_2 = e.detail.value;
      for (var i = 0; i < goodsreceipt.length; i++) {
          if (checked_2.indexOf(i + 1 + "") != -1) {
              goodsreceipt[i].checked = true;
          } else {
              goodsreceipt[i].checked = false;
          }
      }
    
      that.setData({
          goodsreceipt: goodsreceipt
      })
  },

  //输入框数据绑定
  bind_input_obj1:function(e){
    var that = this;
    that.setData({
        problem:e.detail.value
    })
  },
  bind_input_obj2: function (e) {
      var that = this;
      that.setData({
          lxname: e.detail.value
      })
  },
  bind_input_obj3: function (e) {
      var that = this;
      that.setData({
          lxtel: e.detail.value
      })
  },

  //点击确定-提交信息
  return_goods_submit:function(){
        var that = this;
        var lxname = that.data.lxname;
        var lxtel = that.data.lxtel;
        var problem = that.data.problem;
        var reject_type = null;
        for (var i = 0; i < that.data.goodsreceipt.length;i++){
            if (that.data.goodsreceipt[i].checked == true){
                reject_type = that.data.goodsreceipt[i].name;
            }
        }

        if (problem != null){
            if(lxname != null){
                if(lxtel != null){
                    //获取token
                    wx.getStorage({
                        key: 'userinfo',
                        success: function (res) {
                            wx.showLoading({
                                title: '请稍候',
                            })
                            wx.request({
                                url: url + 'api/User/returnedPurchase',
                                data: {
                                    token: res.data.token,
                                    order_form_id: that.data.order_form_id,
                                    reject: problem,
                                    reject_type: reject_type,
                                    username: lxname,
                                    telephone: lxtel
                                },
                                method: "POST",
                                success: function (res) {
                                    wx.hideLoading();
                                    if (res.data.code == 200) {
                                        if(res.data.data.data.result == 1){
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
                                        }else{
                                            wx.showToast({
                                                title: res.data.msg,
                                                image: "../../../img/errer.png",
                                                duration: 1500,
                                                mask: true
                                            })
                                        }
                                    } else {
                                        wx.showToast({
                                            title: res.data.msg,
                                            image: "../../../img/errer.png",
                                            duration: 1500,
                                            mask: true
                                        })
                                    }
                                },
                                fail: function () {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '网络错误',
                                        image: "../../../img/errer.png",
                                        duration: 1500,
                                        mask: true
                                    })
                                }
                            })
                        },
                    })
                }else{
                    wx.showToast({
                        title: '请输入联系方式',
                        image: "../../../img/errer.png",
                        du: 1500,
                        mask: true
                    })
                }
            }else{
                wx.showToast({
                    title: '请输入联系人',
                    image: "../../../img/errer.png",
                    du: 1500,
                    mask: true
                })
            }
        }else{
            wx.showToast({
                title: '请输入退货原因',
                image: "../../../img/errer.png",
                du: 1500,
                mask: true
            })
        }

        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      
    //设置id
      that.setData({
          order_form_id:options.id
      })

      //开局根据订单id获取订单信息
      wx.showLoading({
          title: '加载中',
      })
      wx.getStorage({
          key: 'userinfo',
          success: function(res) {
              wx.request({
                  url: url +'api/User/getOrderFormInfo',
                  data:{
                      token:res.data.token,
                      order_form_id:options.id
                  },
                  method: "POST",
                  success:function(res){
                      wx.hideLoading();
                    if(res.data.code == 200){
                        that.setData({
                            commoditynum: res.data.data.number,
                            commodityimg: res.data.data.img,
                            commodityname: res.data.data.goods_name,
                            Platform: res.data.data.store_id,
                            commodityPrice: res.data.data.money
                        })
                        var Platform = res.data.data.store_id;
                        var goodsreceipt = that.data.goodsreceipt;
                        if (Platform == 0) {
                            goodsreceipt[0].item_border = "";
                            goodsreceipt.pop();
                            that.setData({
                                goodsreceipt: goodsreceipt
                            })
                        }
                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            image:'../../../img/errer.png',
                            duration:1500,
                            mask:true
                        })
                    }
                  },
                  fail:function(){
                      wx.hideLoading();
                      wx.showToast({
                          title: '网络错误',
                          image:'../../../img/errer.png',
                          duration:1500,
                          mask:true
                      })
                  }
              })
          },
          fail:function(){
              wx.hideLoading();
              wx.showToast({
                  title: '获取信息失败',
                  image:'../../../oimg/errer.png',
                  duration:1500,
                  mask:true
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