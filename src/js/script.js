$(document).ready(function () {
  $(".icon-menu").click(function (event) {
    $(this).toggleClass("active");
    $(".menu__body").toggleClass("active");
    $("body").toggleClass("lock");
  });

  function ibg() {
    $.each($(".ibg"), function (index, val) {
      if ($(this).find("img").length > 0) {
        $(this).css(
          "background-image",
          'url("' + $(this).find("img").attr("src") + '")'
        );
      }
    });
  }
  ibg();

  // sliders
  if ($(".slider__body").length > 0) {
    $(".slider__body").slick({
      // autoplay: true,
      // infinite: false,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 1,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
      nextArrow: '<button type="button" class="slick-next"></button>',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {},
        },
      ],
    });
  }
  // forms
  function forms() {
    $("input,textarea").focus(function () {
      if ($(this).val() == $(this).attr("data-value")) {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if ($(this).attr("data-type") == "pass") {
          $(this).attr("type", "password");
        }
        $(this).val("");
      }
      removeFormError($(this));
    });
    $("input[data-value], textarea[data-value]").each(function () {
      if (this.value == "" || this.value == $(this).attr("data-value")) {
        if (
          $(this).hasClass("1") &&
          $(this).parent().find(".form__label").length == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        } else {
          this.value = $(this).attr("data-value");
        }
      }
      if (this.value != $(this).attr("data-value") && this.value != "") {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if (
          $(this).hasClass("1") &&
          $(this).parent().find(".form__label").lenght == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        }
      }
      $(this).click(function () {
        if (this.value == $(this).attr("data-value")) {
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "password");
          }
          this.value = "";
        }
      });
      $(this).blur(function () {
        if (this.value == "") {
          if (!$(this).hasClass("1")) {
            this.value = $(this).attr("data-value");
          }
          $(this).removeClass("focus");
          $(this).parent().removeClass("focus");
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "text");
          }
        }
        if ($(this).hasClass("vn")) {
          formValidate($(this));
        }
      });
    });
    $(".form-input__viewpass").click(function (event) {
      if ($(this).hasClass("active")) {
        $(this).parent().find("input").attr("type", "password");
      } else {
        $(this).parent().find("iput").attr("type", "text");
      }
    });
  }
  forms();
  // validate forms
  $("form button[type=submit]").click(function () {
    var er = 0;
    var form = $(this).parents("form");
    var ms = form.data("ms");
    $.each(form.find(".req"), function (index, val) {});
    if (er == 0) {
      removeFormError(form);

      if (ms != null && ms != "") {
        showMessageByClass(ms);
        return false;
      }
    } else {
      return false;
    }
  });
  function formValidate(input) {
    var er = 0;
    var form = input.parents("form");
    if (input.attr("name") == "email" || input.hasClass("email")) {
      if (input.val() != input.attr("data-value")) {
        var em = input.val().replace(" ", "");
        input.val(em);
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val()) ||
        input.val() == input.attr("data-value")
      ) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    }
    if (input.attr("tupe") == "checkbox") {
      if (input.prop("checked") == true) {
        input.removeClass(err).parent().removeClass("err");
      } else {
        er++;
        input.addClass("err").parent().addClass("err");
      }
    }
    if (input.hasClass("name")) {
      if (!/^[A-Яа-яа-zA-Z-]+( [A-Яа-яа-zA-Z-]+)$/.test(input.val())) {
        er++;
        addError(input);
      }
    }
    if (input.hasClass("pass-2")) {
      if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
        addError(input);
      } else {
        removeError(input);
      }
    }
    return er;
  }
});
