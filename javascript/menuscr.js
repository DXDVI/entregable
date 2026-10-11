// --- ESTADO GLOBAL ---
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const cartSidebar = document.getElementById('shopping-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');

    if (!cartItemsContainer) return;

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.pizza-card');
            if (!card) return;
            
            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            addItemToCart(id, name, price);
            
            if (window.innerWidth <= 992 && cartSidebar) {
                cartSidebar.classList.add('active');
            }
        });
    });

    if (cartToggleBtn && cartSidebar) {
        cartToggleBtn.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
        });
    }

    if (closeCartBtn && cartSidebar) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const sucursalElegida = localStorage.getItem('sucursalSeleccionada');

            if (!sucursalElegida) {
                alert("⚠️ Por favor, selecciona primero en qué sucursal deseas retirar tu pedido antes de confirmar la orden.");
                window.location.href = "sucursales.html"; // Redirección automática funcional
                return;
            }

            alert(`¡Orden Recibida con Éxito!\n\n💰 Total a pagar: ${cartTotalPrice.textContent}\n🏬 Retirar en: ${sucursalElegida}\n\n¡Gracias por ordenar en Little Caesars!`);
            
            cart = [];
            updateCartUI();
            if (cartSidebar) cartSidebar.classList.remove('active');
        });
    }


    function addItemToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartUI();
    }

    window.removeItemFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Inicia su orden.</p>';
            if (checkoutBtn) checkoutBtn.disabled = true;
        } else {
            if (checkoutBtn) checkoutBtn.disabled = false;
            
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                
                const infoDiv = document.createElement('div');
                infoDiv.classList.add('cart-item-info');
                infoDiv.innerHTML = `
                    <h4>${item.name}</h4>
                    <span>$${item.price} x ${item.quantity}</span>
                `;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('remove-item-btn');
                deleteBtn.textContent = 'Quitar';
                deleteBtn.addEventListener('click', () => {
                    removeItemFromCart(item.id);
                });
                
                itemElement.appendChild(infoDiv);
                itemElement.appendChild(deleteBtn);
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCounter) cartCounter.textContent = totalCount;
        if (cartTotalPrice) cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }
});
