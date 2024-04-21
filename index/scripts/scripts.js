let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);




  function goToSignUpPage() {
    window.location.href = 'index.html';
  }
  function reportPage() {
    window.location.href = 'report.html';
  }

  function salesPage(){
    window.location.href = 'sales.html';
  }
  



  // JavaScript to handle the exit button
  document.getElementById("exitButton").addEventListener("click", function () {
    window.location.href = "about:blank"; // Opens a blank page, effectively exiting the website
    // Alternatively, you can use window.close() to close the current tab/window
    // window.close();
  });
  document.getElementById("goback").addEventListener("click", function () {
    window.location.href = "index.html"; 
  });

  document.getElementById("icon-button-one").addEventListener("click", function () {
    window.location.href = "report.html"; 
  });
  document.getElementById("icon-button-two").addEventListener("click", function () {
    window.location.href = "sales.html"; 
  });
  document.getElementById('downloadBtn').addEventListener('click', function() {
    // Create a blob with the README content
    var readmeContent = 'Welcome to Our Website!\n\n' +
    'To access our website, you must be one of the four authorized admins. If you are not an admin and need access, please contact Megane Alexis at meganealexis14@gmail.com.\n\n' +
    'Upon signing up, you will receive an alert. Click "OK" to continue.\n\n' +
    'Main Page:\n' +
    '- About Button: Explains the purpose of our company and lists the admins and their roles.\n' +
    '- Dark/Light Mode: Toggles between dark and light themes.\n' +
    '- Record Sales Button: Records sales with SKU, quantity, and date. If sales are between 7-50, automatic restocking occurs and updates the database.\n' +
    '- Exit Buttons: Two buttons to exit the website.\n\n' +
    'Report Page:\n' +
    '- Enter Name and Email: Enter your name and email to download the sales report.\n' +
    '- Download Report Button: Fetches sales from the database and provides a file.txt with item details and timestamps.\n\n' +
    'Inventory Page:\n' +
    '- Update and Remove Items: Update or remove items from the database.\n\n' +
    'README Button: Provides instructions on how to use the website.\n\n' +
    'Enjoy using our website! If you have any questions or encounter any issues, please contact us at heavenlydelight12@gmail.com\n' +
    '__________________________________\n'+ 

    'CREATED BY ADMIN: MEGANE ALEXIS\n' +
    '__________________________________'
    
    ;
    var blob = new Blob([readmeContent], { type: 'text/plain' });

    // Create a link element
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'README.txt';

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the click event on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
});


  
 
 
