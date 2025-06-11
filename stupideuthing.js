(function () {
  const theme = {
    colors: {
      primary: '#3d5afe',
      primaryLight: '#536dfe',
      primaryDark: '#304ffe',
      dark: '#050814',
      darker: '#030408',
      glass: 'rgba(20, 20, 35, 0.5)',
      glassStroke: 'rgba(255, 255, 255, 0.05)',
      glassHover: 'rgba(30, 30, 45, 0.8)',
      text: {
        primary: 'rgba(255, 255, 255, 0.95)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        muted: 'rgba(255, 255, 255, 0.5)'
      }
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px'
    },
    radius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      round: '9999px'
    },
    transitions: {
      fast: '0.2s',
      medium: '0.3s'
    }
  };

  function createButton(text, isPrimary) {
    const btn = document.createElement('button');
    btn.textContent = text;
    Object.assign(btn.style, {
      background: isPrimary ? 
        `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)` : 
        theme.colors.glass,
      color: theme.colors.text.primary,
      padding: '12px 24px',
      borderRadius: theme.radius.round,
      border: `1px solid ${theme.colors.glassStroke}`,
      fontWeight: '500',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: `all ${theme.transitions.fast}`
    });

    btn.addEventListener('mouseover', () => {
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = '0 4px 12px rgba(61, 90, 254, 0.3)';
    });

    btn.addEventListener('mouseout', () => {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = 'none';
    });

    return btn;
  }

  function createElements() {
    // Block screen with glass effect
    const block = document.createElement('div');
    block.id = 'cookie-block-screen';
    Object.assign(block.style, {
      display: 'none',
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      background: theme.colors.dark,
      color: theme.colors.text.primary,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backdropFilter: 'blur(20px)',
      borderRadius: theme.radius.lg,
      padding: theme.spacing.xl,
      zIndex: '999999'
    });

    const blockContent = document.createElement('div');
    blockContent.className = 'config-card';
    Object.assign(blockContent.style, {
      background: theme.colors.glass,
      border: `1px solid ${theme.colors.glassStroke}`,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.xl,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(20px)',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginTop: '20vh'
    });
    
    blockContent.innerHTML = 'Access denied: you declined cookie consent.';

    const changeMindBtn = document.createElement('button');
    changeMindBtn.textContent = 'Change My Mind';
    Object.assign(changeMindBtn.style, {
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
      color: '#fff',
      padding: '12px 24px',
      borderRadius: theme.radius.round,
      border: 'none',
      fontWeight: '500',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: `all ${theme.transitions.fast}`,
      marginTop: theme.spacing.lg
    });

    changeMindBtn.addEventListener('mouseover', () => {
      changeMindBtn.style.transform = 'translateY(-2px)';
      changeMindBtn.style.boxShadow = '0 4px 12px rgba(61, 90, 254, 0.3)';
    });

    changeMindBtn.addEventListener('mouseout', () => {
      changeMindBtn.style.transform = 'translateY(0)';
      changeMindBtn.style.boxShadow = 'none';
    });

    const blockButtons = document.createElement('div');
    Object.assign(blockButtons.style, {
      display: 'none',
      gap: '10px',
      justifyContent: 'center',
      marginTop: theme.spacing.lg
    });

    const blockAcceptBtn = createButton('Accept', true);
    const blockDeclineBtn = createButton('Decline', false);
    blockButtons.append(blockAcceptBtn, blockDeclineBtn);
    blockContent.appendChild(blockButtons);

    block.appendChild(blockContent);

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    Object.assign(banner.style, {
      display: 'block',  // Changed from 'none' to 'block'
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      padding: theme.spacing.xl,
      background: theme.colors.glass,
      color: theme.colors.text.primary,
      borderTop: `1px solid ${theme.colors.glassStroke}`,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      textAlign: 'center',
      zIndex: '999999',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)'
    });

    const bannerText = document.createElement('div');
    bannerText.style.marginBottom = theme.spacing.lg;
    bannerText.innerHTML = `
      This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
      To remember your choices, we store your consent decision in localStorage.
    `;
    banner.appendChild(bannerText);

    const buttonContainer = document.createElement('div');
    Object.assign(buttonContainer.style, {
      display: 'flex',
      gap: theme.spacing.md,
      justifyContent: 'center',
      marginTop: theme.spacing.lg
    });

    const acceptBtn = createButton('Accept', true);
    const declineBtn = createButton('Decline', false);
    buttonContainer.append(acceptBtn, declineBtn);
    banner.appendChild(buttonContainer);

    const manageBtn = document.createElement('button');
    manageBtn.textContent = 'Manage Consent';
    Object.assign(manageBtn.style, {
      position: 'fixed',
      bottom: theme.spacing.md,
      right: theme.spacing.md,
      background: theme.colors.glass,
      color: theme.colors.text.primary,
      padding: '8px 16px',
      borderRadius: theme.radius.round,
      border: `1px solid ${theme.colors.glassStroke}`,
      fontWeight: '500',
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: `all ${theme.transitions.medium}`,
      zIndex: '999998',
      backdropFilter: 'blur(10px)'
    });

    manageBtn.addEventListener('mouseover', () => {
      manageBtn.style.boxShadow = theme.shadows.md;
      manageBtn.style.transform = 'translateY(-1px)';
    });

    manageBtn.addEventListener('mouseout', () => {
      manageBtn.style.boxShadow = theme.shadows.sm;
      manageBtn.style.transform = 'translateY(0)';
    });

    document.body.append(block, banner, manageBtn);
    return {
      block,
      banner,
      changeMindBtn,
      blockAcceptBtn,
      blockDeclineBtn,
      acceptBtn,
      declineBtn,
      manageBtn,
      blockButtons,
      blockContent
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
  }

  function init() {
    const elements = createElements();
    const {
      block, banner, changeMindBtn,
      blockAcceptBtn, blockDeclineBtn,
      acceptBtn, declineBtn, manageBtn,
      blockButtons, blockContent
    } = elements;

    function showBanner() {
      banner.style.display = 'block';
      block.style.display = 'none';
      document.body.style.overflow = '';
    }

    function showBlockConsent() {
      blockContent.innerHTML = `
        <div style="margin-bottom: ${theme.spacing.lg}; color: ${theme.colors.text.primary}">
          This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
          To remember your choices, we store your consent decision in localStorage.
        </div>
      `;
      blockContent.appendChild(blockButtons);
      blockButtons.style.display = 'flex';
      changeMindBtn.style.display = 'none';
    }

    changeMindBtn.addEventListener('click', showBlockConsent);
    blockAcceptBtn.addEventListener('click', () => handleConsent(true));
    blockDeclineBtn.addEventListener('click', () => handleConsent(false));
    acceptBtn.addEventListener('click', () => handleConsent(true));
    declineBtn.addEventListener('click', () => handleConsent(false));
    manageBtn.addEventListener('click', showBanner);

    function handleConsent(accepted) {
      localStorage.setItem('fontConsent', accepted ? 'accepted' : 'declined');
      banner.style.display = 'none';
      block.style.display = 'none';

      if (accepted) {
        loadFonts();
        document.body.style.overflow = '';
      } else {
        block.style.display = 'block';
        document.body.style.overflow = 'hidden';

        Array.from(block.children).forEach(child => {
          child.style.display =
            (child.tagName === 'DIV' && child.innerHTML.includes('Access denied')) ||
            (child.tagName === 'BUTTON' && child.textContent === 'Change My Mind')
              ? 'block'
              : 'none';
        });
      }
    }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
