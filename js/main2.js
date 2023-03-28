"use strict";
jQuery(function () {
  if ($(".navbar-main").length) {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 1000) {
        $(".navbar-main").addClass("navbar-main-sticky");
      } else {
        $(".navbar-main").removeClass("navbar-main-sticky");
      }
    });
  }
  if ($(".navbar-product").length) {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 1000) {
        $(".navbar-product").show();
        $(".navbar-product").addClass("navbar-product-sticky");
      } else {
        $(".navbar-product").hide();
        $(".navbar-product").removeClass("navbar-product-sticky");
      }
    });
  }
  if ($(".navbar-black-friday").length) {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 500) {
        $(".navbar-black-friday").addClass("navbar-black-friday-sticky");
      } else {
        $(".navbar-black-friday").removeClass("navbar-black-friday-sticky");
      }
    });
  }
  if (document.getElementById("countdownMain")) {
    initiateCountdown();
  }
  function initiateCountdown() {
    var countDownDate = new Date("Dec 1, 2022 15:00:00").getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("countdownMain").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdownMain").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });
  var breakpoints = {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1200,
  };
  $(".product-card").on("mouseover", function () {
    $(this).find("img").addClass("hover-product-image");
    $(this).find(".show-on-hover").addClass("show");
  });
  $(".product-card").on("mouseout", function () {
    $(this).find("img").removeClass("hover-product-image");
    $(this).find(".show-on-hover").removeClass("show");
  });
  var $navbarCollapse = $(".navbar-main .collapse");
  $navbarCollapse.on("hide.bs.collapse", function () {
    var $this = $(this);
    $this.addClass("collapsing-out");
    $("html, body").css("overflow", "initial");
  });
  $navbarCollapse.on("hidden.bs.collapse", function () {
    var $this = $(this);
    $this.removeClass("collapsing-out");
  });
  $navbarCollapse.on("shown.bs.collapse", function () {
    $("html, body").css("overflow", "hidden");
  });
  $(".navbar-main .dropdown").on("hide.bs.dropdown", function () {
    var $this = $(this).find(".dropdown-menu");
    $this.addClass("close");
    setTimeout(function () {
      $this.removeClass("close");
    }, 200);
  });
  $(document).on("click", ".mega-dropdown", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", ".navbar-nav > .dropdown", function (e) {
    e.stopPropagation();
  });
  $(".dropdown-submenu > .dropdown-toggle").click(function (e) {
    e.preventDefault();
    $(this).parent(".dropdown-submenu").toggleClass("show");
  });
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });
  $("[data-background-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-background-color"));
  });
  $("[data-color]").each(function () {
    $(this).css("color", $(this).attr("data-color"));
  });
  $(".datepicker")[0] &&
    $(".datepicker").each(function () {
      $(".datepicker").datepicker({
        disableTouchKeyboard: true,
        autoclose: false,
      });
    });
  function isTouchDevice() {
    return (
      true ==
      ("ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch))
    );
  }
  if (!isTouchDevice()) {
    $('[data-toggle="tooltip"]').tooltip();
  }
  $('[data-toggle="popover"]').each(function () {
    var popoverClass = "";
    if ($(this).data("color")) {
      popoverClass = "popover-" + $(this).data("color");
    }
    $(this).popover({
      trigger: "focus",
      template:
        '<div class="popover ' +
        popoverClass +
        '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    });
  });
  $(".form-control")
    .on("focus blur", function (e) {
      $(this)
        .parents(".form-group")
        .toggleClass("focused", e.type === "focus" || this.value.length > 0);
    })
    .trigger("blur");
  if ($(".input-slider-container")[0]) {
    $(".input-slider-container").each(function () {
      var slider = $(this).find(".input-slider");
      var sliderId = slider.attr("id");
      var minValue = slider.data("range-value-min");
      var maxValue = slider.data("range-value-max");
      var sliderValue = $(this).find(".range-slider-value");
      var sliderValueId = sliderValue.attr("id");
      var startValue = sliderValue.data("range-value-low");
      var c = document.getElementById(sliderId),
        d = document.getElementById(sliderValueId);
      noUiSlider.create(c, {
        start: [parseInt(startValue)],
        connect: [true, false],
        range: {
          min: [parseInt(minValue)],
          max: [parseInt(maxValue)],
        },
      });
      c.noUiSlider.on("update", function (a, b) {
        d.textContent = a[b];
      });
    });
  }
  if ($("#input-slider-range")[0]) {
    var c = document.getElementById("input-slider-range"),
      d = document.getElementById("input-slider-range-value-low"),
      e = document.getElementById("input-slider-range-value-high"),
      f = [d, e];
    noUiSlider.create(c, {
      start: [
        parseInt(d.getAttribute("data-range-value-low")),
        parseInt(e.getAttribute("data-range-value-high")),
      ],
      connect: !0,
      tooltips: true,
      range: {
        min: parseInt(c.getAttribute("data-range-value-min")),
        max: parseInt(c.getAttribute("data-range-value-max")),
      },
    }),
      c.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b];
      });
  }
  if ($("#input-slider-range-2")[0]) {
    var c = document.getElementById("input-slider-range-2"),
      d = document.getElementById("input-slider-range-value-low-2"),
      e = document.getElementById("input-slider-range-value-high-2"),
      f = [d, e];
    noUiSlider.create(c, {
      start: [
        parseInt(d.getAttribute("data-range-value-low")),
        parseInt(e.getAttribute("data-range-value-high")),
      ],
      connect: !0,
      tooltips: true,
      pips: {
        mode: "positions",
        values: [0, 25, 50, 75, 100],
        density: 5,
      },
      range: {
        min: parseInt(c.getAttribute("data-range-value-min")),
        max: parseInt(c.getAttribute("data-range-value-max")),
      },
    }),
      c.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b];
      });
  }
  if ($("#input-slider-vertical-1")[0]) {
    var c = document.getElementById("input-slider-vertical-1"),
      d = document.getElementById("input-slider-range-value-low-3"),
      e = document.getElementById("input-slider-range-value-high-3"),
      f = [d, e];
    noUiSlider.create(c, {
      start: [
        parseInt(d.getAttribute("data-range-value-low")),
        parseInt(e.getAttribute("data-range-value-high")),
      ],
      connect: !0,
      tooltips: false,
      orientation: "vertical",
      range: {
        min: parseInt(c.getAttribute("data-range-value-min")),
        max: parseInt(c.getAttribute("data-range-value-max")),
      },
    }),
      c.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b];
      });
  }
  if ($("#input-slider-vertical-2")[0]) {
    var c = document.getElementById("input-slider-vertical-2"),
      d = document.getElementById("input-slider-range-value-low"),
      e = document.getElementById("input-slider-range-value-high"),
      f = [d, e];
    noUiSlider.create(c, {
      start: [
        parseInt(d.getAttribute("data-range-value-low")),
        parseInt(e.getAttribute("data-range-value-high")),
      ],
      connect: !0,
      tooltips: true,
      orientation: "vertical",
      pips: {
        mode: "positions",
        values: [0, 25, 50, 75, 100],
        density: 5,
      },
      range: {
        min: parseInt(c.getAttribute("data-range-value-min")),
        max: parseInt(c.getAttribute("data-range-value-max")),
      },
    }),
      c.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b];
      });
  }
  $(".progress-bar").each(function () {
    var $progressBar = $(this);
    var valueNow = $(this).attr("aria-valuenow");
    var maxValue = $(this).attr("aria-valuemax");
    var percentage = (valueNow / maxValue) * 100;
    $progressBar.css("width", percentage + "%");
    $progressBar.css({
      animation: "animate-positive .8s",
      opacity: "1",
    });
  });
  $('[data-toggle="on-screen"]')[0] &&
    $('[data-toggle="on-screen"]').onScreen({
      container: window,
      direction: "vertical",
      doIn: function () {},
      doOut: function () {},
      tolerance: 200,
      throttle: 50,
      toggleClass: "on-screen",
      debug: false,
    });
  $('[data-toggle="scroll"]').on("click", function (event) {
    var hash = $(this).attr("href");
    var offset = $(this).data("offset") ? $(this).data("offset") : 0;
    $("html, body")
      .stop(true, true)
      .animate(
        {
          scrollTop: $(hash).offset().top - offset,
        },
        600
      );
    event.preventDefault();
  });
  if (
    $(".alert.alert-success").length &&
    $(".alert.alert-success").is(":visible")
  ) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(".alert.alert-success").offset().top - 120,
      },
      1000
    );
  }
  if (
    $(".inline-error-message").length &&
    $(".inline-error-message").is(":visible")
  ) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(".inline-error-message").offset().top - 120,
      },
      1000
    );
  }
  $(document).on("click", ".card-rotate .btn-rotate", function () {
    var $rotating_card_container = $(this).closest(".rotating-card-container");
    if ($rotating_card_container.hasClass("hover")) {
      $rotating_card_container.removeClass("hover");
    } else {
      $rotating_card_container.addClass("hover");
    }
  });
  if ($(document).width() <= breakpoints.lg) {
    var viewportHeight = $(window).height();
    $(window).on("scroll", function () {
      var scrollPos = $(document).scrollTop();
      if (scrollPos >= viewportHeight * 3) {
        $("#carbon-ad").addClass("sticky");
        $("#carbon-ad").removeClass("d-none");
      }
    });
  }
  if ($(document).width() >= breakpoints.lg) {
    var equalize = {
      uniqueIds: [],
      elements: [],
    };
    $("[data-equalize-height]").each(function () {
      var id = $(this).attr("data-equalize-height");
      if (!equalize.uniqueIds.includes(id)) {
        equalize.uniqueIds.push(id);
        equalize.elements.push({
          id: id,
          elements: [],
        });
      }
    });
    $("[data-equalize-height]").each(function () {
      var $el = $(this);
      var id = $el.attr("data-equalize-height");
      equalize.elements.map(function (elements) {
        if (elements.id === id) {
          elements.elements.push($el);
        }
      });
    });
    equalize.elements.map(function (elements) {
      var elements = elements.elements;
      if (elements.length) {
        var maxHeight = 0;
        elements.map(function ($element) {
          maxHeight =
            maxHeight < $element.outerHeight()
              ? $element.outerHeight()
              : maxHeight;
        });
        elements.map(function ($element) {
          $element.height(maxHeight);
        });
      }
    });
  }
  $("[data-bind-characters-target]").each(function () {
    var $text = $($(this).attr("data-bind-characters-target"));
    var maxCharacters = parseInt($(this).attr("maxlength"));
    $text.text(maxCharacters);
    $(this).on("keyup change", function (e) {
      var string = $(this).val();
      var characters = string.length;
      var charactersRemaining = maxCharacters - characters;
      $text.text(charactersRemaining);
    });
  });
  $("[data-bind-text-target-url]").each(function () {
    var $text = $($(this).attr("data-bind-text-target-url"));
    var $parentLink = $text.parent();
    $(this).on("keyup change", function (e) {
      var string = $(this).val();
      $text.text(string);
      $parentLink.attr("href", $parentLink.text());
    });
  });
  $(".copy-docs").on("click", function () {
    var $copy = $(this);
    var htmlEntities = $copy
      .parents(".nav-wrapper")
      .siblings(".card")
      .find(".tab-pane:last-of-type")
      .html();
    var htmlDecoded = $("<div/>").html(htmlEntities).text().trim();
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(htmlDecoded).select();
    document.execCommand("copy");
    $temp.remove();
    $copy.text("Copied!");
    $copy.addClass("copied");
    setTimeout(function () {
      $copy.text("Copy");
      $copy.removeClass("copied");
    }, 1000);
  });
  var $licenseDropdown = $("#licenseDropdown");
  var $productPrice = $("#productPrice");
  $("#standardLicense").on("click", function () {
    $licenseDropdown.find(".license-type").text("Standard license");
    $productPrice.text($("#standardLicensePrice").text());
    $("#standardBuy").show();
    $("#extendedBuy").hide();
  });
  $("#extendedLicense").on("click", function () {
    $licenseDropdown.find(".license-type").text("Extended license");
    $productPrice.text($("#extendedLicensePrice").text());
    $("#extendedBuy").show();
    $("#standardBuy").hide();
  });
  $(".product-card[data-product-color]").each(function () {
    var colorHex = $(this).attr("data-product-color");
    $(this).find(".btn-product-action i").css("color", colorHex);
  });
  $(".stars-rating .star").on("mouseover", function () {
    var rating = $(this).attr("data-rating-value");
    $(".stars-rating .star").each(function (value) {
      if (value + 1 <= rating) {
        $(this).removeClass("text-gray");
        $(this).addClass("text-warning");
      }
      if (value >= rating) {
        $(this).addClass("text-gray");
        $(this).removeClass("text-warning");
        $(this).removeClass("fas");
        $(this).addClass("far");
      }
    });
    $(this).on("click", function () {
      $(this).parent().addClass("rated");
      $(".stars-rating .star").each(function (value) {
        if (value + 1 <= rating) {
          $(this).removeClass("text-gray");
          $(this).addClass("text-warning");
          $(this).removeClass("far");
          $(this).addClass("fas");
        }
      });
      $("#rating").val(rating);
    });
  });
  $(".stars-rating").on("mouseleave", function () {
    if (!$(this).hasClass("rated")) {
      $(".stars-rating .star").each(function () {
        $(this).addClass("text-gray");
        $(this).removeClass("text-warning");
        $(this).addClass("far");
        $(this).removeClass("fas");
      });
    }
  });
  $("#deleteReview").on("click", function (e) {
    e.preventDefault();
    $("#deleteReviewForm").submit();
  });
  $("#toggleEditReview").on("click", function (e) {
    e.preventDefault();
    var $editReviewForm = $("#editReviewForm");
    var $userReview = $(".userReview");
    if ($editReviewForm.is(":hidden")) {
      $editReviewForm.show();
      $userReview.hide();
      $(this).html('<i class="fad fa-list mr-2"></i> Show review');
    } else {
      $editReviewForm.hide();
      $userReview.show();
      $(this).html('<i class="fad fa-edit mr-2"></i> Edit review');
    }
  });
  $("#contactSubmit").on("submit", function () {
    if (typeof fbq !== "undefined") {
      fbq("track", "Contact");
    }
  });
  if ($(".slider").length) {
    $(".slider").slider({
      initialPosition: 0.5,
      instructionText: "Drag left to show new",
    });
  }
  var $checkoutCompanyCollapse = $("#checkoutCompanyCollapse");
  var $checkoutPersonalCollapse = $("#checkoutPersonalCollapse");
  $checkoutCompanyCollapse.on("show.bs.collapse", function () {
    $checkoutPersonalCollapse.removeClass("show");
  });
  $checkoutPersonalCollapse.on("show.bs.collapse", function () {
    $checkoutCompanyCollapse.removeClass("show");
  });
  var scroll = new SmoothScroll('a[href*="#"]');
  $("#enterpriseDevelopersSelect").on("change", function () {
    var value = $(this).val();
    if (value === "15+ developers") {
      $("#enterprise_price_button").hide();
      $("#enterpriseContactButton").show();
    } else {
      $("#enterprise_price_button").show();
      $("#enterpriseContactButton").hide();
    }
  });
  $(".toggle-read-more").on("click", function () {
    var target = $(this).attr("data-target");
    if ($(target).hasClass("expanded")) {
      $(target).removeClass("expanded");
      $(this).html('Read more <i class="fad fa-chevron-circle-down ml-1"></i>');
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(this).offset().top,
        },
        500
      );
    } else {
      $(target).addClass("expanded");
      $(this).html('Read less <i class="fad fa-chevron-circle-up ml-1"></i>');
    }
  });
});
