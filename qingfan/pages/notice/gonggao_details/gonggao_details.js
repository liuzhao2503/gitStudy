// pages/gonggao_details/gonggao_details.js
var url = require('../../../app.js').url;
var WxParse = require('../../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var notice_id = options.id;
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var token = res.data.token
                that.setData({
                    token: token
                })
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: url + "api/User/noticeInfo", //仅为示例，并非真实的接口地址
                    data: {
                        token: token,
                        notice_id: notice_id
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            var article = res.data.data.data.notice_content;
                            console.log(article)
                            WxParse.wxParse('article', 'html', article, that, 5);

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
                            title: "网络错误",
                            image: "../../../img/errer.png",
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            }
        })
        
        // var article = '<p><strong><span style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;">前言：</span></strong><span style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;">MKM2</span><span style="color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">&nbsp;水弹枪是一款强力推荐的款型，开始MKM2以分体机匣面世，到现在的整枪形式出售。分体式机匣，托芯触点供电，可调式上旋，锦明三代波箱性方面有保障，用料厚实手感很好，现下这个款型水弹枪第一推荐，原装11V锂电再换装一个给力上旋就可以直接下场了。</span></p><p style="text-align: center;"><strong style="font-size: 18px; background-color: rgb(255, 255, 255); color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; text-align: center; margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">产品说明</strong></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); line-height: 25.6px; box-sizing: border-box !important; word-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">外观图</strong></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img src="https://www.shuidan007.cn/public/uploads/20171101/8232b2c1a895ae47d90159c2f3a3b3d7.jpg" title="8232b2c1a895ae47d90159c2f3a3b3d7.jpg" alt="8232b2c1a895ae47d90159c2f3a3b3d7.jpg"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 14px;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">▲锦明三代波箱370电机、MKM2机匣、鱼骨、CTR后托、可调上旋火帽、11.1锂电、充电器、水弹等；枪身尺寸：75X23cm；供弹：弹匣下供弹；枪托：可伸缩、供电：后托芯供电。</span></em></span></em></span></p><hr/><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; text-decoration: underline;">特点图</span></strong></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><img src="https://www.shuidan007.cn/public/uploads/20171101/858b6433cf5285db9628a3b5cc6619af.jpg" title="858b6433cf5285db9628a3b5cc6619af.jpg" alt="858b6433cf5285db9628a3b5cc661…ord !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 10.5pt; font-family: 宋体;">▲</span></em></strong></span><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 14px;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">初速：初速60左右。</span></em></span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; font-size: 14px; box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 10.5pt; font-family: 宋体;">▲</span></em></em><em style="margin: 0px; padding: 0px; max-width: 100%; font-size: 14px; box-sizing: border-box !important; word-wrap: break-word !important;">发射速度：</em><em style="margin: 0px; padding: 0px; max-width: 100%; font-size: 14px; box-sizing: border-box !important; word-wrap: break-word !important;">&nbsp;8发/秒。</em></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 10.5pt; font-family: 宋体;">▲</span></em></em></span><span style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; box-sizing: border-box !important; word-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">13米下抛。</span></em></span></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); box-sizing: border-box !important; word-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">最后总结</strong><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">：【<span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;">MKM2</span>】个人感觉即使是这样泛滥的款型还是能有惊艳的感觉，本身材质很不错结构连接强度可以，相对于以前的MK18只是外壳，而这次MKM2整枪配置更为实惠，我个人认为这次的MKM2换掉原装的可调上旋自己买一个，这样的配置真的完全可以下场了。以前一直都推荐锦明二代什么的，就我个人拿到MKM2而言我现在更推荐它。</span><br/></p><p><span style="color: rgb(62, 62, 62); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);"><img src="https://www.shuidan007.cn/public/uploads/20171101/47977adf11049b657144df1cf8e999c2.jpg" title="47977adf11049b657144df1cf8e999c2.jpg" alt="47977adf11049b657144df1cf8e999c2.jpg"/></span><br/></p>'
        // WxParse.wxParse('article', 'html', article, that, 5);

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