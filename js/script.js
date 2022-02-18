$(document).ready(function(){
    $(".scroll").addClass("on");
    $(".logo_circle").addClass("on");
    //Full Page Slider - mousewheel() 이벤트
    //mousewheel : 크롬, 익스엣지, 사파리(iOS), 오페라
    //DOMMouseScroll : 파이어폭스
  
    var elm = ".page";  //각 섹션에 지목할 클래스명을 통해 객체를 저장
    //$(elm).css("border", "2px dashed #000");
    $(elm).each(function(index){
      //각 섹션에서 접근하여 이벤트 발생을 감지시킨다. (어디서 마우스 휠을 돌렸는가?)
      $(this).on("mousewheel DOMMouseScroll", function(e){
        //console.log(e);  //마우스휠을 움직였을 때, 이벤트 처리에 의한 내부 속성값들을 반환시킨다.
        //console.log(e.originalEvent.wheelDelta);
        //console.log(event.wheelDelta);
        //크롬 브라우저에서는 마우스 휠을 내렸을 때, event.wheelDelta : -120
        //크롬 브라우저에서는 마우스 휠을 올렸을 때, event.wheelDelta : 120
  
        var delta = 0;  //마우스 휠을 돌리지 않았을 때 초기값(마우스 휠 이벤트에 의한 wheelDelta값을 새롭게 넣기 위함)
  
        if(event.wheelDelta){
          //크롬, 익스엣지, 사파리(iOS), 오페라
          //console.log("wheelDelta값 발생");
          delta = event.wheelDelta / 120;
          //크롬 브라우저에서는 마우스 휠을 내렸을 때, delta = -120 / 120 = -1
          //크롬 브라우저에서는 마우스 휠을 올렸을 때, delta = 120 / 120 = 1
          if(window.opera){  //오페라 브라우저에서는 크롬과는 반대의 값을 가져오기 때문에 역으로 치환을 시켜야 함
            delta = -delta;
          }
          //console.log(delta);
        }else if(e.detail){
          //파이어폭스
          console.log("detail값 발생 : " + e.detail);
          //파이어폭스 브라우저에서는 마우스 휠을 내렸을 때, 7 (브라우저의 버전마다 달라지는 경향 있음)
          //파이어폭스 브라우저에서는 마우스 휠을 올렸을 때, -7 (브라우저의 버전마다 달라지는 경향 있음)
          delta = -e.detail / 7;
          //파이어폭스 브라우저에서는 마우스 휠을 내렸을 때, delta = -(7/7) = -1
          //파이어폭스 브라우저에서는 마우스 휠을 올렸을 때, delta = -(-7/7) = 1
        }
        //delta값이 -1(음수)이면, 사용자는 마우스 휠을 내리고 있음 => 다음 섹션(현재 화면보다 아래)이 나와야 함
        //delta값이 1(양수)이면, 사용자는 마우스 휠을 올리고 있음 => 이전 섹션(현재 화면보다 위)이 나와야 함
  
        var moveTo = $(window).scrollTop();  //각 섹션별로 상단문구로부터 절대 위치를 찾기 위함
        var elmIndex = $(elm).eq(index);
        console.log(elmIndex);  //마우스 휠 이벤트가 발생한 장소(7개 중에서 하나의 섹션에서 이벤트가 발생한 장소를 가리킴)
  
        if(delta < 0){
          console.log("사용자는 마우스 휠을 내리고 있어요~~");
          try{  //시도해라
            if($(elmIndex).next() != undefined){  //마우스 휠을 내리는 시점에서 다음 섹션이 존재할 경우
              moveTo = $(elmIndex).next().offset().top;  //다음 섹션 상단의 수직방향 절대 위치값
              
              $(elm).removeClass("active");
              $(elmIndex).next().addClass("active");
  
              var $cur_index = $(".page.active").index();  //이동시킨 다음에 active라는 클래스명이 존재하는 곳의 인덱스 번호를 추출
              console.log($cur_index);
              $("header li").removeClass("active");
              $("header li").eq($cur_index).addClass("active");

              var $pagefix_start = $(".pageFix_start").hasClass("active");
              var $pagefix_end = $(".pageFix_end").hasClass("active");
              if($pagefix_start == true){
                $("main").addClass("diagramFix");
                $("main").removeClass("page_3");
                $("main").addClass("page_2");

                setTimeout(function(){
                  $(".page_fixed").css("position", "fixed");
                }, 200);

              }else if($pagefix_end == true){
                $("main").addClass("diagramFix");
                $("main").removeClass("page_2");
                $("main").addClass("page_3");
                setTimeout(function(){
                  $(".page_fixed").css("position", "fixed");
                }, 200);
              }else{
                $("main").removeClass("diagramFix");
                $("main").removeClass("page_2");
                $("main").removeClass("page_3");
                setTimeout(function(){
                  $(".page_fixed").css("position", "relative");
                }, 0);
              }

              $(".scroll").removeClass("on");
              setTimeout(function(){
                $(".scroll").addClass("on");
              }, 500);

              $(".logo_circle").removeClass("on");
              setTimeout(function(){
                $(".logo_circle").addClass("on");
              }, 100);

            }
          }catch(e){  //시도하는 과정 중에서 문제점이 발생한 곳은 catch문에서 강제로 잡아버림(에러발생에 대한 예외처리)
            console.log("예외처리");  //타입 에러 파트를 검사창에 노출시키는 것이 아닌 강제로 숨기 처리해라 => 시스템 에러도 에러로 발생시키는 것을 막는 기능
          }
  
        }else{
          console.log("사용자는 마우스 휠을 올리고 있어요~~");
          try{  //시도해라
            if($(elmIndex).prev() != undefined){  //마우스 휠을 올리는 시점에서 이전 섹션이 존재할 경우
              moveTo = $(elmIndex).prev().offset().top;  //이전 섹션 상단의 수직방향 절대 위치값
  
              $(elm).removeClass("active");
              $(elmIndex).prev().addClass("active");
              
              var $cur_index = $(".page.active").index();  //이동시킨 다음에 active라는 클래스명이 존재하는 곳의 인덱스 번호를 추출
              console.log($cur_index);
              $("header li").removeClass("active");
              $("header li").eq($cur_index).addClass("active");


              var $pagefix_start = $(".pageFix_start").hasClass("active");
              var $pagefix_end = $(".pageFix_end").hasClass("active");
              if($pagefix_start == true){
                $("main").addClass("diagramFix");
                $("main").removeClass("page_3");
                $("main").addClass("page_2");

                setTimeout(function(){
                  $(".page_fixed").css("position", "fixed");
                }, 200);

              }else if($pagefix_end == true){
                $("main").addClass("diagramFix");
                $("main").removeClass("page_2");
                $("main").addClass("page_3");
                setTimeout(function(){
                  $(".page_fixed").css("position", "fixed");
                }, 200);
              }else{
                $("main").removeClass("diagramFix");
                $("main").removeClass("page_2");
                $("main").removeClass("page_3");
                setTimeout(function(){
                  $(".page_fixed").css("position", "relative");
                }, 0);
              }

            }
          }catch(e){
            console.log("예외처리");
          }
        }
        $("html, body").stop().animate({scrollTop : moveTo + "px"}, 200);
      });
    });
  
    //에러발생에 대한 예외처리 try{ 실행문 }catch(e){예외처리에 대한 실행문}final{예외되는 부분을 어떻게 표현할 것인가}
  
    //상단 메뉴 클릭시, 해당하는 페이지로 이동(+ section.page에 존재하는 active라는 클래스명도 함께 표시되어야함)
    $("header li").click(function(){
      var $index = $(this).index();
      $("header li").removeClass("active");
      $(this).addClass("active");
  
      $(elm).removeClass("active");
      $(elm).eq($index).addClass("active");
  
      $("html, body").stop().animate({scrollTop : $(elm).eq($index).offset().top}, 1000);
  
      return false;
    });
  
    //직접 이벤트 : $("선택자").이벤트명(function(){ ... 실행문...}); => 기존 어떤 완성이 종료된 시점에서 접근시 작성(반드시 HTML 문서 상에 해당하는 선택자가 존재해야 함)
    //간접(문서) 이벤트 : $(document).on("이벤트명", "선택자", function(){ ... 실행문...}); => 기존 어떤 완성이 종료됨과 상관없이 문서에서 대기를 시켜야 할 때 사용(자바스크립트에서 생성된 선택자(문서의 로딩 과정 시점에서 존재하지 않던 요소들까지 포함)도 이벤트 적용이 가능)
  
    //키보드 이벤트를 통한 Full Page Slider의 이동
    //이벤트 발생에 의한 keyCode
    //상방향(↑) : 38 / pageUp : 33
    //하방향(↓) : 40 / pageDown : 34
    //home : 36
    //end : 35
  
    var key_num = 0;
    $(document).on("keydown", function(evt){
      key_num = evt.keyCode;
  
      var $target = $(".page.active").index();  //현재 보고 있는 화면의 인덱스 번호를 추출
      console.log($target);
  
      if(key_num == 40 || key_num == 34){  //하방향키 또는 pageDown이라는 키보드를 눌렀을 때
        try{
          if($target == $(elm).length - 1){
            //움직이지 마~~~!!
          }else{
            $("html, body").stop().animate({scrollTop : $(elm).eq($target + 1).offset().top}, 200);
  
            $(elm).removeClass("active");
            $(elm).eq($target + 1).addClass("active");
    
            $("header li").removeClass("active");
            $("header li").eq($target + 1).addClass("active");
          }
        }catch(evt){
  
        }
      }else if(key_num == 38 || key_num == 33){  //상방향키 또는 pageUp이라는 키보드를 눌렀을 때
        try{
          if($target == 0){
            //움직이지 마~~~!!
          }else{
            $("html, body").stop().animate({scrollTop : $(elm).eq($target - 1).offset().top}, 200);
  
            $(elm).removeClass("active");
            $(elm).eq($target - 1).addClass("active");
    
            $("header li").removeClass("active");
            $("header li").eq($target - 1).addClass("active");
          }
        }catch(evt){
  
        }
      }else if(key_num == 36){  //"Home" 키보드를 눌렀을 때, 맨 상단으로 이동
        try{
          $("html, body").stop().animate({scrollTop:$(elm).first().offset().top}, 500);
          $(elm).removeClass("active");
          $(elm).first().addClass("active");
          $("header li").removeClass("active");
          $("header li").first().addClass("active");
        }catch(evt){
  
        }
      }else if(key_num == 35){  //"End" 키보드를 눌렀을 때, 맨 하단으로 이동
        try{
          $("html, body").stop().animate({scrollTop:$(elm).last().offset().top}, 500);
          $(elm).removeClass("active");
          $(elm).last().addClass("active");
          $("header li").removeClass("active");
          $("header li").last().addClass("active");
        }catch(evt){
  
        }
      }
    });
  
    //모바일 환경에서 터치기반 - touchstart(최초로 화면을 누른 시점에서 발생하는 이벤트) / touchend(화면을 누르고 드래그 이후 손가락을 화면에서 떼었을 시점에서 발생하는 이벤트)
    var $t_start;  //최초로 터치한 Y축의 값
    var $t_end;  //드래그 이후 언터치한 Y축의 값
    var $t_move;  //$t_start에서 $t_end로 이동한 거리를 계산
  
    function prev(evt){
      try{
        var $target = $(".page.active").index();
        if($target != 0){
          $("html, body").stop().animate({scrollTop:$(elm).eq($target - 1).offset().top}, 500, function(){
            $(elm).removeClass("active");
            $(elm).eq($target - 1).addClass("active");
            $("header li").removeClass("active");
            $("header li").eq($target - 1).addClass("active");
          });
        }
      }catch(evt){
  
      }
    }
  
    function next(evt){
      try{
        var $target = $(".page.active").index();
        if($target != $(elm).length - 1){
          $("html, body").stop().animate({scrollTop:$(elm).eq($target + 1).offset().top}, 500, function(){
            $(elm).removeClass("active");
            $(elm).eq($target + 1).addClass("active");
            $("header li").removeClass("active");
            $("header li").eq($target + 1).addClass("active");
          });
        }
      }catch(evt){
  
      }
    }
  
    function touchmove(evt){  //evt는 대입에 대한 변수역할을 다른 함수문에서 적용
      console.log(evt);  //undefined
      $t_move = $t_start - $t_end;
      console.log($t_move);
      //터치의 이동방향이 상단 방향이라면 하단의 컨텐츠가 나와야 함 : 양의 정수
      //터치의 이동방향이 하단 방향이라면 상단의 컨텐츠가 나와야 함 : 음의 정수
  
      if($t_move > 7){  //최초 터치 후 상단 방향으로 드래그한 상태 => 하단 컨텐츠가 나와야 함
        next(evt);
      }else if($t_move < -7){//최초 터치 후 하단 방향으로 드래그한 상태 => 상단 컨텐츠가 나와야 함
        prev(evt);
      }
    }
  
    $(elm).on("touchstart", function(event){
      //console.log("터치 시작");
      //console.log(event);
      console.log("터치의 시작 : " + event.changedTouches[0].pageY);
      $t_start = event.changedTouches[0].pageY;
    });
  
    $(elm).on("touchend", function(event){
      //console.log("터치 종료");
      console.log("터치의 종료 : " + event.changedTouches[0].pageY);
  
      $t_end = event.changedTouches[0].pageY;
      touchmove();
    });
  
    //마우스 이벤트(클릭 -> 드래그 -> 클릭해제) : mousedown, mouseup
    var $m_down;
    var $m_up;
    var $m_move;
  
    function mousemove(evt){
      $m_move = $m_down - $m_up;  
      //양수일 경우, 상단 방향으로 드래그를 시도한 상황
      //음수일 경우, 하단 방향으로 드래그를 시도한 상황
      if($m_move > 20){
        next(evt);
      }else if($m_move < -20){
        prev(evt);
      }
    }
  
    //마우스의 클릭을 누른상태
    $(elm).on("mousedown", function(evt){
      console.log("마우스 다운");
      console.log(evt.pageY);
      $m_down = evt.pageY;
    });
  
    //마우스의 클릭 버튼을 뗀 상태
    $(elm).on("mouseup", function(evt){
      console.log("마우스 업");
      console.log(evt.pageY);
      $m_up = evt.pageY;
  
      mousemove();
    });
  
  
  
  
  });