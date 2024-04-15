import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://inventory-management-e7294-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const inventoryRef = ref(database, "inventory")

const inventory = [
  { sku: "001", name: "Snickers", quantity: 50, price: 1.50 },
  { sku: "002", name: "KitKat", quantity: 50, price: 1.25 },
  { sku: "003", name: "Reese", quantity: 50, price: 1.75 },
  { sku: "004", name: "Twix", quantity: 50, price: 1.50 },
  { sku: "005", name: "M&M's", quantity: 50, price: 1.00 },
  { sku: "006", name: "Skittles", quantity: 50, price: 1.00 },
  { sku: "007", name: "Hershey's", quantity: 50, price: 1.25 },
  { sku: "008", name: "Milky Way", quantity: 50, price: 1.50 }
];

function addInventoryToDatabase(){
  inventory.forEach(item => {
  push(inventoryRef, item)
    .then(() => {
      console.log("Inventory item added successfully");
    })
    .catch(error => {
      console.error("Error adding inventory item: ", error);
    });
});
}

// Check if inventory exists in the database, if not, add it
function invt(){
  ref(database, "inventory").once("value", snapshot => {
  if (!snapshot.exists()) {
    addInventoryToDatabase();
}
});
}


function displayInventory() {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`;
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
  // Push the sale record to the database
  push(ref(database, "sales"), saleRecord)
    .then(() => {
      console.log("Sale recorded successfully");
    })
    .catch(error => {
      console.error("Error recording sale: ", error);
    });

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



















































/*const inventory = [
  { sku: "001", name: "Snickers", quantity: 50, price: 1.50 },
  { sku: "002", name: "KitKat", quantity: 50, price: 1.25 },
  { sku: "003", name: "Reese", quantity: 50, price: 1.75 },
  { sku: "004", name: "Twix", quantity: 50, price: 1.50 },
  { sku: "005", name: "M&M's", quantity: 50, price: 1.00 },
  { sku: "006", name: "Skittles", quantity: 50, price: (1.00) },
  { sku: "007", name: "Hershey's", quantity: 50, price: 1.25 },
  { sku: "008", name: "Milky Way", quantity: 50, price: 1.50 }

  // Add other inventory items here  inventory[0] = new InventoryItem("001", "Snickers", 50, 1.50);
        /*
        
        inventory[8] = new InventoryItem("009", "Starburst", 50, 1.00);
        inventory[9] = new InventoryItem("010", "Jolly Rancher", 50, 0.75);*/
/*];

function displayInventory() {

  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`;
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
});*/
