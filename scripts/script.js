// Safety check
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Elements
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// Smooth Scroll + Close Mobile Menu
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Small delay so nav highlight updates correctly after smooth scroll
      setTimeout(() => {
        updateActiveLink();
      }, 500);
    }

    if (navbar) {
      navbar.classList.remove("active");
    }
  });
});

// FIXED Active Nav Highlight (viewport-center method)
function updateActiveLink() 
{
  let currentSectionId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    const viewportCenter = window.innerHeight / 2;

    if (sectionTop <= viewportCenter && sectionBottom >= viewportCenter) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Smooth role text switch (NO typewriter steps)
const roleElement = document.querySelector(".animated-role");
const roles = [
  "Frontend Developer",
  "UI-Focused Creator",
  "Future Full-Stack Developer"
];

let currentRole = 0;

if (roleElement) {
  roleElement.textContent = roles[currentRole];

  setInterval(() => {
    gsap.to(roleElement, {
      opacity: 0,
      y: 8,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        currentRole = (currentRole + 1) % roles.length;
        roleElement.textContent = roles[currentRole];

        gsap.fromTo(
          roleElement,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }
    });
  }, 2300);
}

// HERO ENTRY ANIMATIONS
gsap.from(".logo", {
  opacity: 0,
  y: -20,
  duration: 0.9,
  ease: "power3.out"
});

gsap.from(".nav-link", {
  opacity: 0,
  y: -16,
  duration: 0.7,
  stagger: 0.06,
  delay: 0.15,
  ease: "power3.out"
});

gsap.from(".intro-line", {
  opacity: 0,
  x: -24,
  duration: 0.7,
  delay: 0.25,
  ease: "power2.out"
});

gsap.from(".home-content h1", {
  opacity: 0,
  x: -40,
  duration: 0.9,
  delay: 0.4,
  ease: "power3.out"
});

gsap.from(".animated-role", {
  opacity: 0,
  x: -30,
  duration: 0.8,
  delay: 0.65,
  ease: "power3.out"
});

gsap.from(".hero-text", {
  opacity: 0,
  x: -30,
  duration: 0.8,
  delay: 0.85,
  ease: "power3.out"
});

gsap.from(".btn-box", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 1.05,
  ease: "power3.out"
});

gsap.from(".image-frame", {
  opacity: 0,
  scale: 0.92,
  y: 16,
  duration: 1,
  delay: 0.7,
  ease: "power3.out"
});

// Smooth floating image (GSAP only, no CSS conflict)
gsap.to(".image-frame", {
  y: -10,
  duration: 2.6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Section headings reveal
gsap.utils.toArray(".section-heading").forEach((heading) => {
  gsap.from(heading, {
    opacity: 0,
    y: 32,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      once: true
    }
  });
});

// Generic reveal-up cards
gsap.utils.toArray(".reveal-up").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 35,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 88%",
      once: true
    }
  });
});

// Skill bars animation
gsap.utils.toArray(".skill-bar span").forEach((bar) => {
  const finalWidth = bar.style.width;
  bar.style.width = "0";

  gsap.to(bar, {
    width: finalWidth,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: bar,
      start: "top 92%",
      once: true
    }
  });
});