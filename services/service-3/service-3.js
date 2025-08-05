// Custom JavaScript for E Learning Page - LENT WORKS LLC

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

  // E-Learning Form Functionality
  const elearningForm = document.getElementById("elearningForm");

  if (elearningForm) {
    // Form validation and submission
    elearningForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};

      // Convert FormData to object
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      // Basic validation
      if (validateForm(formObject)) {
        // Show success message
        showSuccessMessage();

        // Reset form after successful submission
        setTimeout(() => {
          this.reset();
          hideSuccessMessage();
        }, 3000);

        // Here you would typically send the data to your server
        console.log("Form submitted:", formObject);
      }
    });

    // Form validation function
    function validateForm(data) {
      const requiredFields = [
        "fullName",
        "lastName",
        "emailId",
        "phoneNumber",
        "country",
        "state",
        "city",
        "zipCode",
      ];
      let isValid = true;

      // Remove previous error styling
      document
        .querySelectorAll(".form-control, .form-select")
        .forEach((field) => {
          field.classList.remove("is-invalid");
        });

      // Check required fields
      requiredFields.forEach((fieldName) => {
        const field = document.getElementById(fieldName);
        if (!data[fieldName] || data[fieldName].trim() === "") {
          field.classList.add("is-invalid");
          isValid = false;
        }
      });

      // Check if area of interest is selected
      if (!data["areaOfInterest"]) {
        showErrorMessage("Please select your area of interest.");
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (data.emailId && !emailRegex.test(data.emailId)) {
        document.getElementById("emailId").classList.add("is-invalid");
        isValid = false;
      }

      return isValid;
    }

    // Show success message
    function showSuccessMessage() {
      const existingMessage = document.querySelector(".success-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.innerHTML = `
        <div class="alert alert-success" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          Thank you! Your form has been submitted successfully. We'll get back to you soon.
        </div>
      `;

      elearningForm.insertBefore(successMessage, elearningForm.firstChild);
    }

    // Hide success message
    function hideSuccessMessage() {
      const successMessage = document.querySelector(".success-message");
      if (successMessage) {
        successMessage.remove();
      }
    }

    // Show error message
    function showErrorMessage(message) {
      const existingMessage = document.querySelector(".error-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-circle me-2"></i>
          ${message}
        </div>
      `;

      elearningForm.insertBefore(errorMessage, elearningForm.firstChild);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    }

    // Real-time validation for better UX
    const formInputs = document.querySelectorAll(".form-control, .form-select");
    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && this.value.trim() === "") {
          this.classList.add("is-invalid");
        } else {
          this.classList.remove("is-invalid");
        }
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid") && this.value.trim() !== "") {
          this.classList.remove("is-invalid");
        }
      });
    });

    // Phone number country dropdown functionality
    const countryFlagDropdown = document.getElementById("countryFlagDropdown");
    const countryDropdown = document.getElementById("countryDropdown");
    const selectedFlag = document.getElementById("selectedFlag");
    const phoneInput = document.getElementById("phoneNumber");

    if (countryFlagDropdown && countryDropdown) {
      // Toggle dropdown
      countryFlagDropdown.addEventListener("click", function (e) {
        e.stopPropagation();
        countryDropdown.classList.toggle("show");
      });

      // Handle country selection
      const countryOptions = document.querySelectorAll(".country-option");
      countryOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const country = this.getAttribute("data-country");
          const code = this.getAttribute("data-code");
          const flagSrc = this.querySelector(".flag-icon").src;
          const countryName = this.querySelector(".country-name").textContent;

          // Update selected flag
          selectedFlag.src = flagSrc;
          selectedFlag.alt = countryName;

          // Update phone input placeholder with country code
          phoneInput.placeholder = `${code} Enter Your Number`;

          // Close dropdown
          countryDropdown.classList.remove("show");

          // Store selected country code for form submission
          phoneInput.setAttribute("data-country-code", code);
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (
          !countryFlagDropdown.contains(e.target) &&
          !countryDropdown.contains(e.target)
        ) {
          countryDropdown.classList.remove("show");
        }
      });

      // Close dropdown on escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          countryDropdown.classList.remove("show");
        }
      });
    }

    // Update country select dropdown to sync with phone dropdown
    const countrySelect = document.getElementById("country");
    if (countrySelect) {
      countrySelect.addEventListener("change", function () {
        const selectedCountry = this.value;
        const countryOption = document.querySelector(
          `[data-country="${selectedCountry}"]`
        );

        if (countryOption) {
          countryOption.click();
        }
      });
    }
  }
});
