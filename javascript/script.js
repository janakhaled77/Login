document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');
    const registerErrorMessage = document.getElementById('register-error-message');
    const loginBtn = document.getElementById('loginBtn');
    const loginErrorMessage = document.getElementById('login-error-message');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!name || !email || !password) {
                registerErrorMessage.textContent = 'All fields are required.';
                return;
            }
            if (!email.includes('@')) {
                registerErrorMessage.textContent = 'Invalid email format.';
                return;
            }
            if (users.find(user => user.email === email)) {
                registerErrorMessage.textContent = 'Email already exists. Please use another email.';
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = 'index.html';
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                loginErrorMessage.textContent = 'All fields are required.';
                return;
            }
            if (!email.includes('@')) {
                loginErrorMessage.textContent = 'Invalid email format.';
                return;
            }
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                loginErrorMessage.textContent = 'Invalid email or password.';
            }
        });
    }

    const username = document.getElementById('username');
    if (username) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            window.location.href = 'index.html';
        } else {
            username.textContent = `Welcome ${loggedInUser.name}`;
        }
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }

    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    if (logoutBtn) {
        logoutBtn.classList.add('w-100'); 
    }
    function showNavbar() {
        navbarCollapse.classList.add('show');
    }
    function hideNavbar() {
        navbarCollapse.classList.remove('show');
    }
   
});