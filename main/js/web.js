// JavaScript Document
$(document).ready(
    function() {
        //braodcasting
        if ($("#broadcast").length > 0) {
            var $bc_id = 0;
            var $bc_dif = 30;
            var $bc_max = $("#broadcast").find("a").length;
            $("#broadcast").find(".list").css("top", $bc_dif * $bc_id * -1);
            swapBC();
        }

        function swapBC() {
            setTimeout(function() {
                if ($bc_id < $bc_max - 1) {
                    $bc_id += 1;
                } else {
                    $bc_id = 0;
                }
                $("#broadcast").find(".list").css("top", $bc_dif * $bc_id * -1);
                swapBC();
            }, 2000);

        }
        //banner
        if ($("#banner_drama").length > 0) {
            var autoBanner = true;
            var sto2;
            var $banner_id = -1;
            var $banner_max = $("#banner_drama .list").eq(0).find("a").length;
            var next_banner = $("#banner_drama").find(".next").eq(0);
            var prev_banner = $("#banner_drama").find(".prev").eq(0);
            swapBanner(1);

            next_banner.click(function() {
                autoBanner = false;
                clearTimeout(sto2);
                swapBanner(1);
            });
            prev_banner.click(function() {
                autoBanner = false;
                clearTimeout(sto2);

                swapBanner(0);
            });
        }

        function swapBanner(num) {
            if (num === 1) {
                $banner_id += 1;
                if ($banner_id > $banner_max - 1) {
                    $banner_id = 0;
                }
            } else {
                $banner_id -= 1;
                if ($banner_id < 0) {
                    $banner_id = $banner_max - 1;
                }
            }
            var tar = $("#banner_drama .list").eq(0).find("a").eq($banner_id);
            tar.addClass("selected").siblings(".selected").removeClass("selected");
            //define info
            var title = tar.attr("title");
            var time = tar.attr("alt");
            var link = tar.attr("href");
            $("#banner_drama .info").eq(0).find("h2").hide().html(title).fadeIn();
            $("#banner_drama .info").eq(0).find("h3").hide().html(time).fadeIn();
            $("#banner_drama .info").eq(0).find(".ind").html(($banner_id + 1) + "/" + $banner_max);
            $("#banner_drama .info").eq(0).find("a").attr("href", link);
            //define btns
            var nextId = $banner_id + 1;
            if (nextId > $banner_max - 1) {
                nextId = 0;
            }
            var nextImg = $("#banner_drama .list").eq(0).find("a").eq(nextId).find('img').eq(0).attr("src");
            $("#banner_drama .next").find("img").attr("src", nextImg);
            var prevId = $banner_id - 1;
            if (prevId < 0) {
                prevId = $banner_max - 1;
            }
            var prevImg = $("#banner_drama .list").eq(0).find("a").eq(prevId).find('img').eq(0).attr("src");
            $("#banner_drama .prev").find("img").attr("src", prevImg);
            $("#banner_drama .thumb").imgLiquid({
                fill: true,
                onItemFinish: function(index, container, img) {}
            });
            //
            if (autoBanner) {
                sto2 = setTimeout(function() {
                    swapBanner(1);
                }, 4000);
            }

        }

        //slider
        if ($("#onAir").length > 0) {
            var list2 = $("#onAir").find(".list").eq(0);
            var $item_id2 = 0;
            var $item_limit2 = 2;
            var $item_max2 = list2.find("a").length;
            var $item_page2 = Math.ceil($item_max2 / $item_limit2);
            var next_btn2 = $("#onAir").find(".next").eq(0);
            var prev_btn2 = $("#onAir").find(".prev").eq(0);

            next_btn2.hide();
            prev_btn2.hide();
            if ($item_page2 > 1) {
                next_btn2.fadeIn();
            }

            next_btn2.click(function() {
                //if($item_id < $item_page-1){
                if (parseInt(list2.css("left")) + list2.prop('scrollWidth') > list2.width()) {
                    var containW2 = $("#onAir").find(".list-area").width();
                    $item_id2 += 1;
                    list2.css("left", $item_id2 * containW2 * -1);

                    prev_btn2.fadeIn();
                    if ($item_id2 == $item_page2 - 1) {
                        next_btn2.fadeOut();
                    } else {
                        next_btn2.fadeIn();
                    }
                }
            });
            prev_btn2.click(function() {
                if ($item_id2 > 0) {
                    var containW2 = $("#onAir").find(".list-area").width();
                    $item_id2 -= 1;
                    list2.css("left", $item_id2 * containW2 * -1);

                    next_btn2.fadeIn();
                    if ($item_id2 == 0) {
                        prev_btn2.fadeOut();
                    } else {
                        prev_btn2.fadeIn();
                    }
                }
            });

        }

        //slider
        if ($("#slider").length > 0) {
            var list = $("#slider").find(".list").eq(0);
            var $item_id = 0;
            var $item_limit = 4;
            var $item_max = list.find("a").length;
            var $item_page = Math.ceil($item_max / $item_limit);
            var next_btn = $("#slider").find(".next").eq(0);
            var prev_btn = $("#slider").find(".prev").eq(0);

            next_btn.hide();
            prev_btn.hide();
            if ($item_page > 1) {
                next_btn.fadeIn();
            }

            next_btn.click(function() {
                //if($item_id < $item_page-1){
                if (parseInt(list.css("left")) + list.prop('scrollWidth') > list.width()) {
                    var containW = $("#slider").find(".list-area").width();
                    $item_id += 1;
                    list.css("left", $item_id * containW * -1);

                    prev_btn.fadeIn();
                    if ($item_id == $item_page - 1) {
                        next_btn.fadeOut();
                    } else {
                        next_btn.fadeIn();
                    }
                }
            });
            prev_btn.click(function() {
                if ($item_id > 0) {
                    var containW = $("#slider").find(".list-area").width();
                    $item_id -= 1;
                    list.css("left", $item_id * containW * -1);

                    next_btn.fadeIn();
                    if ($item_id == 0) {
                        prev_btn.fadeOut();
                    } else {
                        prev_btn.fadeIn();
                    }
                }
            });

        }

        //search
        $("#search_input").on('keyup', function(e) {
            if (e.keyCode == 13) {
                doSearch();
            }
        });

        //fill images
        $(".thumb").imgLiquid({
            fill: true,
            onItemFinish: function(index, container, img) { container.addClass('active'); }
        });

        //go to top
        $('#gotop').click(function() {
            var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $body.animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        //on top detect
        atTopDetect();

        $(window).scroll(function() {
            atTopDetect();
        });
        //resize trigger
        $(window).resize(function() {
            resizeScreen();
        });
    }
);

var $mobile = false;

//search
function doSearch(srt) {
    var tempSrt = (srt) ? srt : $("#search_input").val();
    if (tempSrt) {
        alert("search : " + tempSrt);
    }
}

//gotop
function atTopDetect() {
    if ($("#header").length >= 1) {
        if ($(window).scrollTop() > 80) {
            //$("#nav").removeClass('index');
            $("#header").addClass('simple');
            $("#gotop").fadeIn();
        } else {
            //$("#nav").addClass('index');
            $("#header").removeClass('simple');
            $("#gotop").fadeOut();
        }
    }
}



function resizeScreen() {
    //$mobile = ($(window).width() > 850 ? false : true);
    atTopDetect();

}


//share
function shareFB() {
    var locate = encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + locate);
    return false;
}

function shareGP() {
    var locate = encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    window.open('https://plus.google.com/share?url=' + locate);
    return false;
}

function shareLINE() {
    var locate = encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    var title = encodeURIComponent(document.title);
    //href="http://line.me/R/msg/text/?<?php the_title(); ?>%0D%0A<?php the_permalink(); ?>"
    window.open('http://line.me/R/msg/text/?' + title + '%0D%0A' + locate);
    return false;
}



jQuery(window).load(function() {
    resizeScreen();
});

