// Custom JavaScript for Talent Out Reach Program Page - LENT WORKS LLC

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
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        // Bootstrap's lg breakpoint
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
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
});
