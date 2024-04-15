const inventory = [
  { sku: "001", name: "Snickers", quantity: 50, price: 1.50 },
  { sku: "002", name: "KitKat", quantity: 50, price: 1.25 },
  // Add other inventory items here
];

function displayInventory() {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price}`;
      inventoryList.appendChild(li);
  });
}

function recordSale(event) {
  event.preventDefault(); // Prevent the default form submission
  
  const skuInput = document.getElementById("sku");
  const quantityInput = document.getElementById("quantity");
  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");
  
  const sku = skuInput.value;
  const quantitySold = parseInt(quantityInput.value);
  const startTime = new Date(startTimeInput.value).toLocaleString();
  const endTime = new Date(endTimeInput.value).toLocaleString();

  // Find the inventory item by SKU
  const item = inventory.find(item => item.sku === sku);
  if (!item) {
      alert("Invalid SKU");
      return;
  }

  // Check if there is enough quantity
  if (quantitySold > item.quantity) {
      alert("Not enough quantity in stock");
      return;
  }

  // Record sale with timestamps
  const saleRecord = {
      sku: item.sku,
      name: item.name,
      quantitySold,
      startTime,
      endTime
  };
  console.log("Sale recorded:", saleRecord);

  // Update inventory
  item.quantity -= quantitySold;
  displayInventory();
  // Reset input fields
  skuInput.value = "";
  quantityInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
}

// Initial display of inventory
displayInventory();

document.getElementById("salesReportForm").addEventListener("submit", recordSale);

document.getElementById("left-button").addEventListener("click", function () {
  window.location.href = "main.html"; 
});

document.getElementById("right-button").addEventListener("click", function () {
  window.location.href = "about:blank"; 
});
