
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PRODUCT INFORMATION
  // ==========================================

  const products = {
    "Diesel": {
      index: "01 / 06",
      category: "BULK LIQUID FUEL",
      description:
        "Explore bulk diesel supply enquiries for business and industrial requirements.",
      imageClass: "diesel-image",
      specifications: [
        "50ppm diesel enquiries",
        "500ppm diesel enquiries",
        "Quantity and destination confirmed by quotation",
        "Availability and specifications subject to supplier confirmation"
      ],
      reverse: "50ppm â€¢ 500ppm"
    },

    "Petrol": {
      index: "02 / 06",
      category: "LIQUID FUEL",
      description:
        "Petrol supply enquiries for customers requiring ULP fuel products.",
      imageClass: "petrol-image",
      specifications: [
        "ULP93 petrol enquiries",
        "ULP95 petrol enquiries",
        "Quantity and destination required for quotation",
        "Availability subject to supplier confirmation"
      ],
      reverse: "ULP93 â€¢ ULP95"
    },

    "LPG Gas": {
      index: "03 / 06",
      category: "GAS SUPPLY",
      description:
        "LPG gas bottle supply enquiries for different customer requirements.",
      imageClass: "gas-image",
      specifications: [
        "9kg bottle enquiries",
        "14kg bottle enquiries",
        "19kg bottle enquiries",
        "48kg bottle enquiries",
        "Availability subject to supplier confirmation"
      ],
      reverse: "9kg â€¢ 14kg â€¢ 19kg â€¢ 48kg"
    },

    "Coal": {
      index: "04 / 06",
      category: "MINERAL RESOURCES",
      description:
        "Bulk coal enquiries for customers with industrial and energy resource requirements.",
      imageClass: "coal-image",
      specifications: [
        "RB1 grade enquiries",
        "RB2 grade enquiries",
        "RB3 grade enquiries",
        "Quantity and specifications to be confirmed"
      ],
      reverse: "RB1 â€¢ RB2 â€¢ RB3"
    },

    "ROM materials": {
      index: "05 / 06",
      category: "MINING & INDUSTRIAL",
      description:
        "Run-of-Mine material enquiries for customers who need to discuss material requirements and quantities.",
      imageClass: "rom-image",
      specifications: [
        "Run-of-Mine material enquiries",
        "Required quantity to be supplied by customer",
        "Material specifications to be confirmed",
        "Availability subject to supplier confirmation"
      ],
      reverse: "RUN-OF-MINE"
    },

    "Chrome Ore": {
      index: "06 / 06",
      category: "MINERAL RESOURCES",
      description:
        "Chrome ore enquiries for customers interested in chrome-bearing rock material and bulk mineral supply.",
      imageClass: "chrome-image",
      specifications: [
        "Chrome ore supply enquiries",
        "Required tonnage to be supplied by customer",
        "Grade and composition to be confirmed",
        "Testing, availability and specifications require supplier confirmation"
      ],
      reverse: "CHROME ORE"
    }
  };

  // ==========================================
  // WELCOME SCREEN
  // ==========================================

  const welcomeScreen = document.getElementById("welcomeScreen");
  const siteWrapper = document.getElementById("siteWrapper");
  const enterButton = document.getElementById("enterButton");

  if (enterButton && welcomeScreen && siteWrapper) {
    enterButton.addEventListener("click", () => {
      welcomeScreen.classList.add("hide");
      siteWrapper.classList.add("visible");

      document.body.classList.add("site-entered");

      setTimeout(() => {
        welcomeScreen.style.display = "none";
      }, 850);
    });
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // ==========================================
  // PRODUCT CAROUSEL
  // ==========================================

  const carousel = document.getElementById("productCarousel");
  const previousButton = document.getElementById("previousProduct");
  const nextButton = document.getElementById("nextProduct");
  const carouselPosition = document.getElementById("carouselPosition");

  const productCards = carousel
    ? Array.from(carousel.querySelectorAll(".product-card"))
    : [];

  function getCardStep() {
    if (!productCards.length) return 300;

    const firstCard = productCards[0];
    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateCarouselPosition() {
    if (!carousel || !carouselPosition || !productCards.length) return;

    const step = getCardStep();
    const index = Math.min(
      productCards.length - 1,
      Math.max(0, Math.round(carousel.scrollLeft / step))
    );

    carouselPosition.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(productCards.length).padStart(2, "0");
  }

  if (carousel) {
    carousel.addEventListener("scroll", updateCarouselPosition, {
      passive: true
    });

    window.addEventListener("resize", updateCarouselPosition);
  }

  if (previousButton && carousel) {
    previousButton.addEventListener("click", () => {
      carousel.scrollBy({
        left: -getCardStep(),
        behavior: "smooth"
      });
    });
  }

  if (nextButton && carousel) {
    nextButton.addEventListener("click", () => {
      carousel.scrollBy({
        left: getCardStep(),
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // PRODUCT FLIP CARDS
  // ==========================================

  const flipStyle = document.createElement("style");

  flipStyle.textContent = `
    .product-card {
      position: relative;
      transform-style: preserve-3d;
    }

    .product-open {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .product-card-back {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      padding: 28px;
      border: 1px solid var(--gold);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 50% 20%, rgba(199,158,72,.18), transparent 60%),
        var(--black-card);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: rotateY(180deg);
      text-align: center;
    }

    .product-card-back .back-index {
      color: var(--gold);
      font-size: .7rem;
      letter-spacing: .15em;
    }

    .product-card-back h3 {
      font: 800 1.7rem "Manrope", sans-serif;
    }

    .product-card-back p {
      color: var(--muted);
      line-height: 1.7;
      font-size: .86rem;
    }

    .product-card-back button {
      padding: 12px 18px;
      border: 1px solid var(--gold);
      border-radius: 50px;
      background: var(--gold);
      color: #16130F;
      font-weight: 800;
      cursor: pointer;
    }

    .product-card.is-flipped .product-open {
      pointer-events: none;
    }

    .product-card.is-flipped .flip-trigger {
      visibility: hidden;
    }
  `;

  document.head.appendChild(flipStyle);

  productCards.forEach(card => {
    const productName = card.dataset.productCard;
    const product = products[productName];
    const flipButton = card.querySelector("[data-flip-product]");

    if (!product || !flipButton) return;

    const back = document.createElement("div");
    back.className = "product-card-back";

    back.innerHTML = `
      <span class="back-index">${product.index}</span>
      <h3>${productName}</h3>
      <p>${product.reverse}</p>
      <p>Open the product to review its information and submit an enquiry.</p>
      <button type="button" class="back-open">View product details â†—</button>
    `;

    card.appendChild(back);

    flipButton.addEventListener("click", event => {
      event.stopPropagation();
      card.classList.toggle("is-flipped");
    });

    back.querySelector(".back-open").addEventListener("click", () => {
      card.classList.remove("is-flipped");
      openProductDetails(productName);
    });
  });

  // ==========================================
  // PRODUCT DETAILS MODAL
  // ==========================================

  const productModal = document.getElementById("productModal");
  const detailCategory = document.getElementById("detailCategory");
  const detailImage = document.getElementById("detailImage");
  const detailIndex = document.getElementById("detailIndex");
  const detailTitle = document.getElementById("detailTitle");
  const detailDescription = document.getElementById("detailDescription");
  const detailSpecifications = document.getElementById("detailSpecifications");
  const detailEnquire = document.getElementById("detailEnquire");

  let selectedProduct = "";

  function openProductDetails(productName) {
    const product = products[productName];

    if (!product || !productModal) return;

    selectedProduct = productName;

    detailCategory.textContent = product.category;
    detailIndex.textContent = product.index;
    detailTitle.textContent = productName;
    detailDescription.textContent = product.description;

    detailImage.className = "detail-image " + product.imageClass;

    detailSpecifications.replaceChildren();

    product.specifications.forEach(specification => {
      const item = document.createElement("li");
      item.textContent = specification;
      detailSpecifications.appendChild(item);
    });

    productModal.classList.add("open");
    productModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = productModal.querySelector(".modal-close");
    if (closeButton) closeButton.focus();
  }

  function closeProductDetails() {
    if (!productModal) return;

    productModal.classList.remove("open");
    productModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-open-product]").forEach(button => {
    button.addEventListener("click", () => {
      openProductDetails(button.dataset.openProduct);
    });
  });

  document.querySelectorAll("[data-close-product]").forEach(button => {
    button.addEventListener("click", closeProductDetails);
  });

  // ==========================================
  // SETTINGS PANEL
  // ==========================================

  const settingsModal = document.getElementById("settingsModal");
  const settingsButton = document.getElementById("settingsButton");
  const bottomSettingsButton = document.getElementById("bottomSettingsButton");

  function openSettings() {
    if (!settingsModal) return;

    settingsModal.classList.add("open");
    settingsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeSettings() {
    if (!settingsModal) return;

    settingsModal.classList.remove("open");
    settingsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (settingsButton) {
    settingsButton.addEventListener("click", openSettings);
  }

  if (bottomSettingsButton) {
    bottomSettingsButton.addEventListener("click", openSettings);
  }

  document.querySelectorAll("[data-close-settings]").forEach(button => {
    button.addEventListener("click", closeSettings);
  });

  // ==========================================
  // DARK AND LIGHT THEMES
  // ==========================================

  const themeButtons = document.querySelectorAll("[data-theme-choice]");

  function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";

    document.body.classList.toggle(
      "light-theme",
      selectedTheme === "light"
    );

    try {
      localStorage.setItem("degreeSupplyTheme", selectedTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved.", error);
    }

    themeButtons.forEach(button => {
      const isSelected =
        button.dataset.themeChoice === selectedTheme;

      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    const themeColor = selectedTheme === "light" ? "#F7F3D3" : "#16130F";
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    if (themeMeta) {
      themeMeta.setAttribute("content", themeColor);
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("degreeSupplyTheme") || "dark";
  } catch (error) {
    console.warn("Saved theme could not be read.", error);
  }

  applyTheme(savedTheme);

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
    });
  });

  // ==========================================
  // PRODUCT ENQUIRY SHORTCUTS
  // ==========================================

  const productSelect = document.getElementById("product");
  const variantInput = document.getElementById("variant");
  const enquiryForm = document.getElementById("enquiryForm");

  function prepareEnquiry(productName) {
    if (!productSelect) return;

    productSelect.value = productName;

    closeProductDetails();

    closeSettings();

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    setTimeout(() => {
      if (productSelect) productSelect.focus();
    }, 500);
  }

  if (detailEnquire) {
    detailEnquire.addEventListener("click", () => {
      if (selectedProduct) {
        prepareEnquiry(selectedProduct);
      }
    });
  }

  // ==========================================
  // BOTTOM NAVIGATION ACTIVE STATES
  // ==========================================

  const bottomNavItems = document.querySelectorAll("[data-nav]");

  const sectionsToWatch = [
    "home",
    "products",
    "contact"
  ];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        bottomNavItems.forEach(item => {
          item.classList.toggle(
            "active",
            item.dataset.nav === entry.target.id
          );
        });
      });
    }, {
      rootMargin: "-35% 0px -50% 0px"
    });

    sectionsToWatch.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });
  }

  bottomNavItems.forEach(item => {
    item.addEventListener("click", () => {
      bottomNavItems.forEach(navItem => {
        navItem.classList.remove("active");
      });

      item.classList.add("active");
    });
  });

  // ==========================================
  // WHATSAPP ENQUIRY
  // ==========================================

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", event => {
      event.preventDefault();

      const product = document.getElementById("product").value.trim();
      const variant = variantInput.value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const destination = document.getElementById("destination").value.trim();
      const customerName = document.getElementById("customerName").value.trim();

      if (!product || !quantity || !destination) {
        alert(
          "Please complete the product, quantity and delivery destination."
        );
        return;
      }

      const message = [
        "Hello Degree Supply Energy.",
        "",
        "I would like to enquire about the following supply:",
        "",
        "Product: " + product,
        "Grade / Size: " + (variant || "Not specified"),
        "Quantity: " + quantity,
        "Delivery destination: " + destination,
        "Name / Business: " + (customerName || "Not provided"),
        "",
        "Please provide a quotation and availability information.",
        "",
        "Thank you."
      ].join("\n");

      // Add the company's verified WhatsApp number here later.
      // Use country code and digits only, without the + sign.
      const whatsappNumber = "27694480217";

      if (!/^\d{10,15}$/.test(whatsappNumber)) {
        alert(
          "The company WhatsApp number has not been configured yet. " +
          "Please contact the website administrator."
        );
        return;
      }

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // ==========================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeProductDetails();
      closeSettings();
    }
  });

  // ==========================================
  // FOOTER YEAR
  // ==========================================

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // INITIALISE CAROUSEL POSITION
  updateCarouselPosition();

});

// ==========================================
// PROGRESSIVE WEB APP (PWA)
// ==========================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Degree Supply Energy app is ready.");
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}