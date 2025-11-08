// 🛍️ Coffee Haven Cart System

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Update cart count in header
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(c => {
    c.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
}

// ✅ Add item to cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  alert(`${name} added to cart! ☕`);
}

// ✅ Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Display cart items on buy.html
function displayCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-price");
  if (!cartList) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
      <span>₹${item.price * item.quantity}</span>
      <button class="remove-btn" onclick="removeItem(${index})">X</button>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = `Total: ₹${total}`;
}

// ✅ Change quantity
function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

// ✅ Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

// ✅ Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty ☕");
    return;
  }
  alert("Thank you for your purchase! ❤️ Enjoy your coffee ☕");
  cart = [];
  saveCart();
  displayCart();
  updateCartCount();
}

// ✅ Run when page loads
updateCartCount();
displayCart();
