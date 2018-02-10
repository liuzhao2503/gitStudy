// pages/shop/Returninformation/Returninformation.js
var url = require('../../../app.js').url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: "",
        name: "",
        tel: "",
        order_form_id:null,
        rejected_id:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            order_form_id:options.id
        })

        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                wx.showLoading({
                    title: '请稍候',
                })
                wx.request({
                    url: url +'api/User/consignee',
                    data:{
                        token:res.data.token,
                        order_form_id:options.id
                    },
                    method:'POST',
                    success:function(res){
                        wx.hideLoading();
                        if(res.data.code == 200){
                            if(res.data.data != null){
                                that.setData({
                                    address: res.data.data.receiver_address,
                                    name: res.data.data.receiver_name,
                                    tel: res.data.data.receiver_telephone,
                                    order_form_id: options.id,
                                    rejected_id: res.data.data.rejected_id
                                })
                            }else{
                                wx.showToast({
                                    title: '网络出错啦',
                                    image:'../../../img/errer.png',
                                    duration:2000,
                                    mask:true
                                })
                            }
                        }else{
                            wx.showToast({
                                title: res.data.msg,
                                image:"../../../img/errer.png",
                                duration:1500,
                                mask:true
                            })
                        }
                    },
                    error:function(){
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络错误',
                            image:"../../../img/errer.png",
                            duration:1500,
                            mask:true
                        })
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

    }
})