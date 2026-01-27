/*
  AdAura Social — Single Page Portfolio
  Edit these arrays to add real projects.
*/

const PROJECTS = [
  {
    title: "Cafe Launch Reels Pack",
    type: "reels",
    desc: "3 high-retention reels concepts + captions and hook writing for a cafe launch.",
    tags: ["Reels", "Hooks", "Captions"],
    // Replace with your real image path, e.g. "assets/work/cafe-1.jpg"
    img: "assets/packages.png"
  },
  {
    title: "Salon Creative Posts",
    type: "design",
    desc: "A clean post series with promo templates, brand colors, and CTA layout.",
    tags: ["Design", "Templates", "Brand"],
    img: "assets/packages.png"
  },
  {
    title: "Lead Gen Ads (Meta)",
    type: "ads",
    desc: "Lead form campaign structure with targeting + creative variations.",
    tags: ["Meta Ads", "Leads", "Optimization"],
    img: "assets/packages.png"
  },
  {
    title: "Brand Kit & Highlights",
    type: "branding",
    desc: "Logo usage, typography, story highlight covers, and brand guidelines.",
    tags: ["Branding", "Guidelines", "IG"],
    img: "assets/packages.png"
  },
  {
    title: "Product Promo Reel",
    type: "reels",
    desc: "Short-form product promo with motion graphics and punchy captions.",
    tags: ["Motion", "Editing", "Reels"],
    img: "assets/packages.png"
  },
  {
    title: "Restaurant Ad Creatives",
    type: "design",
    desc: "Carousel + story creatives for weekly offers, optimized for clicks.",
    tags: ["Carousels", "Stories", "CTA"],
    img: "assets/packages.png"
  }
];

// Helpers
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const $ = (sel, el = document) => el.querySelector(sel);

// Mobile nav
const navToggle = $("#navToggle");
const nav = $("#nav");
navToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("nav--open");
  navToggle.setAttribute("aria-expanded", String(open));
});
$$(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("nav--open");
  navToggle?.setAttribute("aria-expanded", "false");
}));

// Reveal animations
const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Pricing toggle (Monthly / Yearly)
const pricingToggle = $("#pricingToggle");
let pricingYearly = false;
function formatLKR(n) {
  const num = Number(n);
  return "LKR " + num.toLocaleString("en-LK");
}
function syncPricingUI() {
  $$(".price").forEach(block => {
    const amtEl = $(".price__amount", block);
    const perEl = $(".price__per", block);
    const key = pricingYearly ? "yearly" : "monthly";
    const amt = amtEl?.dataset[key];
    const per = perEl?.dataset[key];
    if (amtEl && amt) amtEl.textContent = formatLKR(amt);
    if (perEl && per) perEl.textContent = per;
  });
  pricingToggle?.setAttribute("aria-pressed", String(pricingYearly));
  pricingToggle?.classList.toggle("is-yearly", pricingYearly);
}
pricingToggle?.addEventListener("click", () => {
  pricingYearly = !pricingYearly;
  syncPricingUI();
});
syncPricingUI();

// Work grid
const workGrid = $("#workGrid");
function renderProjects(filter = "all") {
  if (!workGrid) return;
  workGrid.innerHTML = "";
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  list.forEach((p, idx) => {
    const card = document.createElement("button");
    card.className = "work-card reveal";
    card.type = "button";
    card.dataset.type = p.type;
    card.innerHTML = `
      <div class="work-card__img" style="background-image:url('${p.img}')"></div>
      <div class="work-card__body">
        <div class="work-card__top">
          <h3>${p.title}</h3>
          <span class="work-type">${p.type.toUpperCase()}</span>
        </div>
        <p class="muted">${p.desc}</p>
        <div class="chips">${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}</div>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(p));
    workGrid.appendChild(card);

    // observe reveal
    io.observe(card);
  });
}
renderProjects("all");

// Work filters
$$(".work-filters .chip").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".work-filters .chip").forEach(b => b.classList.remove("chip--active"));
    btn.classList.add("chip--active");
    renderProjects(btn.dataset.filter || "all");
  });
});

// Lightbox
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxTitle = $("#lightboxTitle");
const lightboxDesc = $("#lightboxDesc");
const lightboxTags = $("#lightboxTags");

function openLightbox(p) {
  if (!lightbox) return;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  if (lightboxImg) {
    lightboxImg.src = p.img;
    lightboxImg.alt = p.title;
  }
  if (lightboxTitle) lightboxTitle.textContent = p.title;
  if (lightboxDesc) lightboxDesc.textContent = p.desc;
  if (lightboxTags) lightboxTags.innerHTML = p.tags.map(t => `<span class="chip">${t}</span>`).join("");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$$("[data-close]", lightbox).forEach(el => el.addEventListener("click", closeLightbox));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Contact form (mailto)
const contactForm = $("#contactForm");
const toEmail = $("#toEmail");
const whatsappFromForm = $("#whatsappFromForm");

function setSubjectFromPrefill(prefill) {
  const subject = $("#subject");
  if (subject && prefill) {
    subject.value = `Inquiry: ${prefill}`;
  }
}

// Prefill subject when clicking package CTA
$$("[data-prefill]").forEach(a => a.addEventListener("click", () => {
  setSubjectFromPrefill(a.dataset.prefill);
}));

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name")?.value?.trim() || "";
  const email = $("#email")?.value?.trim() || "";
  const subject = $("#subject")?.value?.trim() || "";
  const message = $("#message")?.value?.trim() || "";

  const to = toEmail?.value?.trim() || "info@adaurasocial.com";

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message
  ].join("\n");

  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  // Also update WhatsApp link with message
  const waText = `Hi AdAura Social!%0A%0A${encodeURIComponent(subject)}%0A%0A${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  if (whatsappFromForm) whatsappFromForm.href = `https://wa.me/94703493357?text=${waText}`;
});

// Footer year
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Slight header effect on scroll
const header = $(".site-header");
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  header?.classList.toggle("site-header--scrolled", y > 8);
  // hide on scroll down, show up
  const goingDown = y > lastY;
  header?.classList.toggle("site-header--hide", goingDown && y > 180);
  lastY = y;
});
