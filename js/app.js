// Main Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Main Application
const app = {
    init() {
        auth.init();
        this.setupRouter();
        this.renderCurrentPage();
    },
    
    setupRouter() {
        window.addEventListener('hashchange', () => this.renderCurrentPage());
    },
    
    getCurrentRoute() {
        const hash = window.location.hash.slice(1) || '/';
        
        // Handle public profile routes
        if (hash.startsWith('/u/')) {
            return '/preview';
        }
        
        // Handle authentication
        if (!auth.isAuthenticated() && hash !== '/') {
            window.location.hash = '/';
            return '/';
        }
        
        return hash;
    },
    
    navigate(route) {
        window.location.hash = route;
    },
    
    renderCurrentPage() {
        const route = this.getCurrentRoute();
        const appElement = document.getElementById('app');
        
        if (!appElement) {
            console.error('App element not found!');
            return;
        }
        
        try {
            // Render navbar only if not in preview mode
            let content = !route.startsWith('/u/') ? Navbar.render() : '';
            
            // Render page content
            switch (route) {
                case '/':
                    content += AuthPage.render();
                    break;
                case '/dashboard':
                    content += DashboardPage.render();
                    break;
                case '/preview':
                    content += PreviewPage.render();
                    break;
                case '/customize':
                    content += CustomizePage.render();
                    break;
                default:
                    content += '<h1>404 - Page Not Found</h1>';
            }
            
            appElement.innerHTML = content;
            
            // Initialize page-specific scripts
            switch (route) {
                case '/':
                    AuthPage.init();
                    break;
                case '/dashboard':
                    DashboardPage.init();
                    break;
                case '/customize':
                    CustomizePage.init();
                    break;
                case '/preview':
                    PreviewPage.init();
                    break;
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            appElement.innerHTML = '<div class="error-message">Something went wrong. Please try again.</div>';
        }
    },
    
    logout() {
        auth.logout();
        this.navigate('/');
        Toast.show('Logged out successfully!');
    }
};