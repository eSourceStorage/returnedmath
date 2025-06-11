(function() {
    const theme = {
        colors: {
            primary: '#0d6efd',
            secondary: '#6c757d',
            background: '#ffffff',
            surface: '#f8f9fa',
            text: '#252424',
            border: '#dee2e6'
        },
        fonts: {
            system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }
    };

    function createElements() {
        // Block screen
        const block = document.createElement('div');
        block.id = 'cookie-block-screen';
        Object.assign(block.style, {
            display: 'none',
            position: 'fixed',
            top: '0', left: '0', right: '0', bottom: '0',
            background: '#fff',        
            fontFamily: theme.fonts.system,
            fontSize: '20px',
            textAlign: 'center',
            paddingTop: '20vh',
            zIndex: '999999'
        });

        const blockContent = document.createElement('div');
        blockContent.innerHTML = 'Access denied: you declined cookie consent.';
        
        const blockBanner = document.createElement('div');
        blockBanner.style.display = 'none';
        blockBanner.innerHTML = `
            <div style="margin-bottom: 20px; color: ${theme.colors.text}">
                This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
                To remember your choices, we store your consent decision in localStorage.
            </div>
        `;

        const blockButtons = document.createElement('div');
        Object.assign(blockButtons.style, {
            display: 'none',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '20px'
        });

        const createButton = (text, isPrimary) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            Object.assign(btn.style, {
                padding: '8px 16px',
                cursor: 'pointer',
                background: isPrimary ? theme.colors.primary : theme.colors.secondary,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontFamily: theme.fonts.system
            });
            return btn;
        };

        const blockAcceptBtn = createButton('Accept', true);
        const blockDeclineBtn = createButton('Decline', false);
        blockButtons.append(blockAcceptBtn, blockDeclineBtn);

        const changeMindBtn = document.createElement('button');
        changeMindBtn.textContent = 'Change My Mind';
        Object.assign(changeMindBtn.style, {
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            background: theme.colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: theme.fonts.system
        });

        changeMindBtn.addEventListener('click', () => {
            blockContent.style.display = 'none';
            changeMindBtn.style.display = 'none';
            blockBanner.style.display = 'block';
            blockButtons.style.display = 'flex';
        });

        block.append(blockContent, changeMindBtn, blockBanner, blockButtons);

        // Consent banner
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        Object.assign(banner.style, {
            display: 'none',
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '20px',
            background: theme.colors.surface,
            borderTop: `1px solid ${theme.colors.border}`,
            fontFamily: theme.fonts.system,
            fontSize: '14px',
            textAlign: 'center',
            zIndex: '999999'
        });

        // Buttons
        const buttonContainer = document.createElement('div');
        Object.assign(buttonContainer.style, {
            marginTop: '10px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
        });

        const acceptBtn = createButton('Accept', true);
        const declineBtn = createButton('Decline', false);
        buttonContainer.append(acceptBtn, declineBtn);
        banner.appendChild(buttonContainer);

        // Manage consent button
        const manageBtn = document.createElement('button');
        manageBtn.textContent = 'Manage Consent';
        Object.assign(manageBtn.style, {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            padding: '8px 16px',
            fontSize: '12px',
            background: theme.colors.secondary,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: theme.fonts.system,
            zIndex: '999998'
        });

        document.body.append(block, banner, manageBtn);
        return { 
            block, 
            banner, 
            blockAcceptBtn, 
            blockDeclineBtn,
            acceptBtn, 
            declineBtn, 
            manageBtn 
        };
    }

    function loadFonts() {
        const gf1 = document.createElement('link');
        gf1.rel = 'preconnect';
        gf1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(gf1);

        const gf2 = document.createElement('link');
        gf2.rel = 'preconnect';
        gf2.href = 'https://fonts.gstatic.com';
        gf2.crossOrigin = 'anonymous';
        document.head.appendChild(gf2);

        const gf3 = document.createElement('link');
        gf3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        gf3.rel = 'stylesheet';
        document.head.appendChild(gf3);

        const fa = document.createElement('link');
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        fa.rel = 'stylesheet';
        document.head.appendChild(fa);

        banner.style.display = 'none';
        block.style.display = 'none';
        document.body.style.overflow = '';
    }

    function init() {
        const elements = createElements();
        const { 
            block, banner, 
            blockAcceptBtn, blockDeclineBtn,
            acceptBtn, declineBtn, manageBtn 
        } = elements;

        function showBanner() {
            banner.style.display = 'block';
            block.style.display = 'none';
            document.body.style.overflow = '';
        }

        function handleConsent(accepted) {
            localStorage.setItem('fontConsent', accepted ? 'accepted' : 'declined');
            banner.style.display = 'none';
            block.style.display = 'none';
            
            if (accepted) {
                loadFonts();
            } else {
                block.style.display = 'block';
                document.body.style.overflow = 'hidden';
                // Reset block screen to initial state
                Array.from(block.children).forEach(child => {
                    child.style.display = child.tagName === 'DIV' && 
                        child.innerHTML.includes('Access denied') ? 'block' : 
                        child.tagName === 'BUTTON' && 
                        child.textContent === 'Change My Mind' ? 'block' : 'none';
                });
            }
        }

        // Event listeners
        blockAcceptBtn.addEventListener('click', () => handleConsent(true));
        blockDeclineBtn.addEventListener('click', () => handleConsent(false));
        acceptBtn.addEventListener('click', () => handleConsent(true));
        declineBtn.addEventListener('click', () => handleConsent(false));
        manageBtn.addEventListener('click', showBanner);

        // Check initial consent
        const consent = localStorage.getItem('fontConsent');
        if (consent === 'accepted') {
            loadFonts();
        } else if (consent === 'declined') {
            block.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            showBanner();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
