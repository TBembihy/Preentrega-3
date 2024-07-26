let cart = JSON.parse(localStorage.getItem('cart')) || [];

function handleAddToCart() {
  const productName = document.getElementById('productName').value;
  const productSize = document.getElementById('productSize').value;
  const productPrice = document.getElementById('productPrice').value;

  if (productName && productSize && productPrice) {
    const product = {
      name: productName,
      size: productSize,
      price: productPrice
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItems();
    document.getElementById('productName').value = '';
    document.getElementById('productSize').value = '';
    document.getElementById('productPrice').value = '';
  }
}

function updateCartItems() {
  const savedItemsDiv = document.getElementById('savedItems');
  savedItemsDiv.innerHTML = '<h3>Productos en el Carrito:</h3><ul>';

  cart.forEach((product, index) => {
    savedItemsDiv.innerHTML += `
      <li>
        ${product.name} - ${product.size} - ${product.price}
        <button onclick="removeItem(${index})">Remove</button>
      </li>
    `;
  });

  savedItemsDiv.innerHTML += '</ul>';
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItems();
}

function handlePay() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const buyerNameInput = document.getElementById('buyerName');
  const buyerName = buyerNameInput.value;

  if (!buyerName) {
    alert('Please enter your name!');
    return;
  }

  let total = 0;
  cart.forEach((product) => {
    total += parseFloat(product.price);
  });

  updateTotal(formatTotal(total));
  alert(`Payment successful! Total: ${formatTotal(total)}`);

  // Reset the cart
  localStorage.removeItem('cart');
  cart = [];
  updateCartItems();
  buyerNameInput.value = '';
}

function formatTotal(amount) {
  return `$${amount.toFixed(2)}`;
}

function updateTotal(total) {
  const totalDiv = document.getElementById('total');
  totalDiv.innerHTML = `<p>${total}</p>`;
}

document.getElementById('addButton').addEventListener('click', handleAddToCart);
document.getElementById('payButton').addEventListener('click', handlePay);