// pages/Setup/Setup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo :{
            pay: 0,
            telephone: ""
        }
        
    },
    // tuibtn:function(){
    //     wx.showModal({
    //         title: '提示',
    //         content: '是否退出?',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击确定')
    //             } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //             }
    //         }
    //     })
    // },
    setpay:function(){
        var telephone = this.data.userinfo.data.telephone;
        if (telephone==0){
            wx.showToast({
                title: '请先绑定手机号',
                image: '../../img/errer.png',
                duration: 1500,
                mask: true
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                that.setData({
                    userinfo: res.data
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
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                that.setData({
                    userinfo: res.data
                })
            }
        })
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