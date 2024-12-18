// Dashboard Page Module
const DashboardPage = {
    init() {
        this.setupEventListeners();
        this.loadUserData();
    },

    setupEventListeners() {
        // Profile image upload
        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            avatarInput.addEventListener('change', this.handleAvatarUpload);
        }

        // Add link form
        const addLinkForm = document.getElementById('add-link-form');
        if (addLinkForm) {
            addLinkForm.addEventListener('submit', this.handleAddLink);
        }
    },

    loadUserData() {
        const userId = auth.currentUser.id;
        const profile = storage.getProfile(userId);
        const links = storage.getLinks(userId);

        // Update profile preview if it exists
        const avatarPreview = document.getElementById('preview-avatar');
        if (avatarPreview) {
            avatarPreview.src = profile.avatar;
        }

        // Update links list
        this.renderLinksList(links);
    },

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const userId = auth.currentUser.id;
                const profile = storage.getProfile(userId);
                profile.avatar = e.target.result;
                storage.setProfile(userId, profile);
                
                // Update preview
                const avatarPreview = document.getElementById('preview-avatar');
                if (avatarPreview) {
                    avatarPreview.src = e.target.result;
                }
                Toast.show('Profile picture updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    },

    handleAddLink(e) {
        e.preventDefault();
        const title = document.getElementById('link-title').value;
        const url = document.getElementById('link-url').value;
        const icon = document.getElementById('link-icon').value;

        if (!title || !url) {
            Toast.show('Please fill in all fields', 'error');
            return;
        }

        const userId = auth.currentUser.id;
        storage.addLink(userId, { title, url, icon });
        
        // Reset form
        e.target.reset();
        
        // Refresh links list
        const links = storage.getLinks(userId);
        DashboardPage.renderLinksList(links);
        
        Toast.show('Link added successfully!');
    },

    handleDeleteLink(linkId) {
        if (confirm('Are you sure you want to delete this link?')) {
            const userId = auth.currentUser.id;
            storage.deleteLink(userId, linkId);
            
            // Refresh links list
            const links = storage.getLinks(userId);
            this.renderLinksList(links);
            
            Toast.show('Link deleted successfully!');
        }
    },

    handleEditLink(linkId) {
        const userId = auth.currentUser.id;
        const links = storage.getLinks(userId);
        const link = links.find(l => l.id === linkId);
        
        if (link) {
            document.getElementById('link-title').value = link.title;
            document.getElementById('link-url').value = link.url;
            document.getElementById('link-icon').value = link.icon;
            
            // Remove the old link
            storage.deleteLink(userId, linkId);
            
            // Refresh links list
            const updatedLinks = storage.getLinks(userId);
            this.renderLinksList(updatedLinks);
            
            // Scroll to form
            document.querySelector('.add-link-form').scrollIntoView({ behavior: 'smooth' });
        }
    },

    renderLinksList(links) {
        const linksContainer = document.getElementById('links-list');
        if (!linksContainer) return;

        if (links.length === 0) {
            linksContainer.innerHTML = `
                <div class="empty-links">
                    <i class="fas fa-link"></i>
                    <p>No links added yet</p>
                    <p>Add your first link above</p>
                </div>
            `;
            return;
        }

        linksContainer.innerHTML = links.map(link => `
            <div class="link-item" data-id="${link.id}">
                <div class="link-content">
                    <i class="${link.icon} link-icon"></i>
                    <div class="link-details">
                        <h4 class="link-title">${link.title}</h4>
                        <a href="${link.url}" target="_blank" class="link-url">${link.url}</a>
                    </div>
                </div>
                <div class="link-actions">
                    <button class="btn btn-icon" onclick="DashboardPage.handleEditLink('${link.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-icon btn-danger" onclick="DashboardPage.handleDeleteLink('${link.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    render() {
        const userId = auth.currentUser.id;
        const profile = storage.getProfile(userId);
        const shareableLink = storage.getShareableLink(userId);

        return `
            <div class="dashboard">
                <div class="dashboard-header">
                    <div class="dashboard-title-section">
                        <h2>Your Dashboard</h2>
                        <p>Manage your profile and links</p>
                    </div>
                    <div class="dashboard-actions">
                        <button class="btn btn-outline" onclick="app.navigate('/preview')">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                        <button class="btn" onclick="app.navigate('/customize')">
                            <i class="fas fa-paint-brush"></i> Customize
                        </button>
                    </div>
                </div>

                <div class="profile-section card">
                    <h3>Profile Settings</h3>
                    <div class="profile-content">
                        <div class="avatar-upload">
                            <img src="${profile.avatar}" alt="Profile" class="profile-image" id="preview-avatar">
                            <label for="avatar-input" class="avatar-upload-label">
                                <i class="fas fa-camera"></i>
                                Change Photo
                            </label>
                            <input type="file" id="avatar-input" accept="image/*" style="display: none;">
                        </div>
                        <div class="profile-form">
                            <div class="form-group">
                                <label for="profile-bio">Bio</label>
                                <textarea id="profile-bio" class="form-control" 
                                    placeholder="Tell your visitors about yourself"
                                    onchange="DashboardPage.handleBioUpdate(this.value)">${profile.bio || ''}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="share-section card">
                    <h3>Share Your Page</h3>
                    <p>Share your personalized link with your audience</p>
                    <div class="share-link">
                        <input type="text" class="form-control" value="${shareableLink}" readonly>
                        <button class="btn" onclick="DashboardPage.copyShareLink('${shareableLink}')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>

                <div class="links-section card">
                    <h3>Your Links</h3>
                    <form id="add-link-form" class="add-link-form" onsubmit="DashboardPage.handleAddLink(event)">
                        <div class="form-group">
                            <input type="text" id="link-title" class="form-control" placeholder="Link Title" required>
                        </div>
                        <div class="form-group">
                            <input type="url" id="link-url" class="form-control" placeholder="URL" required>
                        </div>
                        <div class="form-group">
                            <select id="link-icon" class="form-control">
                                <option value="fas fa-link">Default Link</option>
                                <option value="fab fa-twitter">Twitter</option>
                                <option value="fab fa-instagram">Instagram</option>
                                <option value="fab fa-youtube">YouTube</option>
                                <option value="fab fa-github">GitHub</option>
                                <option value="fab fa-linkedin">LinkedIn</option>
                                <option value="fab fa-tiktok">TikTok</option>
                                <option value="fab fa-discord">Discord</option>
                                <option value="fab fa-twitch">Twitch</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-block">
                            <i class="fas fa-plus"></i> Add Link
                        </button>
                    </form>
                    <div id="links-list" class="links-list"></div>
                </div>
            </div>
        `;
    },

    handleBioUpdate(bio) {
        const userId = auth.currentUser.id;
        const profile = storage.getProfile(userId);
        profile.bio = bio;
        storage.setProfile(userId, profile);
        Toast.show('Bio updated successfully!');
    },

    copyShareLink(link) {
        navigator.clipboard.writeText(link)
            .then(() => Toast.show('Link copied to clipboard!'))
            .catch(() => Toast.show('Failed to copy link', 'error'));
    }
};