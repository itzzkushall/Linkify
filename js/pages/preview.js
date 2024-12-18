// Preview Page Module
const PreviewPage = {
    init() {
        this.applyTheme();
        this.applyButtonStyles();
        this.applyAnimations();
    },

    applyTheme() {
        const userId = window.location.hash.includes('/u/') 
            ? window.location.hash.split('/u/')[1]
            : auth.currentUser.id;
            
        const theme = storage.getTheme(userId);
        const previewContainer = document.querySelector('.preview-container');
        
        if (previewContainer) {
            previewContainer.style.backgroundColor = theme.background;
            previewContainer.style.color = theme.text;
            document.body.style.fontFamily = theme.fontFamily || 'Inter';
            
            // Apply button styles
            const links = document.querySelectorAll('.preview-link');
            links.forEach(link => {
                link.dataset.style = theme.buttonStyle || 'rounded';
                link.style.borderColor = theme.accent;
            });
        }
    },

    applyButtonStyles() {
        const userId = window.location.hash.includes('/u/') 
            ? window.location.hash.split('/u/')[1]
            : auth.currentUser.id;
        const theme = storage.getTheme(userId);
        
        const links = document.querySelectorAll('.preview-link');
        links.forEach(link => {
            link.dataset.style = theme.buttonStyle || 'rounded';
        });
    },

    applyAnimations() {
        const userId = window.location.hash.includes('/u/') 
            ? window.location.hash.split('/u/')[1]
            : auth.currentUser.id;
        const theme = storage.getTheme(userId);
        
        const links = document.querySelectorAll('.preview-link');
        links.forEach(link => {
            link.style.animation = `${theme.animation || 'fade'} 0.3s ease`;
        });
    },

    render() {
        const userId = window.location.hash.includes('/u/') 
            ? window.location.hash.split('/u/')[1]
            : auth.currentUser.id;
            
        const profile = storage.getProfile(userId);
        const links = storage.getLinks(userId);
        const theme = storage.getTheme(userId);

        return `
            <div class="preview-container">
                <div class="preview-profile">
                    <img src="${profile.avatar}" alt="Profile" class="preview-avatar">
                    <h2 class="preview-name">${profile.username}</h2>
                    ${profile.bio ? `<p class="preview-bio">${profile.bio}</p>` : ''}
                </div>
                
                <div class="preview-links">
                    ${links.map(link => `
                        <a href="${link.url}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="preview-link"
                           data-style="${theme.buttonStyle || 'rounded'}">
                            <i class="${link.icon}"></i>
                            <span>${link.title}</span>
                        </a>
                    `).join('')}
                </div>
                
                ${auth.currentUser && auth.currentUser.id === userId ? `
                    <div class="preview-actions">
                        <button class="btn" onclick="app.navigate('/dashboard')">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }
};