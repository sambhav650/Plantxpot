document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    
    function updateCart() {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            let li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItemsList.appendChild(li);
        });
        cartCount.textContent = cart.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            let product = event.target.closest('.product-item');
            let productName = product.querySelector('h3').textContent;
            let productPrice = product.querySelector('p').textContent.replace('$', '');

            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    document.getElementById('cart-icon').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('search-bar').addEventListener('input', event => {
        let searchValue = event.target.value.toLowerCase();
        document.querySelectorAll('.product-item').forEach(item => {
            let name = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = name.includes(searchValue) ? 'block' : 'none';
        });
    });

    document.getElementById('filter-category').addEventListener('change', event => {
        let category = event.target.value;
        document.querySelectorAll('.product-item').forEach(item => {
            let itemCategory = item.getAttribute('data-category');
            item.style.display = category === 'all' || itemCategory === category ? 'block' : 'none';
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const closeButtons = document.querySelectorAll(".close");
    const submitLogin = document.getElementById("submit-login");
    const submitRegister = document.getElementById("submit-register");
    const registerLink = document.getElementById("register-link");

    // Check if user is already logged in
    if (localStorage.getItem("loggedInUser")) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    }

    // Show login modal
    loginBtn.addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    // Show register modal
    registerLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginModal.style.display = "none";
        registerModal.style.display = "block";
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            loginModal.style.display = "none";
            registerModal.style.display = "none";
        });
    });

    // Register new user
    submitRegister.addEventListener("click", function () {
        const newUsername = document.getElementById("new-username").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();

        if (newUsername === "" || newPassword === "") {
            alert("Please enter a username and password.");
            return;
        }

        // Save user in localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === newUsername)) {
            alert("Username already exists!");
            return;
        }

        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please login.");

        registerModal.style.display = "none";
        loginModal.style.display = "block";
    });

    // Login user
    submitLogin.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            localStorage.setItem("loggedInUser", username);
            alert("Login successful!");
            loginModal.style.display = "none";
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        } else {
            alert("Invalid username or password!");
        }
    });

    // Logout user
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check and apply saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});