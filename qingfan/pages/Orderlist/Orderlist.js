 // pages/shop/Orderlist/Orderlist.js
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
        isfreshing: true,
        service_order_page: 0,       //服务订单page,传页数的时候从1开始,这里设置为0,在调用接口前+1就会变成1
        product_order_page: 0,       //商品订单page,传页数的时候从1开始,这里设置为0,在调用接口前+1就会变成1
        activeindex: "",
        dates: "",
        times: "",
        timemask: false,
        array: ['商品订单', '服务订单'],
        index: 1,       //0 商品订单 1 服务订单
        activea: 0,
        the_type: ['已取消', '待支付', '待消费', '待评价', "已完成"],
        the_bottom_2: ['', '去支付', '修改预约时间', '去评价', ''],
        all_list: [],
        wait_pay_list: [],      //待支付
        wait_shouhuo_list: [],      //待消费
        wait_evaluate_list: [],     //待评价
        wait_cancel_list: [],       //已取消

        activeb: 0,
        retreat: [],
        comment: [],
        Goodsreceipt: [],
        Pendingdelivery: [],
        Pendingpayment: [],
        orderlist: [],
        actionSheetHidden: true,
        actionSheetItems: [
            { bindtap: 'Menu1', txt: '不想买了' },
            { bindtap: 'Menu2', txt: '信息填写错误' },
            { bindtap: 'Menu3', txt: '临时有事' },
            { bindtap: 'Menu4', txt: '其他原因' }
        ],
        menu: ""
    },

    //1去支付 2修改预约时间 3去评价 
    bottombtntwe: function (e) {
        var that = this;
        var myDate = new Date();
        var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        var data = myDate.getDate();        //获取当前日(1-31)
        var Nowdata = year + "-" + (month + 1) + "-" + data;
        var status = e.currentTarget.dataset.status;
        var subscribe_id = e.currentTarget.dataset.subscribeid;
        var activeindex = e.currentTarget.dataset.index;
        if (status == 1) {
            wx.navigateTo({
                url: '../scrvice_pay/scrvice_pay?stute=0&&id=' + subscribe_id,
            })
        }
        if (status == 2) {
            that.setData({
                starttimea: Nowdata,
                activeindex: activeindex,
                timemask: true
            })
        }
        if (status == 3) {
            wx.navigateTo({
                url: '../evaluate/addevaluate/addevaluate?id=' + subscribe_id +'&order_type=1',
            })
        }
    },
    //切换订单
    bindPickerChange: function (e) {
        console.log(e.detail.value);
        var that = this;
        this.setData({
            activeb: 0,
            activea: 0,
            index: e.detail.value,
        });

        //切换时根据index获取数据
        if (e.detail.value == 0) {
            that.setData({
                product_order_page: 0,
                orderlist: [],
                Pendingdelivery: [],
                Pendingpayment: [],
                Goodsreceipt: [],
                comment: [],
                retreat: [],
                service_order_page: 0,
                all_list: [],
                wait_pay_list: [],      //待支付
                wait_shouhuo_list: [],      //待消费
                wait_evaluate_list: [],     //待评价
                wait_cancel_list: []
            })
            that.get_product_order_list([]);      //传入tab选项值
        } else {
            that.setData({
                product_order_page: 0,
                orderlist: [],
                Pendingdelivery: [],
                Pendingpayment: [],
                Goodsreceipt: [],
                comment: [],
                retreat: [],
                service_order_page: 0,
                all_list: [],
                wait_pay_list: [],      //待支付
                wait_shouhuo_list: [],      //待消费
                wait_evaluate_list: [],     //待评价
                wait_cancel_list: [],       //已取消
            })
            that.get_service_order_list(null);
        }
    },
    //服务顶部切换
    bindChange: function (e) {

        var that = this;
        console.log(e.detail.current)
        that.setData({ activea: e.detail.current });
        var activea = that.data.activea;
        var roduct_tab_type = "";
        if (activea == 1) {
            roduct_tab_type = "1";
        }
        if (activea == 2) {
            roduct_tab_type = "2";
        }
        if (activea == 3) {
            roduct_tab_type = "3";
        }
        if (activea == 4) {
            roduct_tab_type = "0";
        }
        that.setData({
            service_order_page: 0,
            all_list: [],
            wait_pay_list: [],      //待支付
            wait_shouhuo_list: [],      //待消费
            wait_evaluate_list: [],     //待评价
            wait_cancel_list: [],       //已取消
        })
        that.get_service_order_list(roduct_tab_type);
    },
    //商品顶部切换
    bindChangeb: function (e) {
        console.log(e.detail.current);
        var that = this;
        that.setData({ activeb: e.detail.current });
        var activeb = that.data.activeb;
        var product_tab_type = [];
        if (activeb == 1) {
            product_tab_type = [1];
        }
        if (activeb == 2) {
            product_tab_type = [2];
        }
        if (activeb == 3) {
            product_tab_type = [3, 4];
        }
        if (activeb == 4) {
            product_tab_type = [5];
        }
        if (activeb == 5) {
            product_tab_type = [7, 8, 9, 10, 11, 12, 14, 15];
        }
        that.setData({
            product_order_page: 0,
            orderlist: [],
            Pendingdelivery: [],
            Pendingpayment: [],
            Goodsreceipt: [],
            comment: [],
            retreat: []
        })
        that.get_product_order_list(product_tab_type);      //传入tab选项值
        console.log(111)
    },

    //商品订单tab切换
    topnavactiveb: function (e) {
        console.log(3333)
        var that = this;
        console.log(e.target);
        if (that.data.activeb === e.target.dataset.navindex) {
            return false;
        } else {
            that.setData({
                activeb: e.target.dataset.navindex
            })
        }
        //     that.setData({
        //         orderlist: [],
        //         Pendingdelivery: [],
        //         Pendingpayment: [],
        //         Goodsreceipt: [],
        //         comment: [],
        //         retreat: [],
        //         product_order_page: 0        //切换商品订单以后，初始化商品订单的page值
        //     })
        //     var product_tab_type = [];
        //     if (e.target.dataset.navindex == 1) {
        //         product_tab_type = [1];
        //     }
        //     if (e.target.dataset.navindex == 2) {
        //         product_tab_type = [2];
        //     }
        //     if (e.target.dataset.navindex == 3) {
        //         product_tab_type = [3, 4];
        //     }
        //     if (e.target.dataset.navindex == 4) {
        //         product_tab_type = [5];
        //     }
        //     if (e.target.dataset.navindex == 5) {
        //         product_tab_type = [7, 8, 9, 10, 11, 12, 14, 15];
        //     }
        //     that.get_product_order_list(product_tab_type);      //传入tab选项值
    },
    // //服务订单tab切换
    topnavactive: function (e) {
        var that = this;
        if (that.data.activea === e.target.dataset.navindex) {
            return false;
        } else {
            that.setData({
                activea: e.target.dataset.navindex,     //设置当前tab选项值
            })
        }
        //     var activea = that.data.activea;
        //     var roduct_tab_type = "";
        //     if (activea == 1) {
        //         roduct_tab_type = "1";
        //     }
        //     if (activea == 2) {
        //         roduct_tab_type = "2";
        //     }
        //     if (activea == 3) {
        //         roduct_tab_type = "3";
        //     }
        //     if (activea == 4) {
        //         roduct_tab_type = "0";
        //     }
        //     that.setData({
        //         service_order_page: 0,
        //         all_list: [],
        //         wait_pay_list: [],      //待支付
        //         wait_shouhuo_list: [],      //待消费
        //         wait_evaluate_list: [],     //待评价
        //         wait_cancel_list: [],       //已取消
        //     })
        //     that.get_service_order_list(roduct_tab_type);
    },
    // 服务取消订单
    Cancellation: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var top_status = e.currentTarget.dataset.topstatus;
        var activea = that.data.activea;
        var subscribe_id = e.currentTarget.dataset.subscribeid;
        if (activea == 0) {     //全部
            if (top_status == 1) {
                var all_list = that.data.all_list;

                wx.showModal({
                    title: '提示',
                    content: '是否取消订单',
                    success: function (res) {
                        if (res.confirm) {
                            wx.showLoading({
                                title: '请稍后',
                            })
                            //获取token,准备请求接口
                            wx.getStorage({
                                key: 'userinfo',
                                success: function (res) {
                                    //    取消订单接口-发起请求
                                    var o_type = null;
                                    if (top_status == 1) {
                                        o_type = 2;
                                    }
                                    if (top_status == 2) {
                                        o_type = 1;
                                    }
                                    console.log(o_type)
                                    wx.request({
                                        url: url + "api/User/cancelOrderForm",
                                        data: {
                                            token: res.data.token,
                                            subscribe_id: all_list[index].subscribe_id,
                                            type: o_type
                                        },
                                        method: "POST",
                                        success: function (res) {
                                            wx.hideLoading();
                                            if (res.data.code == 200) {
                                                wx.showToast({
                                                    title: '取消成功',
                                                    icon: 'success',
                                                    duration: 1500
                                                })
                                                all_list[index].top_status = 0;
                                                that.setData({
                                                    all_list: all_list
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
                                        fail: function (res) {
                                            wx.hideLoading();
                                            wx.showToast({
                                                title: '网络错误',
                                                icon: "cancel"
                                            })
                                        }
                                    })
                                },
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                })
            } else {
                that.setData({
                    actionSheetHidden: !this.data.actionSheetHidden,
                    actionCancellation: index
                })
            }

        }
        if (activea == 1) {//待支付
            var wait_pay_list = that.data.wait_pay_list;
            wx.showModal({
                title: '提示',
                content: '是否取消订单',
                success: function (res) {
                    if (res.confirm) {

                        wx.showLoading({
                            title: '请稍后',
                        })
                        //获取token,准备请求接口
                        wx.getStorage({
                            key: 'userinfo',
                            success: function (res) {
                                //    取消订单接口-发起请求
                                var o_type = null;
                                if (top_status == 1) {
                                    o_type = 2;
                                }
                                if (top_status == 2) {
                                    o_type = 1;
                                }

                                wx.request({
                                    url: url + "api/User/cancelOrderForm",
                                    data: {
                                        token: res.data.token,
                                        subscribe_id: wait_pay_list[index].subscribe_id,
                                        type: o_type
                                    },
                                    method: "POST",
                                    success: function (res) {
                                        wx.hideLoading();
                                        if (res.data.code == 200) {
                                            wx.showToast({
                                                title: '取消成功',
                                                icon: 'success',
                                                icon: 'success',
                                                duration: 1500
                                            })
                                            wait_pay_list.splice(index, 1);
                                            that.setData({
                                                wait_pay_list: wait_pay_list
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
                                    fail: function (res) {
                                        wx.hideLoading();
                                        wx.showToast({
                                            title: '网络错误',
                                            icon: "cancel"
                                        })
                                    }
                                })
                            },
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (activea == 2) {//待消費
            that.setData({
                actionSheetHidden: !this.data.actionSheetHidden,
                actionCancellation: index
            })
        }

    },
    to_QR: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../QR/QR?subscribe_id=' + id,
        })
    },
    //修改预约时间年月日
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
                if (value == 0) {
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
    // bindDateChange: function (e) {
    //     var that = this;
    //     var myDate = new Date();
    //     var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    //     var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    //     var data = myDate.getDate();        //获取当前日(1-31)
    //     if (month < 10) {
    //         month = "0" + month;
    //     }
    //     if (data < 10) {
    //         data = "0" + data;
    //     }       //获取当前日(1-31)
    //     var Nowdata = year + "-" + month + "-" + data;
    //     var hours = myDate.getHours();       //获取当前小时数(0-23)
    //     var Minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    //     var Nowtime = hours + ":" + Minutes;
    //     if (e.detail.value == Nowdata) {
    //         that.setData({
    //             starttimeb: Nowtime,
    //             date: e.detail.value,
    //             times: Nowtime
    //         })
    //     } else {
    //         that.setData({
    //             starttimeb: "",
    //             dates: e.detail.value,
    //             times: ""
    //         })
    //     }
    //     this.setData({
    //         dates: e.detail.value
    //     })
    // },
    //修改预约时间时分
    // bindTimeChange: function (e) {
    //     this.setData({
    //         times: e.detail.value,
    //     })
    // },
    //修改预约时间取消按钮
    timemask_qxbtn: function () {
        this.setData({
            timemask: false,
            activeindex: "",
            pageday: "",
            pagehour: "",
            pageminute: "",
        })
    },
    //修改预约时间确定按钮
    timemask_qdbtn: function () {
        var that = this;
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
        console.log(subscribe_time)
        if (pageday != "") {
            //去缓存中拿到token
            var activeindex = that.data.activeindex;    //获取当前订单的index
            console.log(activeindex)
            var list = null, subscribe_id = null;
            //获取当前的activea
            var activea = that.data.activea;
            if (activea == 0) {       //如果是 全部-服务订单列表
                list = that.data.all_list;      //获取 全部-服务订单列表
                subscribe_id = list[activeindex].subscribe_id;  //获取当前订单的订单id
            }
            if (activea == 2) {          //如果是 待消费-服务订单列表
                list = that.data.wait_shouhuo_list;      //获取待消費-服务订单列表
                subscribe_id = list[activeindex].subscribe_id;  //获取当前订单的订单id
            }
            //获取token
            wx.getStorage({
                key: 'userinfo',
                success: function (res) {
                    //显示等待弹窗
                    wx.showLoading({
                        title: '请稍候',
                    })
                    //拿到token然后进行request
                    wx.request({
                        url: url + "api/User/editSubscribeTime",
                        data: {
                            token: res.data.token,
                            subscribe_id: subscribe_id,
                            subscribe_time: subscribe_time
                        },
                        method: "POST",
                        success: function (res) {
                            wx.hideLoading();
                            console.log(res.data.code);
                            if (res.data.code == 200) {
                                wx.showToast({
                                    title: '修改成功',
                                    icon: "success",
                                    duration: 1500,
                                    mask: true
                                })

                            //获取当前的activea
                            var activea = that.data.activea;
                            if (activea == 0) {       //如果是 全部-服务订单列表
                                list = that.data.all_list;      //获取 全部-服务订单列表
                                console.log(list)
                                list[activeindex].item2_date = subscribe_timeChinese;
                                that.setData({
                                    all_list: list
                                })
                            }
                            if (activea == 2) {          //如果是 待消费-服务订单列表
                                list = that.data.wait_shouhuo_list;      //获取待消費-服务订单列表
                                console.log(list)
                                list[activeindex].item2_date = subscribe_timeChinese;
                                that.setData({
                                    wait_shouhuo_list: list
                                })
                            }
                            
                            } else {
                                console.log(2);
                                wx.showToast({
                                    title: res.data.msg,
                                    image: "../../img/errer.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
                        },
                        fail: function (res) {
                            wx.hideLoading();
                            wx.showToast({
                                title: '网络错误',
                                image: "../../img/errer.png",
                                duration: 1500,
                                mask: true
                            })
                        },
                    })
                },
            })
            that.setData({
                timemask: false,
                pageday: "",
                pagehour: "",
                pageminute: "",
            })

        } else {
            wx.showToast({
                title: '请选择预约时间',
                image: "../../img/errer.png"
            })
        }
    },
    //取消订单
    hsqxbtn: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var activeb = that.data.activeb;
        var orderstate = e.currentTarget.dataset.orderstate;
        var subscribe_id = e.currentTarget.dataset.subscribeid;
        console.log(e);
        //判断是否是未支付订单
        if (orderstate == 1) {
            //判断是否是全部列表里的订单
            if (activeb == 0) {
                wx.showModal({
                    title: '提示',
                    content: '确认取消订单？',
                    success: function (res) {
                        if (res.confirm) {
                            //执行全部订单列表里的未支付订单的取消操作,传入0代表 全部订单 列表 
                            that.product_cancel_order(0, index);
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
            else if (activeb == 1) {        //判断是否是代付款列表里的订单
                wx.showModal({
                    title: '提示',
                    content: '确认取消订单？',
                    success: function (res) {
                        if (res.confirm) {
                            //执行全部订单列表里的未支付订单的取消操作,传入1代表 待付款订单 列表 
                            that.product_cancel_order(1, index);
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        } else if (orderstate == 2 || orderstate == 3) {        //判断是否是支付成功，待发货/待自取的订单
            wx.navigateTo({
                url: '../shop/Refundapplication/Refundapplication?id=' + subscribe_id,
            })
        } else if (orderstate == 5) {       //判断是否是确认收货但尚未评价的订单
            wx.navigateTo({
                url: '../shop/Returngoods/Returngoods?id=' + subscribe_id,
            })
        }
    },
    //商品订单-取消订单
    product_cancel_order: function (order_state, index) {
        var that = this;
        var order_list = null;
        if (order_state == 0) {
            order_list = that.data.orderlist;
        }
        if (order_state == 1) {
            order_list = that.data.Pendingpayment;
        }
        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                //发起请求
                wx.showLoading({
                    title: '请稍候',
                })
                wx.request({
                    url: url + 'api/User/cancelOrderFormGoods',
                    data: {
                        token: res.data.token,
                        order_form_id: order_list[index].subscribe_id
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {
                            wx.showToast({
                                title: '取消成功',
                                icon: 'success',
                                duration: 1500,
                                mask: true
                            })

                            if (order_state == 0) {
                                order_list[index].orderstate = 13;
                                that.setData({
                                    orderlist: order_list
                                })
                            }
                            if (order_state == 1) {

                                wx.request({
                                    url: url + 'api/User/OrderFormAll',
                                    data: {
                                        token: res.data.token,
                                        page: that.data.product_order_page + 1,      //data中的服务订单列表的page页数
                                        workflow: 1                           //服务订单状态类型
                                    },
                                    method: "POST",
                                    success: function (res) {
                                        if (res.data.code == 200) {
                                            if (order_list.length >= 9) {
                                                if (res.data.data.length != 0) {
                                                    order_list.splice(index, 1);
                                                    order_list.push(res.data.data[0])
                                                    that.setData({
                                                        Pendingpayment: order_list
                                                    })
                                                }
                                            }else{
                                                order_list.splice(index, 1);
                                                that.setData({
                                                    Pendingpayment: order_list
                                                })
                                            }
                                        }
                                    }
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
    },

    //商品订单多功能按钮  橙色的那个
    worstbtn: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var activeb = that.data.activeb;        //顶部当前选择的tab
        var orderstate = e.currentTarget.dataset.orderstate;        //订单状态
        var subscribe_id = e.currentTarget.dataset.subscribeid;     //订单id
        if (orderstate == 1) {  //去支付功能
            wx.navigateTo({
                url: '../scrvice_pay/scrvice_pay?stute=1&id=' + subscribe_id + '&into_state=1',
            })
        } else if (orderstate == 3) {   //到店自取,待收货
            wx.navigateTo({
                url: '../shop/Orderdetails/Orderdetails?states=2&id='+subscribe_id,
            })
        } else if (orderstate == 4) {   // 已发货，待收货
            if (activeb == 0) { //全部订单列表
                wx.showModal({
                    title: '提示',
                    content: '是否确认收货',
                    success: function (res) {
                        var orderlist = that.data.orderlist;
                        if (res.confirm) {
                            //获取token
                            wx.getStorage({
                                key: 'userinfo',
                                success: function (res) {
                                    //发起请求
                                    wx.request({
                                        url: url + 'api/User/confirmReceiving',
                                        data: {
                                            token: res.data.token,
                                            order_form_id: subscribe_id
                                        },
                                        method: "POST",
                                        success: function (res) {
                                            if (res.data.code == 200) {
                                                if (res.data.data.data.result == 1) {
                                                    orderlist[index].orderstate = 5;
                                                    that.setData({
                                                        orderlist: orderlist
                                                    })

                                                    wx.showToast({
                                                        title: '收货成功！',
                                                        icon: 'success',
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                } else {
                                                    wx.showToast({
                                                        title: res.data.msg,
                                                        image: "../../img/errer.png",
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: res.data.msg,
                                                    image: "../../img/errer.png",
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        },
                                        fail: function () {
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

                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {    //待发货列表
                wx.showModal({
                    title: '提示',
                    content: '是否确认收货',
                    success: function (res) {
                        var Goodsreceipt = that.data.Goodsreceipt;
                        if (res.confirm) {
                            //获取token
                            wx.getStorage({
                                key: 'userinfo',
                                success: function (res) {
                                    //发起请求
                                    wx.request({
                                        url: url + 'api/User/confirmReceiving',
                                        data: {
                                            token: res.data.token,
                                            order_form_id: subscribe_id
                                        },
                                        method: "POST",
                                        success: function (res) {
                                            if (res.data.code == 200) {
                                                if (res.data.data.data.result == 1) {
                                                    Goodsreceipt.splice(index, 1);
                                                    that.setData({
                                                        Goodsreceipt: Goodsreceipt
                                                    })

                                                    wx.showToast({
                                                        title: '收货成功！',
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                } else {
                                                    wx.showToast({
                                                        title: res.data.msg,
                                                        image: "../../img/errer.png",
                                                        duration: 1500,
                                                        mask: true
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: res.data.msg,
                                                    image: "../../img/errer.png",
                                                    duration: 1500,
                                                    mask: true
                                                })
                                            }
                                        },
                                        fail: function () {
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
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                })
            }
        } else if (orderstate == 5) {   //确认收货,待评价
            wx.navigateTo({
                url: '../evaluate/addevaluate/addevaluate?id=' + subscribe_id +"&order_type=0",
            })
        } else if (orderstate == 8) {   //退货，商家已同意，填写退货信息
            wx.navigateTo({
                url: '../shop/Returninformation/Returninformation?id=' + subscribe_id,
            })
        } else if (orderstate == 9) {   //退货，商家已同意，查看退货地址
            wx.navigateTo({
                url: '../shop/Returninaddress/Returninaddress?id=' + subscribe_id,
            })
        } else if (orderstate == 11) {  //拒绝退货，查看原因
            //获取token
            wx.getStorage({
                key: 'userinfo',
                success: function (res) {
                    wx.showLoading({
                        title: '请稍候',
                    });
                    //发起请求
                    wx.request({
                        url: url + 'api/User/reasonforReturning',
                        data: {
                            token: res.data.token,
                            order_form_id: subscribe_id
                        },
                        method: "POST",
                        success: function (res) {
                            wx.hideLoading();
                            if (res.data.code == 200) {
                                if (res.data.data != null) {
                                    wx.showModal({
                                        title: '拒绝原因',
                                        content: res.data.data.store_reject,
                                        showCancel: false
                                    })
                                } else {
                                    wx.showModal({
                                        title: '拒绝原因',
                                        content: "无",
                                        showCancel: false
                                    })
                                }

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
    },
    //跳转取消页面
    goto_xqpage: function (e) {
        var orderstate = e.currentTarget.dataset.orderstate;
        var index = e.currentTarget.dataset.index;
        var subscribe_id = e.currentTarget.dataset.subscribeid;
        if (orderstate == 2) {      //支付成功待发货订单
            wx.navigateTo({
                url: '../shop/Orderdetails/Orderdetails?states=0&id=' + subscribe_id,
            })
        } else if (orderstate == 3) {       //到店自取订单
            wx.navigateTo({
                url: '../shop/Orderdetails/Orderdetails?states=2&id=' + subscribe_id,
            })
        } else if (orderstate == 4) {       //发货待收货订单
            wx.navigateTo({
                url: '../shop/Orderdetails/Orderdetails?states=1&id=' + subscribe_id,
            })
        }
    },
    //取消订单 取消原因
    bindCancelling: function (e) {
        var that = this;
        var activea = that.data.activea;
        var actionCancellation = that.data.actionCancellation;

        that.setData({
            menu: e.currentTarget.dataset.txt,
            actionSheetHidden: !that.data.actionSheetHidden
        })
        if (activea == 0) {
            var all_list = that.data.all_list;
           
            //获取token
            wx.getStorage({
                key: 'userinfo',
                success: function (rest) {
                    wx.showLoading({
                        title: '请稍候',
                    })
                    wx.request({
                        url: url + 'api/User/cancelOrderForm',
                        data: {
                            token: rest.data.token,
                            subscribe_id: all_list[actionCancellation].subscribe_id,
                            cancel: that.data.actionSheetItems[that.data.menu].txt,
                            type:1
                        },
                        method: "POST",
                        success:function(res){
                            wx.hideLoading();
                            if(res.data.code == 200){
                                wx.showToast({
                                    title: '取消成功',
                                    icon: 'success',
                                    duration:1500,
                                    mask:true
                                })

                                all_list[actionCancellation].top_status = 0;
                                that.setData({
                                    all_list: all_list
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
        }else if (activea == 2) {
            var wait_shouhuo_list = that.data.wait_shouhuo_list;

            //获取token
            wx.getStorage({
                key: 'userinfo',
                success: function (rest) {
                    wx.showLoading({
                        title: '请稍候',
                    })
                    wx.request({
                        url: url + 'api/User/cancelOrderForm',
                        data: {
                            token: rest.data.token,
                            subscribe_id: wait_shouhuo_list[actionCancellation].subscribe_id,
                            cancel: that.data.actionSheetItems[that.data.menu].txt,
                            type: 1
                        },
                        method:"POST",
                        success: function (res) {
                            wx.hideLoading();
                            if (res.data.code == 200) {
                                wx.showToast({
                                    title: '取消成功',
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                })

                                wait_shouhuo_list.splice(actionCancellation, 1);
                                that.setData({
                                    wait_shouhuo_list: wait_shouhuo_list
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
            })
            
        }
    },
    //取消原因选择隐藏
    actionSheetbindchange: function () {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },

    //获取服务订单列表-接口方法
    get_service_order_list: function (workflow) {
        var that = this;
        var activea = that.data.activea;
        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                //请求接口
                wx.showLoading({
                    title: '请稍候',
                })
                //让page+1
                that.setData({
                    service_order_page: Number(that.data.service_order_page) + 1
                })
                wx.request({
                    url: url + 'api/User/getServiceList',
                    data: {
                        token: res.data.token,
                        page: that.data.service_order_page,      //data中的服务订单列表的page页数
                        workflow: workflow                           //服务订单状态类型
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {     //返回成功
                            for (var i = 0; i < res.data.data.data.length; i++) {
                                var service_order = {       //定义单个订单
                                    subscribe_id: res.data.data.data[i].subscribe_id,
                                    top_num: res.data.data.data[i].serial_number,
                                    top_status: res.data.data.data[i].workflow,
                                    item1_name: res.data.data.data[i].service_name,
                                    item2_date: res.data.data.data[i].subscribe_time,
                                    item2_enddate: res.data.data.data[i].write_off_time,
                                    item2_canceldate: res.data.data.data[i].reject_time,
                                    item3_pcice: res.data.data.data[i].money,
                                    all: (Number(res.data.data.data[i].favourable) + Number(res.data.data.data[i].true_money)).toFixed(2),
                                    favorable: res.data.data.data[i].favourable,
                                    pocket: res.data.data.data[i].true_money,
                                    thename: res.data.data.data[i].store_name,
                                    hairdresser_name: res.data.data.data[i].barber_name
                                }
                                if (activea == 0) {
                                    var all_list = that.data.all_list;  //将data中的all_list拿出来
                                    all_list.push(service_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        all_list: all_list       //放回data里
                                    })
                                }
                                if (activea == 1) {
                                    var wait_pay_list = that.data.wait_pay_list;  //将data中的all_list拿出来
                                    wait_pay_list.push(service_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        wait_pay_list: wait_pay_list       //放回data里
                                    })
                                }
                                if (activea == 2) {
                                    var wait_shouhuo_list = that.data.wait_shouhuo_list;  //将data中的all_list拿出来
                                    wait_shouhuo_list.push(service_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        wait_shouhuo_list: wait_shouhuo_list       //放回data里
                                    })
                                }
                                if (activea == 3) {
                                    var wait_evaluate_list = that.data.wait_evaluate_list;  //将data中的all_list拿出来
                                    wait_evaluate_list.push(service_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        wait_evaluate_list: wait_evaluate_list       //放回data里
                                    })
                                }
                                if (activea == 4) {
                                    var wait_cancel_list = that.data.wait_cancel_list;  //将data中的all_list拿出来
                                    wait_cancel_list.push(service_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        wait_cancel_list: wait_cancel_list       //放回data里
                                    })
                                }   
                                // that.classification_service_order_list();   //将all_list中的信息分类
                            }
                            if (res.data.data.data.length == 0 && that.data.service_order_page > 2) {
                                that.setData({
                                    service_order_page: Number(that.data.service_order_page) - 1
                                })
                                wx.showToast({
                                    title: '没有更多数据',
                                    image: "../../img/wu.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
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
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            },
        })
    },

    //获取商品订单列表-接口方法
    get_product_order_list: function (workflow) {
        var that = this;
        //获取token
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                //请求接口
                wx.showLoading({
                    title: '请稍候',
                })
                //让page+1
                that.setData({
                    product_order_page: Number(that.data.product_order_page) + 1
                })
                wx.request({
                    url: url + 'api/User/OrderFormAll',
                    data: {
                        token: res.data.token,
                        page: that.data.product_order_page,      //data中的服务订单列表的page页数
                        workflow: workflow                           //服务订单状态类型
                    },
                    method: "POST",
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.code == 200) {     //返回成功
                            for (var i = 0; i < res.data.data.length; i++) {
                                var product_order = {       //定义单个订单
                                    subscribe_id: res.data.data[i].order_form_id,
                                    orderstate: res.data.data[i].workflow,
                                    ordernumber: res.data.data[i].pay_number,
                                    img: res.data.data[i].img,
                                    Price: res.data.data[i].price,
                                    name: res.data.data[i].goods_name,
                                    num: res.data.data[i].number,
                                    totalPrice: Number(res.data.data[i].favourable) + Number(res.data.data[i].true_money),
                                    discounts: res.data.data[i].favourable,
                                    Paid: res.data.data[i].true_money,
                                    shipping: res.data.data[i].shipping
                                }
                                if (workflow.length == 0) {
                                    var orderlist = that.data.orderlist;  //将data中的素组拿出来
                                    orderlist.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        orderlist: orderlist       //放回data里
                                    })
                                }
                                if (workflow[0] == 1) {
                                    var Pendingpayment = that.data.Pendingpayment;  //将data中的数组拿出来
                                    Pendingpayment.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        Pendingpayment: Pendingpayment       //放回data里
                                    })
                                }
                                if (workflow[0] == 2) {
                                    var Pendingdelivery = that.data.Pendingdelivery;  //将data中的数组拿出来
                                    Pendingdelivery.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        Pendingdelivery: Pendingdelivery       //放回data里
                                    })
                                }
                                if (workflow[0] == 3) {
                                    var Goodsreceipt = that.data.Goodsreceipt;  //将data中的数组拿出来
                                    Goodsreceipt.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        Goodsreceipt: Goodsreceipt       //放回data里
                                    })
                                }
                                if (workflow[0] == 5) {
                                    var comment = that.data.comment;  //将data中的数组拿出来
                                    comment.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        comment: comment       //放回data里
                                    })
                                }
                                if (workflow[0] == 7) {
                                    var retreat = that.data.retreat;  //将data中的数组拿出来
                                    retreat.push(product_order);   //往数组里push新建的订单信息
                                    that.setData({
                                        retreat: retreat       //放回data里
                                    })
                                }
                            }
                            if (res.data.data.length == 0 && that.data.product_order_page > 2) {
                                that.setData({
                                    product_order_page: Number(that.data.product_order_page) - 1
                                })
                                wx.showToast({
                                    title: '没有更多数据',
                                    image: "../../img/wu.png",
                                    duration: 1500,
                                    mask: true
                                })
                            }
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
                            image: '../../img/errer.png',
                            duration: 1500,
                            mask: true
                        })
                    }
                })
            },
        })
    },

    //将服务订单数据分类
    classification_service_order_list: function () {
        var that = this;

        let all_list = that.data.all_list;
        let wait_pay_list = that.data.wait_pay_list;
        let wait_shouhuo_list = that.data.wait_shouhuo_list;
        let wait_evaluate_list = that.data.wait_evaluate_list;
        let wait_cancel_list = that.data.wait_cancel_list;

        for (var i = 0; i < all_list.length; i++) {
            if (all_list[i].top_status == 1) {
                wait_pay_list.push(all_list[i]);
            } else if (all_list[i].top_status == 2) {
                wait_shouhuo_list.push(all_list[i]);
            } else if (all_list[i].top_status == 3) {
                wait_evaluate_list.push(all_list[i]);
            } else if (all_list[i].top_status == 0) {
                wait_cancel_list.push(all_list[i]);
            }
        };
        that.setData({
            wait_pay_list: wait_pay_list,
            wait_shouhuo_list: wait_shouhuo_list,
            wait_evaluate_list: wait_evaluate_list,
            wait_cancel_list: wait_cancel_list
        });
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
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                that.setData({
                    userinfo: res.data,
                    orderlist: [],
                    all_list: [],
                    service_order_page: 0,
                    product_order_page: 0
                })
                that.get_service_order_list(null);

                //开局获取商品订单列表
                that.get_product_order_list([]);
            }
        })

        //开局获取服务订单列表


        // /** 
        //  * 获取系统信息 
        //  */
        // wx.getSystemInfo({

        //     success: function (res) {
        //         that.setData({
        //             winWidth: res.windowWidth,
        //             winHeight: res.windowHeight
        //         });
        //         console.log(res.windowHeight)
        //     }

        // }); 

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        var that = this;
        //将服务订单数据分类
        that.classification_service_order_list();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var index = that.data.index;
        var userinfo = that.data.userinfo;
        console.log(11222)
        if (userinfo) {
            if (index == 1) {
                that.setData({
                    service_order_page: 0,
                    all_list: [],
                    wait_pay_list: [],      //待支付
                    wait_shouhuo_list: [],      //待消费
                    wait_evaluate_list: [],     //待评价
                    wait_cancel_list: []
                })
                var activea = that.data.activea;
                if (activea == 0) {
                    that.get_service_order_list("");
                }
                if (activea == 1) {
                    that.get_service_order_list(1);
                }
                if (activea == 2) {
                    that.get_service_order_list(2);
                }
                if (activea == 3) {
                    that.get_service_order_list(3);
                }
                if (activea == 4) {
                    that.get_service_order_list(0);
                }
            } else {
                var activeb = that.data.activeb;
                that.setData({
                    product_order_page: 0,
                    orderlist: [],
                    Pendingdelivery: [],
                    Pendingpayment: [],
                    Goodsreceipt: [],
                    comment: [],
                    retreat: []
                })
                if (activeb == 0) {
                    that.get_product_order_list([])
                }
                if (activeb == 1) {
                    that.get_product_order_list([1])
                }
                if (activeb == 2) {
                    that.get_product_order_list([2])
                }
                if (activeb == 3) {
                    that.get_product_order_list([3, 4])
                }
                if (activeb == 4) {
                    that.get_product_order_list([5])
                }
                if (activeb == 5) {
                    that.get_product_order_list([7, 8, 9, 10, 11, 12, 14, 15])
                }

            }
        }
    },
    swiperbottomscroll: function () {
        var that = this;
        that.setData({
            isfreshing: false
        })
        var index = that.data.index;
        if (index == 1) {
            var activea = that.data.activea;
            if (activea == 0) {
                that.get_service_order_list("");
            } else if (activea == 1) {
                that.get_service_order_list(1);
            } else if (activea == 2) {
                that.get_service_order_list(2);
            } else if (activea == 3) {
                that.get_service_order_list(3);
            } else if (activea == 4) {
                that.get_service_order_list(0);
            }
            that.setData({
                isfreshing: true
            })
        } else if (index == 0) {
            var activeb = that.data.activeb;
            if (activeb == 0) {
                that.get_product_order_list([])
            } else if (activeb == 1) {
                that.get_product_order_list([1])
            } else if (activeb == 2) {
                that.get_product_order_list([2])
            } else if (activeb == 3) {
                that.get_product_order_list([3, 4])
            } else if (activeb == 4) {
                that.get_product_order_list([5])
            } else if (activeb == 4) {
                that.get_product_order_list([7, 8, 9, 10, 11, 12, 14, 15])
            }
            that.setData({
                isfreshing: true
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            timemask: false,
            activeindex: "",
            dates: "",
            times: ""
        })
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