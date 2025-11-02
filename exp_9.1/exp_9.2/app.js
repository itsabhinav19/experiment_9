// Attractive Product Dashboard (vanilla JS)
// Stores data in-memory (array). Replace with API calls when ready.

const state = {
  products: [],
  id: 1,
  deployStatus: "Idle"
};

// DOM refs
const form = document.getElementById("productForm");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const qtyEl = document.getElementById("qty");
const tableBody = document.querySelector("#table tbody");
const empty = document.getElementById("empty");
const deployBadge = document.getElementById("deployBadge");
const refreshBtn = document.getElementById("refresh");
const searchInput = document.getElementById("search");

// utils
function money(n){ return Number(n).toFixed(2); }
function setDeployStatus(s){ deployBadge.textContent = s; }

// initial
setDeployStatus("Ready");

// render
function render(){
  tableBody.innerHTML = "";
  const q = searchInput.value.trim().toLowerCase();
  const products = state.products.filter(p => p.name.toLowerCase().includes(q));
  if (products.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    products.forEach((p, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${p.name}</td>
        <td>$${money(p.price)}</td>
        <td>${p.qty}</td>
        <td>$${money(p.price * p.qty)}</td>
        <td><button class="delete" data-id="${p.id}">Delete</button></td>
      `;
      tableBody.appendChild(tr);
    });
  }
}

// add product
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameEl.value.trim();
  const price = parseFloat(priceEl.value);
  const qty = parseInt(qtyEl.value, 10);
  if (!name || isNaN(price) || isNaN(qty)) return;

  state.products.push({ id: state.id++, name, price, qty });
  form.reset();
  render();
});

// delete product - event delegation
tableBody.addEventListener("click", e => {
  if (e.target.matches(".delete")) {
    const id = Number(e.target.dataset.id);
    state.products = state.products.filter(p => p.id !== id);
    render();
  }
});

// refresh (simulate fetching / re-deploy status)
refreshBtn.addEventListener("click", () => {
  setDeployStatus("Checking...");
  // simulate async check
  setTimeout(() => {
    // random healthy/unhealthy for demo
    const ok = Math.random() > 0.15;
    setDeployStatus(ok ? "Deployed ✓" : "Failed ⚠");
  }, 900);
});

// search
searchInput.addEventListener("input", render);

// seed demo data
state.products.push({ id: state.id++, name: "Aurora Lamp", price: 24.99, qty: 12 });
state.products.push({ id: state.id++, name: "Nebula Mug", price: 12.5, qty: 8 });
state.products.push({ id: state.id++, name: "Orbit Speaker", price: 59.0, qty: 5 });
render();