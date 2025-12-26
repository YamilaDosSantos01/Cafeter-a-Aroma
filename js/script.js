// ========== MENÚ MÓVIL ==========
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

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

// ========== CARRITO DE COMPRAS ==========
let cart = [];

// Elementos del DOM
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Abrir carrito
cartIcon.addEventListener('click', () => {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
});

// Cerrar carrito
closeCart.addEventListener('click', closeCartPanel);
cartOverlay.addEventListener('click', closeCartPanel);

function closeCartPanel() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// ========== CONTROLES DE CANTIDAD EN EL MENÚ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Botones + y - en cada producto
    document.querySelectorAll('.menu-item').forEach(item => {
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const input = item.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let value = parseInt(input.value);
                if (value < 99) {
                    input.value = value + 1;
                }
            });
        }
    });
});

// Agregar al carrito con cantidad
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        // Buscar el input de cantidad del mismo producto
        const menuItem = button.closest('.menu-item');
        const quantityInput = menuItem.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        
        addToCart(name, price, quantity);
        
        // Resetear cantidad a 1
        quantityInput.value = 1;
        
        // Animación del botón
        button.textContent = '✓ Agregado';
        button.style.background = '#ae7827ff';
        setTimeout(() => {
            button.textContent = 'Agregar al carrito';
            button.style.background = '#6B4423';
        }, 1000);
    });
});

function addToCart(name, price, quantity) {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }
    
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    // Si la cantidad llega a 0, eliminar el producto
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

function updateCart() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-controls">
                        <button class="cart-quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="cart-quantity-display">${item.quantity}</span>
                        <button class="cart-quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                    <span class="cart-item-price">$${item.price * item.quantity}</span>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total}`;
}

// ========== FORMULARIO DE CONTACTO ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`);
        contactForm.reset();
    });
}

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 50;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMACIÓN AL HACER SCROLL ==========
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

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.menu-item, .gallery-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ========== EFECTO HEADER AL HACER SCROLL ==========
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

// ========== BOTÓN REALIZAR PEDIDO CON MODAL MEJORADO ==========
const checkoutBtn = document.querySelector('.btn-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Generar ticket
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Llenar el modal con los datos
        const ticketItems = document.getElementById('ticketItems');
        ticketItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between mb-2" style="padding: 8px; background: white; border-radius: 8px;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small class="text-muted">x${item.quantity} unidades</small>
                </div>
                <div class="text-end">
                    <strong style="color: #D4A574;">$${item.price * item.quantity}</strong><br>
                    <small class="text-muted">$${item.price} c/u</small>
                </div>
            </div>
        `).join('');
        
        document.getElementById('ticketSubtotal').textContent = `$${total}`;
        document.getElementById('ticketTotal').textContent = `$${total}`;
        
        // Número de ticket aleatorio
        const ticketNum = Math.floor(Math.random() * 10000) + 1000;
        document.getElementById('ticketNumber').textContent = ticketNum;
        
        // Fecha actual
        const now = new Date();
        const fecha = now.toLocaleDateString('es-UY', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('ticketDate').textContent = fecha;
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('ticketModal'));
        modal.show();
        
        // Vaciar carrito y cerrar panel
        cart = [];
        updateCart();
        closeCartPanel();
    });
}

console.log('Script cargado correctamente - Cafetería Aroma con Carrito y Ticket Mejorado');