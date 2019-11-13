$(function() {
    $('.preview-img').mouseover(function() {
        $('.mask').show();
        $('.big').show();

    });
    $('.preview-img').mouseout(function() {
        $('.mask').hide();
        $('.big').hide();
    });
    $('.preview-img').mousemove(function(e) {
        var mask = $('.mask');
        var offset = $('.preview-img').offset();
        var top = offset.top;
        var left = offset.left;
        var x = e.pageX - left;
        var y = e.pageY - top;
        var maskX = x - mask.outerWidth();
        var maskY = y - mask.outerHeight();
        var maskMax = $('.preview-img').outerWidth() - mask.outerWidth();
        maskX = (maskX < 0 ? 0 : maskX) > maskMax ? maskMax : (maskX < 0 ? 0 : maskX);
        maskY = (maskY < 0 ? 0 : maskY) > maskMax ? maskMax : (maskY < 0 ? 0 : maskY);
        mask.css({ left: maskX + 'px', top: maskY + 'px' });
        var bigMax = $('.bigImg').outerWidth() - $('.big').outerWidth();
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        $('.bigImg').css({ left: -bigX + 'px', top: -bigY + 'px' });
    });

    $(".choose-color,.choose-version").find('a').click(function() {
        $(this).addClass('current').siblings().removeClass('current');

    });
    $(".choose-type,.suit").find('a').click(function() {
        $(this).addClass('current').siblings().removeClass('current');

    });
    console.log($(".choose-color,.choose-version,.choose-type,.suit").find('a'));

    var amount = 1;
    $('.add').click(function() {
        amount++;
        $('.choose-amount>input').val(amount);
    });
    $('.reduce').click(function() {
        if (amount <= 1) {
            $(this).css("cursor", "not-allowed");
        } else {
            amount--;
            $('.choose-amount>input').val(amount);
        }
    })
})