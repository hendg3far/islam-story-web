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

  const items = document.querySelectorAll(".mega-menu-item--has-children");
  const container = document.querySelector(".mega-menu-columns");
  const backBtn = document.getElementById("backLevel");

  /* =========================
   Helpers
========================= */
  function updateLastBorder() {
    document
      .querySelectorAll(".mega-menu-list, .mega-menu-sublist")
      .forEach((el) => {
        el.classList.remove("last-visible");
      });

    const visibleLists = Array.from(
      document.querySelectorAll(".mega-menu-list, .mega-menu-sublist"),
    ).filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.transform !== "translateX(-100%)"
      );
    });

    if (visibleLists.length > 0) {
      visibleLists[visibleLists.length - 1].classList.add("last-visible");
    }
  }

  function closeAllSubMenus() {
    document.querySelectorAll(".mega-menu-sublist.show").forEach((sub) => {
      sub.classList.remove("show");
    });

    items.forEach((item) => {
      item.classList.remove("is-open");
    });
  }

  function closeMegaMenuOnly() {
    const openDropdown = document.querySelector(".nav-item.dropdown.show");

    if (!openDropdown) return;

    // close bootstrap dropdown state
    openDropdown.classList.remove("show");

    const toggle = openDropdown.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }

    const megaMenu = openDropdown.querySelector(".mega-menu");
    if (megaMenu) {
      megaMenu.classList.remove("show");
    }

    closeAllSubMenus();
    updateLastBorder();
  }

  /* =========================
   Open submenu
========================= */
  function openSubMenu(item) {
    const parentList = item.parentElement;

    const siblings = parentList.querySelectorAll(
      ":scope > .mega-menu-item--has-children",
    );

    siblings.forEach((sibling) => {
      if (sibling !== item) {
        sibling.classList.remove("is-open");

        const siblingSub = sibling.querySelector(":scope > .mega-menu-sublist");
        if (siblingSub) siblingSub.classList.remove("show");
      }
    });

    item.classList.add("is-open");

    const subMenu = item.querySelector(":scope > .mega-menu-sublist");
    if (subMenu) {
      subMenu.classList.add("show");
    }

    updateLastBorder();
  }

  /* =========================
   Desktop + Mobile
========================= */
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 992) {
        openSubMenu(item);
      }
    });

    item.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        const subMenu = item.querySelector(":scope > .mega-menu-sublist");

        if (subMenu) {
          e.preventDefault();
          e.stopPropagation();
          openSubMenu(item);
        }
      }
    });
  });

  /* =========================
   Desktop mouse leave
========================= */
  if (container) {
    container.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 992) {
        closeAllSubMenus();
        updateLastBorder();
      }
    });
  }

  /* =========================
   Back Button
========================= */
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const openSubLists = Array.from(
        document.querySelectorAll(".mega-menu-sublist.show"),
      );

      if (openSubLists.length > 0) {
        const lastOpenSub = openSubLists[openSubLists.length - 1];

        lastOpenSub.classList.remove("show");

        const parentItem = lastOpenSub.closest(".mega-menu-item--has-children");
        if (parentItem) {
          parentItem.classList.remove("is-open");
        }

        updateLastBorder();
      } else {
        closeAllSubMenus();

        document.querySelectorAll(".mega-menu.show").forEach((menu) => {
          menu.classList.remove("show");
        });

        document
          .querySelectorAll(".nav-item.dropdown.show")
          .forEach((dropdown) => {
            dropdown.classList.remove("show");
          });

        document.querySelectorAll(".dropdown-toggle.show").forEach((toggle) => {
          toggle.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        });

        updateLastBorder();
      }
    });
  }

  /* =========================
   Reset when dropdown closed manually
========================= */
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setTimeout(() => {
        if (
          window.innerWidth < 992 &&
          toggle.getAttribute("aria-expanded") === "false"
        ) {
          closeAllSubMenus();
          updateLastBorder();
        }
      }, 50);
    });
  });

  /* =========================
   Init
========================= */
  updateLastBorder();
});
