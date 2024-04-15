    //header按鈕

$(function(){
  $('header .inputBox').click(function(){
      $(this).addClass('active');
  })
  $('header .inputBox input').blur(function(){
      $('header .inputBox').removeClass('active');
  })
  var handle = null;
$('header .inputBox').mouseover(function(){
  
  clearTimeout(handle);
}).mouseout(function(){
  handle = setTimeout(function(){
    $('header .inputBox').removeClass('active');
  },1500);
})

  $('header .btnBox button').click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');

      var n = $(this).index();

      $(".mainBox ul:eq("+ n +")")
      .addClass("display")
      .siblings().removeClass("display");
  })
})

    //mainBox左右拖曳滑動效果

$(function(){
    var drag = function(obj){  

        obj.bind("mousedown",start);  

        function start(event){  
            if(event.button == 0){//判斷是否點選滑鼠左鍵  
                gapX=event.clientX;
                startx = $(window).scrollLeft();  // scroll的初始位置

                //movemove事件必須繫結到$(document)上，滑鼠移動是在整個螢幕上的  
                $(document).bind("mousemove",move);  
                //此處的$(document)可以改為obj  
                $(document).bind("mouseup",stop);                           
            }  
            return false;//阻止預設事件或冒泡  
        }  
        function move(event){  
            var left = event.clientX-gapX; // 滑鼠移動的相對距離

            $(window).scrollLeft(startx - left );

            return false;//阻止預設事件或冒泡  
        }  
        function stop(){  
            //解繫結，這一步很必要，前面有解釋  
            $(document).unbind("mousemove",move);  
            $(document).unbind("mouseup",stop);  
        }  
    }  

    obj = $(".mainBox");  

    drag(obj);//傳入的必須是jQuery物件，否則不能呼叫jQuery的自定義函式 
})

    //自動抓取herf

$(function(){
  $(".mainBox .forWeb li").each(function(){
      var n = $(this).index();

      $(".mainBox .forWeb li:eq("+ n +") .img")
      .css({
          "background" : "url(./images/demoImg/web/web_demo"+ n +".jpg) top center",
          "background-repeat" : "no-repeat",
          "background-size" : "cover"
      });

      $(".mainBox .forWeb li:eq("+ n +") .link")
      .attr("href","./images/demoImg/web/web_demo"+ n +".jpg");

      // $(".mainBox .forWeb li:eq("+ n +") p")
      // .text("Demo_"+ (n + 1) +"");
  })

  $(".mainBox .forMobile li").each(function(){
      var n = $(this).index();

      $(".mainBox .forMobile li:eq("+ n +") .img")
      .css({
          "background" : "url(./images/demoImg/mobile/mobile_demo"+ n +".jpg) top center",
          "background-repeat" : "no-repeat",
          "background-size" : "cover"
      });

      $(".mainBox .forMobile li:eq("+ n +") .link")
      .attr("href","./images/demoImg/mobile/mobile_demo"+ n +".jpg");

      // $(".mainBox .forMobile li:eq("+ n +") p")
      // .text("Demo_"+ (n + 1) +"");
  })
})

    //回到頂端按鈕

$(function(){
  $(".mainBox ul").scroll(function () {
    var scrollVal = $(this).scrollTop();
    if(scrollVal > 1){
      $(".gotop")
      .css({
          "opacity" : "1",
          "pointer-events" : "visible",
      });
    } else{
      $(".gotop")
      .css({
          "opacity" : "0",
          "pointer-events" : "none",
      });
    };
  })
  $(".gotop").click(function(){

    $(".mainBox ul").animate({
        scrollTop: 0,
    },500);
  })
})

    //主物件hover時a跑版效果修正

$(function(){
  $('.forWeb li,.forMobile li').hover(function(){
    $(this).addClass('hoverA');
  })
  var handle = null;
  $('.forWeb li .link,.forMobile li .link').click(function(){
    handle = setTimeout(function(){
      $('.forWeb li,.forMobile li').removeClass('hoverA');
    },500);
  })
})

    //transCover觸發
    
$(function(){
    $('.enterBtn').click(function(){
        $(this).addClass('trans');
        
        setTimeout(function(){
            $('.mainAnime').fadeOut(500);
        },700)
    })
})

    //手機版調整
function isMobile() {

    try{ document.createEvent("TouchEvent"); return true; }

    catch(e){ return false;}

}
$(function(){
    if(isMobile()){
        $('header,main').css('min-width','0px');
    }
})

    //自動高

$(function(){
  var wH = $(window).innerHeight();

  $(".mainBox ul")
  .css("height",""+ (wH - 110) +"px");

  $(window).resize(function(){
    var wH = $(window).innerHeight();

    $(".mainBox ul")
    .css("height",""+ (wH - 110) +"px");
  })
})


//按鈕特效
$(function(){
  function pop (e) {
    let amount = 100;
  
    // Quick check if user clicked the button using a keyboard
    if (e.clientX === 0 && e.clientY === 0) {
      const bbox = e.target.getBoundingClientRect();
      const x = bbox.left + bbox.width / 2;
      const y = bbox.top + bbox.height / 2;
      for (let i = 0; i < 0  ; i++) {
        // We call the function createParticle 30 times
        // We pass the coordinates of the button for x & y values
        createParticle(x, y, e.target.dataset.type);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        createParticle(e.clientX, e.clientY + window.scrollY, e.target.dataset.type);
      }
    }
  }
  function createParticle (x, y, type) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 2000;
    let destinationY = (Math.random() - 0.5) * 1500;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    
    switch (type) {
      case 'square':
        particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
        // particle.style.borderRadius = '50%';
        particle.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
        // particle.style.border = '1px solid white';
    }
    
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 1000 + 3000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: delay
    });
    animation.onfinish = removeParticle;
  }
  function removeParticle (e) {
    e.srcElement.effect.target.remove();
  }
  
  if (document.body.animate) {
    document.querySelectorAll('button').forEach(button => button.addEventListener('click', pop));
  }
})

$(function(){
    $('.mainAnime button').click(function(){
        $(this).removeClass('display');

        $("#canvas").css({
            opacity : 0,
            transform : 'scale(0)',
        })

        $('.mainAnime').fadeOut(500);
    })
})

$(function(){
    setTimeout(function(){
        $('.loading').fadeOut(500);
    },2500);
})

// $(function(){
//   if(document.readyState === 'complete'){
//     $('.loading').fadeOut(500);
//   }
// })

//--我是分隔線--//

$(function(){
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var starDensity = .216;
  var speedCoeff = .05;
  var width;
  var height;
  var starCount;
  var circleRadius;
  var circleCenter;
  var first = true;
  var giantColor = '180,184,240';
  var starColor = '226,225,142';
  var cometColor = '226,225,224';
  var canva = document.getElementById('universe');
  var stars = [];

  windowResizeHandler();
  window.addEventListener('resize', windowResizeHandler, false);

  createUniverse();

  function createUniverse() {
    universe = canva.getContext('2d');

    for (var i = 0; i < starCount; i++) {
      stars[i] = new Star();
      stars[i].reset();
    }

    draw();
  }

  function draw() {
    universe.clearRect(0, 0, width, height);

    var starsLength = stars.length;

    for (var i = 0; i < starsLength; i++) {
      var star = stars[i];
      star.move();
      star.fadeIn();
      star.fadeOut();
      star.draw();
    }

    window.requestAnimationFrame(draw);
  }

  function Star() {

    this.reset = function() {
      this.giant = getProbability(3);
      this.comet = this.giant || first ? false : getProbability(10);
      this.x = getRandInterval(0, width - 10);
      this.y = getRandInterval(0, height);
      this.r = getRandInterval(1.1, 2.6);
      this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
      this.dy = -getRandInterval(speedCoeff, -1 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
      this.fadingOut = null;
      this.fadingIn = true;
      this.opacity = 0;
      this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
      this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
    };

    this.fadeIn = function() {
      if (this.fadingIn) {
        this.fadingIn = this.opacity > this.opacityTresh ? false : true;
        this.opacity += this.do;
      }
    };

    this.fadeOut = function() {
      if (this.fadingOut) {
        this.fadingOut = this.opacity < 0 ? false : true;
        this.opacity -= this.do / 2;
        if (this.x > width || this.y < 0) {
          this.fadingOut = false;
          this.reset();
        }
      }
    };

    this.draw = function() {
      universe.beginPath();

      if (this.giant) {
        universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
        universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      } else if (this.comet) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
        universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

        //comet tail
        for (var i = 0; i < 30; i++) {
          universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
          universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
          universe.fill();
        }
      } else {
        universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
        universe.rect(this.x, this.y, this.r, this.r);
      }

      universe.closePath();
      universe.fill();
    };

    this.move = function() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.fadingOut === false) {
        this.reset();
      }
      if (this.x > width - (width / 4) || this.y < 0) {
        this.fadingOut = true;
      }
    };

    (function() {
      setTimeout(function() {
        first = false;
      }, 50)
    })()
  }

  function getProbability(percents) {
    return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
  }

  function getRandInterval(min, max) {
    return (Math.random() * (max - min) + min);
  }

  function windowResizeHandler() {
    width = window.innerWidth;
    height = window.innerHeight;
    starCount = width * starDensity;
    circleRadius = (width > height ? height / 2 : width / 2);
    circleCenter = {
      x: width / 2,
      y: height / 2
    }

    canva.setAttribute('width', width);
    canva.setAttribute('height', height);
  }
})