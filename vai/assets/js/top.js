//

$(function(){

  $('.cursel-center-img').delay(5500).queue(function(){
  		$(this).addClass('load');
   });
  $('.cursel-center-tit h2').delay(5800).queue(function(){
  		$(this).addClass('load');
   });
   $('.project-tag').delay(5800).queue(function(){
      $(this).addClass('load');
    });
  $('#count').delay(6000).queue(function(){
  		$(this).addClass('load');
   });
  $('#logo,#job,nav,#cr').delay(5800).queue(function(){
      $(this).addClass('load');
   });
  $('.cursel-up h2,.cursel-under h2').delay(6000).queue(function(){
      $(this).addClass('load');
   });
  $('.hover-delay').delay(7400).queue(function(){
      $(this).addClass('load');
   });
});



// hover

$(function(){
  $(".link-hover").hover(function(){
    if($(".cursel-center-img-before").hasClass("is_active")){
      $(".cursel-center-img-before").removeClass("is_active");
      $(".cursel-center-img-after").removeClass("is_active");
      $(".cursel-center-tit").removeClass("is_active");
      $(".project-tag").removeClass("is_active");
      $(".cursel-center-tit-base").removeClass("is_active");
      $("body").removeClass("on");
    }else{
      $(".cursel-center-img-before").addClass('is_active');
      $(".cursel-center-img-after").addClass('is_active');
      $(".cursel-center-tit").addClass('is_active');
      $(".project-tag").addClass('is_active');
      $(".cursel-center-tit-base").addClass('is_active');
      $("body").addClass("on");
    }
  });
});



// click-menu

$(function(){
  $("#menu_about").click(function(){
    if($(this).hasClass("on")){
      $(this).removeClass("on");
      $("#about").removeClass('is_active');
      $(this).text("ABOUT");
    }else{
      $(this).addClass('on');
      $(this).addClass("on");
      $("#about").addClass('is_active');
      $(this).text("CLOSE");
    }
  });
});

// one page

$(function() {
  var ANIMATION_DELAY = 1000
  var IMAGE_CHANGE_DELAY = 400
  var LOADING_DELAY = 700
  var IMAGE_DIR = 'assets/img/00_main/'

  var $countNum = $('#count-num')
  var $maxNum = $('#max-num')
  var $cursel = $('#cursel')
  var $link = $('#cursel .link-hover')
  var $centerImg = $('.cursel-center-img')
  var $before = $('.cursel-center-img-before')
  var $beforeImg = $('.cursel-center-img-before img')
  var $after = $('.cursel-center-img-after')
  var $afterImg = $('.cursel-center-img-after img')
  var $centerTitH2 = $('.cursel-center-tit h2')
  var $projectTags = $('.project-tag')
  var $curselUpH2 = $('.cursel-up h2')
  var $curselUnderH2 = $('.cursel-under h2')

  var TITLES = [
    ['Masterlink', 'detail/kazuki.html', 'tag1 tag2 tag3'],
    ['Terminal Manager', 'detail/kazuki.html', 'tag4 tag5 tag6'],
    ['MiWireless', 'detail/kazuki.html', 'tag7 tag8 tag9'],

  ]
  var IMAGES = [
    ['99_dt.jpg', '99.jpg'],
    ['99_dt.jpg', '99.jpg'],
    ['99_dt.jpg', '99.jpg'],

  ]

  var itemCount = TITLES.length
  var clientY = 0
  var isAnimating = false
  var currentIndex = 0

  var setScrollEvents = function() {
    $(window).on('touchstart', function(ev) {
      clientY = ev.originalEvent.changedTouches[0].clientY
    })

    $(window).on('wheel mousewheel', function(ev) {
      var deltaY = ev.originalEvent.deltaY
      var direction = (deltaY < 0) ? 'up' : 'down'
      tryMove(direction)
    })

    $(window).on('touchmove', function(ev) {
      var nextClientY = ev.originalEvent.changedTouches[0].clientY
      var direction = (clientY < nextClientY) ? 'up' : 'down'
      clientY = nextClientY
      tryMove(direction)
    })
  }


  var preloadImage = function(path) {
    var img = new Image
    img.src = IMAGE_DIR + path
  }

  var preloadImages = function() {
    IMAGES.forEach(function(item) {
      preloadImage(item[0])
      preloadImage(item[1])
    })
  }


  var z2 = function(num) {
    return ('0' + num).slice(-2)
  }


  var tryMove = function(direction /* up | down */) {
    if (isAnimating || (direction !== 'up' && direction !== 'down')) return
    isAnimating = true

    switch(direction) {
      case 'up':
        currentIndex -= 1
        if (currentIndex < 0) {
          currentIndex = itemCount - 1
        }
        // console.log('up')
        break;
      case 'down':
        currentIndex += 1
        if (currentIndex >= itemCount) {
          currentIndex = 0
        }
        // console.log('down')
        break;
      default: return
    }

    move(direction)
    setTimeout(function() { isAnimating = false }, ANIMATION_DELAY)
  }


  var move = function(direction) {

    $cursel.addClass('stop ' + direction)
    $cursel.offset()
    $cursel.removeClass('stop')
    $cursel.addClass('start')
    $centerImg.removeClass('load')


    updateNum()
    updateTitle()


    setTimeout(function() {
      $beforeImg.attr('src', IMAGE_DIR + IMAGES[currentIndex][0])
      $afterImg.attr('src', IMAGE_DIR + IMAGES[currentIndex][1])
    }, IMAGE_CHANGE_DELAY)


    setTimeout(function() {
      $cursel.removeClass('start ' + direction)
      $centerImg.addClass('load')
    }, LOADING_DELAY)
  }


  var updateNum = function() {
    var num = z2(currentIndex + 1)
    $countNum.text(num)
  }


  var updateTitle = function() {
    var prevIndex = currentIndex - 1
    var nextIndex = currentIndex + 1

    if (prevIndex < 0) {
      prevIndex = itemCount - 1
    }
    if (nextIndex >= itemCount) {
      nextIndex = 0
    }

    $centerTitH2.html(TITLES[currentIndex][0])
    $projectTags.html(TITLES[currentIndex][2])
    $link.attr('href', TITLES[currentIndex][1])
    $curselUpH2.html(TITLES[prevIndex][0])
    $curselUnderH2.html(TITLES[nextIndex][0])
  }


  preloadImages()
  updateNum()
  updateTitle()
  $maxNum.text(z2(itemCount))

  setTimeout(setScrollEvents, 6000)
})
