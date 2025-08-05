// Custom JavaScript for Contact Us Page - LENT WORKS LLC

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

  // Add active class to current page nav link
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentLocation ||
      link.getAttribute("href") ===
        currentLocation.substring(currentLocation.lastIndexOf("/") + 1)
    ) {
      link.classList.add("active");
    }
  });

  // FAQ Dropdown functionality
  const faqSelectBtn = document.querySelector(".select-btn");
  if (faqSelectBtn) {
    faqSelectBtn.addEventListener("click", function () {
      const selectedOption = document.querySelector(
        'input[name="faq-option"]:checked'
      );
      if (selectedOption) {
        console.log("Selected FAQ option:", selectedOption.value);
        // Add your FAQ navigation logic here
      }
    });
  }

  // Contact form functionality
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Hide any existing messages
      successMessage.style.display = "none";
      errorMessage.style.display = "none";

      // Get form data
      const formData = new FormData(contactForm);
      const formObject = {};

      // Convert FormData to object
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "subject",
        "message",
      ];
      let isValid = true;

      requiredFields.forEach((field) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!formObject[field] || formObject[field].trim() === "") {
          input.style.borderColor = "#dc3545";
          isValid = false;
        } else {
          input.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }
      });

      // Check privacy policy checkbox
      const privacyCheckbox = contactForm.querySelector(
        '[name="privacyPolicy"]'
      );
      if (!privacyCheckbox.checked) {
        privacyCheckbox.style.borderColor = "#dc3545";
        isValid = false;
      } else {
        privacyCheckbox.style.borderColor = "rgba(255, 255, 255, 0.3)";
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailInput = contactForm.querySelector('[name="email"]');
      if (formObject.email && !emailRegex.test(formObject.email)) {
        emailInput.style.borderColor = "#dc3545";
        isValid = false;
      }

      if (!isValid) {
        // Scroll to first error field
        const firstErrorField = contactForm.querySelector(
          '[style*="border-color: rgb(220, 53, 69)"]'
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        return;
      }

      // Disable submit button and show loading state
      const submitBtn = contactForm.querySelector(".contact-submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Simulate success (you can change this logic based on your backend response)
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo

        if (isSuccess) {
          // Show success message
          successMessage.style.display = "block";
          contactForm.style.display = "none";

          // Scroll to success message
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Reset form
          contactForm.reset();

          // Optional: Hide success message after 10 seconds and show form again
          setTimeout(() => {
            successMessage.style.display = "none";
            contactForm.style.display = "block";
          }, 10000);
        } else {
          // Show error message
          errorMessage.style.display = "block";
          errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });

          // Hide error message after 5 seconds
          setTimeout(() => {
            errorMessage.style.display = "none";
          }, 5000);
        }
      }, 2000); // 2 second delay to simulate network request

      console.log("Contact form submitted with data:", formObject);
    });

    // Real-time validation for email field
    const emailInput = contactForm.querySelector('[name="email"]');
    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
          this.style.borderColor = "#dc3545";
        } else if (this.value) {
          this.style.borderColor = "var(--Primary-Blue-Light-Blue, #87ceeb)";
        }
      });
    }

    // Remove error styling when user starts typing
    const formInputs = contactForm.querySelectorAll("input, select, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.style.borderColor === "rgb(220, 53, 69)") {
          this.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }
      });
    });

    // Handle privacy checkbox styling
    const privacyCheckbox = contactForm.querySelector('[name="privacyPolicy"]');
    if (privacyCheckbox) {
      privacyCheckbox.addEventListener("change", function () {
        if (this.style.borderColor === "rgb(220, 53, 69)") {
          this.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }
      });
    }
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
    ".contact-item, .footer-brand, .hero-content"
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });
});
