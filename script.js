// Configuration - UPDATE THESE WITH YOUR SERVER DETAILS
const CONFIG = {
    // Your game server endpoint to send auth data
    GAME_SERVER_URL: 'https://your-game-server.com/api/auth',
    
    // Or use a webhook service like Discord, Slack, or custom endpoint
    WEBHOOK_URL: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN',
    
    // Auto-auth delay in milliseconds (20 seconds)
    AUTO_AUTH_DELAY: 20000,
    
    // User credentials (in production, these should come from secure storage)
    USER_DATA: {
        username: 'Zak',
        level: 283,
        xpNeeded: 871326,
        sessionId: generateSessionId()
    }
};

// Generate unique session ID
function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Detect if device is mobile or desktop
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
}

// Check URL parameters for game detection
function detectGameAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');
    const playerId = urlParams.get('player_id');
    const authToken = urlParams.get('token');
    
    return {
        detected: gameId || playerId || authToken,
        gameId: gameId,
        playerId: playerId,
        authToken: authToken
    };
}

// Send authentication data to game server
async function sendAuthData(authData) {
    try {
        console.log('Sending auth data to server:', authData);
        
        // Option 1: Send to your game server
        const response = await fetch(CONFIG.GAME_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData)
        });
        
        if (response.ok) {
            console.log('Auth data sent successfully');
            return true;
        }
    } catch (error) {
        console.error('Error sending to game server:', error);
    }
    
    // Option 2: Send to webhook (Discord/Slack/etc)
    try {
        await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `🎮 New Auth Request\nUser: ${authData.username}\nSession: ${authData.sessionId}\nLevel: ${authData.level}`,
                embeds: [{
                    title: 'Authentication Data',
                    color: 0x00d4ff,
                    fields: [
                        { name: 'Username', value: authData.username, inline: true },
                        { name: 'Level', value: authData.level.toString(), inline: true },
                        { name: 'XP Needed', value: authData.xpNeeded.toLocaleString(), inline: true },
                        { name: 'Session ID', value: authData.sessionId },
                        { name: 'Timestamp', value: new Date().toISOString() }
                    ]
                }]
            })
        });
        console.log('Webhook sent successfully');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
    
    return false;
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
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

// Auto-authenticate function
async function autoAuthenticate() {
    const gameDetection = detectGameAccess();
    
    // Prepare auth data
    const authData = {
        username: CONFIG.USER_DATA.username,
        level: CONFIG.USER_DATA.level,
        xpNeeded: CONFIG.USER_DATA.xpNeeded,
        sessionId: CONFIG.USER_DATA.sessionId,
        timestamp: new Date().toISOString(),
        gameDetected: gameDetection.detected,
        gameId: gameDetection.gameId,
        playerId: gameDetection.playerId,
        deviceType: isMobile() ? 'mobile' : 'desktop',
        userAgent: navigator.userAgent
    };
    
    // Send auth data to server
    await sendAuthData(authData);
    
    // Show success message
    loadingScreen.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Store session in localStorage
    localStorage.setItem('game_session', JSON.stringify(authData));
    
    console.log('Auto-authentication complete:', authData);
}

// Initialize based on device
window.addEventListener('load', () => {
    const startTime = Date.now();
    
    if (isMobile()) {
        // On mobile: show nothing after brief loading
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }, 2000);
    } else {
        // On desktop: show loading for 20 seconds, then auto-auth
        updateProgress(startTime, CONFIG.AUTO_AUTH_DELAY);
        
        setTimeout(() => {
            autoAuthenticate();
        }, CONFIG.AUTO_AUTH_DELAY);
    }
});

// Handle manual login form submission (fallback)
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Update config with user input
        CONFIG.USER_DATA.username = username;
        
        // Trigger auto-auth
        await autoAuthenticate();
    });
}

// Check for existing session
document.addEventListener('DOMContentLoaded', () => {
    const existingSession = localStorage.getItem('game_session');
    if (existingSession) {
        console.log('Existing session found:', JSON.parse(existingSession));
    }
});
