(() => {
  // Add theme constants
  const theme = {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      border: '#dee2e6'
    },
    shadows: {
      normal: '0 2px 4px rgba(0,0,0,0.1)',
      raised: '0 4px 6px rgba(0,0,0,0.1)'
    }
  };

  interface StyleObject {
    [key: string]: string;
  }

  interface ConsentElements {
    block: HTMLDivElement;
    banner: HTMLDivElement;
    changeMindBtn: HTMLButtonElement;
    consentManagerBtn: HTMLButtonElement;
  }

  const createElements = (): ConsentElements => {
    // Block screen
    const block = document.createElement('div');
    block.id = 'block-screen';
    const blockStyles: StyleObject = {
      display: 'none',
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      background: theme.colors.background,
      color: theme.colors.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '20px',
      textAlign: 'center',
      paddingTop: '20vh',
      zIndex: '2147483646',
    };
    Object.assign(block.style, blockStyles);

    // Change mind button
    const changeMindBtn = document.createElement('button');
    changeMindBtn.textContent = 'Change My Mind';
    const changeMindStyles: StyleObject = {
      marginTop: '20px',
      padding: '12px 24px',
      fontSize: '16px',
      cursor: 'pointer',
      background: theme.colors.primary,
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      boxShadow: theme.shadows.normal,
      transition: 'all 0.2s ease',
      fontWeight: '500',
    };
    Object.assign(changeMindBtn.style, changeMindStyles);
    
    block.innerHTML = 'Access denied: you declined cookie consent.';
    block.appendChild(changeMindBtn);

    // Consent banner
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    const bannerStyles: StyleObject = {
      position: 'fixed',
      bottom: '0', left: '0', right: '0',
      background: theme.colors.surface,
      color: theme.colors.text,
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '14px',
      textAlign: 'center',
      zIndex: '2147483647',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      borderTop: `1px solid ${theme.colors.border}`,
    };
    Object.assign(banner.style, bannerStyles);
    
    banner.innerHTML = `
      This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
      To remember your choices such as liking or disliking, we store your consent decision locally in your browser using localStorage.<br>
    `;

    // Consent manager button
    const consentManagerBtn = document.createElement('button');
    consentManagerBtn.textContent = 'Manage Consent Settings';
    const consentManagerStyles: StyleObject = {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '8px 16px',
      fontSize: '12px',
      cursor: 'pointer',
      background: theme.colors.secondary,
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      boxShadow: theme.shadows.normal,
      zIndex: '2147483645',
      transition: 'all 0.2s ease',
    };
    Object.assign(consentManagerBtn.style, consentManagerStyles);

    const buttons = createConsentButtons();
    banner.appendChild(buttons.acceptBtn);
    banner.appendChild(buttons.declineBtn);

    document.body.appendChild(block);
    document.body.appendChild(banner);
    document.body.appendChild(consentManagerBtn);

    return { block, banner, changeMindBtn, consentManagerBtn };
  };

  const createConsentButtons = () => {
    const buttonStyles: StyleObject = {
      marginLeft: '10px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      background: theme.colors.primary,
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      boxShadow: theme.shadows.normal,
      transition: 'all 0.2s ease',
      fontWeight: '500',
    };

    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Accept';
    Object.assign(acceptBtn.style, buttonStyles);

    const declineBtn = document.createElement('button');
    declineBtn.textContent = 'Decline';
    Object.assign(declineBtn.style, buttonStyles);

    return { acceptBtn, declineBtn };
  };

  const loadFonts = (elements: ConsentElements): void => {
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

    hideConsent(elements);
  };

  const showConsent = (elements: ConsentElements): void => {
    elements.banner.style.display = 'block';
    elements.block.style.display = 'none';
    document.body.style.overflow = '';
  };

  const hideConsent = (elements: ConsentElements): void => {
    elements.banner.style.display = 'none';
    elements.block.style.display = 'none';
    document.body.style.overflow = '';
  };

  const blockAccess = (elements: ConsentElements): void => {
    elements.banner.style.display = 'none';
    elements.block.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const init = (): void => {
    const elements = createElements();
    const { block, banner, changeMindBtn, consentManagerBtn } = elements;

    const handleConsent = (accepted: boolean) => {
      localStorage.setItem('fontConsent', accepted ? 'accepted' : 'declined');
      if (accepted) {
        loadFonts(elements);
      } else {
        blockAccess(elements);
      }
    };

    // Event listeners
    changeMindBtn.addEventListener('click', () => showConsent(elements));
    consentManagerBtn.addEventListener('click', () => showConsent(elements));
    
    const buttons = banner.querySelectorAll('button');
    buttons[0].addEventListener('click', () => handleConsent(true));
    buttons[1].addEventListener('click', () => handleConsent(false));

    // Initial state
    const consent = localStorage.getItem('fontConsent');
    if (consent === 'accepted') {
      loadFonts(elements);
    } else if (consent === 'declined') {
      blockAccess(elements);
    } else {
      showConsent(elements);
    }
  };

  init();
})();
