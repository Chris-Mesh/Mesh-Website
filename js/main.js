const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

(() => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (!slides.length) return;

  let index = 0;
  const intervalMs = 7000;

  const show = (i) => {
    slides.forEach((s) => s.classList.remove("is-active"));
    dots.forEach((d) => d.classList.remove("is-active"));

    slides[i].classList.add("is-active");
    if (dots[i]) dots[i].classList.add("is-active");

    index = i;
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
  });

  let timer = null;
  const start = () => {
    timer = setInterval(() => {
      const next = (index + 1) % slides.length;
      show(next);
    }, intervalMs);
  };

  const restart = () => {
    clearInterval(timer);
    start();
  };

  show(0);
  start();
})();

(() => {
  const slides = document.querySelectorAll(".partner-slide");
  if (!slides.length) return;

  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
})();

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  elements.forEach(el => observer.observe(el));
});

// Slide-in sections (Solutions bands)
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((el, i) => {
    el.dataset.delay = i * 120;
    observer.observe(el);
  });
})();

const investorJump = document.getElementById("investorJump");
if (investorJump) {
  investorJump.addEventListener("click", () => {
    const topic = document.getElementById("topic");
    if (topic) topic.value = "Investor enquiry";
  });
}

// Mobile nav toggle (responsive)
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  if (!header || !toggle || !nav) return;

  const setOpen = (open) => {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.contains("nav-open");
    setOpen(!isOpen);
  });

  // Close the menu when a link is clicked (mobile)
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (window.matchMedia("(max-width: 900px)").matches) setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // If resizing to desktop, ensure menu is not stuck open
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 900px)").matches) setOpen(false);
  });
})();

// Google analytics
const GA_ID = "G-5LXSV40TXJ";

function loadGA() {
  if (document.getElementById("ga4-script")) return;

  const s1 = document.createElement("script");
  s1.id = "ga4-script";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s1);

  const s2 = document.createElement("script");
  s2.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(s2);
}

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const decline = document.getElementById("cookie-decline");

  const consent = localStorage.getItem("cookie_consent");

  if (!consent) {
    if (banner) banner.style.display = "block";
  } else if (consent === "accepted") {
    loadGA();
  }

  accept?.addEventListener("click", () => {
    localStorage.setItem("cookie_consent", "accepted");
    if (banner) banner.style.display = "none";
    loadGA();
  });

  decline?.addEventListener("click", () => {
    localStorage.setItem("cookie_consent", "declined");
    if (banner) banner.style.display = "none";
  });
});

(() => {
  const links = document.querySelectorAll(".nav-list a");
  if (!links.length) return;

  const current = location.pathname.split("/").pop() || "index.html";

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === current) a.classList.add("is-active");
  });
})();




