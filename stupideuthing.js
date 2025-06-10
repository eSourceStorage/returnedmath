(function() {
  // Create banner element
  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.style = `
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    background: #222;
    color: white;
    padding: 1rem;
    text-align: center;
    z-index: 9999;
  `;
  banner.innerHTML = `
    <p style="margin:0; padding: 0.5rem;">
      This site uses Google Fonts and Font Awesome which may transfer your IP to US servers. Please accept to continue.
    </p>
    <button id="accept-btn" style="margin:0.5rem; padding:0.5rem 1rem;">Accept</button>
    <button id="decline-btn" style="margin:0.5rem; padding:0.5rem 1rem;">Decline</button>
  `;

  // Create blocking screen for decline
  const blockScreen = document.createElement('div');
  blockScreen.id = 'block-screen';
  blockScreen.style = `
    display: none;
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background: black;
    color: white;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    flex-direction: column;
  `;
  blockScreen.innerHTML = `
    <h1>Access Denied</h1>
    <p>You declined data consent. This site cannot be used without it.</p>
  `;

  // Append banner and block screen to body
  document.body.appendChild(banner);
  document.body.appendChild(blockScreen);

  // Load fonts only if accepted
  function loadExternalFonts() {
    if (document.getElementById('gf-link')) return; // avoid duplicates
    const gf = document.createElement('link');
    gf.id = 'gf-link';
    gf.rel = 'stylesheet';
    gf.href = 'https://fonts.googleapis.com/css2?family=Roboto&display=swap';
    document.head.appendChild(gf);

    const fa = document.createElement('link');
    fa.id = 'fa-link';
    fa.rel = 'stylesheet';
    fa.href = 'https://use.fontawesome.com/releases/v6.5.0/css/all.css';
    document.head.appendChild(fa);
  }

  // Accept handler
  document.addEventListener('click', function(e) {
    if (e.target.id === 'accept-btn') {
      localStorage.setItem('fontConsent', 'accepted');
      banner.style.display = 'none';
      blockScreen.style.display = 'none';
      document.body.style.overflow = '';
      loadExternalFonts();
    } else if (e.target.id === 'decline-btn') {
      localStorage.setItem('fontConsent', 'declined');
      banner.style.display = 'none';
      blockScreen.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });

  // On load, check consent
  window.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('fontConsent');
    if (consent === 'accepted') {
      banner.style.display = 'none';
      loadExternalFonts();
    } else if (consent === 'declined') {
      banner.style.display = 'none';
      blockScreen.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
})();
