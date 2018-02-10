// pages/hairdresser_details/hairdresser_details.js
var url = require('../../app.js').url;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cunyear: [],
        pageyear: "",
        pageday: "",
        pagehour: "",
        pageminute: "",
        value: [0, 0, 0],
        timeArray: [],
        hint: false,
        scrvice_list: [],
        barber_id: "",
        barber_name: "",
        img: "",
        position: "",
        comment: "",
        position: "",
        subscribe_count: "",
        name: '',
        tel: '',
        date: '',
        hmstarttime: '',
        hmdata: "",
        allprice: 0,
        scrvice: []
    },
    bindMultiPickerColumnChange: function (e) {
        console.log(e)
        var that = this;
        var day = that.data.day;
        var hour = that.data.hour;
        var minute = that.data.minute;
        var newminute = that.data.newminute;
        var timeArray = that.data.timeArray;
        var newhours = that.data.newhours;
        var column = e.detail.column;
        var value = e.detail.value;
        var valuedata = that.data.value;
        console.log(valuedata)
        valuedata[e.detail.column] = e.detail.value;
        if (column == 0) {
            if (value == 0) {
                console.log(value)
                valuedata[1] = value;
                that.setData({
                    timeArray: [day, newhours, newminute],
                })
            }
            valuedata[1] = 0;
            valuedata[2] = 0;
        }
        if (valuedata[0] == 0) {
            if (column == 1) {
                if (value != 0) {
                    console.log(value)
                    valuedata[1] = value;
                    
                    that.setData({
                        timeArray: [day, newhours, minute]
                    })
                }
                if (value == 0){
                    console.log(value)
                    valuedata[1] = value;
                    that.setData({
                        timeArray: [day, newhours, newminute]
                    })
                }
                valuedata[2] = 0;
            }
        }
        if (column == 1) {
            valuedata[2] = 0;
        }

        if (column == 0) {
            if (value != 0) {
                console.log(value)
                valuedata[1] = value;
                valuedata[1] = 0;
                valuedata[2] = 0;
                that.setData({
                    timeArray: [day, hour, minute]
                })
            }
        }
        that.setData({
            value: valuedata
        })
    },
    bindMultiPickerChange: function (e) {
        var that = this;
        var timeArray = that.data.timeArray;
        var cunyear = that.data.cunyear;;
        that.setData({
            pageyear: cunyear[e.detail.value[0]],
            pageday: timeArray[0][e.detail.value[0]],
            pagehour: timeArray[1][e.detail.value[1]],
            pageminute: timeArray[2][e.detail.value[2]],
            value: e.detail.value
        })
        console.log(cunyear[e.detail.value[0]])
    },
    checkboxChange: function (e) {
        var that = this;
        var allprice = 0;
        var scrvice_list = that.data.scrvice_list;
        let checked_2 = e.detail.value;
        for (var i = 0; i < scrvice_list.length; i++) {
            if (checked_2.indexOf(i + 1 + "") != -1) {
                scrvice_list[i].bool = true;
                allprice = allprice + Number(scrvice_list[i].service_price);
            } else {
                scrvice_list[i].bool = false;
            }
        }
        that.setData({
            scrvice_list: scrvice_list,
            allprice: allprice.toFixed(2)
        })
    },
    to_client_evaluate: function () {
        var barber_id = this.data.barber_id;
        wx.navigateTo({
            url: '../evaluate/client_evaluate/client_evaluate?id=' + barber_id
        })
    },
    name: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    tel: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },
    to_scrvice_pay: function (e) {
        let that = this;
        var scrvice_list = that.data.scrvice_list;
        var service = [];
        for (var a = 0; a < scrvice_list.length; a++) {
            if (scrvice_list[a].bool) {
                service.push(scrvice_list[a].service_id)
            }
        }
        console.log(service)
        var barber_id = that.data.barber_id;
        let allprice = this.data.allprice;
        var token = that.data.token;
        let name = this.data.name;
        let tel = this.data.tel;
        var pageyear = that.data.pageyear;
        var pageday = that.data.pageday;
        var pagehour = that.data.pagehour;
        var pageminute = that.data.pageminute;
        function RemoveChinese(strValue) {
            if (strValue != null && strValue != "") {
                var reg = /[\u4e00-\u9fa5]/g;
                var regs = /-$/gi;
                strValue = strValue.replace(reg, "-");
                return strValue.replace(regs, "");
            }
            else
                return "";
        }
        function RemoveChineseandd(strValue) {
            if (strValue != null && strValue != "") {
                var reg = /[\u4e00-\u9fa5]/g;
                var regs = /:$/gi;
                strValue = strValue.replace(reg, ":");
                return strValue.replace(regs, "");
            }
            else
                return "";
        }
        var subscribe_timeChinese = pageyear + "年" + pageday + " " + pagehour + pageminute;
        var subscribe_time = pageyear + "-" + RemoveChinese(pageday) + " " + RemoveChineseandd(pagehour + pageminute);

        if (allprice == 0) {
            wx.showToast({
                title: '请选择服务',
                image: "../../img/errer.png",
                duration: 1500
            })
        } else {
            if (name == '') {
                wx.showToast({
                    title: '请填写姓名',
                    image: "../../img/errer.png",
                    duration: 1500
                })
            } else {
                if (tel == '') {
                    wx.showToast({
                        title: '请填写电话',
                        image: "../../img/errer.png",
                        duration: 1500
                    })
                } else {
                    if (tel.length == 11) {
                        if (pageyear == '') {
                            wx.showToast({
                                title: '请选择时间',
                                image: "../../img/errer.png",
                                duration: 1500
                            })
                        } else {
                            wx.showLoading({
                                mask: true,
                                title: "预约中"
                            })
                            wx.request({
                                url: url + "api/User/addSubscribe",
                                data: {
                                    token: token,
                                    barber_id: barber_id,
                                    service: service,
                                    name: name,
                                    telephone: tel,
                                    subscribe_time: subscribe_time
                                    // coupon_id
                                },
                                method: "POST",
                                success: function (res) {
                                    wx.hideLoading();
                                    if (res.data.code == 200) {
                                        if (res.data.data.result == 1) {
                                            var subscribe_id = res.data.data.subscribe_id;
                                            wx.redirectTo({
                                                url: '../scrvice_pay/scrvice_pay?stute=0&id=' + subscribe_id
                                            })
                                        } else {
                                            wx.showToast({
                                                title: res.data.msg,
                                                image: '../../img/errer.png',
                                                duration: 1500,
                                                mask: true
                                            })
                                        }
                                    } else {
                                        wx.showToast({
                                            title: res.data.msg,
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
                                        image: '../../../img/errer.png',
                                        duration: 1500,
                                        mask: true
                                    })
                                }
                            })
                        }
                    } else {
                        console.log(tel.length)
                        wx.showToast({
                            title: '手机号输入错误',
                            image: "../../img/errer.png",
                            duration: 1500
                        })
                    }
                }
            }
        }
    },
    //点击跳转到服务详情页
    goto_service_detail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../service_details/service_details?id=' + id
        })
    },
    GetDateStr: function (AddDayCount) {
        var date = new Date();
        date.setDate(date.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = date.getFullYear();
        var m = date.getMonth() + 1;//获取当前月份的日期 
        var d = date.getDate();
        if (m < 10) {
            m = "0" + m
        }
        if (d < 10) {
            d = "0" + d
        }
        return [y, m, d];
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var barber_id = options.id;
        var dd = new Date();
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var cunyear = [];
        var cunmonth = [];
        var day = [];
        var hour = [];
        var minute = [];
        var newhours = [];
        var newminute = [];
        for (var m = 0; m < 60 - minutes; m++) {
            var minutesm = minutes + m;
            if (minutesm < 10) {
                minutesm = "0" + minutesm;
            }
            newminute.push(minutesm + "分")
        }
        for (var n = 0; n < 24 - hours; n++) {
            var hoursn = hours + n;
            if (hoursn < 10) {
                hoursn = "0" + hoursn;
            }
            newhours.push(hoursn + "时")
        }
        for (var i = 0; i < 7; i++) {
            cunyear.push(that.GetDateStr(i)[0]);
            day.push(that.GetDateStr(i)[1] + "月" + that.GetDateStr(i)[2] + "日");
        }
        for (var a = 0; a < 24; a++) {
            if (a < 10) {
                a = "0" + a;
            }
            hour.push(a + "时")
        }
        for (var z = 0; z < 60; z++) {
            if (z < 10) {
                z = "0" + z;
            }
            minute.push(z + "分");
        }
        that.setData({
            cunyear: cunyear,
            cunmonth: cunmonth,
            minute: minute,
            hour: hour,
            newhours: newhours,
            newminute: newminute,
            day: day,
            timeArray: [day, newhours, newminute]
        })
        wx.showLoading({
            mask: true,
            title: "加载中"
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                that.setData({
                    token: res.data.token
                })
                wx.request({
                    url: url + "api/User/barber_info",
                    data: {
                        token: res.data.token,
                        barber_id: barber_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading()
                        if (res.data.code == 200) {
                            that.setData({
                                barber_name: res.data.data.barber_name,
                                img: res.data.data.img,
                                barber_id: res.data.data.barber_id,
                                position: res.data.data.position,
                                comment: res.data.data.comment,
                                position: res.data.data.position,
                                subscribe_count: res.data.data.subscribe_count,
                                scrvice_list: res.data.data.service_list
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
                    fail: function (res) {
                        wx.hideLoading()
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
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {

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