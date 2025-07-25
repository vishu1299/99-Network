// Custom JavaScript for LENT WORKS LLC

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
  const navbarToggler = document.querySelector(".navbar-toggler");

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

    // Adjust parallax effect based on screen size
    if (windowWidth <= 768) {
      // Disable parallax on mobile for better performance
      const heroImages = document.querySelectorAll(
        ".hero-image-left img, .hero-image-right img"
      );
      heroImages.forEach((img) => {
        img.style.transform = "none";
      });
    }

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

// Responsive parallax effect for hero images
window.addEventListener("scroll", function () {
  // Only apply parallax on larger screens for better performance
  if (window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelectorAll(
      ".hero-image-left img, .hero-image-right img"
    );

    heroImages.forEach((img) => {
      const speed = 0.3; // Reduced speed for smoother effect
      img.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Intersection Observer for scroll animations (performance optimized)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(
    ".industry-card, .value-card, .about-image, .about-content"
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });
});
