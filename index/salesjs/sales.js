import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
  fetchSalesData();
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
      alert("Sale recorded successfully");
      fetchSalesData();
    })
    .catch(error => {
      alert("Error recording sale. Please try again.");
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

const restockedItems = new Set();


// Keep track of already restocked items
/*function fetchSalesData() {
  const salesRef = ref(database, 'sales');
  onValue(salesRef, (snapshot) => {
      const salesData = snapshot.val();
      if (salesData) {
          // Iterate through the sales data
          Object.values(salesData).forEach(saleRecord => {
              const item = inventory.find(item => item.sku === saleRecord.sku);
              if (item && !restockedItems.has(item.sku)) {
                  // Check if the quantity sold falls within the range for automatic restocking
                  if (saleRecord.quantitySold >= 7 && saleRecord.quantitySold <= 50) {
                      // Perform automatic restocking by setting the quantity to 50
                      item.quantity = 50;
                      alert(`Automatically restocked ${item.name} to 50 items.`);
                      // Update inventory in the database
                      updateInventoryInDatabase(item);
                      // Add the item to the set of restocked items
                      restockedItems.add(item.sku);
                  }
              }
          });
          // Update the display after restocking
          //displayInventory();
      }
  });
}*/

const restockInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let lastRestockTime = 0;

function fetchSalesData() {
  const currentTime = new Date().getTime();
  // Check if enough time has passed since the last restock
  if (currentTime - lastRestockTime >= restockInterval) {
    const salesRef = ref(database, 'sales');
    onValue(salesRef, (snapshot) => {
        const salesData = snapshot.val();
        if (salesData) {
            // Iterate through the sales data
            Object.values(salesData).forEach(saleRecord => {
                const item = inventory.find(item => item.sku === saleRecord.sku);
                if (item && !restockedItems.has(item.sku)) {
                    // Check if the quantity sold falls within the range for automatic restocking
                    if (saleRecord.quantitySold >= 7 && saleRecord.quantitySold <= 50) {
                        // Perform automatic restocking by setting the quantity to 50
                        item.quantity = 50;
                        //console.log
                        alert(`Automatically restocked ${item.name} to 50 items.`);
                        // Update inventory in the database
                        updateInventoryInDatabase(item);
                        // Add the item to the set of restocked items
                        restockedItems.add(item.sku);
                    }
                }
            });
            // Update the last restock time
            lastRestockTime = currentTime;
        }
    });
  }
}



// Function to update inventory in the database
function updateInventoryInDatabase(item) {
  const itemRef = ref(database, `inventory/${item.sku}`);
  set(itemRef, item)
      .then(() => {
          console.log(`${item.name} inventory updated in database`);
      })
      .catch(error => {
          console.error("Error updating inventory in database: ", error);
      });
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



























