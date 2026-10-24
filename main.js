document.documentElement.classList.add("js");

// Project filter
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", active);
    });
    cards.forEach((card) => {
      card.hidden = filter !== "all" && !card.dataset.tags.split(" ").includes(filter);
    });
  });
});

// Highlight current section in nav
const links = document.querySelectorAll(".nav__links a");
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && navObserver.observe(s));

// Fade sections in on scroll
const revealTargets = document.querySelectorAll(".section__title, .about, .card, .job, .skill, .edu__item, .contact__big");
revealTargets.forEach((el) => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealObserver.observe(el));
