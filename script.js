document.documentElement.classList.add("js");

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");

    function closeMenu() {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    const sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document.querySelectorAll(".nav-links a[aria-current]").forEach((link) => link.removeAttribute("aria-current"));
          const currentLink = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
          if (currentLink) currentLink.setAttribute("aria-current", "location");
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      sections.forEach((section) => sectionObserver.observe(section));

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    } else {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    }

    document.getElementById("year").textContent = String(new Date().getFullYear());

    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const recipient = "bagumithafathimam@gmail.com";
      const subject = String(formData.get("subject")).trim();
      const body = [
        "Name: " + String(formData.get("name")).trim(),
        "Email: " + String(formData.get("email")).trim(),
        "",
        String(formData.get("message")).trim()
      ].join("\n");
      document.getElementById("formStatus").textContent = "Opening your email app with a prepared message.";
      window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
