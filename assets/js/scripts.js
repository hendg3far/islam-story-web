document.addEventListener("DOMContentLoaded", function () {
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

  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });

  document.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const targetSelector = btn.getAttribute("data-comment");
      const replyForm = document.querySelector(targetSelector);
      if (replyForm) {
        replyForm.classList.toggle("d-none");
      }
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

  const fatwaSlider = document.querySelector(".fatwa-slider");
  if (fatwaSlider) {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar";

    new Splide(fatwaSlider, {
      direction: isRTL ? "rtl" : "ltr",
      type: "loop",
      autoplay: true,
      speed: 1200,
      pagination: true,
      arrows: false,
      perPage: 2,
      trimSpace: false,
      gap: "1rem",
      breakpoints: {
        1200: {
          perPage: 2,
        },
        992: {
          perPage: 2,
        },
        576: {
          perPage: 1,
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

  var videoElements = document.querySelectorAll(".video-js");

  if (videoElements.length > 0) {
    videoElements.forEach(function (videoEl, index) {
      var player = videojs(videoEl, {
        controls: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          children: [
            "playToggle",
            "volumePanel",
            "currentTimeDisplay",
            "timeDivider",
            "durationDisplay",
            "progressControl",
            "remainingTimeDisplay",
            "subsCapsButton",
            "fullscreenToggle",
          ],
        },
      });
    });
  }

  var alternativePlayers = document.querySelectorAll(".sound-js");

  if (alternativePlayers.length > 0 && typeof videojs !== "undefined") {
    alternativePlayers.forEach(function (element, index) {
      var player = videojs(element, {
        controls: true,
        fluid: false,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          children: ["playToggle", "volumePanel", "progressControl"],
        },
      });

      player.on("ready", function () {
        console.log("Alternative player " + (index + 1) + " is ready.");
      });
    });
  }
});

ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
});

const initPhoneInput = () => {
  const isRtl = document.documentElement.dir === "rtl";

  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    intlTelInput(input, {
      initialCountry: "eg",
      separateDialCode: true,
    });
  });
};

function initTextAnimations() {
  document.fonts.ready.then(() => {
    const elements = document.querySelectorAll("[data-gsap]");
    const splits = [];

    elements.forEach((el) => {
      const animationType = el.dataset.gsap;

      let split = null;
      let isArabic = false;

      if (
        animationType === "split-chars" ||
        animationType === "split-lines" ||
        animationType === "animate-blur"
      ) {
        isArabic =
          el.getAttribute("lang") === "ar" ||
          document.documentElement.lang === "ar";

        const typeSetting =
          animationType === "split-lines"
            ? "lines"
            : isArabic
              ? "words"
              : "chars, words";

        split = new SplitText(el, {
          type: typeSetting,
        });
      }

      splits.push({ el, split, animationType, isArabic });
    });

    setTimeout(() => {
      requestAnimationFrame(() => {
        runAnimations(splits);
        ScrollTrigger.refresh();
      });
    }, 0);
  });
}

function runAnimations(splits) {
  splits.forEach(({ el, split, animationType, isArabic }) => {
    gsap.set(el, {
      visibility: "visible",
      opacity: 1,
      willChange: "transform",
    });

    const scrollSettings = {
      trigger: el,
      start: "top bottom-=50",
      once: true,
      invalidateOnRefresh: false,
    };

    if (animationType === "split-chars") {
      gsap.from(isArabic ? split.words : split.chars, {
        scrollTrigger: scrollSettings,
        opacity: 0,
        y: 35,
        rotateX: -35,
        stagger: 0.015,
        duration: 1,
        ease: "power4.out",
      });
      return;
    }

    if (animationType === "split-lines") {
      gsap.from(split.lines, {
        scrollTrigger: scrollSettings,
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      });
      return;
    }

    if (animationType === "animate-blur") {
      gsap.from(isArabic ? split.words : split.chars, {
        scrollTrigger: scrollSettings,
        opacity: 0,
        filter: "blur(10px)",
        y: 15,
        stagger: 0.02,
        duration: 0.9,
        ease: "power3.out",
      });
      return;
    }

    const presets = {
      fadeUp: { y: 40, opacity: 0 },
      fadeDown: { y: -40, opacity: 0 },
      fadeIn: { opacity: 0 },
      scaleUp: { scale: 0.85, opacity: 0 },
      slideIn: { x: -40, opacity: 0 },
      zoomIn: { scale: 0.7, opacity: 0 },
      "fade-up": { y: 50, opacity: 0 },
      "fade-down": { y: -50, opacity: 0 },
    };

    const anim = presets[animationType];

    if (anim) {
      gsap.from(el, {
        ...anim,
        scrollTrigger: scrollSettings,
        duration: animationType.includes("fade") ? 1 : 0.9,
        ease: animationType.includes("fade") ? "expo.out" : "power3.out",
      });
    }
  });
}

function initCardHoverAnimations() {
  gsap.utils.toArray(".card").forEach((card) => {
    const image = card.querySelector(".card-img-top");

    if (!image) return;

    gsap.set(card, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -12,
        rotateX: 3,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(image, {
        scale: 1.12,
        duration: 0.8,
        ease: "power4.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.8,
        ease: "power4.out",
      });
    });
  });
}

function initPreloader(onComplete) {
  const preloader = document.getElementById("preloader");
  const loadingBar = document.getElementById("loading-bar");

  if (!preloader || !loadingBar) {
    onComplete?.();
    return;
  }

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12;

    loadingBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(interval);

      loadingBar.style.width = "100%";

      setTimeout(() => {
        preloader.classList.add("hidden");
        document.body.classList.add("loaded");

        onComplete?.();
      }, 400);
    }
  }, 100);
}

const runInit = window.requestIdleCallback || requestAnimationFrame;

runInit(() => {
  initPhoneInput();

  initPreloader(() => {
    initTextAnimations();
    initCardHoverAnimations();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".upload-file").forEach((uploadBox) => {
    const fileInput = uploadBox.querySelector(".file-input");
    const textSpan = uploadBox.querySelector(".upload-text");

    if (!fileInput || !textSpan) return;

    const originalText = textSpan.textContent;

    uploadBox.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        textSpan.textContent = ` : ${fileInput.files[0].name}`;
      } else {
        textSpan.textContent = originalText;
      }
    });
  });
});
