// Storage Utility
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    },
    
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    },
    
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    },

    // Profile Management
    setProfile(userId, profile) {
        this.set(`profile_${userId}`, profile);
    },

    getProfile(userId) {
        return this.get(`profile_${userId}`) || {
            username: '',
            bio: '',
            avatar: 'https://via.placeholder.com/150',
            socialLinks: []
        };
    },

    // Link Management
    getLinks(userId) {
        return this.get(`links_${userId}`) || [];
    },

    setLinks(userId, links) {
        this.set(`links_${userId}`, links);
    },

    addLink(userId, link) {
        const links = this.getLinks(userId);
        links.push({ ...link, id: Date.now().toString() });
        this.setLinks(userId, links);
    },

    updateLink(userId, linkId, updatedLink) {
        const links = this.getLinks(userId);
        const index = links.findIndex(link => link.id === linkId);
        if (index !== -1) {
            links[index] = { ...links[index], ...updatedLink };
            this.setLinks(userId, links);
        }
    },

    deleteLink(userId, linkId) {
        const links = this.getLinks(userId);
        const updatedLinks = links.filter(link => link.id !== linkId);
        this.setLinks(userId, updatedLinks);
    },

    // Theme Management
    setTheme(userId, theme) {
        this.set(`theme_${userId}`, theme);
    },

    getTheme(userId) {
        return this.get(`theme_${userId}`) || {
            background: '#ffffff',
            text: '#000000',
            accent: '#0066ff'
        };
    },

    // Shareable Link Generation
    getShareableLink(userId) {
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}#/u/${userId}`;
    }
};