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

  const items = document.querySelectorAll('.mega-menu-item--has-children');
  const container = document.querySelector('.mega-menu-columns');

  function updateLastBorder() {
    document.querySelectorAll('.mega-menu-list, .mega-menu-sublist').forEach(el => {
      el.classList.remove('last-visible');
    });

    const visibleLists = Array.from(document.querySelectorAll('.mega-menu-list, .mega-menu-sublist'))
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

    if (visibleLists.length > 0) {
      visibleLists[visibleLists.length - 1].classList.add('last-visible');
    }
  }

  function openSubMenu(item) {
    const parentList = item.parentElement;
    const siblings = parentList.querySelectorAll(':scope > .mega-menu-item--has-children');

    siblings.forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove('is-open');
        const siblingSub = sibling.querySelector('.mega-menu-sublist');
        if (siblingSub) siblingSub.classList.remove('show');
      }
    });

    item.classList.add('is-open');
    const subMenu = item.querySelector('.mega-menu-sublist');
    if (subMenu) {
      subMenu.classList.add('show');
    }
    updateLastBorder();
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      if (window.innerWidth >= 992) {
        openSubMenu(item);
      }
    });

    item.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        const subMenu = item.querySelector('.mega-menu-sublist');
        if (subMenu && !subMenu.classList.contains('show')) {
          e.preventDefault();
          e.stopPropagation();
          openSubMenu(item);
        }
      }
    });
  });

  if (container) {
    container.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 992) {
        items.forEach(item => {
          item.classList.remove('is-open');
          const sub = item.querySelector('.mega-menu-sublist');
          if (sub) sub.classList.remove('show');
        });
        updateLastBorder();
      }
    });
  }

  updateLastBorder();

});
