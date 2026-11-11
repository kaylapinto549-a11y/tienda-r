document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // CONFIGURACIÓN DE URBAN STYLE
  // =====================================

  const numeroWhatsApp = "573001640580";

  const crearWhatsApp = (mensaje) =>
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // BOTÓN FLOTANTE DE WHATSAPP
  const whatsapp = document.createElement("a");
  whatsapp.className = "whatsapp-float";
  whatsapp.href = crearWhatsApp(
    "Hola Urban Style 👋. Quiero información sobre sus prendas y promociones."
  );
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener noreferrer";
  whatsapp.innerHTML = "<span>◉</span> ¡ESCRÍBENOS!";
  whatsapp.setAttribute("aria-label", "Contactar con Urban Style por WhatsApp");
  document.body.appendChild(whatsapp);

  // =====================================
  // CATÁLOGO DE 12 PRODUCTOS
  // =====================================

  const productos = [
    {
      id: 1,
      nombre: "Camiseta Oversize Black",
      categoria: "Camisetas",
      precio: 45900,
      tallas: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      etiqueta: "MÁS VENDIDO"
    },
    {
      id: 2,
      nombre: "Camiseta Street Graphic",
      categoria: "Camisetas",
      precio: 52900,
      tallas: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
      etiqueta: "NUEVO"
    },
    {
      id: 3,
      nombre: "Camiseta Urban White",
      categoria: "Camisetas",
      precio: 39900,
      tallas: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
      etiqueta: "BÁSICO"
    },
    {
      id: 4,
      nombre: "Camiseta Oversize Color",
      categoria: "Camisetas",
      precio: 49900,
      tallas: ["M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
      etiqueta: "TREND"
    },
    {
      id: 5,
      nombre: "Cargo Pants Black",
      categoria: "Pantalones",
      precio: 89900,
      tallas: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
      etiqueta: "FAVORITO"
    },
    {
      id: 6,
      nombre: "Jeans Urban Blue",
      categoria: "Pantalones",
      precio: 99900,
      tallas: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
      etiqueta: "NUEVO"
    },
    {
      id: 7,
      nombre: "Pantalón Street Fit",
      categoria: "Pantalones",
      precio: 85900,
      tallas: ["M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
      etiqueta: "URBAN"
    },
    {
      id: 8,
      nombre: "Chaqueta Denim Style",
      categoria: "Chaquetas",
      precio: 129900,
      tallas: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
      etiqueta: "EXCLUSIVO"
    },
    {
      id: 9,
      nombre: "Chaqueta Street Black",
      categoria: "Chaquetas",
      precio: 139900,
      tallas: ["M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
      etiqueta: "NUEVO"
    },
    {
      id: 10,
      nombre: "Hoodie Oversize",
      categoria: "Sudaderas",
      precio: 89900,
      tallas: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
      etiqueta: "POPULAR"
    },
    {
      id: 11,
      nombre: "Sudadera Urban Purple",
      categoria: "Sudaderas",
      precio: 94900,
      tallas: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      etiqueta: "TREND"
    },
    {
      id: 12,
      nombre: "Hoodie Street Edition",
      categoria: "Sudaderas",
      precio: 109900,
      tallas: ["M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600",
      etiqueta: "EXCLUSIVO"
    }
  ];

  // =====================================
  // ELEMENTOS DE LA PÁGINA
  // =====================================

  const productsGrid = document.getElementById("productsGrid");
  const categoryFilter = document.getElementById("categoryFilter");
  const sizeFilter = document.getElementById("sizeFilter");
  const sortFilter = document.getElementById("sortFilter");
  const emptyMessage = document.getElementById("emptyMessage");

  const cartDrawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");
  const cartItems = document.getElementById("cartItems");

  let carrito = [];

  // =====================================
  // FORMATO DE PRECIOS
  // =====================================

  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    });

  // =====================================
  // MOSTRAR PRODUCTOS
  // =====================================

  function mostrarProductos() {

    let lista = [...productos];

    const categoria = categoryFilter.value;
    const talla = sizeFilter.value;
    const orden = sortFilter.value;

    if (categoria !== "Todas") {
      lista = lista.filter(p => p.categoria === categoria);
    }

    if (talla !== "Todas") {
      lista = lista.filter(p => p.tallas.includes(talla));
    }

    if (orden === "low") {
      lista.sort((a, b) => a.precio - b.precio);
    }

    if (orden === "high") {
      lista.sort((a, b) => b.precio - a.precio);
    }

    productsGrid.innerHTML = "";

    emptyMessage.style.display = lista.length ? "none" : "block";

    lista.forEach(producto => {

      const tarjeta = document.createElement("article");
      tarjeta.className = "product-card";

      tarjeta.innerHTML = `
        <div class="product-image">
          <img src="${producto.imagen}"
               alt="${producto.nombre}"
               loading="lazy"
               onerror="this.src='https://placehold.co/600x700/eee/333?text=Urban+Style'">
          <span class="product-tag">${producto.etiqueta}</span>
        </div>

        <div class="product-info">
          <span class="product-category">${producto.categoria}</span>

          <h3>${producto.nombre}</h3>

          <p>Estilo urbano • Colección 2026</p>

          <div class="product-price">
            ${formatoPrecio(producto.precio)}
          </div>

          <span class="size-label">Selecciona tu talla:</span>

          <div class="product-sizes">
            ${producto.tallas.map((talla, index) => `
              <button class="size-option ${index === 0 ? "selected" : ""}"
                data-size="${talla}">
                ${talla}
              </button>
            `).join("")}
          </div>

          <button class="add-button" data-id="${producto.id}">
            + AGREGAR AL CARRITO
          </button>
        </div>
      `;

      productsGrid.appendChild(tarjeta);
    });
  }

  // =====================================
  // SELECCIÓN DE TALLAS
  // =====================================

  productsGrid.addEventListener("click", (e) => {

    const botonTalla = e.target.closest(".size-option");

    if (botonTalla) {
      const contenedor = botonTalla.parentElement;

      contenedor.querySelectorAll(".size-option")
        .forEach(b => b.classList.remove("selected"));

      botonTalla.classList.add("selected");
      return;
    }

    const botonAgregar = e.target.closest(".add-button");

    if (botonAgregar) {

      const id = Number(botonAgregar.dataset.id);
      const producto = productos.find(p => p.id === id);

      const tarjeta = botonAgregar.closest(".product-card");
      const tallaSeleccionada =
        tarjeta.querySelector(".size-option.selected");

      if (!tallaSeleccionada) {
        alert("Selecciona una talla.");
        return;
      }

      agregarAlCarrito(producto, tallaSeleccionada.dataset.size);
    }
  });

  // =====================================
  // AGREGAR AL CARRITO
  // =====================================

  function agregarAlCarrito(producto, talla) {

    const existente = carrito.find(item =>
      item.id === producto.id && item.talla === talla
    );

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        talla,
        cantidad: 1
      });
    }

    actualizarCarrito();
    abrirCarrito();
  }

  // =====================================
  // CALCULAR TOTALES
  // =====================================

  function calcularTotales() {

    const subtotal = carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );

    const descuento = subtotal >= 150000 ? subtotal * 0.10 : 0;
    const total = subtotal - descuento;

    return {
      subtotal,
      descuento,
      total
    };
  }

  // =====================================
  // ACTUALIZAR CARRITO
  // =====================================

  function actualizarCarrito() {

    const cantidadTotal = carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

    document.getElementById("cartCount").textContent = cantidadTotal;

    if (carrito.length === 0) {

      cartItems.innerHTML = `
        <div class="cart-empty">
          <div style="font-size:45px">🛍️</div>
          <h3>Tu carrito está vacío</h3>
          <p>¡Agrega tus prendas favoritas!</p>
        </div>
      `;

    } else {

      cartItems.innerHTML = carrito.map(item => `
        <div class="cart-item">
          <img src="${item.imagen}" alt="${item.nombre}">

          <div>
            <h4>${item.nombre}</h4>
            <p>${formatoPrecio(item.precio)}</p>
            <small>Talla: ${item.talla}</small>

            <div class="quantity-controls">
              <button data-action="minus"
                data-id="${item.id}"
                data-size="${item.talla}">−</button>

              <strong>${item.cantidad}</strong>

              <button data-action="plus"
                data-id="${item.id}"
                data-size="${item.talla}">+</button>

              <button class="remove-item"
                data-action="remove"
                data-id="${item.id}"
                data-size="${item.talla}">
                Quitar
              </button>
            </div>
          </div>
        </div>
      `).join("");
    }

    const totales = calcularTotales();

    document.getElementById("subtotal").textContent =
      formatoPrecio(totales.subtotal);

    document.getElementById("discount").textContent =
      formatoPrecio(totales.descuento);

    document.getElementById("total").textContent =
      formatoPrecio(totales.total);
  }

  // =====================================
  // MODIFICAR CANTIDADES
  // =====================================

  cartItems.addEventListener("click", (e) => {

    const boton = e.target.closest("button[data-action]");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const talla = boton.dataset.size;
    const accion = boton.dataset.action;

    const item = carrito.find(p =>
      p.id === id && p.talla === talla
    );

    if (!item) return;

    if (accion === "plus") {
      item.cantidad++;
    }

    if (accion === "minus") {
      item.cantidad--;

      if (item.cantidad <= 0) {
        carrito = carrito.filter(p =>
          !(p.id === id && p.talla === talla)
        );
      }
    }

    if (accion === "remove") {
      carrito = carrito.filter(p =>
        !(p.id === id && p.talla === talla)
      );
    }

    actualizarCarrito();
  });

  // =====================================
  // ABRIR Y CERRAR CARRITO
  // =====================================

  function abrirCarrito() {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
  }

  function cerrarCarrito() {
    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");
  }

  document.getElementById("openCart")
    .addEventListener("click", abrirCarrito);

  document.getElementById("closeCart")
    .addEventListener("click", cerrarCarrito);

  overlay.addEventListener("click", cerrarCarrito);

  // =====================================
  // FILTROS
  // =====================================

  categoryFilter.addEventListener("change", mostrarProductos);
  sizeFilter.addEventListener("change", mostrarProductos);
  sortFilter.addEventListener("change", mostrarProductos);

  // FILTRO DESDE TARJETAS DE CATEGORÍA

  document.querySelectorAll(".category-card").forEach(boton => {

    boton.addEventListener("click", () => {

      categoryFilter.value = boton.dataset.category;
      mostrarProductos();

      document.getElementById("coleccion")
        .scrollIntoView({ behavior: "smooth" });
    });

  });

  // =====================================
  // MENÚ PARA CELULARES
  // =====================================

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  // =====================================
  // FINALIZAR COMPRA
  // =====================================

  const checkoutSection = document.getElementById("checkoutSection");

  function mostrarResumen() {

    const totales = calcularTotales();

    document.getElementById("checkoutItems").innerHTML =
      carrito.map(item => `
        <div class="order-line">
          <span>
            ${item.nombre}<br>
            Talla ${item.talla} × ${item.cantidad}
          </span>
          <strong>${formatoPrecio(item.precio * item.cantidad)}</strong>
        </div>
      `).join("");

    document.getElementById("checkoutSubtotal").textContent =
      formatoPrecio(totales.subtotal);

    document.getElementById("checkoutDiscount").textContent =
      formatoPrecio(totales.descuento);

    document.getElementById("checkoutTotal").textContent =
      formatoPrecio(totales.total);
  }

  document.getElementById("checkoutButton")
    .addEventListener("click", () => {

      if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algún producto primero.");
        return;
      }

      mostrarResumen();
      cerrarCarrito();

      checkoutSection.classList.add("active");

      checkoutSection.scrollIntoView({
        behavior: "smooth"
      });
    });

  // =====================================
  // VOLVER A LA TIENDA
  // =====================================

  document.getElementById("backToShop")
    .addEventListener("click", () => {

      checkoutSection.classList.remove("active");

      document.getElementById("coleccion")
        .scrollIntoView({ behavior: "smooth" });
    });

  // =====================================
  // CONFIRMAR PEDIDO SIMULADO
  // =====================================

  document.getElementById("checkoutForm")
    .addEventListener("submit", (e) => {

      e.preventDefault();

      if (carrito.length === 0) {
        alert("No hay productos en el pedido.");
        return;
      }

      const nombre = document.getElementById("customerName").value.trim();
      const correo = document.getElementById("customerEmail").value.trim();
      const telefono = document.getElementById("customerPhone").value.trim();
      const direccion = document.getElementById("customerAddress").value.trim();
      const ciudad = document.getElementById("customerCity").value.trim();
      const observaciones = document.getElementById("customerNotes").value.trim();

      if (!nombre || !correo || !telefono || !direccion || !ciudad) {
        alert("Completa todos los datos obligatorios.");
        return;
      }

      const totales = calcularTotales();

      const numeroPedido = "US-" + Date.now().toString().slice(-7);

      const resumen = carrito.map(item =>
        `${item.nombre} - Talla ${item.talla} - Cantidad: ${item.cantidad} - ${formatoPrecio(item.precio * item.cantidad)}`
      ).join("\n");

      const mensaje = `
¡NUEVO PEDIDO - URBAN STYLE!

Pedido: ${numeroPedido}

CLIENTE:
Nombre: ${nombre}
Correo: ${correo}
Teléfono: ${telefono}
Dirección: ${direccion}
Ciudad: ${ciudad}

PRODUCTOS:
${resumen}

Subtotal: ${formatoPrecio(totales.subtotal)}
Descuento: ${formatoPrecio(totales.descuento)}
TOTAL: ${formatoPrecio(totales.total)}

Observaciones: ${observaciones || "Ninguna"}

Pedido generado desde la tienda de demostración.
      `.trim();

      document.getElementById("checkoutForm").hidden = true;
      document.querySelector(".order-card").hidden = true;

      document.getElementById("successMessage").hidden = false;

      // Se abre WhatsApp con el resumen para enviar el pedido.
      // El usuario decide si desea enviarlo.
      const enlace = crearWhatsApp(mensaje);

      const botonWhatsApp = document.createElement("a");
      botonWhatsApp.href = enlace;
      botonWhatsApp.target = "_blank";
      botonWhatsApp.rel = "noopener noreferrer";
      botonWhatsApp.className = "btn-primary";
      botonWhatsApp.style.marginTop = "12px";
      botonWhatsApp.textContent = "ENVIAR PEDIDO POR WHATSAPP";

      document.getElementById("successMessage")
        .appendChild(botonWhatsApp);

      carrito = [];
      actualizarCarrito();

    });

  // =====================================
  // SEGUIR COMPRANDO
  // =====================================

  document.getElementById("continueShopping")
    .addEventListener("click", () => {

      document.getElementById("successMessage").hidden = true;
      document.getElementById("checkoutForm").hidden = false;
      document.querySelector(".order-card").hidden = false;

      document.getElementById("checkoutForm").reset();

      const botonWhatsApp =
        document.querySelector("#successMessage a");

      if (botonWhatsApp) botonWhatsApp.remove();

      checkoutSection.classList.remove("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

  // =====================================
  // INICIAR TIENDA
  // =====================================

  mostrarProductos();
  actualizarCarrito();

});