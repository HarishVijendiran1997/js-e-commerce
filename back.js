document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product 1", price: 19.99 },
    { id: 2, name: "product 2", price: 9.99 },
    { id: 3, name: "product 3", price: 49.99 },
  ];

  let cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(
      2
    )}</span><button data-id=${product.id}>Add to cart</button>`;

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productID);
      addToCart(product);
    }
  });

  const addToCart = (product) => {
    cart.push(product);
    renderCart(cart);
  };
  const deleteItem = (item) => {
    cart.pop(item);
    renderCart(cart);
  };

  const renderCart = () => {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price}<button del-id=${item.id}>Delete</button>`;
        cartItem.classList.add("cartProduct");
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  };

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemID = parseInt(e.target.getAttribute("del-id"));
      console.log("click");
      const item = cart.find((i) => i.id === itemID);
      console.log(item);
      deleteItem(item);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Purchase successful");
    renderCart();
  });
});
