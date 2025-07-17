// Custom JavaScript for FAQs Page - LENT WORKS LLC

document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Handle mobile menu behavior
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Close mobile menu when clicking on regular nav links (not dropdown toggles)
  const regularNavLinks = document.querySelectorAll(
    ".navbar-nav .nav-link:not(.dropdown-toggle)"
  );

  regularNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Close mobile menu when clicking on dropdown items
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Prevent navbar from closing when clicking inside dropdown menu
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // Add active class to current page nav link
  const currentLocation = window.location.pathname;
  const navLinks2 = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks2.forEach((link) => {
    if (
      link.getAttribute("href") === currentLocation ||
      link.getAttribute("href") ===
        currentLocation.substring(currentLocation.lastIndexOf("/") + 1)
    ) {
      link.classList.add("active");
    }
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Responsive image loading optimization
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });
  });

  // Handle window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Trigger any responsive adjustments here
      handleResponsiveAdjustments();
    }, 250);
  });

  // Responsive adjustments function
  function handleResponsiveAdjustments() {
    const windowWidth = window.innerWidth;

    // Adjust dropdown behavior on mobile
    if (windowWidth <= 991) {
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", function (e) {
          if (e.target.classList.contains("dropdown-toggle")) {
            e.preventDefault();
          }
        });
      });
    }
  }

  // Initial responsive adjustments
  handleResponsiveAdjustments();
});
