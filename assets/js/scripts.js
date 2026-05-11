document.addEventListener("DOMContentLoaded", function () {
  new WOW().init();

  document.querySelectorAll("select").forEach((element) => {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar";
    new SlimSelect({
      select: element,
      settings: {
        showSearch: true,
        searchText: isRTL ? "لا توجد نتائج" : "No Results",
        searchPlaceholder: isRTL ? "ابحث هنا..." : "Search here...",
        searchingText: isRTL ? "جاري البحث..." : "Searching...",
        placeholderText: isRTL ? "اختر خياراً" : "Select an option",
      },
    });
  });

  const heroSlider = document.querySelector(".hero-slider");
  const heroThumbnails = document.querySelector(".hero-thumbnails");

  if (heroSlider && heroThumbnails) {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar";

    const thumbnails = new Splide(heroThumbnails, {
      direction: isRTL ? "rtl" : "ltr",
      rewind: true,
      isNavigation: true,
      gap: "5px",
      pagination: false,
      arrows: true,
      perPage: 5,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints: {
        1200: {
          perPage: 5,
        },
        992: {
          perPage: 3,
        },
        576: {
          perPage: 2,
        },
      },
    });

    const main = new Splide(heroSlider, {
      direction: isRTL ? "rtl" : "ltr",
      type: "loop",
      pagination: false,
      arrows: false,
      autoplay: true,
      speed: 1200,
      rewind: true,
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  }

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
