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
        //banner topics
        if ($("#topics").length > 0) {
            var autoPlayTopic = true;
            var stoTopics;
            var $topicId = -1;
            var $topicMax = $("#topics .display .list").eq(0).find("a").length;

            //create btns
            $("#topics .display .list").eq(0).find("a").each(function(index){
                var tempT = $(this).attr('title');
                var tempImg = $(this).find("img").attr('src');
                var newB = '<a title="'+tempT+'" class="thumb"><img src="'+tempImg+'"/></a>';
                $("#topics .btns .list").append(newB);
            });
            $("#topics .btns .list").eq(0).find("a").each(function(index){
                $(this).click(function() {
                    autoPlayTopic = false;
                    clearTimeout(stoTopics);
                    swapTopic(index);
                    $("#autoBarTopic").stop(true,true).width("100%");
                });
            });
            //autoplay
            swapTopic(-1);
        }

        function swapTopic(num) {
            if (num === -1) {
                $topicId += 1;
                if ($topicId > $topicMax - 1) {
                    $topicId = 0;
                }
            } else {
                $topicId = num;
            }
            var tar = $("#topics .display .list").eq(0).find("a").eq($topicId);
            tar.addClass("selected").stop().fadeIn().siblings(".selected").removeClass("selected").stop().fadeOut();

            var tar2 = $("#topics .btns .list").eq(0).find("a").eq($topicId);
            tar2.addClass("selected").siblings(".selected").removeClass("selected");

            //move list
            if (autoPlayTopic) {
                $("#topics .btns").eq(0).animate({
                    scrollTop: $topicId*($("#topics .btns .list").height()*0.22+1),
                    scrollLeft: $topicId*($("#topics .btns .list").width()*0.30+1)
                }, 500);
            }
            

            //define info
            var title = tar.attr("title");
            var link = tar.attr("href");
            $("#topics .display .title").find("h2").html(title);
            $("#topics .display .title").eq(0).attr("href", link);
            //
            var countDownTopic = 4000;
            if (autoPlayTopic) {
                //autoBar
                $("#autoBarTopic").stop(true,true).width(0).animate({"width":"100%"},countDownTopic-300);
                //timeout
                stoTopics = setTimeout(function() {
                    swapTopic(-1);
                }, countDownTopic);
            }
        }

        //bookmark
        if ($("#bookmark").length > 0) {
            var $filterBtns = $("#bookmark").find('.filter div');
            var $lists = $("#bookmark").find('.list > div');
            //var $bookmark_id=0;

            $filterBtns.click(function() {
                $(this).addClass('active').siblings('.active').removeClass('active');
                $lists.eq($(this).index()).addClass('active').siblings('.active').removeClass('active');
            }).eq(0).click();
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
            //hammer
            var swiper1 = new Hammer(document.getElementById('banner_drama'));
            swiper1.on("swipeleft swiperight", function(ev) {
                //myElement.textContent = ev.type +" gesture detected.";
                //console.log(ev.type);
                if (ev.type == 'swipeleft') {
                    next_banner.click();
                } else if (ev.type == 'swiperight') {
                    prev_banner.click();
                }
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
            //var title = tar.attr("title");
            //var time = tar.attr("alt");
            //var link = tar.attr("href");
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
 
        //programList
        if ($("#programList").length > 0) {
            var $programBtns = $("#programList").find('.filter div');
            var $programLists = $("#programList").find('.list > div');
            //var $bookmark_id=0;

            $programBtns.click(function() {
                $(this).addClass('active').siblings('.active').removeClass('active');
                $programLists.eq($(this).index()).addClass('active').siblings('.active').removeClass('active');
            }).eq(0).click();
        }

        //character
        if ($("#character").length > 0) {
            var $charAmount = $("#character").find('.characterList > div').length;
            var $charLimit = 5;
            var $charPage = 0;
            for(var i=1;i<=Math.ceil($charAmount/$charLimit);i++){
                $("#character").find('.filter').append("<div>"+i+"</div>");
            }
            var $charBtns = $("#character").find('.filter > div');

            $charBtns.click(function() {
                $charPage = $(this).index();
                $(this).addClass('active').siblings('.active').removeClass('active');
                //
                $("#character").find('.characterList > div').each(function( index ) {
                    if( index >= $charPage*$charLimit && index<($charPage+1)*$charLimit){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });
                //
            }).eq(0).click();
        }

        //banner
        if ($("#banner_carousel").length > 0) {
            var autoBanner_c = true;
            var sto_c;
            var $banner_id_c = -1;
            var $banner_max_c = $("#banner_carousel .list").eq(0).find("a").length;
            var next_banner_c = $("#banner_carousel").find(".next").eq(0);
            var prev_banner_c = $("#banner_carousel").find(".prev").eq(0);
            swapBanner_c(1);

            next_banner_c.click(function() {
                autoBanner_c = false;
                clearTimeout(sto_c);
                swapBanner_c(1);
            });
            prev_banner_c.click(function() {
                autoBanner_c = false;
                clearTimeout(sto_c);

                swapBanner_c(0);
            });

            if($banner_max_c==1){
                next_banner_c.hide();
                prev_banner_c.hide();
            }
            //hammer
            var swiper_c = new Hammer(document.getElementById('banner_carousel'));
            swiper_c.on("swipeleft swiperight", function(ev) {
                //myElement.textContent = ev.type +" gesture detected.";
                //console.log(ev.type);
                if (ev.type == 'swipeleft') {
                    next_banner_c.click();
                } else if (ev.type == 'swiperight') {
                    prev_banner_c.click();
                }
            });

        }

        function swapBanner_c(num) {

            if (num === 1) {
                $banner_id_c += 1;
                if ($banner_id_c > $banner_max_c - 1) {
                    $banner_id_c = 0;
                }
                $("#banner_carousel .list").removeClass('next').addClass('prev');
            } else {
                $banner_id_c -= 1;
                if ($banner_id_c < 0) {
                    $banner_id_c = $banner_max_c - 1;
                }
                $("#banner_carousel .list").removeClass('prev').addClass('next');
                
            }

            $("#banner_carousel .list").eq(0).find("a").removeClass().addClass('thumb');
            $("#banner_carousel .list").eq(0).find("a").eq($banner_id_c).addClass('selected');
            if($banner_max_c>1){
                var tid = $banner_id_c+1;
                if(tid>$banner_max_c - 1){tid=0};
                if($banner_max_c==2){
                    //$("#banner_carousel .list").eq(0).find("a").eq(tid).addClass('back');
                    //$("#banner_carousel .list").eq(0).find("a").eq($banner_id_c-1).addClass('back');
                }else{
                    $("#banner_carousel .list").eq(0).find("a").eq(tid).addClass('prev');
                    $("#banner_carousel .list").eq(0).find("a").eq($banner_id_c-1).addClass('next');
                }
            }
            /*
            var tar_c = $("#banner_carousel .list").eq(0).find("a").eq($banner_id_c);
            tar_c.addClass("selected").siblings(".selected").removeClass("selected");
            */
            //define info
            //var tar_c = $("#banner_carousel .list").eq(0).find("a").eq($banner_id_c);
            //var title_c = tar_c.attr("title");
            //var time_c = tar_c.attr("alt");
            //var link_c = tar_c.attr("href");
            //$("#banner_carousel .info").eq(0).find("h2").hide().html(title_c).fadeIn();
            //$("#banner_carousel .info").eq(0).find("h3").hide().html(time_c).fadeIn();
            //$("#banner_carousel .info").eq(0).find(".ind").html(($banner_id_c + 1) + "/" + $banner_max_c);
            //$("#banner_carousel .info").eq(0).find("a").attr("href", link_c);
            

            //
            if (autoBanner_c && $banner_max_c>1) {
                sto_c = setTimeout(function() {
                    swapBanner_c(1);
                }, 4000);
            }

        }

        //slider
        if ($("#onAir").length > 0) {
            var list2 = $("#onAir").find(".list").eq(0);
            var $item_id2 = 0;
            var $item_limit2 = $("#onAir").attr("limit") || 2;
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

        //fancybox
        if ($("#gallery").length > 0) {
            $("#gallery [data-fancybox]").fancybox({
                thumbs     : false,
                afterLoad: function( instance, slide ) {
                    //console.log( instance );
                }
            });
            $.fancybox.defaults.hash = false;

            //
            handleGallery();
        }

        if ($("#topics").length > 0) {
            $('#topics [data-fancybox]').fancybox({
              afterLoad : function( instance, current ) {

                 // Remove scrollbars and change background
                current.$content.css({
                        overflow   : 'visible',
                  background : '#000'
                    });
                            
              },
              onUpdate : function( instance, current ) {
                var width,
                    height,
                    ratio = 16 / 9,
                    video = current.$content;
                
                if ( video ) {
                  video.hide();

                  width  = current.$slide.width();
                  height = current.$slide.height() - 100;
                  
                  if ( height * ratio > width ) {
                    height = width / ratio;
                  } else {
                    width = height * ratio;
                  }

                  video.css({
                    width  : width,
                    height : height
                  }).show();

                }
              }
            })
        }

        //go to top
        if ($("#gotop").length > 0) {
            $('#gotop').click(function() {
                var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        }

        //mobile menu
        $('#mobile-menu').click(function() {
            $('.channel').toggleClass("active");
        });
        if ($(".promo").length > 0) {
            $(".promo").each(function(index){
                $(this).find(".closead").click(function() {
                    $(this).parent().slideUp();
                });
            });
        }
        

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
            $("#promo").addClass('simple');
            $("#gotop").fadeIn();
        } else {
            //$("#nav").addClass('index');
            $("#header").removeClass('simple');
            $("#promo").removeClass('simple');
            $("#gotop").fadeOut();
        }
    }
}



function resizeScreen() {
    //
    $('.populor .list > a').each(function(index){
        $(this).removeClass("oversize").addClass("reallength");
        if ($(this)[0].scrollWidth >  $(this).innerWidth()) {
            $(this).addClass("oversize").removeClass("reallength");
        }else{
            $(this).removeClass("oversize").removeClass("reallength");
        }
    });
    

    atTopDetect();
    if ($("#gallery").length > 0) {
        afterImgLoad();
    }

}

//resize
var sto;
var img_count=0;
var img_amount=0;
var img_max=0;
var img_left=0;

function handleGallery(){
    img_max = $("#gallery .gallery").attr("show");
    $("#gallery .gallery").find("a").each(function(index){
        if(index>=img_max){
            $(this).empty();
            img_left+=1;
        }
    });
    img_amount=$("#gallery .gallery").find("img").length;
    //if(img_max>img_amount){img_max=img_amount};
    afterImgLoad();
}
function afterImgLoad(){
    clearTimeout(sto);
    $("#gallery .gallery").find("img").each(function(){
        if($(this).width()*$(this).height()>0){
            img_count+=1;
        }
    });
    if(img_count==img_amount){
        clearTimeout(sto);
        resizeImgs();    
    }else{
        img_count = 0;
        sto = setTimeout(function(){ afterImgLoad(); }, 300);
    }
}
function resizeImgs(){
    var rowH = 100;
    var paddingW = 1;
    if(img_count==img_amount){
        $(".gallery").each(function(){
            var refWidth = parseInt($(this).width())-2;
            var imgsAy = $(this).find("img");
            var sid=0;
            var fid=0;
            var countWidth=0;
            imgsAy.css({"height":rowH,'width':'auto','padding':0});
            for(var i=0;i<imgsAy.length;i++){
                if(parseInt(countWidth+imgsAy.eq(i).width()+paddingW*2)<=refWidth){
                    countWidth+=parseInt(imgsAy.eq(i).width()+paddingW*2);
                    if(i==imgsAy.length-1){
                        fid= i;
                        var finalH = parseInt((refWidth-paddingW*2*(fid-sid+1))*rowH/(countWidth-paddingW*2*(fid-sid+1)));
                        for(var j=sid;j<=fid;j++){
                            imgsAy.eq(j).css({"height":finalH,'padding':paddingW}).fadeIn();
                        }
                    }
                }else{
                    fid= (i-1);
                    //resizing period
                    var finalH = parseInt((refWidth-paddingW*2*(fid-sid+1))*rowH/(countWidth-paddingW*2*(fid-sid+1)));
                    for(var j=sid;j<=fid;j++){
                        imgsAy.eq(j).css({"height":finalH,'padding':paddingW}).fadeIn();
                    }
                    
                    //reset
                    countWidth=parseInt(imgsAy.eq(i).width()+paddingW*2);
                    sid=i;
                    fid = i;
                    if(i==imgsAy.length-1){
                        fid= i;
                        var finalH = parseInt((refWidth-paddingW*2*(fid-sid+1))*rowH/(countWidth-paddingW*2*(fid-sid+1)));
                        for(var j=sid;j<=fid;j++){
                            imgsAy.eq(j).css({"height":finalH,'padding':paddingW}).fadeIn();
                        }
                    }
                }
            }
        }) 
    }

    //add sign
    if(img_left>0){
        if ($("#gallery .extra").length <= 0) {
            var tempA = $("#gallery .gallery").find("a").eq(img_max-1);
            tempA.append('<div class="extra">+'+(img_left+1)+'</div>');
            tempA.find(".extra").css({"line-height":tempA.height()+'px'});
        }
    }
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

