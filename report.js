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
  
  const sales = [
    { sku: "001", quantitySold: 25, timestamp: "2024-03-15 10:30:00" },
    { sku: "002", quantitySold: 20, timestamp: "2024-03-20 14:45:00" },
    //not finished
  ];
  
  function generateReport() {
    const reportList = document.getElementById("report-list");
    const totalSalesElement = document.getElementById("total-sales");
    let totalSales = 0;
  
    inventory.forEach(item => {
      const salesRecord = sales.find(record => record.sku === item.sku);
      if (salesRecord && salesRecord.quantitySold >= 20) {
        const totalPrice = salesRecord.quantitySold * item.price;
        totalSales += totalPrice;
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - Quantity Sold: ${salesRecord.quantitySold} - Total Price: $${totalPrice.toFixed(2)}`;
        reportList.appendChild(listItem);
      }
    });
  
    totalSalesElement.textContent = `$${totalSales.toFixed(2)}`;
  }
  
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
  
    inventory.forEach(item => {
      const salesRecord = sales.find(record => record.sku === item.sku);
      if (salesRecord && salesRecord.quantitySold >= 20) {
        const totalPrice = salesRecord.quantitySold * item.price;
        reportData.push(`${item.name} - Quantity Sold: ${salesRecord.quantitySold} - Total Price: $${totalPrice.toFixed(2)}`);
      }
    });
  
    const blob = new Blob([reportData.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  
    // Show thank you alert
    alert("Thank you!");
  }
  
  // Generate the report when the page loads
  generateReport();
  