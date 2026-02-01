document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const searchInput = document.querySelector("input[type='search']");
  const productCards = document.querySelectorAll(".card");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='text-center'>Your cart is empty</p>";
      cartTotal.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      total += parseInt(item.price);

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("d-flex", "align-items-center", "mb-3");
      itemDiv.innerHTML = `
        <img src="${item.img}" width="60" class="me-3 rounded">
        <div class="flex-grow-1">
          <h6 class="mb-0">${item.name}</h6>
          <small>₹${item.price}</small>
        </div>
        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = total;

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        updateCartUI();
      });
    });
  }

  updateCartCount();
  updateCartUI();

  addToCartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const product = {
        name: button.dataset.name,
        price: button.dataset.price,
        img: button.dataset.img
      };

      cart.push(product);
      saveCart();
      updateCartCount();
      updateCartUI();

      button.textContent = "Added ✓";
      button.style.backgroundColor = "#28a745";

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.style.backgroundColor = "pink";
      }, 1500);
    });
  });

  searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    productCards.forEach(card => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      card.parentElement.style.display = title.includes(value) ? "block" : "none";
    });
  });
});
