gsap.registerPlugin(ScrollTrigger);
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  colors = ["#ed5a83", "#e7a44c", "#9f6de2", "#f29abd", "#73c9dc", "#ef6b8c"];
for (let i = 0; i < 90; i++) {
  let c = document.createElement("i");
  c.className = "confetti";
  c.style.left = Math.random() * 100 + "%";
  c.style.top = Math.random() * -100 + "vh";
  c.style.background = colors[i % colors.length];
  c.style.animationDuration = 5 + Math.random() * 8 + "s";
  c.style.animationDelay = -Math.random() * 10 + "s";
  $(".confetti-field").appendChild(c);
}
function burst(n = 55) {
  for (let i = 0; i < n; i++) {
    let p = document.createElement("span");
    p.style.cssText = `position:fixed;left:50%;top:50%;width:7px;height:13px;background:${colors[i % colors.length]};z-index:95;pointer-events:none`;
    document.body.appendChild(p);
    gsap.to(p, {
      x: gsap.utils.random(-innerWidth * 0.6, innerWidth * 0.6),
      y: gsap.utils.random(-innerHeight * 0.6, innerHeight * 0.6),
      rotation: gsap.utils.random(-720, 720),
      opacity: 0,
      duration: gsap.utils.random(1.2, 2.5),
      ease: "power3.out",
      onComplete: () => p.remove(),
    });
  }
}
$("#openGift").onclick = () => {
  gsap
    .timeline()
    .to(".envelope", {
      onStart: () => $(".envelope").classList.add("open"),
      duration: 0.1,
    })
    .to("#openGift,.opening-mini", { autoAlpha: 0, y: 15, duration: 0.25 })
    .to("#opening", { opacity: 0, duration: 1, delay: 0.45 })
    .set("#opening", { display: "none" })
    .set("body", { className: "" })
    .fromTo(".nav", { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
    .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.5 })
    .from(
      ".hero-title span",
      { y: 90, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power4.out" },
      "-=.2",
    )
    .from(
      ".hero-script,.hero-note",
      { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
      "-=.35",
    )
    .from(
      ".magic-btn",
      { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=.2",
    )
    .from(
      ".hero-decor",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=.5",
    );
  burst(35);
};
const cursor = $(".cursor-glow");
addEventListener("pointermove", (e) =>
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35 }),
);
$$(".magnetic").forEach((b) => {
  b.onpointermove = (e) => {
    let r = b.getBoundingClientRect();
    gsap.to(b, {
      x: (e.clientX - r.left - r.width / 2) * 0.16,
      y: (e.clientY - r.top - r.height / 2) * 0.2,
      duration: 0.3,
    });
  };
  b.onpointerleave = () =>
    gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.5)" });
});
$(".menu-btn").onclick = () => $(".nav nav").classList.toggle("open");
$$(".nav nav a").forEach(
  (a) => (a.onclick = () => $(".nav nav").classList.remove("open")),
);
gsap.to(".hero-copy", {
  y: -80,
  opacity: 0.3,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});
gsap.to(".grid-bg", {
  y: 100,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});
$$(
  ".story-intro,.timeline-item,.joke-card,.never-card,.open-card,.wish-content",
).forEach((el) =>
  gsap.from(el, {
    y: 55,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
  }),
);
gsap.from(".photo-card", {
  y: 50,
  opacity: 0,
  scale: 0.95,
  stagger: 0.03,
  duration: 0.65,
  scrollTrigger: { trigger: ".cherished-section", start: "top 72%" },
});
gsap.from(".never-lines p", {
  x: 25,
  opacity: 0,
  stagger: 0.12,
  duration: 0.6,
  scrollTrigger: { trigger: ".never-card", start: "top 65%" },
});
gsap.from(".finale-content>*", {
  y: 30,
  opacity: 0,
  stagger: 0.12,
  duration: 0.8,
  scrollTrigger: { trigger: ".finale", start: "top 70%" },
});
gsap.to(".hero-decor,.cherished-decor", {
  y: "random(-16,16)",
  x: "random(-10,10)",
  rotation: "random(-8,8)",
  duration: "random(3,5)",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.12,
});
const modal = $("#messageModal"),
  title = $("#modalTitle"),
  msg = $("#modalMessage");
function openMsg(t, m) {
  title.textContent = t;
  msg.textContent = m;
  modal.classList.add("open");
  gsap.fromTo(
    ".message-box",
    { y: 70, scale: 0.85, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.4)" },
  );
}
function closeMsg() {
  gsap.to(".message-box", {
    y: 30,
    scale: 0.92,
    opacity: 0,
    duration: 0.3,
    onComplete: () => modal.classList.remove("open"),
  });
}
$$(".joke-card").forEach(
  (c) =>
    (c.onclick = () =>
      openMsg(c.querySelector("strong").textContent, c.dataset.message)),
);
$$(".open-card").forEach(
  (c) => (c.onclick = () => openMsg(c.dataset.title, c.dataset.message)),
);
$(".close-modal").onclick = closeMsg;
modal.onclick = (e) => {
  if (e.target === modal) closeMsg();
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMsg();
});
$("#wishBtn").onclick = () => {
  burst(90);
  openMsg(
    "Your wish is on its way ✨",
    "I hope this year brings you closer to everything you dream of. May you keep growing, learning, achieving, and becoming the best version of yourself. Keep smiling, keep shining, and keep being the amazing person you are. Happy Birthday! 🤍✨",
  );
};
$("#replay").onclick = () => {
  scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => location.reload(), 700);
};
document.querySelectorAll(".photo-track").forEach((track) => {
  // Duplicate the complete set of photos
  const originalCards = [...track.children];

  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });
});
