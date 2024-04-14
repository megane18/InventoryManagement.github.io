let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);




  function goToSignUpPage() {
    window.location.href = 'index.html';
  }



  // JavaScript to handle the exit button
  document.getElementById("exitButton").addEventListener("click", function () {
    window.location.href = "about:blank"; // Opens a blank page, effectively exiting the website
    // Alternatively, you can use window.close() to close the current tab/window
    // window.close();
  });

