// JavaScript Document
$(document).ready(
    function() {
        //braodcasting
        if($("#broadcast").length > 0){
            var $bc_id = 0;
            var $bc_dif = 40;
            var $bc_max = $("#broadcast").find("a").length;
            $("#broadcast").find(".list").css("top",$bc_dif*$bc_id*-1);
            swapBC();
        }

        function swapBC(){
            setTimeout(function(){
                if($bc_id < $bc_max-1){
                    $bc_id +=1;
                }else{
                    $bc_id=0;
                }
                $("#broadcast").find(".list").css("top",$bc_dif*$bc_id*-1);
                swapBC();
            }, 2000);

        }

        //slider
        if($("#slider").length > 0){
            var $item_id = 0;
            var $item_limit = 4;
            var $item_max = $("#list").find("a").length;
            var $item_page = Math.ceil($item_max/$item_limit);
            var next_btn = $("#slider").find(".next").eq(0);
            var prev_btn = $("#slider").find(".prev").eq(0);

            next_btn.hide();
            prev_btn.hide();
            if($item_page>1){
                next_btn.fadeIn();
            }

            next_btn.click(function() {
                //if($item_id < $item_page-1){
                if(parseInt($('#list').css("left"))+$('#list').prop('scrollWidth')>$("#list").width()){
                    var containW = $("#slider").find(".list-area").width();
                    $item_id+=1;
                    $("#list").css("left",$item_id*containW*-1);

                    prev_btn.fadeIn();
                    if($item_id == $item_page-1){
                        next_btn.fadeOut();
                    }else{
                        next_btn.fadeIn();
                    }
                }
            });
            prev_btn.click(function() {
                if($item_id>0){
                    var containW = $("#slider").find(".list-area").width();
                    $item_id-=1;
                    $("#list").css("left",$item_id*containW*-1);

                    next_btn.fadeIn();
                    if($item_id == 0){
                        prev_btn.fadeOut();
                    }else{
                        prev_btn.fadeIn();
                    }
                }
            });

        }

        //filter
        if($("#filter").length > 0){
            var $filter_id = 0;
            var $ilter_max = $("#filter").find("a").length;
            var next_fbtn = $("#filter").find(".next").eq(0);
            var prev_fbtn = $("#filter").find(".prev").eq(0);

            next_fbtn.click(function() {
                if(parseInt($('#flist').css("left"))+$('#flist').prop('scrollWidth')>$("#flist").width()){
                    var containW = $("#filter").find(".list-area").width();
                    $filter_id+=1;
                    $("#flist").css("left",$filter_id*containW*-1);
                }
            });
            prev_fbtn.click(function() {
                if($filter_id>0){
                    var containW = $("#filter").find(".list-area").width();
                    $filter_id-=1;
                    $("#flist").css("left",$filter_id*containW*-1);
               }
            });

        }


        //search
        $("#search_input").on('keyup', function (e) {
            if (e.keyCode == 13) {
                doSearch();
            }
        });


        

        //fill images
        $(".thumb").imgLiquid({
                fill: true,
                onItemFinish:   function(index, container, img){container.addClass('active');}
            }
        );

        //go to top
        $('#gotop').click(function(){
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
function doSearch(srt){
    var tempSrt = (srt) ? srt : $("#search_input").val();
    if(tempSrt){
        alert("search : "+tempSrt);
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
    $mobile = ($(window).width() > 900 ? false : true);
    atTopDetect();

}


//share
function shareFB(){
    var locate=encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    window.open('http://www.facebook.com/sharer/sharer.php?u='+locate);
    return false;
}

function shareGP(){
    var locate=encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    window.open('https://plus.google.com/share?url='+locate);
    return false;
}

function shareLINE(){
    var locate=encodeURIComponent(window.location.toString());
    //var locate = concat(encodeURIComponent(location.href));
    var title=encodeURIComponent(document.title);
    //href="http://line.me/R/msg/text/?<?php the_title(); ?>%0D%0A<?php the_permalink(); ?>"
    window.open('http://line.me/R/msg/text/?'+title+'%0D%0A'+locate);
    return false;
}



jQuery(window).load(function() {
    resizeScreen();
});