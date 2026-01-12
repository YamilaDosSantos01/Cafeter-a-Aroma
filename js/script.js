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
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
    });
}

// Cerrar carrito
if (closeCart) {
    closeCart.addEventListener('click', closeCartPanel);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCartPanel);
}

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

    // ========== EVENTO PARA CAMBIAR MÉTODO DE PAGO ==========
    const metodoPagoSelect = document.getElementById('metodoPago');
    if (metodoPagoSelect) {
        metodoPagoSelect.addEventListener('change', function() {
            const datosTarjeta = document.getElementById('datosTarjeta');
            if (datosTarjeta) {
                if (this.value === 'mercadopago') {
                    datosTarjeta.style.display = 'block';
                    // Hacer campos de tarjeta requeridos
                    const numeroTarjeta = document.getElementById('numeroTarjeta');
                    const nombreTarjeta = document.getElementById('nombreTarjeta');
                    const vencimientoTarjeta = document.getElementById('vencimientoTarjeta');
                    const cvvTarjeta = document.getElementById('cvvTarjeta');
                    
                    if (numeroTarjeta) numeroTarjeta.required = true;
                    if (nombreTarjeta) nombreTarjeta.required = true;
                    if (vencimientoTarjeta) vencimientoTarjeta.required = true;
                    if (cvvTarjeta) cvvTarjeta.required = true;
                } else {
                    datosTarjeta.style.display = 'none';
                    // Quitar requerido
                    const numeroTarjeta = document.getElementById('numeroTarjeta');
                    const nombreTarjeta = document.getElementById('nombreTarjeta');
                    const vencimientoTarjeta = document.getElementById('vencimientoTarjeta');
                    const cvvTarjeta = document.getElementById('cvvTarjeta');
                    
                    if (numeroTarjeta) numeroTarjeta.required = false;
                    if (nombreTarjeta) nombreTarjeta.required = false;
                    if (vencimientoTarjeta) vencimientoTarjeta.required = false;
                    if (cvvTarjeta) cvvTarjeta.required = false;
                }
            }
        });
    }

    // Formatear número de tarjeta
    const numeroTarjetaInput = document.getElementById('numeroTarjeta');
    if (numeroTarjetaInput) {
        numeroTarjetaInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Formatear vencimiento
    const vencimientoInput = document.getElementById('vencimientoTarjeta');
    if (vencimientoInput) {
        vencimientoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Solo números en CVV
    const cvvInput = document.getElementById('cvvTarjeta');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
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

// ========== GUARDAR PEDIDO EN SUPABASE ==========
async function guardarPedidoEnSupabase(numeroPedido, items, total, datosCliente) {
    try {
        // Verificar que supabase esté disponible
        if (typeof supabase === 'undefined') {
            console.error('Supabase no está inicializado');
            alert('Error: No se pudo conectar con la base de datos');
            return false;
        }

        // Verificar que items no esté vacío
        if (!items || items.length === 0) {
            alert('El carrito está vacío');
            return false;
        }

        console.log('Datos a guardar:', {
            numero_pedido: numeroPedido,
            cliente_nombre: datosCliente.nombre,
            cliente_email: datosCliente.email,
            cliente_telefono: datosCliente.telefono,
            items: items,
            total: total,
            metodo_pago: datosCliente.metodoPago,
            notas: datosCliente.notas
        });

        const { data, error } = await supabase
            .from('pedidos')
            .insert({
                numero_pedido: numeroPedido,
                cliente_nombre: datosCliente.nombre,
                cliente_email: datosCliente.email,
                cliente_telefono: datosCliente.telefono,
                items: items,
                total: total,
                estado: 'pendiente',
                metodo_pago: datosCliente.metodoPago,
                notas: datosCliente.notas
            })
            .select();

        if (error) {
            console.error('Error completo:', error);
            alert('Error: ' + error.message);
            return false;
        }

        console.log('Pedido guardado exitosamente:', data);
        
        // Actualizar estadísticas de ventas
        await actualizarVentasDiarias(total);
        
        return true;
    } catch (error) {
        console.error('Error catch:', error);
        alert('Error al procesar: ' + error.message);
        return false;
    }
}

// Actualizar ventas diarias
async function actualizarVentasDiarias(total) {
    try {
        const hoy = new Date().toISOString().split('T')[0];
        
        // Buscar si ya existe un registro de hoy
        const { data: ventasHoy, error: errorBuscar } = await supabase
            .from('ventas_diarias')
            .select('*')
            .eq('fecha', hoy)
            .single();

        if (ventasHoy) {
            // Actualizar registro existente
            const { error: errorActualizar } = await supabase
                .from('ventas_diarias')
                .update({
                    total_pedidos: ventasHoy.total_pedidos + 1,
                    total_ventas: ventasHoy.total_ventas + total
                })
                .eq('fecha', hoy);
                
            if (errorActualizar) console.error('Error al actualizar ventas:', errorActualizar);
        } else {
            // Crear nuevo registro
            const { error: errorCrear } = await supabase
                .from('ventas_diarias')
                .insert([
                    {
                        fecha: hoy,
                        total_pedidos: 1,
                        total_ventas: total
                    }
                ]);
                
            if (errorCrear) console.error('Error al crear ventas:', errorCrear);
        }
    } catch (error) {
        console.error('Error al actualizar ventas diarias:', error);
    }
}

// ========== BOTÓN REALIZAR PEDIDO ==========
const checkoutBtn = document.querySelector('.btn-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Cerrar el panel del carrito
        closeCartPanel();
        
        // Mostrar modal de datos del cliente
        setTimeout(() => {
            const modalElement = document.getElementById('datosClienteModal');
            if (modalElement) {
                const modalDatos = new bootstrap.Modal(modalElement);
                modalDatos.show();
            }
        }, 300);
    });
}

// ========== FORMULARIO DE DATOS DEL CLIENTE - CORREGIDO ==========
const formDatosCliente = document.getElementById('formDatosCliente');
if (formDatosCliente) {
    formDatosCliente.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Capturar datos del formulario
        const datosCliente = {
            nombre: document.getElementById('clienteNombre').value.trim(),
            email: document.getElementById('clienteEmail').value.trim(),
            telefono: document.getElementById('clienteTelefono').value.trim(),
            metodoPago: document.getElementById('metodoPago').value,
            notas: document.getElementById('clienteNotas').value.trim()
        };
        
        // Validar campos obligatorios
        if (!datosCliente.nombre || !datosCliente.email || !datosCliente.telefono) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        
        // Si es mercadopago, validar datos de tarjeta
        if (datosCliente.metodoPago === 'mercadopago') {
            const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim();
            const nombreTarjeta = document.getElementById('nombreTarjeta').value.trim();
            const vencimientoTarjeta = document.getElementById('vencimientoTarjeta').value.trim();
            const cvvTarjeta = document.getElementById('cvvTarjeta').value.trim();
            
            if (!numeroTarjeta || !nombreTarjeta || !vencimientoTarjeta || !cvvTarjeta) {
                alert('Por favor completa todos los datos de la tarjeta');
                return;
            }
        }
        
        // Generar número de pedido
        const numeroPedido = 'P' + Date.now().toString().slice(-8);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // CERRAR CORRECTAMENTE EL MODAL DE DATOS
        const modalElement = document.getElementById('datosClienteModal');
        const modalDatos = bootstrap.Modal.getInstance(modalElement);
        if (modalDatos) {
            modalDatos.hide();
        }
        
        // Remover backdrop manualmente (por si acaso)
        setTimeout(() => {
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => backdrop.remove());
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }, 300);
        
        // Guardar en Supabase
        const guardado = await guardarPedidoEnSupabase(numeroPedido, cart, total, datosCliente);
        
        if (!guardado) {
            alert('Hubo un error al procesar el pedido. Por favor intenta de nuevo.');
            return;
        }
        
        // Llenar el modal de ticket con los datos
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
        document.getElementById('ticketNumber').textContent = numeroPedido;
        document.getElementById('ticketClienteNombre').textContent = datosCliente.nombre;
        document.getElementById('ticketMetodoPago').textContent = datosCliente.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta';
        
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
        
        // Mostrar modal de ticket
        setTimeout(() => {
            const ticketModalElement = document.getElementById('ticketModal');
            if (ticketModalElement) {
                const modalTicket = new bootstrap.Modal(ticketModalElement);
                modalTicket.show();
            }
        }, 500);
        
        // Vaciar carrito
        cart = [];
        updateCart();
        
        // Resetear formulario
        formDatosCliente.reset();
        
        // Ocultar sección de tarjeta
        const datosTarjeta = document.getElementById('datosTarjeta');
        if (datosTarjeta) {
            datosTarjeta.style.display = 'none';
        }
    });
}

console.log('Script cargado correctamente - Cafetería Aroma');