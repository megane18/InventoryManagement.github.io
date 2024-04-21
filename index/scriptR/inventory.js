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

document.addEventListener("DOMContentLoaded", function() {
    const inventoryList = document.getElementById("inventory-list");
    inventory.forEach(item => {
        const li = createListItem(item);
        inventoryList.appendChild(li);
    });
});

function createListItem(item) {
    const li = document.createElement("li");
    li.id = `item-${item.sku}`;
    li.innerHTML = `
        <div>Name: <input type="text" value="${item.name}" id="name-${item.sku}"></div>
        <div>Quantity: <input type="number" value="${item.quantity}" id="quantity-${item.sku}"></div>
        <div>Price: <input type="number" value="${item.price}" step="0.01" id="price-${item.sku}"></div>
        <button onclick="updateItem('${item.sku}')">Update</button>
        <button onclick="removeItem('${item.sku}')">Remove</button>
        <button onclick="restoreItem('${item.sku}')">Restore</button>
    `;
    return li;
}

function updateItem(sku) {
    const nameInput = document.getElementById(`name-${sku}`);
    const quantityInput = document.getElementById(`quantity-${sku}`);
    const priceInput = document.getElementById(`price-${sku}`);

    const newName = nameInput.value;
    const newQuantity = parseInt(quantityInput.value);
    const newPrice = parseFloat(priceInput.value);

    // Find the item in the inventory array
    const itemIndex = inventory.findIndex(item => item.sku === sku);
    if (itemIndex !== -1) {
        // Update the item properties
        inventory[itemIndex].name = newName;
        inventory[itemIndex].quantity = newQuantity;
        inventory[itemIndex].price = newPrice;

        // Show alert or perform further actions as needed
        alert("Item updated successfully.");
        console.log("Updated inventory:", inventory);
    } else {
        console.error("Item not found in inventory.");
    }
}

function removeItem(sku) {
    // Find the item in the inventory array
    const itemIndex = inventory.findIndex(item => item.sku === sku);
    if (itemIndex !== -1) {
        // Hide the item by setting its display property to "none"
        const listItem = document.getElementById(`item-${sku}`);
        if (listItem) {
            listItem.style.display = "none";
        }
    } else {
        console.error("Item not found in inventory.");
    }
}

function restoreItem(sku) {
    // Show the item by setting its display property to "block"
    const listItem = document.getElementById(`item-${sku}`);
    if (listItem) {
        listItem.style.display = "block";
    } else {
        console.error("Item not found in inventory.");
    }
}

function goToMain() {
    window.location.href = "main.html"; 
}

function exit() {
    window.location.href = "about:blank"; 
}
