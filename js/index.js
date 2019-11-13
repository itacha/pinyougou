function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
            return;
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}
window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ol = document.querySelector('.circle');
    var ul = document.querySelector('.focus-con');
    var imgWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    });
    for (let i = 0; i < ul.children.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);
        li.setAttribute('index', i);
        li.addEventListener('click', function() {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            circle = iNow = index;
            animate(ul, -index * imgWidth)
        });
        ol.children[0].className = 'current';
    }
    var iNow = 0;
    var circle = 0;
    var flag = true;
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (iNow == 0) {
                iNow = ul.children.length - 1;
                ul.style.left = iNow * imgWidth + 'px';
            }
            iNow--;
            circle--;
            animate(ul, -iNow * imgWidth, function() {
                flag = true;
            });
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (iNow == ul.children.length - 1) {
                ul.style.left = 0;
                iNow = 0;
            }
            iNow++;
            circle++;
            animate(ul, -iNow * imgWidth, function() {
                flag = true;
            });
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
})

// $(function() {
//     var imgWidth = $(".focus").width();
//     var timer = null;
//     var ul = $(".focus-con");
//     var iNow = 0;
//     var arrow_l = $('.arrow-l');
//     var arrow_r = $('.arrow-r');
//     var focus = $('.focus');
//     // 复制第一张图片所在的li,添加到ul的最后面。
//     var ulNewLi = $(".focus-con li").eq(0).clone();
//     ul.append(ulNewLi);

//     focus.mouseenter(function() {
//         clearInterval(timer);
//         arrow_r.show();
//     }, autoPlay);
//     focus.mouseleave(function() {
//         arrow_l.hide();
//         arrow_r.hide();
//     });
//     // 鼠标放到ol的li上切换图片
//     var olLiArr = $(".circle").children('li');
//     $(".circle>li").mouseenter(function() {
//         clearInterval(timer);
//         $(this).addClass('current').siblings('li').removeClass('current');
//         var index = $(this).index();
//         iNow = index;
//         ul.animate({
//             "left": -imgWidth * iNow,
//         })
//     });

//     $(".arrow-l").click(function() {
//         iNow = iNow > 0 ? (--iNow) : (olLiArr.length - 1);
//         changeTo(iNow);
//     })

//     $(".arrow-r").click(function() {
//         iNow = iNow < (olLiArr.length - 1) ? (++iNow) : 0;
//         changeTo(iNow);
//     });
//     // 自动轮播图片
//     function autoPlay() {
//         timer = setInterval(function() {
//             iNow++;
//             if (iNow > olLiArr.length) {
//                 iNow = 0;
//             }
//             olLiArr.eq(iNow).trigger('mouseenter');
//         }, 1000);
//     }
//     autoPlay();
//     // 图片切换函数
//     function changeTo(num) {
//         var go = num * imgWidth;
//         ul.animate({ "left": -go }, 500);
//         $(".circle").find('li').removeClass('current').eq(num).addClass('current');
//     }
// })

$(function() {
    $(".list>li").mouseenter(function() {
        $(".cate_pop").addClass("selected").mouseleave(function() {
            $(this).removeClass('selected');
        });
        $(".cate_part").eq($(this).index()).addClass('selected').siblings('.cate_part').removeClass('selected').mouseleave(function() {
            $(this).removeClass('selected');
        }, function() {
            $(".cate_pop").removeClass('selected');
            $(".cate_part").eq($(this).index()).removeClass('selected');
        });
    });
    // 定义全局变量控制li的样式改变
    var flag = true;
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".sidebar").fadeIn();
        } else {
            $(".sidebar").fadeOut();
        };
        $(".ele").each(function(i, ele) {
            if (flag) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
                    $(".sidebar li").eq(i).addClass("current-2").siblings().removeClass("current-2");
                }
            }
        });
    });
    $(".sidebar li").click(function() {
        // 2. 需求：点击电梯导航li页面滚动到相应内容区域
        //bug1:点击电梯导航的小li页面会滚动，页面滚动会触发$(window).scroll，li的样式会改变，
        // 从上向下遍历找符合条件的li添加样式，前面的li都符合条件会添加样式，最后点击的li最终确定添加样式
        // 出现回弹效果
        flag = false;
        var current = $(".ele").eq($(this).index()).offset().top;
        $("body,html").animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        $(this).addClass("current-2").siblings().removeClass("current-2");
    });
    //回到顶部
    $(".toolbar").click(function() {
        $("body,html").animate({
            scrollTop: 0
        });
    });
})