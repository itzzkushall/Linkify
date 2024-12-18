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
            input.addEventListener('change', () => this.handleThemeUpdate());
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
        Toast.show('Theme updated successfully!');
    },

    applyPresetTheme(preset) {
        const presets = {
            light: {
                background: '#ffffff',
                text: '#000000',
                accent: '#0066ff',
                fontFamily: 'Inter',
                buttonStyle: 'rounded',
                animation: 'fade'
            },
            dark: {
                background: '#1a1a1a',
                text: '#ffffff',
                accent: '#00ffbb',
                fontFamily: 'Space Grotesk',
                buttonStyle: 'sharp',
                animation: 'slide'
            },
            nature: {
                background: '#f0f7f4',
                text: '#2d3436',
                accent: '#38a169',
                fontFamily: 'Outfit',
                buttonStyle: 'organic',
                animation: 'bounce'
            },
            ocean: {
                background: '#e3f2fd',
                text: '#1a365d',
                accent: '#0066cc',
                fontFamily: 'Plus Jakarta Sans',
                buttonStyle: 'wave',
                animation: 'float'
            },
            minimal: {
                background: '#fafafa',
                text: '#2d3436',
                accent: '#000000',
                fontFamily: 'DM Sans',
                buttonStyle: 'minimal',
                animation: 'fade'
            },
            neon: {
                background: '#0a0a0a',
                text: '#ffffff',
                accent: '#00ff88',
                fontFamily: 'Syncopate',
                buttonStyle: 'glow',
                animation: 'pulse'
            }
        };

        const theme = presets[preset];
        if (theme) {
            const userId = auth.currentUser.id;
            storage.setTheme(userId, theme);
            this.loadCurrentTheme();
            Toast.show('Theme applied successfully!');
        }
    },

    render() {
        const userId = auth.currentUser.id;
        const theme = storage.getTheme(userId);

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
                            <input type="color" id="background-color" class="color-picker" value="${theme.background}">
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <input type="color" id="text-color" class="color-picker" value="${theme.text}">
                        </div>
                        <div class="form-group">
                            <label>Accent Color</label>
                            <input type="color" id="accent-color" class="color-picker" value="${theme.accent}">
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

                <div class="preset-themes card">
                    <h3>Preset Themes</h3>
                    <div class="theme-grid">
                        <button class="theme-preset light" onclick="CustomizePage.applyPresetTheme('light')">Light</button>
                        <button class="theme-preset dark" onclick="CustomizePage.applyPresetTheme('dark')">Dark</button>
                        <button class="theme-preset nature" onclick="CustomizePage.applyPresetTheme('nature')">Nature</button>
                        <button class="theme-preset ocean" onclick="CustomizePage.applyPresetTheme('ocean')">Ocean</button>
                        <button class="theme-preset minimal" onclick="CustomizePage.applyPresetTheme('minimal')">Minimal</button>
                        <button class="theme-preset neon" onclick="CustomizePage.applyPresetTheme('neon')">Neon</button>
                    </div>
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