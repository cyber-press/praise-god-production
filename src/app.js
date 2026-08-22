import { ASSETS } from "./assets.js";

const screens = ["home", "events", "submit", "media", "connect"];
const nav = document.querySelector(".bottom-nav");
const indicator = document.querySelector(".nav-indicator");
let active = "home";
let deferredPrompt = null;

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

function setScreen(next) {
  if (!screens.includes(next) || next === active) return;
  const currentIndex = screens.indexOf(active);
  const nextIndex = screens.indexOf(next);
  document.body.dataset.direction = nextIndex > currentIndex ? "forward" : "back";
  active = next;

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === next);
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === next);
  });

  updateIndicator();
  history.replaceState(null, "", `#${next}`);
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
  detail.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
}

function prepareEmail(subject, body) {
  const mail = new URL("mailto:PraiseGodProduction101@gmail.com");
  mail.searchParams.set("subject", subject);
  mail.searchParams.set("body", body);
  window.location.href = mail.toString();
}

document.querySelectorAll("[data-tab], [data-go]").forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.tab || button.dataset.go));
});

document.querySelectorAll("[data-production]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-production]").forEach((item) => {
      item.classList.toggle("is-selected", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });
    renderProduction(button.dataset.production);
  });
});

document.querySelector("#talentForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = [
    `Name: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Discipline: ${form.get("discipline")}`,
    `Portfolio: ${form.get("portfolio") || "Not provided"}`,
    "",
    "Calling / introduction:",
    form.get("message")
  ].join("\n");
  document.querySelector("#formNote").textContent = "Opening your email app with the submission prepared.";
  prepareEmail("Artist submission for Praise God Productions", body);
});

document.querySelector("#inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  prepareEmail("Praise God Productions inquiry", `Name: ${form.get("name")}\n\n${form.get("message")}`);
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
    dialog.showModal();
  });
});

document.querySelector("#lightbox button")?.addEventListener("click", () => {
  document.querySelector("#lightbox")?.close();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

document.querySelector("#installBtn")?.addEventListener("click", () => {
  const sheet = document.querySelector("#installSheet");
  const nativeButton = document.querySelector("#nativeInstall");
  const copy = document.querySelector("#installCopy");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

  if (isStandalone) {
    copy.textContent = "This app is already running from your home screen.";
    nativeButton.hidden = true;
  } else if (deferredPrompt) {
    copy.textContent = "Install the app for a full-screen home-screen experience.";
    nativeButton.hidden = false;
  } else {
    copy.textContent = "On iPhone or iPad, tap Share, then Add to Home Screen. On Android, use your browser menu if the install button is not shown.";
    nativeButton.hidden = true;
  }
  sheet.showModal();
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

renderProduction();
setScreen(location.hash.replace("#", "") || "home");
setTimeout(() => document.querySelector("#splash")?.classList.add("is-hidden"), 850);
requestAnimationFrame(updateIndicator);
