// Navbar Component
const Navbar = {
    render() {
        const isAuthenticated = auth.isAuthenticated();
        const username = isAuthenticated ? auth.currentUser.username : '';
        
        return `
            <nav class="navbar">
                <div class="navbar-content">
                    <div class="navbar-brand">
                        <h1>Linkify</h1>
                    </div>
                    ${isAuthenticated ? `
                        <div class="navbar-user">
                            <span>Welcome, ${username}</span>
                            <div class="navbar-actions">
                                <button class="btn btn-outline" onclick="app.navigate('/dashboard')">
                                    <i class="fas fa-th-large"></i> Dashboard
                                </button>
                                <button class="btn" onclick="app.logout()">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </nav>
        `;
    }
};