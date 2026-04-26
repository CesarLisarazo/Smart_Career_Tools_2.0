// =====================================================
// SMART CAREER TOOLS - SCRIPT GLOBAL (V3)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initLegacyComponents();
  initReadingProgressBar();
  
  // Show page after a tiny delay for smooth transition
  setTimeout(() => {
    document.body.classList.add("page-loaded");
  }, 100);
});

// =====================================================
// 1. MOBILE MENU
// =====================================================
function initMobileMenu() {
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  if (!hamburgerButton || !mobileMenu || !overlay) return;

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("open");
    
    if (isOpen) {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("open");
      hamburgerButton.classList.remove("open");
      hamburgerButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    } else {
      mobileMenu.classList.add("open");
      overlay.classList.add("open");
      hamburgerButton.classList.add("open");
      hamburgerButton.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  }

  hamburgerButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", toggleMenu);
  });
}

// =====================================================
// 2. SCROLL REVEAL ANIMATIONS
// =====================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left');
  
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
  
  // Trigger immediately for elements already in viewport
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
      }
    });
  }, 200);
}

// =====================================================
// 3. LEGACY COMPONENT LOADER (For /blog/ and /descargas/)
// =====================================================
function initLegacyComponents() {
  function loadComponent(id, file, callback) {
    const element = document.getElementById(id);
    if (!element) return; // Skip if element doesn't exist on this page

    fetch(file)
      .then(response => response.ok ? response.text() : "")
      .then(data => {
        if (data) element.innerHTML = data;
        if (callback) callback();
      })
      .catch(console.error);
  }

  // Only run if we actually have the legacy containers
  if (document.getElementById("header-container")) {
    loadComponent("header-container", "/components/header.html");
  }
  if (document.getElementById("footer-container")) {
    loadComponent("footer-container", "/components/footer.html");
  }
  if (document.getElementById("mobile-menu-container")) {
    loadComponent("mobile-menu-container", "/components/mobile-menu.html", initMobileMenu);
  }
}

// =====================================================
// 4. READING PROGRESS BAR
// =====================================================
function initReadingProgressBar() {
  const articleContent = document.querySelector('.article-content');
  if (!articleContent) return;

  // Create progress bar container and bar
  const progressContainer = document.createElement('div');
  progressContainer.className = 'reading-progress-container';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  
  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  // Calculate reading progress
  function updateProgress() {
    const articleRect = articleContent.getBoundingClientRect();
    const articleTop = articleRect.top;
    const articleHeight = articleRect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the article has been scrolled
    const scrolled = Math.max(0, -articleTop + windowHeight * 0.15);
    const totalScrollable = articleHeight - windowHeight * 0.7;
    const progress = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
    
    progressBar.style.width = progress + '%';
  }

  // Initial calculation
  updateProgress();

  // Update on scroll with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update on resize
  window.addEventListener('resize', updateProgress);
}