
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://inventory-management-e7294-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const inventory = [
    { sku: "001", name: "Snickers", quantity: 50, price: 1.50 },
    { sku: "002", name: "KitKat", quantity: 50, price: 1.25 },
    { sku: "003", name: "Reese's", quantity: 50, price: 1.75 },
    { sku: "004", name: "Twix", quantity: 50, price: 1.50 },
    { sku: "005", name: "M&M's", quantity: 50, price: 1.00 },
    { sku: "006", name: "Skittles", quantity: 50, price: 1.00 },
    { sku: "007", name: "Hershey's", quantity: 50, price: 1.25 },
    { sku: "008", name: "Milky Way", quantity: 50, price: 1.50 },
    { sku: "009", name: "Starburst", quantity: 50, price: 1.00 },
    { sku: "010", name: "Jolly Rancher", quantity: 50, price: 0.75 }
];

function fetchSalesFromFirebase() {
    return new Promise((resolve, reject) => {
        const salesRef = ref(database, "sales");
        onValue(salesRef, (snapshot) => {
            const salesData = snapshot.val();
            resolve(salesData ? Object.values(salesData) : []);
        }, {
            onlyOnce: true,
            error(error) {
                reject(error);
            }
        });
    });
}

async function generateReport() {
  const reportList = document.getElementById("report-list");
  const totalSalesElement = document.getElementById("total-sales");
  let totalSales = 0;

  try {
      const sales = await fetchSalesFromFirebase();

      sales.forEach(sale => {
          const item = inventory.find(item => item.sku === sale.sku);
          if (item) {
              const totalPrice = sale.quantitySold * item.price;
              totalSales += totalPrice;
              const listItem = document.createElement("li");
              listItem.textContent = `${item.name} - Quantity Sold: ${sale.quantitySold} - Total Price: $${totalPrice.toFixed(2)} - Time: ${sale['startTime']}`;
              reportList.appendChild(listItem);
          }
      });

      totalSalesElement.textContent = `$${totalSales.toFixed(2)}`;
      //downloadReport();
  } catch (error) {
      console.error("Error fetching sales data:", error);
  }
}

// Call generateReport when the page loads
generateReport();


function downloadReport() {
  const name = "Megane Alexis"; // my name
  const email = "meganealexis12@gmail.com"; // my email
  const date = new Date().toLocaleString();

  const reportData = [
      `Created by ${name}`,
      `Email: ${email}`,
      `Date and Time of Download: ${date}`,
      ''
  ];

  // Loop through the displayed report list and push each item's text content to reportData
  const reportListItems = document.querySelectorAll("#report-list li");
  reportListItems.forEach(item => {
      reportData.push(item.textContent);
  });

  // Join the report data with newline characters
  const reportText = reportData.join('\n');

  // Create a blob containing the report text
  const blob = new Blob([reportText], { type: 'text/plain' });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sales_report.txt';

  //just added
  document.body.appendChild(a);

  // Programmatically trigger the click event on the link to start the download
  a.click();

  // Clean up by removing the link and revoking the URL
  URL.revokeObjectURL(url);

  // Show thank you alert
  alert("Thank you!");
}

document.getElementById("download-button").addEventListener("click", downloadReport);


// Generate the report when the page loads
//generateReport();
//generateReport().then(downloadReport);

function goToMain(){
  window.location.href = 'sales.html';
} 


document.getElementById("left-button").addEventListener("click", function () {
  window.location.href = "main.html"; 
});

document.getElementById("right-button").addEventListener("click", function () {
  window.location.href = "about:blank"; 
});
