import { ASSETS } from "./assets.js";

const screens = ["home", "events", "submit", "media", "connect"];
const nav = document.querySelector(".bottom-nav");
const indicator = document.querySelector(".nav-indicator");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let active = "home";
let deferredPrompt = null;
let installed = window.matchMedia("(display-mode: standalone)").matches || Boolean(window.navigator.standalone);
let heroIndex = 0;
let heroTimer = null;
let testimonialIndex = 0;

const heroSlides = [
  {
    eyebrow: "Faith · Creativity · Purpose · Legacy",
    title: "Creativity with a calling.",
    body: "Discover events, artists, productions, and opportunities in one focused creative community."
  },
  {
    eyebrow: "Artists · Stories · Community",
    title: "Make room for the gift.",
    body: "Praise God Productions creates platforms where artists can be seen, heard, developed, and connected."
  },
  {
    eyebrow: "Concerts · Film · Theatre · Training",
    title: "Purpose deserves a stage.",
    body: "From live experiences to screen and training, every production is built to serve faith, excellence, and impact."
  }
];

const testimonials = [
  "A platform for artists to walk boldly in faith, purpose, and excellence.",
  "A creative community where gifts can be developed, shared, and connected to meaningful opportunities.",
  "An experience designed to bring faith, talent, and professional production into the same room."
];

const productionCopy = {
  concerts: {
    title: "Concerts and praise showcases",
    body: "Live events designed for worship, excellence, and discovery. Artist lists and venues can be updated as bookings are confirmed."
  },
  film: {
    title: "Movie and media productions",
    body: "Faith-forward stories, testimony pieces, behind-the-scenes content, and digital campaign moments."
  },
  theatre: {
    title: "Plays and theatre",
    body: "Stage productions that blend performance, ministry, comedy, music, and community storytelling."
  },
  training: {
    title: "Workshops and training",
    body: "Practical labs for artists who want to grow in craft, confidence, preparation, and purpose."
  },
  comedy: {
    title: "Comedy and hosting",
    body: "Clean, joy-filled entertainment experiences that keep audiences engaged and connected."
  }
};

function setScreen(next, options = {}) {
  if (!screens.includes(next)) next = "home";
  if (next === active && options.force !== true) return;

  const currentIndex = screens.indexOf(active);
  const nextIndex = screens.indexOf(next);
  document.body.dataset.direction = nextIndex > currentIndex ? "forward" : "back";
  active = next;

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === next);
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    const selected = button.dataset.tab === next;
    button.classList.toggle("is-active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });

  updateIndicator();
  if (location.hash !== `#${next}`) history.replaceState(null, "", `#${next}`);
  if (options.scroll !== false) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  }
}

function updateIndicator() {
  const button = document.querySelector(`[data-tab="${active}"]`);
  if (!button || !indicator || !nav) return;
  const navBox = nav.getBoundingClientRect();
  const buttonBox = button.getBoundingClientRect();
  indicator.style.width = `${buttonBox.width}px`;
  indicator.style.transform = `translateX(${buttonBox.left - navBox.left}px)`;
}

function renderProduction(key = "concerts") {
  const detail = document.querySelector("#productionDetail");
  const item = productionCopy[key];
  if (!detail || !item) return;
  detail.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p><button type="button" data-go="connect" aria-label="Start a conversation about ${item.title}">Start a conversation →</button>`;
  detail.querySelector("[data-go]")?.addEventListener("click", () => setScreen("connect"));
}

function renderHero(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[heroIndex];
  const eyebrow = document.querySelector("#heroEyebrow");
  const title = document.querySelector("#heroTitle");
  const body = document.querySelector("#heroBody");
  if (eyebrow) eyebrow.textContent = slide.eyebrow;
  if (title) title.textContent = slide.title;
  if (body) body.textContent = slide.body;
  document.querySelectorAll("[data-hero-slide]").forEach((button, i) => {
    button.classList.toggle("is-active", i === heroIndex);
  });
}

function startHeroRotation() {
  if (prefersReducedMotion.matches || document.hidden) return;
  clearInterval(heroTimer);
  heroTimer = setInterval(() => renderHero(heroIndex + 1), 6200);
}

function renderTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  const quote = document.querySelector("#testimonialQuote");
  const count = document.querySelector("#testimonialCount");
  if (quote) quote.textContent = `“${testimonials[testimonialIndex]}”`;
  if (count) count.textContent = `${testimonialIndex + 1} / ${testimonials.length}`;
}

function prepareEmail(subject, body) {
  const mail = new URL("mailto:PraiseGodProduction101@gmail.com");
  mail.searchParams.set("subject", subject);
  mail.searchParams.set("body", body);
  window.location.href = mail.toString();
}

function syncOnlineStatus() {
  const banner = document.querySelector("#offlineBanner");
  if (!banner) return;
  banner.hidden = navigator.onLine;
}

function syncInstallUI() {
  const installButton = document.querySelector("#installBtn");
  const installCard = document.querySelector("#installCard");
  if (installButton) installButton.hidden = installed;
  if (installCard) installCard.hidden = installed;
}

function openInstallSheet() {
  const sheet = document.querySelector("#installSheet");
  const nativeButton = document.querySelector("#nativeInstall");
  const copy = document.querySelector("#installCopy");
  if (!sheet || !nativeButton || !copy) return;

  if (installed) {
    copy.textContent = "This app is already running from your home screen.";
    nativeButton.hidden = true;
  } else if (deferredPrompt) {
    copy.textContent = "Install the app for a full-screen home-screen experience.";
    nativeButton.hidden = false;
  } else {
    copy.textContent = "Use the steps below to add Praise God Productions to your home screen.";
    nativeButton.hidden = true;
  }
  if (typeof sheet.showModal === "function") sheet.showModal();
}

document.querySelectorAll("[data-tab], [data-go]").forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.tab || button.dataset.go));
});

document.querySelectorAll("[data-hero-slide]").forEach((button) => {
  button.addEventListener("click", () => {
    renderHero(Number(button.dataset.heroSlide));
    startHeroRotation();
  });
});

document.querySelectorAll("[data-production]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-production]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-selected", selected ? "true" : "false");
    });
    renderProduction(button.dataset.production);
  });

  button.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll("[data-production]")];
    const index = tabs.indexOf(button);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  });
});

document.querySelector("#talentForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const note = document.querySelector("#formNote");
  if (!formElement.checkValidity()) {
    formElement.reportValidity();
    if (note) note.textContent = "Check the highlighted fields and try again.";
    return;
  }
  const form = new FormData(formElement);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const discipline = String(form.get("discipline") || "").trim();
  const portfolio = String(form.get("portfolio") || "").trim();
  const message = String(form.get("message") || "").trim();
  if (!name || !email || !discipline || !message) {
    if (note) note.textContent = "Complete your name, email, creative area, and introduction.";
    return;
  }
  const body = [`Artist: ${name}`, `Email: ${email}`, `Creative area: ${discipline}`, `Portfolio: ${portfolio || "Not provided"}`, "", "Introduction:", message].join("\n");
  if (note) note.textContent = "Opening your email app with the submission prepared.";
  prepareEmail(`Artist submission · ${name}`, body);
});

document.querySelector("#inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const note = document.querySelector("#inquiryNote");
  if (!formElement.checkValidity()) {
    formElement.reportValidity();
    if (note) note.textContent = "Check the highlighted fields and try again.";
    return;
  }
  const form = new FormData(formElement);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  if (!name || !email) {
    if (note) note.textContent = "Add your name and email to continue.";
    return;
  }
  if (note) note.textContent = "Opening your email app with your message prepared.";
  prepareEmail(`Praise God Productions inquiry · ${name}`, `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "I'd like to connect."}`);
});

document.querySelectorAll("[data-asset]").forEach((image) => {
  const key = image.dataset.asset;
  if (ASSETS[key]) image.src = ASSETS[key];
});

document.querySelectorAll("[data-lightbox-asset]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.querySelector("#lightbox");
    const image = dialog?.querySelector("img");
    if (!dialog || !image) return;
    image.src = ASSETS[button.dataset.lightboxAsset];
    image.alt = button.querySelector("img")?.alt || "Media preview";
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
});

document.querySelector("#lightbox button")?.addEventListener("click", () => document.querySelector("#lightbox")?.close());
document.querySelector("#testimonialPrev")?.addEventListener("click", () => renderTestimonial(testimonialIndex - 1));
document.querySelector("#testimonialNext")?.addEventListener("click", () => renderTestimonial(testimonialIndex + 1));
document.querySelector("#installBtn")?.addEventListener("click", openInstallSheet);
document.querySelector("#installCardBtn")?.addEventListener("click", openInstallSheet);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  syncInstallUI();
});

window.addEventListener("appinstalled", () => {
  installed = true;
  deferredPrompt = null;
  syncInstallUI();
  document.querySelector("#installSheet")?.close();
});

document.querySelector("#nativeInstall")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.querySelector("#installSheet")?.close();
});

window.addEventListener("resize", updateIndicator);
window.addEventListener("hashchange", () => setScreen(location.hash.replace("#", "") || "home"));
window.addEventListener("online", syncOnlineStatus);
window.addEventListener("offline", syncOnlineStatus);
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) clearInterval(heroTimer);
  else startHeroRotation();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      registration.update().catch(() => {});
    } catch {}
  });
}

renderHero(0);
renderProduction();
renderTestimonial(0);
syncOnlineStatus();
syncInstallUI();
setScreen(location.hash.replace("#", "") || "home", { force: true, scroll: false });
setTimeout(() => document.querySelector("#splash")?.classList.add("is-hidden"), prefersReducedMotion.matches ? 250 : 1050);
requestAnimationFrame(updateIndicator);
startHeroRotation();
