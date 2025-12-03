document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewContainer = document.getElementById('previewContainer');
    const generatedCode = document.getElementById('generatedCode');
    const instructionModal = document.getElementById('instructionModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
    const themeSwitcherContainer = document.getElementById('themeSwitcherContainer');
    const themeSelector = document.getElementById('themeSelector');
    
    // Переменные
    let currentSiteTheme = 'dark';
    let currentSVGTheme = 'dark';
    let currentSVGCode = '';
    let hasShownInstruction = false;
    
    // ===== ТЕМЫ САЙТА =====
    const siteThemes = [
        { id: 'dark', name: 'Тёмная', emoji: '🌙' },
        { id: 'light', name: 'Светлая', emoji: '☀️' },
        { id: 'halloween', name: 'Halloween', emoji: '🎃' },
        { id: 'ocean', name: 'Ocean', emoji: '🌊' },
        { id: 'midnight', name: 'Полночь', emoji: '🌌' },
        { id: 'forest', name: 'Лес', emoji: '🌲' },
        { id: 'sunset', name: 'Закат', emoji: '🌅' },
        { id: 'coffee', name: 'Кофе', emoji: '☕' },
        { id: 'cyberpunk', name: 'Киберпанк', emoji: '🤖' },
        { id: 'rose', name: 'Розовая', emoji: '🌹' },
        { id: 'arctic', name: 'Арктика', emoji: '❄️' },
        { id: 'desert', name: 'Пустыня', emoji: '🏜️' },
        { id: 'matrix', name: 'Матрица', emoji: '💚' },
        { id: 'lavender', name: 'Лаванда', emoji: '🪻' }
    ];
    
    // Цвета для тем сайта
    const siteThemeColors = {
        dark: { bg: '#0d1117', panel: '#161b22', border: '#30363d', text: '#f0f6fc', text2: '#8b949e', accent: '#1f6feb', accentGreen: '#238636' },
        light: { bg: '#f6f8fa', panel: '#ffffff', border: '#d0d7de', text: '#1f2328', text2: '#656d76', accent: '#0969da', accentGreen: '#1a7f37' },
        halloween: { bg: '#1a0f0f', panel: '#2a1515', border: '#ff7518', text: '#ff8c42', text2: '#ffa766', accent: '#ff7518', accentGreen: '#d35400' },
        ocean: { bg: '#0a192f', panel: '#112240', border: '#64ffda', text: '#ccd6f6', text2: '#8892b0', accent: '#64ffda', accentGreen: '#00b894' },
        midnight: { bg: '#0a0e17', panel: '#151a2d', border: '#2a3b6d', text: '#e6e8ff', text2: '#8b9bdd', accent: '#6d8eff', accentGreen: '#27ae60' },
        forest: { bg: '#0d1f12', panel: '#1a3320', border: '#2d8b57', text: '#d4f7dc', text2: '#7bc096', accent: '#38a169', accentGreen: '#2d8b57' },
        sunset: { bg: '#2d1b3d', panel: '#45295f', border: '#ff6b6b', text: '#ffd6d6', text2: '#ffa8a8', accent: '#ff6b6b', accentGreen: '#ff9a76' },
        coffee: { bg: '#3a2615', panel: '#523621', border: '#8b4513', text: '#f5e6d3', text2: '#d2b48c', accent: '#8b4513', accentGreen: '#a0522d' },
        cyberpunk: { bg: '#0a0a0a', panel: '#1a1a2e', border: '#00ff9d', text: '#00ff9d', text2: '#00cc7a', accent: '#ff00ff', accentGreen: '#00ff9d' },
        rose: { bg: '#2d1a2d', panel: '#452945', border: '#ff66b2', text: '#ffd6e7', text2: '#ff99cc', accent: '#ff66b2', accentGreen: '#ff3385' },
        arctic: { bg: '#0c2d48', panel: '#1e4d70', border: '#64d8ff', text: '#e6f7ff', text2: '#99e0ff', accent: '#64d8ff', accentGreen: '#00b7eb' },
        desert: { bg: '#2d1a12', panel: '#4a2c1d', border: '#d4a574', text: '#f5e6d3', text2: '#d2b48c', accent: '#d4a574', accentGreen: '#b38b5d' },
        matrix: { bg: '#001100', panel: '#002200', border: '#00ff00', text: '#00ff00', text2: '#00cc00', accent: '#00ff00', accentGreen: '#00cc00' },
        lavender: { bg: '#2d1a4d', panel: '#452973', border: '#b19cd9', text: '#f0e6ff', text2: '#d9c9ff', accent: '#b19cd9', accentGreen: '#9b87c5' }
    };
    
    // ===== ТЕМЫ SVG =====
    const svgThemes = {
        dark: { name: 'Тёмная', bg1: '#2b2d42', bg2: '#121420', text: '#f8f9fa', accent: '#1f6feb', shadow: '#1f6feb', emoji: '🌙' },
        light: { name: 'Светлая', bg1: '#f6f8fa', bg2: '#ffffff', text: '#1f2328', accent: '#0969da', shadow: '#0969da', emoji: '☀️' },
        halloween: { name: 'Halloween', bg1: '#000000', bg2: '#610000', text: '#ff7518', accent: '#ff8c42', shadow: '#ff7518', emoji: '🎃' },
        ocean: { name: 'Ocean', bg1: '#1a2980', bg2: '#26d0ce', text: '#ffffff', accent: '#4cc9f0', shadow: '#1a2980', emoji: '🌊' },
        midnight: { name: 'Полночь', bg1: '#0a0e17', bg2: '#151a2d', text: '#e6e8ff', accent: '#6d8eff', shadow: '#6d8eff', emoji: '🌌' },
        forest: { name: 'Лесная', bg1: '#1a3c2e', bg2: '#0d1f17', text: '#d4edda', accent: '#38a169', shadow: '#38a169', emoji: '🌲' },
        sunset: { name: 'Закат', bg1: '#ff6b6b', bg2: '#4a235a', text: '#fff5f5', accent: '#ff9a76', shadow: '#ff6b6b', emoji: '🌅' },
        coffee: { name: 'Кофе', bg1: '#3a2615', bg2: '#523621', text: '#f5e6d3', accent: '#8b4513', shadow: '#8b4513', emoji: '☕' },
        cyberpunk: { name: 'Киберпанк', bg1: '#0a0a0a', bg2: '#1a1a2e', text: '#00ff9d', accent: '#ff00ff', shadow: '#ff00ff', emoji: '🤖' },
        rose: { name: 'Розовая', bg1: '#ffd6e7', bg2: '#ff99cc', text: '#8b2252', accent: '#ff66b2', shadow: '#ff66b2', emoji: '🌹' },
        arctic: { name: 'Арктика', bg1: '#0c2d48', bg2: '#1e4d70', text: '#e6f7ff', accent: '#64d8ff', shadow: '#64d8ff', emoji: '❄️' },
        desert: { name: 'Пустыня', bg1: '#f4e7d3', bg2: '#d4a574', text: '#5d4037', accent: '#a0522d', shadow: '#a0522d', emoji: '🏜️' },
        matrix: { name: 'Матрица', bg1: '#001100', bg2: '#003300', text: '#00ff00', accent: '#00ff00', shadow: '#00ff00', emoji: '💚' },
        lavender: { name: 'Лаванда', bg1: '#e6e6ff', bg2: '#cc99ff', text: '#4a235a', accent: '#9d65c9', shadow: '#9d65c9', emoji: '🪻' },
        github: { name: 'GitHub', bg1: '#0d1117', bg2: '#161b22', text: '#f0f6fc', accent: '#58a6ff', shadow: '#58a6ff', emoji: '🐙' },
        rainbow: { name: 'Радуга', bg1: '#667eea', bg2: '#764ba2', text: '#ffffff', accent: '#f093fb', shadow: '#f5576c', emoji: '🌈' },
        candy: { name: 'Конфетная', bg1: '#ff9a9e', bg2: '#fad0c4', text: '#4a235a', accent: '#a569bd', shadow: '#a569bd', emoji: '🍬' },
        space: { name: 'Космос', bg1: '#000428', bg2: '#004e92', text: '#ffffff', accent: '#ffcc00', shadow: '#ffcc00', emoji: '🚀' },
        vintage: { name: 'Винтаж', bg1: '#3e2723', bg2: '#5d4037', text: '#d7ccc8', accent: '#8d6e63', shadow: '#8d6e63', emoji: '📜' },
        pastel: { name: 'Пастель', bg1: '#ffd6e7', bg2: '#c2f0fc', text: '#5d4037', accent: '#ff9a9e', shadow: '#a569bd', emoji: '🎀' },
        galaxy: { name: 'Галактика', bg1: '#0c0e2e', bg2: '#2d1b69', text: '#e6e6ff', accent: '#9d65ff', shadow: '#ff6b9d', emoji: '🌌' },
        nord: { name: 'Nord', bg1: '#2e3440', bg2: '#3b4252', text: '#d8dee9', accent: '#88c0d0', shadow: '#81a1c1', emoji: '🏔️' },
        dracula: { name: 'Dracula', bg1: '#282a36', bg2: '#44475a', text: '#f8f8f2', accent: '#bd93f9', shadow: '#ff79c6', emoji: '🧛' },
        solarized: { name: 'Solarized', bg1: '#002b36', bg2: '#073642', text: '#839496', accent: '#2aa198', shadow: '#268bd2', emoji: '☀️' },
        purpleneon: { name: 'Фиолетовый Неон', bg1: '#0a0a0a', bg2: '#1a1a2e', text: '#e6f7ff', accent: '#9d4edd', shadow: '#00bbf9', emoji: '🔮' },
        neon: { name: 'Неон', bg1: '#000000', bg2: '#000000', text: '#ff1493', accent: '#00ff7f', shadow: '#1e90ff', emoji: '⚡' }
    };

    // ===== ИНИЦИАЛИЗАЦИЯ ТЕМ САЙТА =====
    function initSiteThemes() {
        // Загружаем сохраненную тему сайта
        const savedTheme = localStorage.getItem('siteTheme');
        if (savedTheme && siteThemeColors[savedTheme]) {
            currentSiteTheme = savedTheme;
            setSiteTheme(savedTheme);
        }
        
        // Создаем HTML для кнопок тем
        let buttonsHTML = siteThemes.map(theme => {
            const isActive = theme.id === currentSiteTheme;
            return `
                <button class="site-theme-btn ${isActive ? 'active' : ''}" 
                        data-theme="${theme.id}"
                        title="${theme.name}">
                    <span class="theme-emoji-small">${theme.emoji}</span>
                    ${theme.name}
                </button>
            `;
        }).join('');
        
        // Вставляем кнопки в контейнер
        const themeButtonsContainer = document.querySelector('.theme-switcher-buttons');
        if (themeButtonsContainer) {
            themeButtonsContainer.innerHTML = buttonsHTML;
        }
        
        // Обработчики кликов для кнопок тем
        document.querySelectorAll('.site-theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const themeId = this.dataset.theme;
                setSiteTheme(themeId);
                
                // Сохраняем состояние в localStorage
                localStorage.setItem('siteTheme', themeId);
                
                // Показываем уведомление
                const themeName = this.querySelector('span:not(.theme-emoji-small)').textContent.trim();
                showNotification(`Тема "${themeName}" применена`, 'success');
                
                // Автоматически скрываем панель тем через 2 секунды
                setTimeout(() => {
                    const container = document.querySelector('.theme-buttons-container');
                    const toggleBtn = document.getElementById('toggleThemeSwitcher');
                    if (container && !container.classList.contains('collapsed')) {
                        container.classList.add('collapsed');
                        toggleBtn.classList.remove('expanded');
                    }
                }, 2000);
            });
        });
        
        // Обработчик для кнопки раскрытия/скрытия панели тем
        const toggleThemeBtn = document.getElementById('toggleThemeSwitcher');
        if (toggleThemeBtn) {
            toggleThemeBtn.addEventListener('click', function() {
                const container = document.querySelector('.theme-buttons-container');
                if (container) {
                    container.classList.toggle('collapsed');
                    this.classList.toggle('expanded');
                    
                    // Меняем текст кнопки
                    const span = this.querySelector('span');
                    const isExpanded = this.classList.contains('expanded');
                    span.textContent = isExpanded ? 'Скрыть темы сайта' : 'Сменить тему сайта';
                }
            });
        }
    }
    
    function setSiteTheme(themeId) {
        currentSiteTheme = themeId;
        const colors = siteThemeColors[themeId];
        
        // Применяем CSS переменные
        document.documentElement.style.setProperty('--bg-color', colors.bg);
        document.documentElement.style.setProperty('--panel-bg', colors.panel);
        document.documentElement.style.setProperty('--border-color', colors.border);
        document.documentElement.style.setProperty('--text-primary', colors.text);
        document.documentElement.style.setProperty('--text-secondary', colors.text2);
        document.documentElement.style.setProperty('--accent', colors.accent);
        document.documentElement.style.setProperty('--accent-green', colors.accentGreen);
        
        // Обновляем активную кнопку темы
        document.querySelectorAll('.site-theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === themeId) {
                btn.classList.add('active');
            }
        });
        
        // Генерируем карточку с новыми цветами (если нужно)
        generateCard();
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ ТЕМ SVG =====
    function initSVGThemes() {
        // Загружаем сохраненную SVG тему
        const savedSVGTheme = localStorage.getItem('svgTheme');
        if (savedSVGTheme && svgThemes[savedSVGTheme]) {
            currentSVGTheme = savedSVGTheme;
        }
        
        themeSelector.innerHTML = '';
        
        Object.entries(svgThemes).forEach(([id, theme]) => {
            const btn = document.createElement('button');
            btn.className = `theme-option ${id === currentSVGTheme ? 'active' : ''}`;
            btn.dataset.theme = id;
            btn.innerHTML = `
                <span class="theme-emoji">${theme.emoji}</span>
                ${theme.name}
            `;
            
            // Устанавливаем фон
            btn.style.background = `linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`;
            
            // Цвет текста
            if (id === 'lavender') {
                btn.style.color = '#4a235a';
                btn.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.7)';
            }
            
            btn.addEventListener('click', function() {
                currentSVGTheme = id;
                
                // Обновляем активную кнопку
                document.querySelectorAll('.theme-option').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Сохраняем выбор темы
                localStorage.setItem('svgTheme', id);
                
                // Генерируем новую карточку
                generateCard();
                
                // Показываем уведомление
                showNotification(`Тема "${theme.name}" выбрана`, 'info');
            });
            
            themeSelector.appendChild(btn);
        });
        
        // Генерируем карточку с сохраненной темой
        generateCard();
    }
    
    // ===== ГЕНЕРАЦИЯ КАРТОЧКИ =====
    function generateCard() {
        const username = document.getElementById('username').value || 'crystalfire';
        const bio = document.getElementById('bio').value || 'Студент, вайб-кодер';
        const emoji1 = document.getElementById('emoji1').value || '🚀';
        const emoji2 = document.getElementById('emoji2').value || '💻';
        const emoji3 = document.getElementById('emoji3').value || '⚡';
        const colors = svgThemes[currentSVGTheme] || svgThemes.dark;

        
        // Создаем SVG
        currentSVGCode = `
<svg width="100%" height="250" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors.bg1}">
                <animate attributeName="stop-color" values="${colors.bg1};${colors.accent};${colors.bg1}" dur="8s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stop-color="${colors.bg2}">
                <animate attributeName="stop-color" values="${colors.bg2};${colors.bg1};${colors.bg2}" dur="8s" repeatCount="indefinite"/>
            </stop>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${colors.shadow}" flood-opacity="0.3"/>
        </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGradient)" rx="15" ry="15" filter="url(#shadow)"/>
    <text x="30" y="60" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.text}">${escapeXML(username)}</text>
    <text x="30" y="95" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" opacity="0.9">${escapeXML(bio)}</text>
    <g transform="translate(30, 140)">
        <g><circle cx="25" cy="25" r="20" fill="${colors.accent}" opacity="0.9"><animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" begin="0s"/></circle><text x="25" y="32" text-anchor="middle" font-family="Arial" font-size="14" fill="white">${escapeXML(emoji1)}</text></g>
        <g transform="translate(70, 0)"><circle cx="25" cy="25" r="20" fill="${colors.accent}" opacity="0.9"><animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" begin="0.5s"/></circle><text x="25" y="32" text-anchor="middle" font-family="Arial" font-size="14" fill="white">${escapeXML(emoji2)}</text></g>
        <g transform="translate(140, 0)"><circle cx="25" cy="25" r="20" fill="${colors.accent}" opacity="0.9"><animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" begin="1s"/></circle><text x="25" y="32" text-anchor="middle" font-family="Arial" font-size="14" fill="white">${escapeXML(emoji3)}</text></g>
    </g>
    <path d="M0,200 Q125,180 250,200 T500,200 L500,250 L0,250 Z" fill="${colors.accent}" opacity="0.2"><animate attributeName="d" values="M0,200 Q125,180 250,200 T500,200 L500,250 L0,250 Z;M0,200 Q125,220 250,200 T500,200 L500,250 L0,250 Z;M0,200 Q125,180 250,200 T500,200 L500,250 L0,250 Z" dur="6s" repeatCount="indefinite"/></path>
    <text x="250" y="235" text-anchor="middle" font-family="Arial" font-size="12" fill="${colors.text}" opacity="0.7">Сгенерировано для GitVerse</text>
</svg>`;
        
        // Показываем предпросмотр
        previewContainer.innerHTML = currentSVGCode;
        
        // Генерируем код для README.md
        const markdownCode = `![${escapeXML(username)} - ${escapeXML(bio)}](./gitverse-card.svg)`;
        generatedCode.textContent = markdownCode;
    }
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    function showModal() {
        instructionModal.style.display = 'flex';
        setTimeout(() => instructionModal.classList.add('active'), 10);
    }
    
    function closeModal() {
        instructionModal.classList.remove('active');
        setTimeout(() => {
            instructionModal.style.display = 'none';
            if (dontShowAgainCheckbox.checked) {
                localStorage.setItem('svgInstructionShown', 'true');
                hasShownInstruction = true;
            }
        }, 300);
    }
    
    closeModalBtn.addEventListener('click', function() {
        closeModal();
        downloadFile();
    });
    
    modalOkBtn.addEventListener('click', function() {
        closeModal();
        downloadFile();
    });
    
    instructionModal.addEventListener('click', function(e) {
        if (e.target === instructionModal) {
            closeModal();
            downloadFile();
        }
    });
    
    // ===== СКАЧИВАНИЕ =====
    function downloadFile() {
        if (!currentSVGCode) {
            showNotification('Сначала сгенерируйте карточку!', 'warning');
            return;
        }
        
        // Анимация кнопки
        downloadBtn.classList.add('pulsing');
        
        setTimeout(() => {
            // Создаем и скачиваем файл
            const blob = new Blob([currentSVGCode], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gitverse-card.svg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Показываем галочку
            showCustomCheckmark();
            
            // Снимаем анимацию
            downloadBtn.classList.remove('pulsing');
        }, 100);
    }
    
    downloadBtn.addEventListener('click', function() {
        if (!currentSVGCode) {
            this.style.animation = 'shake 0.5s ease';
            setTimeout(() => this.style.animation = '', 500);
            showNotification('Сначала сгенерируйте карточку!', 'warning');
            return;
        }
        
        const dontShowAgain = localStorage.getItem('svgInstructionShown') === 'true';
        
        if (!dontShowAgain && !hasShownInstruction) {
            showModal();
            hasShownInstruction = true;
        } else {
            downloadFile();
        }
    });
    
    // ===== ГАЛОЧКА =====
    function showCustomCheckmark() {
        const checkmark = document.getElementById('customCheckmark');
        const overlay = document.getElementById('checkmarkOverlay');
        
        checkmark.style.display = 'block';
        overlay.style.display = 'block';
        
        // Плавное появление
        setTimeout(() => {
            checkmark.style.transform = 'translate(-50%, -50%) scale(1)';
            checkmark.style.opacity = '1';
        }, 10);
        
        // Плавное исчезновение через 3 секунды
        setTimeout(() => {
            checkmark.style.transform = 'translate(-50%, -50%) scale(0.8)';
            checkmark.style.opacity = '0';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                checkmark.style.display = 'none';
                overlay.style.display = 'none';
                overlay.style.opacity = '1';
                // Сбрасываем стили
                checkmark.style.transform = 'translate(-50%, -50%) scale(0)';
                checkmark.style.opacity = '0';
            }, 600);
        }, 2000);
    }
    
    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function escapeXML(text) {
        return text.replace(/[<>&"']/g, function(c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c];
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('emoji-btn')) {
            const emoji = e.target.dataset.emoji;
            
            // Копируем эмодзи в буфер обмена
            navigator.clipboard.writeText(emoji).then(() => {
                // Показываем всплывающую подсказку
                showEmojiTooltip(e.target, 'Скопировано!');
                
                // Автоматически вставляем в первое пустое поле
                const emojiInputs = [
                    document.getElementById('emoji1'),
                    document.getElementById('emoji2'), 
                    document.getElementById('emoji3')
                ];
                
                for (let input of emojiInputs) {
                    if (!input.value.trim()) {
                        input.value = emoji;
                        input.dispatchEvent(new Event('input'));
                        break;
                    }
                }
            }).catch(err => {
                console.error('Ошибка копирования:', err);
                showEmojiTooltip(e.target, 'Не удалось скопировать');
            });
        }
    });
    
    function showEmojiTooltip(element, message) {
        // Удаляем старые тултипы
        document.querySelectorAll('.emoji-tooltip').forEach(t => t.remove());
        
        // Создаем тултип
        const tooltip = document.createElement('div');
        tooltip.className = 'emoji-tooltip';
        tooltip.textContent = message;
        
        // Позиционируем
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        tooltip.style.position = 'absolute';
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top + scrollTop - 10}px`;
        tooltip.style.zIndex = '10000';
        
        document.body.appendChild(tooltip);
        
        // Убираем через 1.5 секунды
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
        }, 1000);
    }

    // ===== СВОРАЧИВАНИЕ СЕКЦИЙ =====
    function initCollapsibleSections() {
        // Для категорий эмодзи
        document.querySelectorAll('.category-label').forEach(label => {
            label.addEventListener('click', function(e) {
                if (e.target.classList.contains('collapse-toggle')) return;
                
                const categoryHeader = this.closest('.category-header');
                const emojiGroup = categoryHeader.querySelector('.emoji-group');
                const toggleIcon = this.querySelector('.collapse-toggle');
                
                if (emojiGroup) {
                    const isNowCollapsed = !emojiGroup.classList.contains('collapsed');
                    
                    categoryHeader.classList.toggle('collapsed');
                    emojiGroup.classList.toggle('collapsed');
                    
                    // Обновляем значок
                    if (toggleIcon) {
                        toggleIcon.textContent = isNowCollapsed ? '+' : '−';
                    }
                    
                    // Сохраняем состояние
                    const categoryName = this.querySelector('i').nextSibling.textContent.trim();
                    localStorage.setItem(`category_${categoryName}`, isNowCollapsed);
                    
                    // Обновляем глобальное состояние
                    updateGlobalEmojiCollapseState();
                }
            });
            
            // Восстанавливаем состояние
            const categoryHeader = label.closest('.category-header');
            const categoryName = label.querySelector('i').nextSibling.textContent.trim();
            const isCollapsed = localStorage.getItem(`category_${categoryName}`) === 'true';
            
            if (isCollapsed && categoryHeader) {
                categoryHeader.classList.add('collapsed');
                const emojiGroup = categoryHeader.querySelector('.emoji-group');
                if (emojiGroup) emojiGroup.classList.add('collapsed');
                const toggleIcon = label.querySelector('.collapse-toggle');
                if (toggleIcon) toggleIcon.textContent = '+';
            }
        });
        
        // Для секций настроек
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', function(e) {
                if (e.target.classList.contains('collapse-toggle')) return;
                
                const section = this.closest('.collapsible-section');
                const content = this.nextElementSibling;
                const toggleIcon = this.querySelector('.collapse-toggle');
                
                if (content && content.classList.contains('section-content')) {
                    const isNowCollapsed = !content.classList.contains('collapsed');
                    
                    section.classList.toggle('collapsed');
                    content.classList.toggle('collapsed');
                    
                    // Обновляем значок
                    if (toggleIcon) {
                        toggleIcon.textContent = isNowCollapsed ? '+' : '−';
                    }
                    
                    // Сохраняем состояние
                    const sectionType = this.querySelector('h3').textContent.trim();
                    localStorage.setItem(`section_${sectionType}`, isNowCollapsed);
                    
                    // Обновляем глобальное состояние
                    updateGlobalSectionCollapseState();
                }
            });
            
            // Восстанавливаем состояние
            const section = header.closest('.collapsible-section');
            const content = header.nextElementSibling;
            const sectionType = header.querySelector('h3').textContent.trim();
            const isCollapsed = localStorage.getItem(`section_${sectionType}`) === 'true';
            
            if (isCollapsed && content) {
                section.classList.add('collapsed');
                content.classList.add('collapsed');
                const toggleIcon = header.querySelector('.collapse-toggle');
                if (toggleIcon) toggleIcon.textContent = '+';
            }
        });
    }
    
    // ===== УПРАВЛЕНИЕ КАТЕГОРИЯМИ ЭМОДЗИ =====
    function initEmojiCollapsibleControls() {
        const collapseAllEmojiBtn = document.getElementById('collapseAllEmojiBtn');
        const expandAllEmojiBtn = document.getElementById('expandAllEmojiBtn');
        
        // Функция для обновления значков категорий эмодзи
        function updateEmojiToggleIcons() {
            document.querySelectorAll('.category-header').forEach(header => {
                const toggleIcon = header.querySelector('.collapse-toggle');
                if (toggleIcon) {
                    toggleIcon.textContent = header.classList.contains('collapsed') ? '+' : '−';
                }
            });
        }
        
        if (collapseAllEmojiBtn) {
            collapseAllEmojiBtn.addEventListener('click', function() {
                document.querySelectorAll('.category-header').forEach(header => {
                    header.classList.add('collapsed');
                    const emojiGroup = header.querySelector('.emoji-group');
                    if (emojiGroup) emojiGroup.classList.add('collapsed');
                });
                
                // Обновляем значки
                updateEmojiToggleIcons();
                
                localStorage.setItem('allEmojiCategoriesCollapsed', 'true');
                showNotification('Все категории эмодзи свёрнуты', 'info');
            });
        }
        
        if (expandAllEmojiBtn) {
            expandAllEmojiBtn.addEventListener('click', function() {
                document.querySelectorAll('.category-header').forEach(header => {
                    header.classList.remove('collapsed');
                    const emojiGroup = header.querySelector('.emoji-group');
                    if (emojiGroup) emojiGroup.classList.remove('collapsed');
                });
                
                // Обновляем значки
                updateEmojiToggleIcons();
                
                localStorage.removeItem('allEmojiCategoriesCollapsed');
                showNotification('Все категории эмодзи развёрнуты', 'info');
            });
        }
        
        // Восстанавливаем состояние при загрузке
        const allCollapsed = localStorage.getItem('allEmojiCategoriesCollapsed') === 'true';
        if (allCollapsed) {
            setTimeout(() => {
                document.querySelectorAll('.category-header').forEach(header => {
                    header.classList.add('collapsed');
                    const emojiGroup = header.querySelector('.emoji-group');
                    if (emojiGroup) emojiGroup.classList.add('collapsed');
                });
                setTimeout(updateEmojiToggleIcons, 150);
            }, 100);
        }
    }
    
    // ===== УПРАВЛЕНИЕ ВСЕМИ СЕКЦИЯМИ =====
    function initSectionControls() {
        const collapseAllSectionsBtn = document.getElementById('collapseAllSectionsBtn');
        const expandAllSectionsBtn = document.getElementById('expandAllSectionsBtn');
        
        // Функция для обновления значков
        function updateSectionToggleIcons() {
            document.querySelectorAll('.collapsible-section').forEach(section => {
                const toggleIcon = section.querySelector('.collapse-toggle');
                if (toggleIcon) {
                    toggleIcon.textContent = section.classList.contains('collapsed') ? '+' : '−';
                }
            });
        }
        
        if (collapseAllSectionsBtn) {
            collapseAllSectionsBtn.addEventListener('click', function() {
                document.querySelectorAll('.collapsible-section').forEach(section => {
                    section.classList.add('collapsed');
                    const content = section.querySelector('.section-content');
                    if (content) content.classList.add('collapsed');
                });
                
                // Обновляем значки
                updateSectionToggleIcons();
                
                localStorage.setItem('allSectionsCollapsed', 'true');
                showNotification('Все секции свёрнуты', 'info');
            });
        }
        
        if (expandAllSectionsBtn) {
            expandAllSectionsBtn.addEventListener('click', function() {
                document.querySelectorAll('.collapsible-section').forEach(section => {
                    section.classList.remove('collapsed');
                    const content = section.querySelector('.section-content');
                    if (content) content.classList.remove('collapsed');
                });
                
                // Обновляем значки
                updateSectionToggleIcons();
                
                localStorage.removeItem('allSectionsCollapsed');
                showNotification('Все секции развёрнуты', 'info');
            });
        }
        
        // Восстанавливаем глобальное состояние
        if (localStorage.getItem('allSectionsCollapsed') === 'true') {
            setTimeout(() => {
                document.querySelectorAll('.collapsible-section').forEach(section => {
                    section.classList.add('collapsed');
                    const content = section.querySelector('.section-content');
                    if (content) content.classList.add('collapsed');
                });
                // Обновляем значки при загрузке
                setTimeout(updateSectionToggleIcons, 150);
            }, 100);
        }
    }
    
    // Вспомогательные функции для глобального состояния
    function updateGlobalEmojiCollapseState() {
        const allGroups = document.querySelectorAll('.emoji-group');
        const collapsedGroups = document.querySelectorAll('.emoji-group.collapsed');
        
        if (allGroups.length === collapsedGroups.length) {
            localStorage.setItem('allEmojiCategoriesCollapsed', 'true');
        } else {
            localStorage.removeItem('allEmojiCategoriesCollapsed');
        }
    }
    
    function updateGlobalSectionCollapseState() {
        const allSections = document.querySelectorAll('.collapsible-section');
        const collapsedSections = document.querySelectorAll('.collapsible-section.collapsed');
        
        if (allSections.length === collapsedSections.length) {
            localStorage.setItem('allSectionsCollapsed', 'true');
        } else {
            localStorage.removeItem('allSectionsCollapsed');
        }
    }

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    copyBtn.addEventListener('click', function() {
        const code = generatedCode.textContent;
        if (!code || code.includes('Здесь появится')) {
            showNotification('Сначала сгенерируйте карточку!', 'warning');
            return;
        }
        
        navigator.clipboard.writeText(code).then(() => {
            showNotification('Код скопирован!', 'success');
        });
    });
    
    // Проверяем инструкцию
    if (localStorage.getItem('svgInstructionShown') === 'true') {
        hasShownInstruction = true;
    }
    
    // Инициализируем всё
    initSiteThemes();
    initSVGThemes();
    
    // === АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ ПРИ ИЗМЕНЕНИЯХ ===
    document.getElementById('username').addEventListener('input', generateCard);
    document.getElementById('bio').addEventListener('input', generateCard);
    document.getElementById('emoji1').addEventListener('input', generateCard);
    document.getElementById('emoji2').addEventListener('input', generateCard);
    document.getElementById('emoji3').addEventListener('input', generateCard);
    
    // Инициализация сворачиваемых секций
    initCollapsibleSections();
    
    // Инициализация управления сворачиванием
    initSectionControls();
    initEmojiCollapsibleControls();
    
    // Генерируем первую карточку
    generateCard();
});