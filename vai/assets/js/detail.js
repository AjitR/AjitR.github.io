// 

$(function(){
  $('.kv_over').delay(100).queue(function(){
      $(this).addClass('load');
   });
  $('.kv_cont').delay(1000).queue(function(){
      $(this).addClass('load');
   });
  $('#logo,#job,nav,#cr').delay(1400).queue(function(){
      $(this).addClass('load');
   });
  $('.bg_anim').delay(1800).queue(function(){
      $(this).addClass('load');
   });

});




// click-menu

$(function(){
  $("#menu_about").click(function(){
    if($(this).hasClass("on")){
      $(this).removeClass("on");
      $("#about").removeClass('is_active');
      $(this).text("ABOUT");
      $("body").css("position","inherit");
    }else{
      $(this).addClass('on');
      $(this).addClass("on");
      $("#about").addClass('is_active');
      $(this).text("CLOSE"); 
      $("body").css("position","fixed");
    }
  });
});



// hover

$(function(){
  $(".next_text").hover(function(){
    if($(".next_cont").hasClass("is_active")){
      $(".next_cont").removeClass("is_active");
      $(".next_over").removeClass("is_active");
      $(this).removeClass("is_active");
    }else{
      $(".next_cont").addClass('is_active');
      $(".next_over").addClass('is_active');
      $(this).addClass('is_active');
    }
  });
});


// fade


$(window).scroll(function(){
 var windowHeight = $(window).height(),
     topWindow = $(window).scrollTop();
 $(".flex_01,.flex_02,.flex_03,.flex_info_item,#visit,.credit_box_item,.credit_tit,.longtext").each(function(){
  var targetPosition = $(this).offset().top;
  if(topWindow > targetPosition - windowHeight + 200){
   $(this).addClass("is_visible");
  } else {
    $(this).removeClass("is_visible");
  }
 });
});
