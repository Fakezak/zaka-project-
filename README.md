# 🎮 Zaka Project v1 - Game Authentication System

> **Private authentication gateway for game integration with auto-detection and webhook support**

---

## 📸 Preview

### Desktop Authentication Flow
![Zaka Auth Desktop](https://via.placeholder.com/800x450/ff6b00/ffffff?text=Zaka+Project+v1+-+Desktop+Auth+UI)

### Mobile View
![Zaka Mobile](https://via.placeholder.com/400x800/1a1a1a/ffffff?text=Mobile+-+Blank+Screen)

### Success Screen
![Zaka Success](https://via.placeholder.com/800x450/ffd700/000000?text=Authentication+Success)

---

## 🎬 Demo Video

[![Zaka Project Demo](https://via.placeholder.com/800x450/ff6b00/ffffff?text=▶+Watch+Demo+Video)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

> 📺 **Watch the full walkthrough** — desktop auth, mobile detection, webhook payload, and Free Fire integration demo.

---

## 🔥 Free Fire Integration

### Free Fire Auth Overlay
![Free Fire Auth](https://via.placeholder.com/800x450/ff9500/ffffff?text=Free+Fire+Auth+Overlay)

### Free Fire Menu Preview
![Free Fire Menu](https://via.placeholder.com/800x450/ff6b00/ffffff?text=Free+Fire+Menu+UI)

### ESP / Visual Overlay Demo
![ESP Overlay](https://via.placeholder.com/800x450/000000/00ff00?text=ESP+Visual+Overlay+%28Testing%29)

> ⚠️ **Disclaimer**: All Free Fire imagery and "cheat" references are for **UI/UX experimentation and educational purposes only**. This project does **not** provide actual game cheats, hacks, or modifications. It is a standalone authentication gateway demo.

---

## 🚀 Features

- ✅ **Auto-Authentication**: 20-second loading screen with automatic auth completion
- ✅ **Device Detection**: Desktop shows full UI, mobile shows nothing (blank screen)
- ✅ **Game Link Detection**: Automatically detects when game client reads the URL via parameters
- ✅ **Webhook Integration**: Sends auth data to Discord, Slack, or custom game server
- ✅ **Progressive Loading**: Animated progress bar with real-time updates
- ✅ **Session Management**: Stores session data in localStorage for persistence
- ✅ **Personalized UI**: Displays username "Zak", level 283, and XP requirements
- ✅ **Free Fire Theme**: Orange/yellow gradient UI inspired by Free Fire aesthetics

---

## 📦 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/zaka-project-v1.git
cd zaka-project-v1
```

### 2. Configure Settings
Edit `script.js` and update the CONFIG section:
```javascript
const CONFIG = {
    GAME_SERVER_URL: 'https://your-game-server.com/api/auth',
    WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL',
    AUTO_AUTH_DELAY: 20000,
    USER_DATA: {
        username: 'Zak',
        level: 283,
        xpNeeded: 871326
    }
};
```

### 3. Deploy to Netlify
- Push to GitHub
- Connect repository to Netlify
- Enable password protection for privacy 🔒

---

## 🎯 Usage

### Game Client Integration
Your game should read this URL:
```
https://your-site.netlify.app/auth?game_id=FF123&player_id=Zak&token=abc123
```

### What Happens:
1. **Desktop**: Shows 20s loading → Auto-authenticates → Sends data to server
2. **Mobile**: Shows brief loading → Blank screen (nothing visible)
3. **Server Receives**: JSON payload with user data, session ID, and device info

---

## 🎨 Customization Ideas

### Add Visual Enhancements:
- 🎬 **Sticker Videos**: Add animated stickers/GIFs to success screen
- 🎮 **Free Fire Theme**: Customize colors to match Free Fire game aesthetics (orange/yellow theme)
- ✨ **Particle Effects**: Add background animations during loading
- 🎵 **Sound Effects**: Play audio on successful authentication
- 🖼️ **Custom Logos**: Replace emoji with game-specific branding

### Example Free Fire Styling:
```css
/* Add to style.css */
body {
    background: linear-gradient(135deg, #ff6b00 0%, #ff9500 100%);
}

.title {
    background: linear-gradient(90deg, #ff6b00, #ffd700);
    -webkit-background-clip: text;
}
```

### Sticker Video Overlay Example:
```html
<!-- Add to index.html -->
<div class="sticker-overlay">
    <video autoplay loop muted playsinline>
        <source src="assets/sticker-fire.mp4" type="video/mp4">
    </video>
</div>
```

```css
.sticker-overlay {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 150px;
    z-index: 9999;
    pointer-events: none;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}
```

---

## 📡 Webhook Payload Example

When auth completes, your server receives:
```json
{
  "username": "Zak",
  "level": 283,
  "xpNeeded": 871326,
  "sessionId": "sess_1234567890_abc123",
  "timestamp": "2026-09-14T10:30:00Z",
  "gameDetected": true,
  "gameId": "FF123",
  "playerId": "Zak",
  "deviceType": "desktop"
}
```

---

## 🔒 Security Notes

- ⚠️ **Private Deployment**: Always enable Netlify password protection
- ⚠️ **Environment Variables**: For production, move sensitive URLs to Netlify environment variables
- ⚠️ **HTTPS Only**: Netlify provides free SSL certificates
- ⚠️ **Rate Limiting**: Consider adding rate limits to prevent abuse

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: Netlify (with GitHub integration)
- **Detection**: URLSearchParams API, User-Agent sniffing
- **Communication**: Fetch API for POST requests
- **Media**: MP4/WebM sticker videos, PNG/GIF overlays

---

## 📁 Project Structure

```
zaka-project-v1/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── sticker-fire.mp4
│   ├── sticker-success.gif
│   ├── freefire-logo.png
│   └── bg-particles.mp4
├── screenshots/
│   ├── desktop-auth.png
│   ├── mobile-blank.png
│   ├── success-screen.png
│   └── freefire-menu.png
└── README.md
```

---

## 📝 Version History

**v1.1** (September 2026)
- Added Free Fire theme assets
- Added sticker video overlay support
- Added ESP/visual overlay demo (testing only)
- Updated README with images and demo video

**v1.0** (September 2026)
- Initial release
- Auto-authentication system
- Mobile/desktop detection
- Webhook integration
- Free Fire inspired design ready

---

## 🎮 Future Enhancements

- [ ] Add sticker video overlays on success screen
- [ ] Integrate Free Fire API for real-time player stats
- [ ] Add battle pass tracking interface
- [ ] Implement daily login reward system
- [ ] Add teleportation/menu overlay features
- [ ] Create ESP-style visual overlays for testing
- [ ] Add animated Free Fire character stickers
- [ ] Add sound effects on auth success

---

## ⚠️ Legal Disclaimer

This project is a **UI/UX demonstration and authentication gateway template**. It does **not**:
- Provide cheats, hacks, or mods for Free Fire or any game
- Bypass anti-cheat systems
- Modify game files or memory
- Violate any game's Terms of Service

All game-related imagery is used for **educational and design reference purposes only**. Users are responsible for complying with all applicable laws and game policies.

---

## 📞 Support

For issues or questions, open an issue on GitHub or contact the developer.

---

**Made with ❤️ by Zak | Zaka Project v1**

*Perfect for game developers, UI experimenters, and automation enthusiasts* 🚀
