// URL Parameter Redirect Script
// Detects URL parameters and handles redirects based on "isOther" and "to" values

function handleUrlRedirect() {
    // Get the current URL
    const currentUrl = new URL(window.location.href);
    
    // Extract URL parameters
    const urlParams = new URLSearchParams(currentUrl.search);
    
    // Get the "isOther" and "to" parameters
    const isOther = urlParams.get('isOther');
    const to = urlParams.get('to');
    
    // Check if both parameters exist
    if (isOther !== null && to !== null) {
        // Convert isOther to boolean (handles "true", "false", "1", "0")
        const isOtherBool = isOther.toLowerCase() === 'true' || isOther === '1';
        
        let redirectUrl;
        
        if (isOtherBool) {
            // If isOther is true, treat "to" as a complete URL
            redirectUrl = to;
            
            // Validate that it's a proper URL
            try {
                new URL(redirectUrl);
            } catch (error) {
                console.error('Invalid URL provided in "to" parameter:', to);
                return;
            }
        } else {
            // If isOther is false, append "to" to the current domain
            const currentDomain = currentUrl.origin;
            
            // Ensure "to" starts with a forward slash for proper path construction
            const path = to.startsWith('/') ? to : '/' + to;
            redirectUrl = currentDomain + path;
        }
        
        // Log the redirect for debugging
        console.log(`Redirecting to: ${redirectUrl}`);
        
        // Perform the redirect
        window.location.href = redirectUrl;
    } else {
        // Log if parameters are missing
        if (isOther === null) {
            console.log('Parameter "isOther" not found in URL');
        }
        if (to === null) {
            console.log('Parameter "to" not found in URL');
        }
    }
}

// Function to manually test with custom parameters
function testRedirect(isOther, to) {
    const testUrl = new URL(window.location.href);
    testUrl.searchParams.set('isOther', isOther);
    testUrl.searchParams.set('to', to);
    
    // Create a temporary URL object to test the logic
    const urlParams = new URLSearchParams(testUrl.search);
    const isOtherParam = urlParams.get('isOther');
    const toParam = urlParams.get('to');
    
    const isOtherBool = isOtherParam.toLowerCase() === 'true' || isOtherParam === '1';
    
    let redirectUrl;
    if (isOtherBool) {
        redirectUrl = toParam;
    } else {
        const currentDomain = window.location.origin;
        const path = toParam.startsWith('/') ? toParam : '/' + toParam;
        redirectUrl = currentDomain + path;
    }
    
    console.log(`Test redirect: isOther=${isOther}, to=${to} -> ${redirectUrl}`);
    return redirectUrl;
}

// Run the redirect handler when the page loads
document.addEventListener('DOMContentLoaded', handleUrlRedirect);

// Alternative: Run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleUrlRedirect);
} else {
    handleUrlRedirect();
}

// Export functions for manual testing
window.handleUrlRedirect = handleUrlRedirect;
window.testRedirect = testRedirect;
