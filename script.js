/* ── script.js ── Boga Siri Chandana Portfolio ── */

/* ─── TYPING ANIMATION ─────────────────────────────────── */
const phrases = [
  "Full Stack Apps.",
  "AI/ML Models.",
  "REST APIs.",
  "Data Dashboards.",
  "Smart Solutions."
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById("typing");

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
    el.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
    setTimeout(type, 45);
  } else {
    charIdx++;
    el.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 75);
  }
}
setTimeout(type, 800);

/* ─── NAVBAR SCROLL ────────────────────────────────────── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ─── HAMBURGER MENU ───────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ─────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

/* ─── REVEAL ON SCROLL ─────────────────────────────────── */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll(".reveal:not(.visible)")];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add("visible"), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ─── SCROLL PROGRESS BAR ──────────────────────────────── */
const progressBar = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const total    = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
});

/* ─── BACK TO TOP ──────────────────────────────────────── */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ─── SMOOTH SCROLL FOR NAV LINKS ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ─── SKILL CARD TILT ──────────────────────────────────── */
document.querySelectorAll(".skill-card, .project-card, .stat-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const midX   = rect.width  / 2;
    const midY   = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) *  6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ─── ANIMATE CGPA COUNTER ─────────────────────────────── */
function animateCounter(el, target, decimals = 0, duration = 1500) {
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = startVal + (target - startVal) * ease;
    el.textContent = current.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el   = entry.target;
      const raw  = el.textContent.replace(/[^0-9.]/g, "");
      const val  = parseFloat(raw);
      const dec  = raw.includes(".") ? 1 : 0;
      const suffix = el.textContent.replace(/[0-9.]/g, "");
      animateCounter(el, val, dec);
      if (suffix) setTimeout(() => { el.textContent += suffix; }, 1550);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

statNums.forEach(n => statObserver.observe(n));

/* ─── ACTIVE NAV STYLE ─────────────────────────────────── */
const style = document.createElement("style");
style.textContent = `.nav-link.active { color: var(--accent) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(style);

/* ─── PAGE LOAD ENTRANCE ───────────────────────────────── */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
