// ================= MENU =================

const hamburgerButton = document.getElementById("hamburger-button");
// Obtiene el botón de menú hamburguesa por su ID

const mobileMenu = document.getElementById("mobile-menu");
// Obtiene el contenedor del menú móvil

const overlay = document.getElementById("menu-overlay");
// Obtiene la capa de fondo oscuro (overlay)

function openMenu() {
  mobileMenu.classList.add("open");
  // Agrega la clase 'open' al menú móvil para mostrarlo
  
  overlay.classList.add("open");
  // Agrega la clase 'open' al overlay para hacerlo visible
  
  document.body.classList.add("menu-open");
  // Agrega la clase 'menu-open' al body para evitar scroll
  
  hamburgerButton.classList.add("open");
  // Agrega la clase 'open' al botón para cambiar el icono de hamburguesa a X
  
  hamburgerButton.setAttribute("aria-expanded", "true");
  // Actualiza el atributo de accesibilidad indicando que el menú está expandido
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  // Quita la clase 'open' del menú móvil para ocultarlo
  
  overlay.classList.remove("open");
  // Quita la clase 'open' del overlay para hacerlo invisible
  
  document.body.classList.remove("menu-open");
  // Quita la clase 'menu-open' del body para restaurar el scroll
  
  hamburgerButton.classList.remove("open");
  // Quita la clase 'open' del botón para cambiar el icono de X a hamburguesa
  
  hamburgerButton.setAttribute("aria-expanded", "false");
  // Actualiza el atributo de accesibilidad indicando que el menú está colapsado
}

hamburgerButton.addEventListener("click", (e) => {
  // Escucha el evento click en el botón hamburguesa
  
  e.stopPropagation();
  // Evita que el evento se propague a otros elementos
  
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  // Alterna entre abrir y cerrar dependiendo si ya tiene la clase 'open'
});

overlay.addEventListener("click", closeMenu);
// Cierra el menú si se hace click en el fondo oscuro (overlay)

mobileMenu.addEventListener("click", (e) => {
  // Escucha clicks dentro del menú móvil
  
  if (e.target.tagName === "A") closeMenu();
  // Si el elemento clickeado es un enlace (<a>), cierra el menú
});

document.addEventListener("keydown", (e) => {
  // Escucha el evento de teclado en todo el documento
  
  if (e.key === "Escape") closeMenu();
  // Si se presiona la tecla Escape, cierra el menú
});

// ================= CONTACT TOGGLE =================

const contactLink = document.getElementById("contact-toggle");
// Obtiene el elemento contenedor del botón de contacto

const textEl = contactLink?.querySelector(".contact-text");
// Busca el elemento de texto interno (span) de forma segura

if (contactLink && textEl) {
  // Verifica que ambos elementos existan antes de ejecutar la lógica
  
  const email = "cesar@smartcareertools.com";
  // Define la dirección de correo electrónico a utilizar
  
  let showingEmail = false;
  // Variable de estado: ¿Se está mostrando el email actualmente?
  
  let hintShown = false;
  // Variable de estado: ¿Ya se mostró la notificación de "Copiado"?
  
  let clipboardIconShown = false;
  // Variable de estado: ¿Ya se mostró el emoji de portapapeles?
  
  let emailCopied = false;
  // Variable de estado: ¿Ya se copió el email al portapapeles?

  contactLink.addEventListener("click", (e) => {
    // Agrega un escuchador para el evento 'click'
    
    e.preventDefault();
    // Previene la acción por defecto del enlace (evita navegar o recargar)

    if (!showingEmail) {
      // Si NO se está mostrando el email (es decir, dice "Contacto")
      
      textEl.classList.add("is-fading");
      // Agrega clase CSS para iniciar animación de desvanecimiento (fade out)

      setTimeout(() => {
        // Espera 150ms (tiempo que dura la transición CSS)
        
        if (!clipboardIconShown) {
          // Si el emoji de portapapeles no se ha mostrado aún
          
          textEl.textContent = email + " 📋";
          // Cambia el texto visible por el email CON el emoji de portapapeles
          
          clipboardIconShown = true;
          // Marca que el emoji ya se mostró (para no mostrarlo de nuevo)
        } else {
          // Si el emoji ya se mostró anteriormente
          
          textEl.textContent = email;
          // Cambia el texto visible por el email SIN el emoji
        }
        
        textEl.classList.remove("is-fading");
        // Quita la clase para que el texto aparezca (fade in)
        
        showingEmail = true;
        // Actualiza el estado indicando que ahora se ve el email
      }, 150);

      return;
      // Sale de la función aquí para no ejecutar la lógica de copiado en el primer clic
    }

    if (!emailCopied) {
      // Si el email no se ha copiado aún al portapapeles
      
      navigator.clipboard.writeText(email);
      // Copia el email al portapapeles
      
      emailCopied = true;
      // Marca que el email ya fue copiado (para no copiarlo de nuevo)

      if (!hintShown) {
        // Si no se ha mostrado la notificación de copiado anteriormente
        
        hintShown = true;
        // Marca que la notificación ya se mostró (para no repetirla constantemente)
        
        contactLink.classList.add("show-hint");
        // Agrega clase CSS que muestra el mensaje "Copiado"

        setTimeout(() => {
          // Configura un temporizador
          
          contactLink.classList.remove("show-hint");
          // Oculta el mensaje después de 2.5 segundos
        }, 2500);
      }
    }

    textEl.classList.add("is-fading");
    // Inicia animación de desvanecimiento del email

    setTimeout(() => {
      // Espera 150ms
      
      textEl.textContent = "Contacto";
      // Restaura el texto original "Contacto"
      
      textEl.classList.remove("is-fading");
      // Quita la clase para que el texto aparezca
      
      showingEmail = false;
      // Restablece el estado a "no mostrando email"
    }, 150);
  });
}


// ================= MailerLite Universal =================
// No tengo porqué entenderlo 

    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '2060315');
