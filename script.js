document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product 1", price: 19.99 },
    { id: 2, name: "product 2", price: 9.99 },
    { id: 3, name: "product 3", price: 49.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Display product list
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(
      2
    )}</span><button data-id="${product.id}">Add to cart</button>`;

    productList.appendChild(productDiv);
  });

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
  };

  // Render cart items
  const renderCart = () => {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button class="delete-btn" del-id="${item.id}">Delete</button>`;
        cartItem.classList.add("cartProduct");
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  };

  // Handle add to cart clicks
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productID);
      addToCart(product);
    }
  });

  // Handle delete button clicks inside cart
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const itemID = parseInt(e.target.getAttribute("del-id"));
      deleteItem(itemID);
    }
  });

  // Delete item from cart
  const deleteItem = (itemID) => {
    cart = cart.filter((item) => item.id !== itemID);
    saveCart();
    renderCart();
  };

  // Checkout - Clear cart
  checkoutBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    alert("Purchase successful!");
    renderCart();
  });

  // Load cart on page load
  renderCart();
});
