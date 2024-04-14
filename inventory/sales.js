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
  
  function recordSale() {
    const skuInput = document.getElementById("sku");
    const quantityInput = document.getElementById("quantity");
    const sku = skuInput.value;
    const quantitySold = parseInt(quantityInput.value);
  
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
  
    // Record sale
    const timestamp = new Date().toLocaleString();
    const saleRecord = {
      sku: item.sku,
      name: item.name,
      quantitySold,
      timestamp
    };
    console.log("Sale recorded:", saleRecord);
  
    // Update inventory
    item.quantity -= quantitySold;
    displayInventory();
  
    // Reset input fields
    skuInput.value = "";
    quantityInput.value = "";
  }
  
  // Initial display of inventory
  displayInventory();
  