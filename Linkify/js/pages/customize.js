// Customize Page Module
const CustomizePage = {
    init() {
        this.setupColorPickers();
        this.loadCurrentTheme();
        this.setupFontPicker();
        this.setupLayoutOptions();
    },

    setupColorPickers() {
        const colorInputs = document.querySelectorAll('.color-picker');
        colorInputs.forEach(input => {
            input.addEventListener('input', () => this.handleThemeUpdate()); // Changed from 'change' to 'input'
        });
    },

    setupFontPicker() {
        const fontSelect = document.getElementById('font-family');
        if (fontSelect) {
            fontSelect.addEventListener('change', () => this.handleThemeUpdate());
        }
    },

    setupLayoutOptions() {
        const layoutOptions = document.querySelectorAll('.layout-option');
        layoutOptions.forEach(option => {
            option.addEventListener('click', () => this.handleLayoutChange(option.dataset.layout));
        });

        // Add autosave for button style and animation
        document.getElementById('button-style')?.addEventListener('change', () => this.handleThemeUpdate());
        document.getElementById('animation-style')?.addEventListener('change', () => this.handleThemeUpdate());
    },

    loadCurrentTheme() {
        const userId = auth.currentUser.id;
        const theme = storage.getTheme(userId);
        
        document.getElementById('background-color').value = theme.background;
        document.getElementById('text-color').value = theme.text;
        document.getElementById('accent-color').value = theme.accent;
        document.getElementById('font-family').value = theme.fontFamily || 'Inter';
        document.getElementById('button-style').value = theme.buttonStyle || 'rounded';
        document.getElementById('animation-style').value = theme.animation || 'fade';
    },

    handleThemeUpdate() {
        const theme = {
            background: document.getElementById('background-color').value,
            text: document.getElementById('text-color').value,
            accent: document.getElementById('accent-color').value,
            fontFamily: document.getElementById('font-family').value,
            buttonStyle: document.getElementById('button-style').value,
            animation: document.getElementById('animation-style').value
        };

        const userId = auth.currentUser.id;
        storage.setTheme(userId, theme);
        Toast.show('Theme updated!');
    },

    render() {
        return `
            <div class="customize-container">
                <div class="customize-header">
                    <h2>Customize Your Page</h2>
                    <p>Personalize your page appearance</p>
                </div>

                <div class="customize-section card">
                    <h3>Colors & Typography</h3>
                    <div class="color-pickers">
                        <div class="form-group">
                            <label>Background Color</label>
                            <input type="color" id="background-color" class="color-picker">
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <input type="color" id="text-color" class="color-picker">
                        </div>
                        <div class="form-group">
                            <label>Accent Color</label>
                            <input type="color" id="accent-color" class="color-picker">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Font Family</label>
                        <select id="font-family" class="form-control">
                            <option value="Inter">Inter</option>
                            <option value="Space Grotesk">Space Grotesk</option>
                            <option value="Outfit">Outfit</option>
                            <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                            <option value="DM Sans">DM Sans</option>
                            <option value="Syncopate">Syncopate</option>
                        </select>
                    </div>
                </div>

                <div class="customize-section card">
                    <h3>Button Style</h3>
                    <select id="button-style" class="form-control">
                        <option value="rounded">Rounded</option>
                        <option value="sharp">Sharp Edges</option>
                        <option value="organic">Organic</option>
                        <option value="wave">Wave</option>
                        <option value="minimal">Minimal</option>
                        <option value="glow">Neon Glow</option>
                    </select>
                </div>

                <div class="customize-section card">
                    <h3>Animations</h3>
                    <select id="animation-style" class="form-control">
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="bounce">Bounce</option>
                        <option value="float">Float</option>
                        <option value="pulse">Pulse</option>
                    </select>
                </div>

                <div class="customize-actions">
                    <button class="btn btn-outline" onclick="app.navigate('/preview')">
                        <i class="fas fa-eye"></i> Preview Changes
                    </button>
                    <button class="btn" onclick="app.navigate('/dashboard')">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }
};