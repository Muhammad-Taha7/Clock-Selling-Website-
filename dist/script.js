

  // Clock functionality
  function updateClock() {
    const now = new Date();
    const second = now.getSeconds() * 6;
    const minute = now.getMinutes() * 6 + second / 60;
    const hour = (now.getHours() % 12) * 30 + minute / 12;

    document.getElementById("hour").style.transform = `rotate(${hour}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minute}deg)`;
    document.getElementById("second").style.transform = `rotate(${second}deg)`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Mobile menu functionality
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  });
  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });
  overlay.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });

  const cursor = document.getElementById("cursor");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// animate loop
function animate() {
  // lerp (0.1 = speed, small value = slower)
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animate);
}
animate();






let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");
const cartDrawer = document.getElementById("cart-drawer");
const toast = document.getElementById("toast");

// Add to cart functionality
document.querySelectorAll(".card button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const title = card.querySelector("h3").innerText;
    const priceText = card.querySelector("p").innerText;
    const price = parseInt(priceText.replace(/[^\d]/g, "")); // ✅ Fix for Rs. 6,299
    const img = card.querySelector("img").src;

    const existing = cart.find(item => item.title === title);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ title, price, img, qty: 1 });
    }
    updateCart();
    showToast(title); // ✅ Pass product name
  });
});

// Update cart drawer
function updateCart() {
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, i) => {
    subtotal += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="flex items-center gap-3 border-b pb-2">
        <img src="${item.img}" class="w-16 h-16 object-cover rounded" />
        <div class="flex-1">
          <h4 class="font-semibold">${item.title}</h4>
          <p class="text-sm text-gray-600">Rs. ${item.price.toLocaleString()}</p>
          <div class="flex items-center gap-2 mt-1">
            <button class="px-2 bg-gray-200 rounded" onclick="changeQty(${i}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="px-2 bg-gray-200 rounded" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <button class="text-red-500 text-sm" onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  let discount = subtotal * 0.1;
  let total = subtotal - discount;

  subtotalEl.innerText = `Rs. ${subtotal.toLocaleString()}`;
  discountEl.innerText = `Rs. ${discount.toLocaleString()}`;
  totalEl.innerText = `Rs. ${total.toLocaleString()}`;
  cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Change quantity
function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Toast message (with product name)
function showToast(productName) {
  toast.innerText = `Thanks! ${productName} is added to cart.`;
  toast.classList.remove("hidden");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("hidden");
  }, 3000);
}

// Open & close drawer
document.getElementById("cart").addEventListener("click", () => {
  cartDrawer.classList.remove("translate-x-full");
});
document.getElementById("close-cart").addEventListener("click", () => {
  cartDrawer.classList.add("translate-x-full");
});

