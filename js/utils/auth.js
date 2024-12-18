// Authentication Service
const auth = {
    currentUser: null,
    
    init() {
        try {
            this.currentUser = storage.get('currentUser');
            if (this.currentUser) {
                // Validate stored user data
                const users = storage.get('users') || [];
                const userExists = users.some(u => u.id === this.currentUser.id);
                if (!userExists) {
                    this.logout();
                }
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            this.logout();
        }
    },
    
    login(email, password) {
        try {
            const users = storage.get('users') || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                this.currentUser = {
                    id: user.id,
                    email: user.email,
                    username: user.username
                };
                storage.set('currentUser', this.currentUser);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    },
    
    register(username, email, password) {
        try {
            const users = storage.get('users') || [];
            
            if (users.some(u => u.email === email)) {
                return false;
            }
            
            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                password
            };
            
            users.push(newUser);
            storage.set('users', users);
            
            // Initialize user profile
            storage.setProfile(newUser.id, {
                username: newUser.username,
                bio: '',
                avatar: 'https://via.placeholder.com/150',
                socialLinks: []
            });
            
            return true;
        } catch (error) {
            console.error('Error during registration:', error);
            return false;
        }
    },
    
    logout() {
        this.currentUser = null;
        storage.remove('currentUser');
    },
    
    isAuthenticated() {
        return !!this.currentUser;
    }
};