document.addEventListener("DOMContentLoaded", () => {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const horaActualStr = `${horas}:${minutos}`; 

    const sucursales = document.querySelectorAll('.branch-card');

    sucursales.forEach(sucursal => {
        const horaApertura = sucursal.getAttribute('data-open');
        const horaCierre = sucursal.getAttribute('data-close');
        const statusDiv = sucursal.querySelector('.branch-status');
        const statusText = statusDiv.querySelector('span');

        if (horaActualStr >= horaApertura && horaActualStr < horaCierre) {
            statusText.textContent = "Abierto ahora";
            statusDiv.className = "branch-status open";
        } else {
            statusText.textContent = "Cerrado";
            statusDiv.className = "branch-status closed";
        }
    });

    const botonesSeleccionar = document.querySelectorAll('.select-branch-btn');
    const tiendaGuardada = localStorage.getItem('sucursalSeleccionada');

    botonesSeleccionar.forEach(boton => {
        const tarjeta = boton.closest('.branch-card');
        const nombreTienda = tarjeta.querySelector('.branch-name').textContent;

        if (tiendaGuardada === nombreTienda) {
            boton.textContent = "Seleccionada ✓";
            boton.style.backgroundColor = "#28A745";
        }

        boton.addEventListener('click', () => {
            localStorage.setItem('sucursalSeleccionada', nombreTienda);
            
            botonesSeleccionar.forEach(btn => {
                btn.textContent = "Seleccionar";
                btn.style.backgroundColor = "#FF6600";
            });

            boton.textContent = "Seleccionada ✓";
            boton.style.backgroundColor = "#28A745";

            alert(`🏬 Has seleccionado la sucursal:\n${nombreTienda}\n\n¡Ya puedes ir al Menú a realizar tu pedido!`);
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const filtrarTiendas = () => {
        const query = searchInput.value.toLowerCase().trim();
        sucursales.forEach(sucursal => {
            const ciudadAttr = sucursal.getAttribute('data-city').toLowerCase();
            const nombreTienda = sucursal.querySelector('.branch-name').textContent.toLowerCase();
            const direccionTienda = sucursal.querySelector('.branch-detail').textContent.toLowerCase();

            if (ciudadAttr.includes(query) || nombreTienda.includes(query) || direccionTienda.includes(query)) {
                sucursal.style.display = "flex"; 
            } else {
                sucursal.style.display = "none"; 
            }
        });
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', filtrarTiendas);
        searchInput.addEventListener('input', filtrarTiendas);
    }
});
