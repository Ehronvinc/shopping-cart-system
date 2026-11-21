const productsContainer = document.querySelector(".main-container");
const addCartBtn = document.querySelector(".add-to-cart-btn");
const cartContainer = document.querySelector(".cart-container");
const checkoutBtn = document.querySelector(".checkout-btn");

const products = [
  { id: 1, item: "Keyboard", price: 1099, qty: 1, image: "img/keyboard.png" },
  { id: 2, item: "Earbuds", price: 199, qty: 1, image: "img/earbuds.png" },
  { id: 3, item: "Mouse", price: 645, qty: 1, image: "img/mouse.png" },
  {
    id: 4,
    item: "Smart Watch",
    price: 599,
    qty: 1,
    image: "img/smart-watch.png",
  },
  {
    id: 5,
    item: "Headphones",
    price: 951,
    qty: 1,
    image: "img/earphones.png",
  },
];

let cart = [];

function handleCartEvent(e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productCard = e.target.closest(".item");
    const productId = Number(productCard.dataset.id);
    const isInCart = handleCartDuplicates(productId);

    if (isInCart) {
      console.log("item already exists");
    } else {
      handleAddCart(productId);
      createCartCard(productId);
      renderSubTotal();
      renderTotal();
    }
  }
}

function handleAddCart(productId) {
  const addedItem = products.find((product) => {
    return product.id === productId;
  });

  cart.push(addedItem);
}

function handleCartDuplicates(productId) {
  const isInCart = cart.find((item) => {
    return item.id === productId;
  });
  return isInCart;
}

function createCartCard(productId) {
  const card = document.createElement("div");
  const leftCont = leftCardContainer(productId);
  const rightCont = rightCardContainer(productId);

  card.classList.add("cart-card");

  card.append(leftCont, rightCont);
  cartContainer.append(card);
}

// Left Container
function leftCardContainer(productId) {
  const leftOuterCont = document.createElement("div");
  const imageCont = createImagecont(productId);
  const productInfo = productDetails(productId);

  leftOuterCont.classList.add("left-outer-container");
  leftOuterCont.append(imageCont, productInfo);

  return leftOuterCont;
}

function productDetails(productId) {
  const leftCont = document.createElement("div");
  const productName = document.createElement("p");
  const quantityText = document.createElement("p");
  const quuantityBtns = createBtnCont(productId);

  leftCont.classList.add("left-container");
  productName.classList.add("cart-product-name");
  quantityText.classList.add("quantity-text");

  quantityText.textContent = "Quantity";
  cart.forEach((item) => {
    if (item.id === productId) {
      productName.textContent = item.item;
    }
  });

  leftCont.append(productName, quantityText, quuantityBtns);

  return leftCont;
}

function createImagecont(productId) {
  const imageCont = document.createElement("div");
  const image = document.createElement("img");

  imageCont.classList.add("image-container");
  image.classList.add("image");

  cart.forEach((item) => {
    if (item.id === productId) {
      image.src = item.image;
    }
  });

  imageCont.append(image);
  return imageCont;
}

function createBtnCont(productId) {
  const btnContainer = document.createElement("div");
  const decreaseBtn = createDecreaseBtn(productId);
  const increaseBtn = createIncreaseBtn(productId);
  const quantity = createQuantity(productId);

  btnContainer.classList.add("btn-container-qty");

  btnContainer.append(decreaseBtn, quantity, increaseBtn);

  return btnContainer;
}

function createDecreaseBtn(productId) {
  const decreaseBtn = document.createElement("button");
  decreaseBtn.classList.add("decrease-btn");

  decreaseBtn.textContent = "-";

  decreaseBtn.addEventListener("click", () => {
    decreaseQty(productId);
    renderSubTotal();
    renderTotal();
  });

  return decreaseBtn;
}

function createIncreaseBtn(productId) {
  const increaseBtn = document.createElement("button");
  increaseBtn.classList.add("increase-btn");

  increaseBtn.textContent = "+";

  increaseBtn.addEventListener("click", () => {
    increaseQty(productId);
    renderSubTotal();
    renderTotal();
  });

  return increaseBtn;
}

function createQuantity(productId) {
  const quantity = document.createElement("p");
  quantity.classList.add("quantity-counter");
  quantity.id = `quantity-${productId}`;

  quantity.textContent = 1;

  return quantity;
}

function renderQuantity(productId) {
  const quantity = cartContainer.querySelector(`#quantity-${productId}`);

  if (quantity) {
    cart.forEach((item) => {
      if (item.id === productId) {
        quantity.textContent = item.qty;
      }
    });
  }
}

function increaseQty(id) {
  cart.forEach((item) => {
    if (item.id === id) {
      item.qty++;
    }
  });

  renderQuantity(id);
}

function decreaseQty(id) {
  cart.forEach((item) => {
    if (item.id === id) {
      if (id > 0) {
        item.qty--;
      }
    }
  });

  renderQuantity(id);
}

// Right Container
function rightCardContainer(productId) {
  const rightCont = document.createElement("div");
  const productPrice = createPrice(productId);
  const removeBtn = createRemoveBtn(productId);

  rightCont.classList.add("right-container");
  rightCont.append(productPrice, removeBtn);

  return rightCont;
}

function createPrice(productId) {
  const productPrice = document.createElement("p");
  productPrice.classList.add("cart-product-price");
  productPrice.id = `product-${productId}`;

  cart.forEach((item) => {
    if (item.id === productId) {
      const price = item.price;
      const formattedPrice = price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      productPrice.textContent = `₱${formattedPrice}`;
    }
  });

  return productPrice;
}

function createRemoveBtn(productId) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", (e) => {
    removeItem(productId, e);
  });

  return removeBtn;
}

function removeItem(productId, e) {
  e.currentTarget.closest(".cart-card").remove();
  cart = cart.filter((item) => {
    return item.id !== productId;
  });

  renderSubTotal();
  renderTotal();
}

// Order Summary
function calculateSubTotal() {
  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);

  return totalAmount;
}

function renderSubTotal() {
  const subTotal = document.querySelector(".subtotal");
  const calculatedAmount = calculateSubTotal();
  const formattedAmount = `₱${calculatedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  subTotal.textContent = formattedAmount;
}

function renderTotal() {
  const total = document.querySelector(".total");
  const calculatedTotal = (total.textContent = `₱0.00`)
    ? calculateSubTotal()
    : calculateSubTotal() + 50;
  const formattedAmount = `₱${calculatedTotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  total.textContent = formattedAmount;
}

function checkout() {
  const card = cartContainer.querySelectorAll(".cart-card");
  cart = [];
  card.forEach((item) => {
    item.remove();
  });

  renderSubTotal();
  renderTotal();

  console.log("Checkout successful");
}

productsContainer.addEventListener("click", handleCartEvent);
checkoutBtn.addEventListener("click", checkout);
