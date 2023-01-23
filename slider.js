$(function () {
    var slider = $("#homespaceslider")[0];
    var percent = (slider.value - slider.min) / (slider.max - slider.min);
    var pixelPostion = slider.clientWidth * percent;
    var windowwidth = $(".window").outerWidth(true) + 5;
    var windowscount = $(".homeslider .home .walls .right .window:not(.effect):visible")
      .length;
    var centerwall = $(".homeslider .home .walls .center").width();
    var wallwidth = ((slider.value - slider.min) * 164) / 10 + 66;
    $(".homeslider .filled").css("width", pixelPostion);
    $(".homeslider .spaceselected b").text(slider.value);
  
    for (i = slider.min; i <= slider.max; i++) {
      $(".spaceselected ul").append("<li>" + i + "</li>");
    }
    $(".homeslider .spaceselected ul").animate(
      {
        scrollTop:
          $(".homeslider .spaceselected ul li").eq(slider.value - slider.min)[0]
            .offsetTop - $(".homeslider .spaceselected ul")[0].offsetTop
      },
      100
    );
    $(".homeslider .spaceselected ul li")
      .eq(slider.value - slider.min)
      .addClass("active");
    resizehome(slider);
  
    $(document).on("input", "#homespaceslider", function () {
      resizehome(this);
    });
    $(document).on("input", "#homespaceslider", function () {
      $(".homeslider .spaceselected ul li").removeClass("active");
      $(".homeslider .spaceselected ul li")
        .eq(this.value - this.min)
        .addClass("active");
      $(".homeslider .spaceselected ul").animate(
        {
          scrollTop:
            $(".homeslider .spaceselected ul li").eq(this.value - this.min)[0]
              .offsetTop - $(".homeslider .spaceselected ul")[0].offsetTop
        },
        100
      );
    });
  
    function resizehome(inputrange) {
      percent =
        (inputrange.value - inputrange.min) / (inputrange.max - inputrange.min);
      pixelPostion = inputrange.clientWidth * percent;
      $(".homeslider .filled").css("width", pixelPostion);
      $(".homeslider .spaceselected b").text(inputrange.value);
      $(".homeslider .home .roof").animate(
        {
          width: ((inputrange.value - inputrange.min) * 135) / 10 + 60
        },
        50,
        "linear"
      );
      wallwidth = ((inputrange.value - inputrange.min) * 164) / 10 + 66;
      $(".homeslider .home .walls").animate(
        {
          width: wallwidth
        },
        50,
        "linear"
      );
      $(".homeslider .home").addClass("shake");
      setTimeout(function () {
        $(".homeslider .home").removeClass("shake");
      }, 700);
    
      windowscount = $(".homeslider .home .walls .right .window:not(.effect):visible").length;
      
      eachwallwidth = (wallwidth - centerwall) / 2;
      
      windowfitonwall = Math.floor(eachwallwidth / windowwidth);
      console.log(windowfitonwall);
      if (windowfitonwall >= 0) {
        if (
          windowfitonwall > windowscount &&
          windowfitonwall <= $(".homeslider .home .walls .right .window").length
        ) {
          while (windowfitonwall > windowscount) {
            $(".homeslider .home .walls .right .window:hidden")
              .eq(0)
              .removeClass("effect")
              .show();
            $(".homeslider .home .walls .left .window:hidden")
              .eq(0)
              .removeClass("effect")
              .show();
            windowscount++;
          }
        } else if (windowfitonwall < windowscount) {
          
          while (windowfitonwall < windowscount) {
            console.log($(".homeslider .home .walls .right .window:not(.effect):visible")
              .eq(0));
            $(".homeslider .home .walls .right .window:not(.effect):visible")
              .eq(0)
              .addClass("effect")
              .fadeOut();
            $(".homeslider .home .walls .left .window:not(.effect):visible")
              .eq(0)
              .addClass("effect")
              .fadeOut();
            windowscount--;
          }
        }
      }
      if (inputrange.value - inputrange.min <= 3) {
        $(".homeslider .home .walls .center .frontwindow").addClass("effect");
      }
      if (inputrange.value - inputrange.min > 3) {
        $(".homeslider .home .walls .center .frontwindow").removeClass("effect");
      }
    }
  });