const API = "https://YOUR-LOAD-BALANCER-DNS/api/products"; // replace with your ALB DNS
const form = document.getElementById("form");
const list = document.getElementById("list");

async function fetchProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    list.innerHTML = data
      .map(p => `<li>${p.name} — $${p.price.toFixed(2)} 
                 <button data-id="${p.id}">Delete</button></li>`)
      .join("");
    document.querySelectorAll("button[data-id]").forEach(btn =>
      btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
    );
  } catch (e) {
    list.innerHTML = "<li>⚠ Error loading data</li>";
    console.error(e);
  }
}

async function addProduct(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  if (!name || isNaN(price)) return;
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });
  form.reset();
  fetchProducts();
}

async function deleteProduct(id) {
  await fetch(${API}/${id}, { method: "DELETE" });
  fetchProducts();
}

form.addEventListener("submit", addProduct);
fetchProducts();