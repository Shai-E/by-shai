# Easter Eggs — by-shai.net

## 1. Console Message
- **Trigger:** Open the browser DevTools console
- **Effect:** A styled message prints with tech stats and a link to GitHub
- **Achievement:** 🏆 *Console Detective*

## 2. Konami Code → Dev Overlay
- **Trigger:** Type the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
- **Effect:** Opens a retro dev overlay with a command-line interface (same commands as the terminal)
- **Achievement:** 🏆 *Konami Hacker*

## 3. Terminal Mode
- **Trigger:** Press `Ctrl + `` ` or `Ctrl + K`
- **Effect:** Opens an in-page terminal emulator
- **Commands:** `help`, `about`, `skills`, `projects`, `contact`, `hire-me`, `whoami`, `secret`, `ai`
- **Secret command:** `secret` reveals "Whispers of the Silent City" — a hidden fantasy/story project
- **Achievement:** 🏆 *Terminal User*

## 4. Snake Game
- **Trigger:** Click the site logo 5 times within 3 seconds
- **Effect:** Opens a playable Snake mini-game on a canvas. Arrow keys to move, Space to restart
- **Achievement:** 🏆 *Pixel Gamer*

## 5. GitHub Hover Tooltip
- **Trigger:** Hover over the GitHub icon for 3+ seconds
- **Effect:** A tooltip fades in: "Curious about my code? → github.com/Shai-E"

## 6. Mobile Shake → Confetti
- **Trigger:** Shake your phone (requires device motion support)
- **Effect:** 50 confetti pieces rain down + a toast message: "Performance optimized 🚀 — FlatList rendering at 60fps"

## 7. Secret Developer Theme
- **Trigger:** Right-click the nav logo 3 times within 2 seconds
- **Effect:** Toggles a green-on-black monospace "developer mode" theme across the whole site
- **Achievement:** 🏆 *Theme Switcher*

## 8. Scroll Completion
- **Trigger:** Scroll all the way to the bottom of the page (scroll completion bar reaches 100%)
- **Effect:** Unlocks an achievement
- **Achievement:** 🏆 *Scroll Master*

## 9. Recruiter Popup
- **Trigger:** Stay on the site for 30 seconds (dismissed per session)
- **Effect:** A popup appears: "Looking for a React Native developer?" with a CTA linking to the CV

## 10. HTML Comment
- **Trigger:** Inspect the page source / view HTML
- **Effect:** A hidden comment in the markup rewards the curious inspector
- **Achievement:** 🏆 *Code Inspector*

---

## Achievement System
Achievements are tracked in `localStorage` under the key `shai_achievements`. A toast notification slides in when each one is unlocked.

| ID                  | Name               | Trigger                           |
|---------------------|--------------------|-----------------------------------|
| console_detective   | Console Detective  | Open DevTools console             |
| konami_hacker       | Konami Hacker      | Enter Konami Code                 |
| terminal_user       | Terminal User      | Open the terminal                 |
| pixel_gamer         | Pixel Gamer        | Launch the Snake game             |
| theme_switcher      | Theme Switcher     | Activate dev theme                |
| scroll_master       | Scroll Master      | Scroll to the bottom              |
| code_inspector      | Code Inspector     | Inspect source / find HTML comment|
| developer_explorer  | Developer Explorer  | Unlock any 5 other achievements   |
