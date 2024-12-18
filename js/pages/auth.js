// Authentication Page
const AuthPage = {
    init() {
        // Add any initialization logic here
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (loginForm && registerForm) {
            this.setupEventListeners();
        }
    },

    setupEventListeners() {
        document.getElementById('login-button')?.addEventListener('click', this.handleLogin);
        document.getElementById('register-button')?.addEventListener('click', this.handleRegister);
        document.getElementById('toggle-register')?.addEventListener('click', () => this.toggleForms('register'));
        document.getElementById('toggle-login')?.addEventListener('click', () => this.toggleForms('login'));
    },

    render() {
        return `
            <div class="auth-container">
                <h2>Welcome to Linkify</h2>
                <div class="auth-forms">
                    <div id="login-form">
                        <h3>Login</h3>
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" class="form-control" required>
                        </div>
                        <button id="login-button" class="btn btn-block">Login</button>
                        <p class="auth-switch">
                            Don't have an account? 
                            <a href="#" id="toggle-register">Register</a>
                        </p>
                    </div>
                    
                    <div id="register-form" style="display: none;">
                        <h3>Register</h3>
                        <div class="form-group">
                            <label for="register-username">Username</label>
                            <input type="text" id="register-username" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email</label>
                            <input type="email" id="register-email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Password</label>
                            <input type="password" id="register-password" class="form-control" required>
                        </div>
                        <button id="register-button" class="btn btn-block">Register</button>
                        <p class="auth-switch">
                            Already have an account? 
                            <a href="#" id="toggle-login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    toggleForms(form) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (form === 'register') {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    },

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            Toast.show('Please fill in all fields', 'error');
            return;
        }

        if (auth.login(email, password)) {
            Toast.show('Login successful!');
            app.navigate('/dashboard');
        } else {
            Toast.show('Invalid credentials!', 'error');
        }
    },

    handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (!username || !email || !password) {
            Toast.show('Please fill in all fields', 'error');
            return;
        }

        if (auth.register(username, email, password)) {
            Toast.show('Registration successful! Please login.');
            this.toggleForms('login');
        } else {
            Toast.show('Email already exists!', 'error');
        }
    }
};