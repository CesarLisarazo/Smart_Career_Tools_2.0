// =====================================================
// SMART CAREER TOOLS - SCRIPT GLOBAL
// Arquitectura modular con componentes reutilizables
// =====================================================



// =====================================================
// 🔹 1. CARGAR COMPONENTES REUTILIZABLES
// =====================================================

function loadComponent(id, file, callback) {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`❌ No existe el elemento con id: ${id}`);
    return;
  }

  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error cargando ${file}`);
      }
      return response.text();
    })
    .then(data => {
      element.innerHTML = data;
      if (callback) callback(); // Ejecuta función después de cargar
    })
    .catch(error => console.error(error));
}



// =====================================================
// 🔹 2. INICIALIZAR MENÚ (se ejecuta después de cargar header)
// =====================================================

function initMenu() {

  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  if (!hamburgerButton || !mobileMenu || !overlay) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

function openMenu() {
  mobileMenu.classList.add("open");
  overlay.classList.add("open");
  document.body.classList.add("menu-open");
  hamburgerButton.classList.add("open");
  hamburgerButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("open");
  document.body.classList.remove("menu-open");
  hamburgerButton.classList.remove("open");
  hamburgerButton.setAttribute("aria-expanded", "false");
}


  hamburgerButton.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {

      document.body.classList.add("is-navigating");

      const mobileMenu = document.getElementById("mobile-menu");
      const overlay = document.getElementById("menu-overlay");
      const hamburgerButton = document.getElementById("hamburger-button");

      mobileMenu?.classList.remove("open");
      overlay?.classList.remove("open");
      document.body.classList.remove("menu-open");
      hamburgerButton?.classList.remove("open");
    }
  });
});


document.querySelectorAll("#header a").forEach(link => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });
});

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

window.addEventListener("beforeunload", () => {
  document.body.classList.remove("menu-open");
});

// =====================================================
// 🔹 3. CONTACT TOGGLE (Email reveal + copy)
// =====================================================

function initContactToggle() {

  const contactLink = document.getElementById("contact-toggle");
  const textEl = contactLink?.querySelector(".contact-text");

  if (!contactLink || !textEl) return;

  const email = "cesar@smartcareertools.com";

  let showingEmail = false;
  let hintShown = false;
  let clipboardIconShown = false;
  let emailCopied = false;

  contactLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Mostrar email
    if (!showingEmail) {

      textEl.classList.add("is-fading");

      setTimeout(() => {

        if (!clipboardIconShown) {

         textEl.innerHTML = `
  <span style="display:inline-flex; align-items:center; gap:4px;">
    ${email}
    <img src="/img/iconos/portapapeles.gif"
         alt="Copiar"
         style="width:20px; transform:translateY(1px);">
  </span>
`;


          clipboardIconShown = true;

        } else {

          textEl.textContent = email;

        }

        textEl.classList.remove("is-fading");
        showingEmail = true;

      }, 150);

      return;
    }

    // Copiar email
    if (!emailCopied) {

      navigator.clipboard.writeText(email);
      emailCopied = true;

      if (!hintShown) {

        hintShown = true;
        contactLink.classList.add("show-hint");

        setTimeout(() => {
          contactLink.classList.remove("show-hint");
        }, 2500);
      }
    }

    // Restaurar texto
    textEl.classList.add("is-fading");

    setTimeout(() => {

      textEl.textContent = "Contacto";
      textEl.classList.remove("is-fading");
      showingEmail = false;

    }, 150);
  });
}



// =====================================================
// 🔹 4. MAILERLITE UNIVERSAL SCRIPT
// =====================================================

(function(w,d,e,u,f,l,n){
  w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
  l=d.createElement(e);
  l.async=1;
  l.src=u;
  n=d.getElementsByTagName(e)[0];
  n.parentNode.insertBefore(l,n);
})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');

ml('account', '2060315');



// =====================================================
// 🔹 5. CONTROL DE CARGA (Fade in cuando carga formulario)
// =====================================================
function initPageLoadControl() {

  const formContainer = document.querySelector(".ml-embedded");

  function showPage() {
    document.body.classList.add("page-loaded");
  }

  // Si no hay formulario → mostrar inmediato
  if (!formContainer) {
    showPage();
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {

    const emailInput = formContainer.querySelector("input[type='email']");

    if (emailInput && emailInput.placeholder && emailInput.placeholder.length > 0) {
      showPage();
      obs.disconnect();
    }

  });

  observer.observe(formContainer, { childList: true, subtree: true });

  // Fallback por seguridad
  setTimeout(showPage, 5000);
}


// =====================================================
// 🔹 6. INICIALIZACIÓN GLOBAL
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

  let componentsLoaded = 0;

  function checkInitMenu() {
    componentsLoaded++;
    if (componentsLoaded === 2) {
      initMenu();
    }
  }

  loadComponent("header-container", "/components/header.html", checkInitMenu);
  loadComponent("mobile-menu-container", "/components/mobile-menu.html", checkInitMenu);

  loadComponent("footer-container", "/components/footer.html", () => {
    initContactToggle(); // ← Ahora se ejecuta cuando el footer ya existe
  });

  initPageLoadControl();

});




window.addEventListener("beforeunload", () => {
  document.body.classList.remove("menu-open");
});

