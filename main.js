//Fetching DOM for necessary elements
const addProductButtons = document.querySelectorAll(".add-to-cart-btn");
const cartList = document.getElementById("cart-items-list");
const totalPriceDisplay = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-btn");

let cart = [];

//Creating the items
function createCartItemHTML(item, index) {
  const itemSubtotal = (item.price * item.quantity).toFixed(2);
  return `
    <div class="cart-item-info">
      <img src="${item.image}" class="cart-item-image" alt="${item.name}">
      <div>
        <p>${item.name}</p>
        <p>$${item.price.toFixed(2)}</p>
      </div>
    </div>

    <div class="cart-item-controls">
      <button class="remove-btn" data-index="${index}">Remove</button>

      <div class="quantity-controls">
        <button class="decrement-btn" data-index="${index}">−</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="increment-btn" data-index="${index}">+</button>
      </div>
      
      <span style="color: #f32821; font-weight: bold; min-width: 70px; text-align: right;">$${itemSubtotal}</span>
    </div>
  `;
}

//Updating the total price display
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}

// Displaying the cart
function displayCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItemHTML = createCartItemHTML(item, index);
    const cartItemElement = document.createElement("li");
    cartItemElement.innerHTML = cartItemHTML;
    cartList.appendChild(cartItemElement);
  });
  attachCartButtonListeners();
  updateCartTotal();
}

// Event listeners for checking out and adding products to the cart
addProductButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});
checkoutButton.addEventListener("click", handleCheckout);

function addToCart(e) {
  const productCard = e.target.parentElement;
  const productImage = productCard.querySelector("img").src;
  const productName = productCard
    .querySelector(".product-name")
    .textContent.trim();
  const productPrice = productCard
    .querySelector(".product-price")
    .textContent.trim();

  addItemToCart(productImage, productName, productPrice);
}

function addItemToCart(image, name, price) {
  const numericPrice = parseFloat(price.replace("$", ""));
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      image,
      name,
      price: numericPrice,
      quantity: 1,
    });
  }
  displayCart();
}

//Updating item quantity
function updateItemQuantity(itemIndex, newQuantity) {
  if (newQuantity <= 0) {
    removeItemFromCart(itemIndex);
  } else {
    cart[itemIndex].quantity = newQuantity;
    displayCart();
  }
}

function attachCartButtonListeners() {
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = parseInt(event.target.getAttribute("data-index"));
      updateItemQuantity(itemIndex, 0);
    });
  });

  document.querySelectorAll(".increment-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = parseInt(event.target.getAttribute("data-index"));
      const newQuantity = cart[itemIndex].quantity + 1;
      updateItemQuantity(itemIndex, newQuantity);
    });
  });

  document.querySelectorAll(".decrement-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = parseInt(event.target.getAttribute("data-index"));
      const newQuantity = cart[itemIndex].quantity - 1;
      updateItemQuantity(itemIndex, newQuantity);
    });
  });
}

// Handling the checkout process
function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(
    `Processing payment of $${total.toFixed(2)}.\n\nThank you for your purchase!`,
  );
  cart = [];
  displayCart();
}
