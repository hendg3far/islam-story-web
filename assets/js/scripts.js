document.addEventListener("DOMContentLoaded", function () {
  new WOW().init();

  document.querySelectorAll("select").forEach((element) => {
    new SlimSelect({
      select: element,
      settings: {
        showSearch: false,
      },
    });
  });

  const librarySlider = document.querySelector(".library-slider");
  if (librarySlider) {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar";

    new Splide(librarySlider, {
      direction: isRTL ? "rtl" : "ltr",
      type: "loop",
      autoplay: true,
      speed: 1200,
      pagination: true,
      arrows: false,
      perPage: 1,
      trimSpace: false,
      padding: "20%",
      gap: "1rem",
      breakpoints: {
        1200: {
          padding: "10%",
        },
        992: {
          padding: "10%",
        },
        576: {
          padding: "10%",
        },
      },
    }).mount();
  }

  const bookSlider = document.querySelector(".books-slider");
  if (bookSlider) {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar";

    new Splide(bookSlider, {
      direction: isRTL ? "rtl" : "ltr",
      type: "loop",
      autoplay: true,
      speed: 1200,
      pagination: true,
      arrows: false,
      perPage: 3,
      trimSpace: false,
      padding: "10%",
      gap: "1rem",
      breakpoints: {
        1200: {
          perPage: 3,
          padding: "10%",
        },
        992: {
          perPage: 2,
          padding: "10%",
        },
        576: {
          perPage: 1,
          padding: "10%",
        },
      },
    }).mount();
  }
});
