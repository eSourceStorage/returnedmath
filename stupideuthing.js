(function() {
  // Create the block screen element (hidden initially)
  const block = document.createElement('div');
  block.id = 'block-screen';
  block.style = `
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: black;
    color: white;
    font-family: sans-serif;
    font-size: 20px;
    text-align: center;
    padding-top: 20vh;
    z-index: 2147483646;
  `;
  block.textContent = 'Access denied: you declined cookie consent.';
  document.body.appendChild(block);

  // Create the consent banner element
  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.style = `
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #222;
    color: #fff;
    padding: 15px;
    font-family: sans-serif;
    font-size: 14px;
    text-align: center;
    z-index: 2147483647;
  `;
  banner.innerHTML = `
    This site uses Google Fonts and Font Awesome, which may transfer your data to the US.<br>
    To remember your choices such as liking or disliking, we store your consent decision locally in your browser using localStorage.<br>
    <button id="accept-btn" style="margin-left:10px;padding:5px 10px;">Accept</button>
    <button id="decline-btn" style="margin-left:5px;padding:5px 10px;">Decline</button>
  `;
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

  // Button event handlers
  document.getElementById('accept-btn').addEventListener('click', () => {
    localStorage.setItem('fontConsent', 'accepted');
    loadFonts();
  });

  document.getElementById('decline-btn').addEventListener('click', () => {
    localStorage.setItem('fontConsent', 'declined');
    try {
      window.open('', '_self').close();
    } catch {
      blockAccess();
    }
    setTimeout(() => {
      if (!window.closed) {
        blockAccess();
      }
    }, 200);
  });

  // Check consent status and show/hide banner or block screen accordingly
  const consent = localStorage.getItem('fontConsent');
  if (consent === 'accepted') {
    loadFonts();
  } else if (consent === 'declined') {
    blockAccess();
  } else {
    banner.style.display = 'block';
    block.style.display = 'none';
  }
})();
