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
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });

  // Close mobile menu when clicking on dropdown items
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });

  // Handle window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
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
  }

  // Initial responsive adjustments
  handleResponsiveAdjustments();
});

// Responsive parallax effect for hero images
window.addEventListener("scroll", function () {
  if (window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelectorAll(
      ".hero-image-left img, .hero-image-right img"
    );

    heroImages.forEach((img) => {
      const speed = 0.3;
      img.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Intersection Observer for scroll animations
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
