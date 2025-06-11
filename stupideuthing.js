(function() {
  // Create block screen div and styles
  const block = document.createElement('div');
  block.id = 'block-screen';
  block.textContent = 'Access denied: you declined cookie consent.';
  Object.assign(block.style, {
    display: 'none',
    position: 'fixed',
    top: '0', left: '0', right: '0', bottom: '0',
    background: 'black',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    textAlign: 'center',
    paddingTop: '20vh',
    zIndex: '2147483646',
  });
  document.body.appendChild(block);

  // Create consent banner div and styles
  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.innerHTML = `
    This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
    To remember your choices such as liking or disliking, we store your consent decision locally in your browser using localStorage.<br>
  `;

  Object.assign(banner.style, {
    position: 'fixed',
    bottom: '0', left: '0', right: '0',
    background: '#222',
    color: '#fff',
    padding: '15px',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textAlign: 'center',
    zIndex: '2147483647',
  });

  // Create Accept button
  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'Accept';
  Object.assign(acceptBtn.style, {
    marginLeft: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  });

  // Create Decline button
  const declineBtn = document.createElement('button');
  declineBtn.textContent = 'Decline';
  Object.assign(declineBtn.style, {
    marginLeft: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  });

  banner.appendChild(acceptBtn);
  banner.appendChild(declineBtn);

  document.body.appendChild(banner);

  // Function to load Google Fonts & Font Awesome
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

  // Function to block access when declined
  function blockAccess() {
    banner.style.display = 'none';
    block.style.display = 'block';
    document.body.style.overflow = 'hidden'; // prevent scrolling
  }

  // Accept button handler
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('fontConsent', 'accepted');
    loadFonts();
  });

  // Decline button handler
  declineBtn.addEventListener('click', () => {
    window.location.href = "about:blank"
  });

  // On load, check consent status
  const consent = localStorage.getItem('fontConsent');
  if (consent === 'accepted') {
    loadFonts();
  } else if (consent === 'declined') {
    blockAccess();
  } else {
    banner.style.display = 'block';
    block.style.display = 'none';
    document.body.style.overflow = '';
  }
})();
