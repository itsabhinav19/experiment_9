let productList = [];
let idCounter = 1;

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  const newProduct = {
    id: idCounter++,
    name,
    price,
    quantity,
  };

  productList.push(newProduct);
  displayProducts();
  this.reset();
});

function displayProducts() {
  const tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = "";

  productList.forEach((product) => {
    const total = product.price * product.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>${total.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteProduct(id) {
  productList = productList.filter((p) => p.id !== id);
  displayProducts();
}