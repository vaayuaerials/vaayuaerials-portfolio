document.addEventListener("DOMContentLoaded", function () {

   console.log("JS Loaded Successfully");

   const modalElement = document.getElementById("videoModal");
const modalDialog = modalElement.querySelector(".modal-dialog");
const modalVideo = document.getElementById("modalVideo");
const rotateBtn = document.getElementById("mobileRotateBtn");

let isLandscape = false;

   const heroVideo = document.querySelector('.hero-video');

   window.addEventListener('scroll', () => {
      if (!heroVideo || window.innerWidth < 768) return;

      const scrollY = window.scrollY;

      // limit effect so it doesn't go crazy
      if (scrollY < window.innerHeight) {
         heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
   });


   // project card auto play
   document.querySelectorAll('.project-card video').forEach(video => {
      video.addEventListener('mouseenter', () => {
         video.play();
      });

      video.addEventListener('mouseleave', () => {
         video.pause();
         video.currentTime = 0;
      });
   });


   // project card animation
   const reveals = document.querySelectorAll('.reveal');

   reveals.forEach((el, index) => {
      el.style.setProperty('--delay', `${index * 0.30}s`);
   });

   function revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      reveals.forEach(el => {
         const elementTop = el.getBoundingClientRect().top;

         if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
         }
      });
   }

   window.addEventListener('scroll', revealOnScroll);
   revealOnScroll();

   // document.addEventListener("scroll", function () {
   //   const navbar = document.querySelector(".hero-navbar");

   //   if (window.scrollY > 50) {
   //     navbar.classList.add("scrolled");
   //   } else {
   //     navbar.classList.remove("scrolled");
   //   }
   // });

   const navbar = document.querySelector('.hero-navbar');

   window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
      } else {
         navbar.classList.remove('scrolled');
      }
   });


if (rotateBtn) {
  rotateBtn.addEventListener("click", () => {
    isLandscape = !isLandscape;

    modalElement.classList.toggle("landscape-mode", isLandscape);

    if (isLandscape) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
}

   document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
         const videoSrc = card.getAttribute("data-video");
         const title = card.getAttribute("data-title");

          

         modalVideo.querySelector("source").src = videoSrc;
         modalVideo.load();

         videoTitle.textContent = title;

         const modal = new bootstrap.Modal(document.getElementById("videoModal"));
         modal.show();
      });
   });

   /* Stop video when modal closes */
   // document.getElementById("videoModal").addEventListener("hidden.bs.modal", () => {
   //   const video = document.getElementById("modalVideo");
   //   video.pause();
   //   video.currentTime = 0;
   // });

   const videoModal = document.getElementById("videoModal");

   if (videoModal) {
      videoModal.addEventListener("hidden.bs.modal", () => {
          modalElement.classList.remove("landscape-mode");
            isLandscape = false;

         const video = document.getElementById("modalVideo");
         if (video) {
            video.pause();
            video.currentTime = 0;
         }
      });
   }


   const premiumWrapper = document.querySelector('.premium-video-wrapper');

   if (premiumWrapper) {
      premiumWrapper.addEventListener('mousemove', (e) => {
         const rect = premiumWrapper.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;

         const rotateX = (y / rect.height - 0.5) * 10;
         const rotateY = (x / rect.width - 0.5) * -10;

         premiumWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      premiumWrapper.addEventListener('mouseleave', () => {
         premiumWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
   }


   // Theme
   // const toggleBtn = document.getElementById("themeToggle");

   // if (toggleBtn) {
   //   toggleBtn.addEventListener("click", function () {
   //     document.body.classList.toggle("light-theme");
   //     console.log("Theme toggled");
   //   });
   // }

   const themeToggle = document.getElementById('themeToggle');
   const body = document.body;
   const overlay = document.querySelector('.theme-transition-overlay');

   if (!overlay) {
      console.log("Overlay not found");
      return;
   }

   if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-theme');
   }

   themeToggle.addEventListener('click', () => {

      overlay.classList.add('active');
      body.classList.add('transitioning');

      setTimeout(() => {
         body.classList.toggle('light-theme');

         localStorage.setItem(
            'theme',
            body.classList.contains('light-theme') ? 'light' : 'dark'
         );
      }, 400);

      setTimeout(() => {
         overlay.classList.remove('active');
         body.classList.remove('transitioning');
      }, 1000);

   });


   const canvas = document.getElementById("particle-canvas");
   const ctx = canvas.getContext("2d");

   let particles = [];
   const particleCount = 40;

   function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
   }
   resizeCanvas();
   window.addEventListener("resize", resizeCanvas);

   function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
         particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2
         });
      }
   }
   createParticles();

   function getParticleColor() {
      if (document.body.classList.contains("light-theme")) {
         return "rgba(255, 200, 0, 0.15)";
      } else {
         return "rgba(0, 255, 255, 0.15)";
      }
   }
   if (window.innerWidth < 768) {
      canvas.style.display = "none";
   }

   function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
         p.x += p.speedX;
         p.y += p.speedY;

         if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
         if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

         ctx.beginPath();
         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
         ctx.fillStyle = getParticleColor();
         ctx.fill();
      });

      requestAnimationFrame(animateParticles);
   }

   animateParticles();


   gsap.registerPlugin(ScrollTrigger);

   gsap.utils.toArray(".sec-title").forEach(title => {

      gsap.from(title, {
         yPercent: 100,
         opacity: 0,
         duration: 1.2,
         ease: "power4.out",
         scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none"
         }
      });

   });
   gsap.from(".hero-badge", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3
   });

   gsap.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.6
   });

   gsap.from(".hero-description", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.9
   });

   gsap.from(".hero-buttons", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1.2
   });
   gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

   ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true
   });

   const allVideos = document.querySelectorAll("video");

  //  const allVideos = document.querySelectorAll(".project-card video, .video-parallax-bg video");

   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         const video = entry.target;
         if (entry.isIntersecting) {
            video.play().catch(() => {});
         } else {
            video.pause();
         }
      });
   }, {
      threshold: 0.3
   });

   allVideos.forEach(video => {
      observer.observe(video);
   });

const carousel = document.getElementById('heroCarousel');

if (carousel) {
  carousel.addEventListener('slide.bs.carousel', function () {
    const videos = carousel.querySelectorAll('video');
    videos.forEach(video => video.pause());
  });

  carousel.addEventListener('slid.bs.carousel', function () {
    const activeVideo = carousel.querySelector('.carousel-item.active video');
    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  });
}

const counters = document.querySelectorAll(".stat-number");

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute("data-target");
      let count = 0;

      const update = () => {
        const increment = target / 80;
        count += increment;

        if (count < target) {
          el.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          el.innerText = target;
        }
      };

      update();
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => statsObserver.observe(counter));
});