const products = [
  { id: 1, item: "Keyboard", price: 1099, qty: 1 },
  { id: 2, item: "Mouse", price: 645, qty: 1 },
  { id: 3, item: "Headphones", price: 2599, qty: 1 },
  { id: 4, item: "Earbuds", price: 199, qty: 1 },
  { id: 5, item: "Smart Watch", price: 5999, qty: 1 },
];

let cart = [];

function handleCartEvent(id) {
  const isInCart = handleCartDuplicates(id);

  if (isInCart) {
    console.log("item already exists");
  } else {
    handleAddCart(id);
  }
}

function handleAddCart(id) {
  const addedItem = products.find((product) => {
    return product.id === id;
  });

  cart.push(addedItem);
}

function handleCartDuplicates(id) {
  const isInCart = cart.find((item) => {
    return item.id === id;
  });
  return isInCart;
}

function increaseQty(id) {
  cart.forEach((item) => {
    if (item.id === id) {
      item.qty++;
      item.price *= 2;
    }
  });
}

function decreaseQty(id) {
  cart.forEach((item) => {
    if (item.id === id) {
      item.qty--;
      item.price /= 2;
    }
  });
}

function calculateTotal() {
  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  return totalAmount;
}

function removeItem(id) {
  cart = cart.filter((item) => {
    return item.id !== id;
  });
}

handleCartEvent(4);
handleCartEvent(5);
handleCartEvent(1);

console.log(cart);
console.log(calculateTotal());

console.log("Hi");
