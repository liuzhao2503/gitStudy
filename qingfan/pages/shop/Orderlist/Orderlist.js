// pages/shop/Orderlist/Orderlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['商品订单', '服务订单'],
        index: 0,
        activeb: 0,
        retreat:[
                {
                    orderstate: 8,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                },
                {
                    orderstate: 9,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                },
                {
                    orderstate: 10,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                },
                {
                    orderstate: 11,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                },
                {
                    orderstate: 12,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                },
                {
                    orderstate: 14,
                    ordernumber: "123123123123123",
                    img: "../../../img/img1.jpg",
                    Price: 80,
                    name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                    num: 2,
                    totalPrice: 160,
                    discounts: 10,
                    Paid: 150
                }
            ],
        comment:[
            {
                orderstate: 5,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 6,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            }
        ],
        Goodsreceipt:[
            {
                orderstate: 3,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 4,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            }
        ],
        Pendingdelivery: [
            {
                orderstate: 2,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            }
        ],
        Pendingpayment: [
            {
                orderstate: 1,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            }
        ],
        orderlist: [
            {
                orderstate: 1,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 2,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 3,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 4,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 5,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 6,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 7,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 8,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 9,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 10,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 11,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 12,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 13,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            },
            {
                orderstate: 14,
                ordernumber: "123123123123123",
                img: "../../../img/img1.jpg",
                Price: 80,
                name: "海飞丝双重高屑洗发水海飞丝双重高屑洗发水海飞丝双重高屑洗发水",
                num: 2,
                totalPrice: 160,
                discounts: 10,
                Paid: 150
            }
        ]
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })

    },

    topnavactiveb: function (e) {
        var that = this;
        console.log(e.target)
        if (that.data.activeb === e.target.dataset.navindex) {
            return false;
        } else {
            that.setData({
                activeb: e.target.dataset.navindex
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

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
    bindChangeb: function (e) {

        var that = this;
        that.setData({ activeb: e.detail.current });

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