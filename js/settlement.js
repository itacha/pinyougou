$(function() {
    getSum();
    //总全选框
    $(".checkall").change(function() {
        $(".item-check,.checkall,.checkall1").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".item").addClass("check-cart-item");
        } else {
            $(".item").removeClass("check-cart-item");
        }
        getSum();
    });
    //品优购自营全选框
    $(".checkall1").change(function() {
        $(".item-check,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".item").addClass("check-cart-item");
        } else {
            $(".item").removeClass("check-cart-item");
        }
        getSum();
    });
    //商品选择框
    $(document).on("change", ".item-check", function() {
        if ($(".item-check:checked").length === $(".item-check").length) {
            $(".checkall,.checkall1").prop("checked", true);
        } else {
            $(".checkall,.checkall1").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".item").addClass("check-cart-item");
        } else {
            $(this).parents(".item").removeClass("check-cart-item");
        }
        getSum();
    });
    //商品增加
    $(document).on("click", ".incre", function() {
        var n = $(this).siblings("input").val();
        n++;
        $(this).siblings("input").val(n);
        var p = $(this).parent().siblings(".price").find("strong").html();
        p = p.substr(1);
        // toFixed(2) 可以保留2位小数
        var price = (p * n).toFixed(2);
        $(this).parent().siblings(".sum").find("strong").html("¥" + price);
        getSum();
    });
    //商品减少
    $(document).on("click", ".decrement", function() {
        console.log($(this));

        var n = $(this).siblings("input").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings("input").val(n);
        var p = $(this).parent().siblings(".price").find("strong").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parent().siblings(".sum").find("strong").html("¥" + price);
        getSum();
    });
    //商品数量框改变
    $(".itxt").change(function() {
        var n = $(this).val();
        var p = $(this).parent().siblings(".price").find("strong").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parent().siblings("sum").find("strong").html("¥" + price);
        getSum();
    });

    function getSum() {
        var count = 0;
        var money = 0;
        $(".item-check:checked").siblings(".quantity").find(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".item-check:checked").siblings(".sum").find("strong").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum").find("em").text("￥" + money.toFixed(2));
    };
    //删除单个商品

    $(document).on("click", ".remove", function() {
        $(this).parents(".item").hide();
        var n = "<div class='del-pro-info clearfix' shop-id='" + $(this).parents('.item').attr('shop-id') + "'>" +
            "<div class='d-pro'>" + $(this).parent().siblings('.goods').children(".item-msg").find(".item-msg-title").text() + "</div>" +
            "<div class='d-price'>" + $(this).parent().siblings('.price').children().text() + "</div>" +
            "<div class='d-sum'>" + $(this).parent().siblings('.quantity').find(".itxt").val() + "</div>" +
            "<div class='d-rebuy'><a href='javascript:;'>重新购买</a><a href='#'>移到我的关注</a></div></div>";
        $(".del-pro").append(n);
        //重新购买
        $(".d-rebuy a:first-child").on("click", function() {
            $(this).parents(".del-pro-info").remove();
            $(".item[shop-id='" + $(this).parents('.del-pro-info').attr('shop-id') + "']").show();
        });
        getSum();
    });
    //删除选中商品
    $(".operation a:first-child").click(function() {
        $(".item-check:checked").parents(".item").remove();
        getSum();
    });
    // 清空购物车
    $(".operation a:last-child").click(function() {
        $(".cart-tbody").remove();
        getSum();
    });
    // 加入购物车
    $(".p-btn").on("click", function() {
            var s = ' <div class="item clearfix" shop-id="' + $(this).parent().attr("shop-id") + '">' +
                '<div class="item-form">' +
                '<input type="checkbox" class="item-check">' +
                '<div class="goods fl">' +
                '<div class="goods-img">' +
                '<a href="#"><img src="' + $(this).siblings("a").children().attr("src") + '" alt=""></a>' +
                '</div>' +
                '<div class="item-msg fl">' +
                '<a href="#" class="item-msg-title">' + $(this).siblings(".p-name").text() + '</a>' +
                '<a href="none"><b class="present"></b>购买礼品包装</a>' +
                '</div>' +
                '</div>' +
                '<div class="prop fl">' +
                '<div class="size">尺码：Thunderbolt 至千兆以太网转接口</div>' +
                '</div>' +
                '<div class="price fl">' +
                '<strong>' + $(this).siblings(".p-price").children().text() + '</strong>' +
                '</div>' +
                '<div class="quantity fl">' +
                '<a href="javascript:;" class="decrement">-</a>' +
                '<input type="text" name="" autocomplete="off" value="1" class="itxt">' +
                '<a href="javascript:;" class="incre">+</a>' +
                '<div class="stock">有货</div>' +
                '</div>' +
                '<div class="sum fl">' +
                '<strong>' + $(this).siblings(".p-price").children().text() + '</strong>' +
                '</div>' +
                '<div class="ops fl">' +
                '<a href="javascript:;" class="remove">删除</a>' +
                '<a href="#">移到我的关注</a>' +
                '</div>' +
                '</div>' +
                '</div>';
            var that = $(this);
            var flag = true;
            $.each($(".item"), function(i, n) {
                //如果购物车已有商品，加入购物车值增加商品数量
                if (that.parent().attr("shop-id") == $(n).attr("shop-id")) {
                    var j = that.parent().attr("shop-id");
                    var n2 = $(".item[shop-id=" + j + "]").find(".itxt").val();
                    n2++;
                    $(".item[shop-id=" + j + "]").find(".itxt").val(n2);
                    flag = false;
                    return;
                }
            });
            if (flag) {
                $(".cart-tbody").append(s);
            }
        })
        //轮播图
    var index = 0;
    $(".goods-right").click(function() {
        index++;
        if (index >= 2) {
            index = 0;
        }
        $(".goods-list").eq(index).css({
            "z-index": 1,
            "opacity": 1
        });
        $(".goods-list").eq(index).siblings(".goods-list").css({
            "z-index": 0,
            "opacity": 0
        });
        $(".circle li").eq(index).addClass("circle-current").siblings().removeClass("circle-current");
    });
    $(".goods-left").click(function() {
        index--;
        if (index < 0) {
            index = 2;
        }
        $(".goods-list").eq(index).css({
            "z-index": 1,
            "opacity": 1
        });
        $(".goods-list").eq(index).siblings(".goods-list").css({
            "z-index": 0,
            "opacity": 0
        });
        $(".circle li").eq(index).addClass("circle-current").siblings().removeClass("circle-current");
    });
})