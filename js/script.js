// Función para toggle del menú móvil
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Event listener para el botón del menú
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Cerrar menú al hacer clic en un link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
    });
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Mostrar mensaje de confirmación
        alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`);
        
        // Limpiar el formulario
        contactForm.reset();
    });
}

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animación al hacer scroll (elementos aparecen)
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar estilos para animación
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.menu-item, .gallery-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animación inicial
    animateOnScroll();
});

// Event listener para scroll
window.addEventListener('scroll', animateOnScroll);

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.4)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

console.log('✅ Script cargado correctamente - Café Aroma');