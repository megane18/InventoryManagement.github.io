document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform form validation
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    localStorage.setItem('username', username);
    //localStorage.setItem('name', name);
  
    // Redirect to main page (replace 'main.html' with your actual main page URL)
    window.location.href = 'main.html';
  });

  
  