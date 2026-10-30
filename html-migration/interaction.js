const navigation = `
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="logo" href="index.html">
        <img src="assets/icgl-logo.png" alt="Impact Credit Guarantee Limited">
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="impact.html">Impact</a>
        <div class="dropdown">
          <button class="nav-link" aria-expanded="false">Resources <span aria-hidden="true">⌄</span></button>
          <div class="dropdown-menu">
            <div class="dropdown-menu-inner">
              <a href="resources-news.html">News</a>
              <a href="resources-faqs.html">FAQs</a>
              <a href="resources-publications.html">Publications</a>
              <a href="resources-privacy-policy.html">Privacy Policy</a>
              <a href="resources-policies.html">Policies</a>
              <a href="resources-whistleblowing.html">Whistleblowing</a>
              <a href="resources-ratings.html">Ratings</a>
              <a href="resources-complaints.html">Complaints</a>
            </div>
          </div>
        </div>
        <a href="career.html">Career</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a class="btn btn-dark" href="eligibility.html">Check eligibility <span aria-hidden="true">↗</span></a>
        <a href="admin-sign-in.html">Admin sign in</a>
      </div>
      <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
        <span aria-hidden="true">☰</span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="impact.html">Impact</a>
      <button class="mobile-resource-toggle" type="button" aria-expanded="false">Resources <span aria-hidden="true">⌄</span></button>
      <div class="mobile-sub">
        <a href="resources-news.html">News</a>
        <a href="resources-faqs.html">FAQs</a>
        <a href="resources-publications.html">Publications</a>
        <a href="resources-privacy-policy.html">Privacy Policy</a>
        <a href="resources-policies.html">Policies</a>
        <a href="resources-whistleblowing.html">Whistleblowing</a>
        <a href="resources-ratings.html">Ratings</a>
        <a href="resources-complaints.html">Complaints</a>
      </div>
      <a href="career.html">Career</a>
      <a href="contact.html">Contact</a>
      <a class="btn btn-dark" href="eligibility.html">Check eligibility ↗</a>
      <a href="admin-sign-in.html">Admin sign in</a>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <img class="footer-brand-bar" src="assets/asset-89738e53.jpg" alt="" aria-hidden="true">
    <div class="container footer-grid">
      <div>
        <p class="footer-brand">Impact Credit Guarantee Limited</p>
        <p>ICGL is a wholly owned subsidiary of the Development Bank of Nigeria Plc (DBN). ICGL was set up through a project with the World Bank to provide guarantees on loans made to MSMEs and small corporates by PFIs in Nigeria.</p>
      </div>
      <div>
        <p class="footer-label">Useful Links</p>
        <a href="eligibility.html">Eligibility Criteria</a>
        <a href="about.html">About</a>
        <a href="career.html">Careers</a>
        <a href="resources-policies.html">Policies</a>
        <a href="resources-whistleblowing.html">Whistleblowing</a>
        <a href="resources-complaints.html">Complaints</a>
      </div>
      <div>
        <p class="footer-label">Contact Us</p>
        <p class="contact-row"><span aria-hidden="true">⌖</span> Plot 952/953 Idejo Street, Victoria Island, Lagos</p>
        <a class="contact-row" href="tel:+2342019061000"><span aria-hidden="true">☎</span> +234 201 906 1000</a>
        <a class="contact-row" href="mailto:info@impactguaranteeng.com"><span aria-hidden="true">✉</span> info@impactguaranteeng.com</a>
        <div class="social-row" aria-label="Social media">
          <a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X">𝕏</a>
          <a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <div>
        <p class="footer-label">Certifications &amp; Ratings</p>
        <ul class="certification-list">
          <li><img src="assets/ratings-iso1.png" alt=""><span><strong>ISO 27001:2022</strong> Information Security Management System (ISMS)</span></li>
          <li><img src="assets/ratings-iso2.png" alt=""><span><strong>ISO 22301:2019</strong> Business Continuity Management System (BCMS)</span></li>
          <li><img src="assets/ratings-iso3.png" alt=""><span><strong>ISO 20000:2018</strong> Service Management System (ITSMS)</span></li>
          <li class="agusto"><img src="assets/ratings-agu.png" alt=""><span><strong>Agusto &amp; Co.</strong> AA Rating 2025</span></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()}, All rights reserved. Copyright by Impact Credit Guarantee Limited.</span>
      <div><a href="resources-privacy-policy.html">Privacy Policy</a><a href="https://www.devbankng.com" target="_blank" rel="noreferrer">Parent Company</a><a href="about.html">Corporate Philosophy</a></div>
    </div>
  </footer>`;

const iconFiles = [
  "hero-icon-notepad.png", "hero-icon-search.png", "hero-icon-document.png",
  "hero-icon-pie-chart.png", "hero-icon-network.png", "hero-icon-briefcase.png",
  "hero-icon-growth.png",
];

function installSharedLayout() {
  if (location.pathname.startsWith("/admin") || location.pathname.includes("admin-")) return;
  document.querySelector(".site-header")?.remove();
  document.querySelector(".footer")?.remove();
  document.querySelector("footer")?.remove();
  document.body.insertAdjacentHTML("afterbegin", navigation);
  document.body.insertAdjacentHTML("beforeend", footer);

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? '<span aria-hidden="true">×</span>' : '<span aria-hidden="true">☰</span>';
  });
  const resourceToggle = document.querySelector(".mobile-resource-toggle");
  resourceToggle.addEventListener("click", () => {
    const open = resourceToggle.getAttribute("aria-expanded") !== "true";
    resourceToggle.setAttribute("aria-expanded", String(open));
    document.querySelector(".mobile-sub").classList.toggle("open", open);
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";
  const activeDocument = routesByPath[currentPage] || currentPage;
  document.querySelectorAll(".nav-links a, .mobile-menu > a").forEach((link) => {
    if (link.getAttribute("href") === activeDocument) link.classList.add("active");
  });
  const onScroll = () => document.querySelector(".nav")?.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const routesByPath = {
  about: "about.html", services: "services.html", impact: "impact.html",
  eligibility: "eligibility.html", career: "career.html", contact: "contact.html",
  news: "resources-news.html", faqs: "resources-faqs.html",
  publications: "resources-publications.html", policies: "resources-policies.html",
  ratings: "resources-ratings.html", "privacy-policy": "resources-privacy-policy.html",
  whistleblowing: "resources-whistleblowing.html", complaints: "resources-complaints.html",
};

function installPageMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".page-hero");
  if (hero) {
    const heroContent = hero.querySelector(".container");
    const eyebrow = heroContent.querySelector(".eyebrow");
    const title = heroContent.querySelector("h1");
    const crumbs = heroContent.querySelector(".crumbs");
    if (eyebrow && title && crumbs) {
      const labels = crumbs.textContent.split("/").map((label) => label.trim()).filter(Boolean);
      crumbs.replaceChildren();
      const home = document.createElement("a");
      home.href = "index.html";
      home.textContent = "Home";
      crumbs.append(home);
      labels.slice(1).forEach((label) => {
        const divider = document.createElement("span");
        divider.setAttribute("aria-hidden", "true");
        divider.textContent = "›";
        const current = document.createElement("span");
        current.textContent = label;
        crumbs.append(divider, current);
      });
      heroContent.prepend(eyebrow);
      title.after(crumbs);
    }
    const layer = document.createElement("div");
    layer.className = "hero-icons-layer";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 15; i += 1) {
      const card = document.createElement("img");
      card.className = `hero-icon-card depth-${i % 3}`;
      card.src = `assets/${iconFiles[i % iconFiles.length]}`;
      card.alt = "";
      card.style.setProperty("--top", `${[4, 22, 40, 58, 76, 92][i % 6]}%`);
      card.style.setProperty("--left", `${[8, 4, 14, 6, 10, 4, 40, 46, 34, 44, 38, 42, 74, 78, 70][i]}%`);
      card.style.setProperty("--delay", `${reduceMotion ? 0 : (i % 7) * 90}ms`);
      layer.append(card);
    }
    hero.prepend(layer);
  }
  document.querySelectorAll(".reveal, .card, .stat, [data-home-motion], .home-reveal, .home-card-motion, .photo-reveal").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
    item.classList.add("motion-ready");
  });
  document.querySelectorAll(".logo-track, .photo-column").forEach((track) => {
    Array.from(track.children).forEach((item) => {
      const duplicate = item.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      if (duplicate.matches("img")) duplicate.alt = "";
      track.append(duplicate);
    });
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".motion-ready").forEach((item) => item.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".motion-ready").forEach((item) => observer.observe(item));
}

function installFaqs() {
  document.querySelectorAll("[data-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });
}

function installForms() {
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("hidden");
      form.nextElementSibling?.classList.remove("hidden");
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      const errorMessage = form.parentElement.querySelector(".contact-form-error");
      const successMessage = form.parentElement.querySelector(".contact-form-success");
      const originalLabel = submit.textContent;
      errorMessage.classList.add("hidden");
      submit.disabled = true;
      submit.textContent = "Sending...";
      try {
        const apiBase = document.querySelector('meta[name="icgl-api-base"]')?.content || "http://localhost:5000/api";
        const payload = Object.fromEntries(new FormData(form));
        const response = await fetch(`${apiBase.replace(/\/$/, "")}/contact/messages`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Unable to send your message. Please try again.");
        form.classList.add("hidden");
        successMessage.classList.remove("hidden");
      } catch (error) {
        errorMessage.textContent = error.message || "Unable to connect to the contact service. Please try again.";
        errorMessage.classList.remove("hidden");
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
    });
  });
}

function installMarquees() {
  const rows = [...document.querySelectorAll("[data-marquee]")];
  if (!rows.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const marquees = rows.map((row) => {
    const track = row.querySelector(".logo-track");
    const direction = row.dataset.direction === "right" ? -1 : 1;
    const marquee = {
      row,
      track,
      direction,
      offset: 0,
      speed: direction * 36,
      targetSpeed: direction * 36,
      pointerRatio: 0.5,
    };
    row.addEventListener("pointerenter", () => {
      marquee.targetSpeed = (marquee.pointerRatio - 0.5) * 72;
    });
    row.addEventListener("pointerleave", () => {
      marquee.targetSpeed = marquee.direction * 36;
    });
    row.addEventListener("pointermove", (event) => {
      const bounds = row.getBoundingClientRect();
      marquee.pointerRatio = bounds.width
        ? Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
        : 0.5;
      if (row.matches(":hover")) marquee.targetSpeed = (marquee.pointerRatio - 0.5) * 72;
    });
    return marquee;
  });

  let previousTime = performance.now();
  const animate = (time) => {
    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    marquees.forEach((marquee) => {
      marquee.speed += (marquee.targetSpeed - marquee.speed) * Math.min(3.5 * delta, 1);
      marquee.offset += marquee.speed * delta;
      const loopWidth = marquee.track.scrollWidth / 2;
      if (loopWidth > 0) {
        marquee.offset = ((marquee.offset % loopWidth) + loopWidth) % loopWidth;
      }
      marquee.track.style.transform = `translateX(${-marquee.offset}px)`;
    });
    window.requestAnimationFrame(animate);
  };
  window.requestAnimationFrame(animate);
}

function installAuthentication() {
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const errorMessage = form.querySelector(".auth-error");
      const submit = form.querySelector('button[type="submit"]');
      const originalLabel = submit.textContent;
      errorMessage.hidden = true;
      submit.disabled = true;
      submit.textContent = "Working...";
      try {
        const apiBase = document.querySelector('meta[name="icgl-api-base"]').content.replace(/\/$/, "");
        const payload = Object.fromEntries(new FormData(form));
        const endpoint = form.dataset.authForm === "signup" ? "/auth/signup" : "/auth/login";
        const response = await fetch(`${apiBase}${endpoint}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        let result;
        try {
          result = await response.json();
        } catch {
          throw new Error("The server returned an invalid response. Please try again.");
        }
        if (!response.ok) throw new Error(result.message || "Unable to authenticate. Please check your details and try again.");
        window.location.assign("/admin");
      } catch (error) {
        errorMessage.textContent = error.message || "Unable to connect to the authentication service.";
        errorMessage.hidden = false;
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
    });
  });
}

function installPeriodSelector() {
  const dropdown = document.querySelector("[data-period-dropdown]");
  if (!dropdown) return;

  const trigger = dropdown.querySelector(".period-trigger");
  const activePeriod = dropdown.querySelector("[data-active-period]");
  const menu = dropdown.querySelector(".period-menu");
  const periodOptions = [...menu.querySelectorAll("[data-period]")];
  let closeTimer;

  const setOpen = (open) => {
    window.clearTimeout(closeTimer);
    dropdown.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => setOpen(false), 250);
  };
  const applyPeriod = (option) => {
    const stats = JSON.parse(option.dataset.stats);
    document.querySelectorAll("[data-stat-index]").forEach((card) => {
      const stat = stats[Number(card.dataset.statIndex)];
      card.querySelectorAll("[data-stat-value]").forEach((value) => {
        value.textContent = stat.value;
      });
      card.querySelectorAll("[data-stat-delta]").forEach((delta) => {
        delta.textContent = stat.delta;
      });
      const ring = card.querySelector("[data-progress-ring]");
      if (ring) {
        const percent = Number.parseInt(stat.value, 10);
        ring.dataset.percent = String(percent);
        ring.style.setProperty("--progress-percent", String(percent));
      }
    });
    activePeriod.textContent = option.dataset.period;
    document.querySelector("[data-period-label]").textContent = `As of ${option.dataset.period}`;
    periodOptions.forEach((item) => {
      const active = item === option;
      item.hidden = active;
      item.setAttribute("aria-current", String(active));
    });
    setOpen(false);
  };

  trigger.addEventListener("click", () => setOpen(!dropdown.classList.contains("open")));
  dropdown.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  dropdown.addEventListener("mouseleave", closeSoon);
  dropdown.addEventListener("focusout", (event) => {
    if (!dropdown.contains(event.relatedTarget)) closeSoon();
  });
  periodOptions.forEach((option) => option.addEventListener("click", () => applyPeriod(option)));

  const initiallyActive = periodOptions.find((option) => option.dataset.period === activePeriod.textContent);
  if (initiallyActive) {
    periodOptions.forEach((option) => {
      const active = option === initiallyActive;
      option.hidden = active;
      option.setAttribute("aria-current", String(active));
    });
    document.querySelectorAll("[data-progress-ring]").forEach((ring) => {
      ring.style.setProperty("--progress-percent", ring.dataset.percent);
    });
  }
  setOpen(false);
}

installSharedLayout();
installPageMotion();
installFaqs();
installForms();
installMarquees();
installAuthentication();
installPeriodSelector();
