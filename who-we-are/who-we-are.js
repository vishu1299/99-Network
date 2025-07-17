// Custom JavaScript for Who We Are Page - LENT WORKS LLC

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

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all content sections for animations
  const animatedSections = document.querySelectorAll(
    ".who-we-are-section, .platform-section, .what-we-do-section, .additional-content-section, .platform-support-section, .join-us-section"
  );

  animatedSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
  });

  // Join Us and Refer buttons functionality
  const joinBtn = document.querySelector(".join-btn");
  const referBtn = document.querySelector(".refer-btn");
  const customBtns = document.querySelectorAll(".custom-btn");

  if (joinBtn) {
    joinBtn.addEventListener("click", function () {
      // Add your join us functionality here
      alert(
        "Join Us functionality - Connect this to your application form or career page"
      );
    });
  }

  if (referBtn) {
    referBtn.addEventListener("click", function () {
      // Add your refer functionality here
      alert("Refer Now functionality - Connect this to your referral form");
    });
  }

  // Custom buttons functionality
  customBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const btnText = this.textContent.trim();
      if (btnText === "Join Us") {
        alert(
          "Join Us functionality - Connect this to your application form or career page"
        );
      } else if (btnText === "Refer now") {
        alert("Refer Now functionality - Connect this to your referral form");
      }
    });
  });

  // Add hover effects for images
  const contentImages = document.querySelectorAll(
    ".who-we-are-image img, .platform-image img, .what-we-do-image img, .additional-image img, .join-us-image img"
  );

  contentImages.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
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
