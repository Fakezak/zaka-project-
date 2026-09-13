/**
 * Zaka Project v1 - Auth System
 * This script handles device detection, loading simulation, 
 * and local authentication data generation.
 */

// Configuration
const CONFIG = {
    // Auto-auth delay in milliseconds (20 seconds)
    AUTO_AUTH_DELAY: 10000,
    
    // User Profile Data
    USER_DATA: {
        username: 'Zak',
        level: 283,
        xpNeeded: 871326,
        status: 'Active'
    }
};

// Generate unique session ID for this login instance
function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Detect if device is mobile or desktop
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
}

// Check URL parameters (e.g., ?game_id=FF123)
function detectGameAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        detected: urlParams.toString().length > 0,
        params: Object.fromEntries(urlParams.entries())
    };
}

// Elements
const loadingScreen = document.getElementById('loading-screen');
const desktopView = document.getElementById('desktop-view');
const successMessage = document.getElementById('success-message');
const progressBar = document.getElementById('progress');
const authForm = document.getElementById('auth-form');

// Update progress bar during loading
function updateProgress(startTime, duration) {
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        if (progressBar) progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

// Main Authentication Logic
function performAuth() {
    const gameDetection = detectGameAccess();
    
    // Create the Auth Data Packet (This acts as the "Server Response")
    const authPacket = {
        status: 'SUCCESS',
        timestamp: new Date().toISOString(),
        user: CONFIG.USER_DATA,
        session: generateSessionId(),
        device: isMobile() ? 'mobile' : 'desktop',
        source: gameDetection.detected ? gameDetection.params : 'direct_access'
    };

    // Log to Console (Acting as the server log)
    console.log('✅ AUTHENTICATION SUCCESSFUL');
    console.log('📦 Data Packet:', authPacket);

    // Update UI to show success
    if (loadingScreen) loadingScreen.classList.add('hidden');
    if (successMessage) successMessage.classList.remove('hidden');
    
    // Store session locally
    localStorage.setItem('zaka_auth_session', JSON.stringify(authPacket));
}

// Initialize on Load
window.addEventListener('load', () => {
    const startTime = Date.now();

    if (isMobile()) {
        // Mobile: Show nothing after brief load
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.classList.add('hidden'), 500);
            }
        }, 2000);
    } else {
        // Desktop: 20s Loading -> Auto Success
        if (progressBar) updateProgress(startTime, CONFIG.AUTO_AUTH_DELAY);
        
        setTimeout(() => {
            performAuth();
        }, CONFIG.AUTO_AUTH_DELAY);
    }
});

// Manual Login Fallback
if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Skip waiting and auth immediately
        if (loadingScreen) loadingScreen.classList.add('hidden');
        performAuth();
    });
}
