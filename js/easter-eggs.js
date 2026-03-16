/* ===========================================
   Easter Egg System
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Achievement Manager ---------- */
  const Achievements = {
    _key: 'shai_achievements',
    _defs: {
      console_detective: 'Console Detective',
      konami_hacker: 'Konami Hacker',
      pixel_gamer: 'Pixel Gamer',
      code_inspector: 'Code Inspector',
      developer_explorer: 'Developer Explorer',
      terminal_user: 'Terminal User',
      theme_switcher: 'Theme Switcher',
      scroll_master: 'Scroll Master',
    },

    _getAll() {
      try {
        return JSON.parse(localStorage.getItem(this._key)) || {};
      } catch { return {}; }
    },

    unlock(id) {
      const all = this._getAll();
      if (all[id]) return;
      all[id] = Date.now();
      localStorage.setItem(this._key, JSON.stringify(all));
      this._showToast(this._defs[id] || id);

      if (Object.keys(all).length >= 5 && !all.developer_explorer) {
        this.unlock('developer_explorer');
      }
    },

    _showToast(name) {
      const toast = document.getElementById('achievementToast');
      const nameEl = document.getElementById('achievementName');
      if (!toast || !nameEl) return;
      nameEl.textContent = name;
      toast.hidden = false;
      toast.offsetHeight; // Force reflow
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.hidden = true; }, 400);
      }, 3000);
    }
  };

  /* ---------- Shared Helpers ---------- */
  function getCommandResponse(cmd) {
    const commands = {
      help: 'Available commands:\n  about, skills, projects, contact, hire-me, whoami, secret, ai, help',
      about: 'React Native developer with 5+ years experience\nbuilding scalable mobile apps.\nExperienced mobile team lead and scrum master.',
      skills: 'React Native, TypeScript, Redux Toolkit,\nNode.js, REST APIs, MongoDB, MySQL\nGit, Docker, Jenkins, AWS',
      projects: 'Scrolling to projects section...',
      contact: 'Scrolling to contact section...',
      'hire-me': 'Permission granted.\nOpening contact section...',
      whoami: 'Shai Eliav\nReact Native Developer\nMobile Team Lead\nFull Stack Engineer',
      ai: 'Yes, I use AI tools like Copilot.\nBut the architecture decisions are still mine.',
      secret: '📖 Whispers of the Silent City\n\nA fantasy world and story project exploring\nmythology, kingdoms, and divine power.\n\nA hidden passion project beyond code.',
    };
    return commands[cmd] || `Command not found: ${cmd}\nType "help" for available commands.`;
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }

  /* ---------- 1. Console Easter Egg ---------- */
  console.log(`
⚡ Lighthouse score target: 95+
⚡ React Native developer
⚡ Performance matters

Let's build fast apps.

github.com/Shai-E
  `);

  let consoleCheckDone = false;
  const checkConsole = () => {
    if (consoleCheckDone) return;
    const el = new Image();
    Object.defineProperty(el, 'id', {
      get() {
        consoleCheckDone = true;
        Achievements.unlock('console_detective');
      }
    });
    console.debug('%c', el);
  };
  const consoleInterval = setInterval(() => {
    checkConsole();
    if (consoleCheckDone) clearInterval(consoleInterval);
  }, 3000);

  /* ---------- 2. Konami Code ---------- */
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        openDevOverlay();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function openDevOverlay() {
    const overlay = document.getElementById('devOverlay');
    if (!overlay) return;
    overlay.hidden = false;
    const input = document.getElementById('devOverlayInput');
    if (input) input.focus();
    Achievements.unlock('konami_hacker');
  }

  // Dev overlay close
  const devOverlayClose = document.getElementById('devOverlayClose');
  const devOverlay = document.getElementById('devOverlay');
  if (devOverlayClose && devOverlay) {
    devOverlayClose.addEventListener('click', () => { devOverlay.hidden = true; });
    devOverlay.querySelector('.dev-overlay__backdrop').addEventListener('click', () => {
      devOverlay.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !devOverlay.hidden) devOverlay.hidden = true;
    });
  }

  // Dev overlay commands
  const devOverlayInput = document.getElementById('devOverlayInput');
  const devOverlayBody = document.getElementById('devOverlayBody');
  if (devOverlayInput && devOverlayBody) {
    devOverlayInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const cmd = devOverlayInput.value.trim().toLowerCase();
      devOverlayInput.value = '';
      const response = getCommandResponse(cmd);
      devOverlayBody.textContent += `> ${cmd}\n${response}\n\n`;
      devOverlayBody.scrollTop = devOverlayBody.scrollHeight;

      if (cmd === 'projects') scrollToSection('stores');
      if (cmd === 'contact') scrollToSection('contact');
      if (cmd === 'skills') scrollToSection('skills');
    });
  }

  /* ---------- 3. Terminal Mode ---------- */
  const terminal = document.getElementById('terminal');
  const terminalClose = document.getElementById('terminalClose');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  function toggleTerminal() {
    if (!terminal) return;
    if (terminal.hidden) {
      terminal.hidden = false;
      terminalInput.focus();
      terminalOutput.textContent = 'Welcome to Shai\'s portfolio terminal.\nType "help" for available commands.\n\n';
      Achievements.unlock('terminal_user');
    } else {
      terminal.hidden = true;
    }
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'k')) {
      e.preventDefault();
      toggleTerminal();
    }
  });

  if (terminalClose) {
    terminalClose.addEventListener('click', () => { terminal.hidden = true; });
  }

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const cmd = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';
      const response = getCommandResponse(cmd);
      terminalOutput.textContent += `> ${cmd}\n${response}\n\n`;
      terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;

      if (cmd === 'projects') scrollToSection('stores');
      if (cmd === 'hire-me' || cmd === 'contact') scrollToSection('contact');
      if (cmd === 'skills') scrollToSection('skills');
    });
  }

  /* ---------- 4. Pixel Mini Game (Snake) ---------- */
  const siteLogo = document.getElementById('siteLogo');
  let logoClicks = [];

  if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
      e.preventDefault();
      const now = Date.now();
      logoClicks.push(now);
      logoClicks = logoClicks.filter(t => now - t < 3000);
      if (logoClicks.length >= 5) {
        logoClicks = [];
        openSnakeGame();
      }
    });
  }

  function openSnakeGame() {
    const modal = document.getElementById('gameModal');
    if (!modal) return;
    modal.hidden = false;
    Achievements.unlock('pixel_gamer');
    initSnake();
  }

  const gameModalClose = document.getElementById('gameModalClose');
  const gameModal = document.getElementById('gameModal');
  if (gameModalClose && gameModal) {
    gameModalClose.addEventListener('click', () => {
      gameModal.hidden = true;
      if (snakeInterval) clearInterval(snakeInterval);
    });
    gameModal.querySelector('.game-modal__backdrop').addEventListener('click', () => {
      gameModal.hidden = true;
      if (snakeInterval) clearInterval(snakeInterval);
    });
  }

  let snakeInterval = null;

  function initSnake() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gridSize = 15;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = spawnFood();
    let dx = 0, dy = 0;
    let nextDx = 0, nextDy = 0;
    let score = 0;
    let gameRunning = true;

    function spawnFood() {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } while (snake.some(s => s.x === pos.x && s.y === pos.y));
      return pos;
    }

    function draw() {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);

      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? '#6c63ff' : '#857eff';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
      });

      ctx.fillStyle = '#8888a0';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Score: ${score}`, 8, 16);
    }

    function update() {
      if (!gameRunning) return;
      dx = nextDx;
      dy = nextDy;
      if (dx === 0 && dy === 0) { draw(); return; }

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
      }

      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver();
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function gameOver() {
      gameRunning = false;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e4e4ed';
      ctx.font = '18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Score: ${score} · Space to restart`, canvas.width / 2, canvas.height / 2 + 15);
      ctx.textAlign = 'start';
    }

    function handleKey(e) {
      if (gameModal.hidden) return;
      if (e.key === ' ') {
        e.preventDefault();
        snake = [{ x: 10, y: 10 }];
        food = spawnFood();
        dx = 0; dy = 0;
        nextDx = 0; nextDy = 0;
        score = 0;
        gameRunning = true;
        return;
      }
      if (!gameRunning) return;
      switch (e.key) {
        case 'ArrowUp':    if (dy !== 1)  { nextDx = 0; nextDy = -1; } break;
        case 'ArrowDown':  if (dy !== -1) { nextDx = 0; nextDy = 1; }  break;
        case 'ArrowLeft':  if (dx !== 1)  { nextDx = -1; nextDy = 0; } break;
        case 'ArrowRight': if (dx !== -1) { nextDx = 1; nextDy = 0; }  break;
      }
    }

    document.addEventListener('keydown', handleKey);

    // Touch swipe controls for mobile
    let touchStartX = 0, touchStartY = 0;

    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      if (gameModal.hidden) return;
      const touch = e.changedTouches[0];
      const diffX = touch.clientX - touchStartX;
      const diffY = touch.clientY - touchStartY;
      const minSwipe = 20;

      if (Math.abs(diffX) < minSwipe && Math.abs(diffY) < minSwipe) {
        // Tap to restart when game over
        if (!gameRunning) {
          snake = [{ x: 10, y: 10 }];
          food = spawnFood();
          dx = 0; dy = 0;
          nextDx = 0; nextDy = 0;
          score = 0;
          gameRunning = true;
        }
        return;
      }

      if (!gameRunning) return;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && dx !== -1) { nextDx = 1; nextDy = 0; }
        else if (diffX < 0 && dx !== 1) { nextDx = -1; nextDy = 0; }
      } else {
        if (diffY > 0 && dy !== -1) { nextDx = 0; nextDy = 1; }
        else if (diffY < 0 && dy !== 1) { nextDx = 0; nextDy = -1; }
      }
    });

    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(update, 120);
    draw();
  }

  /* ---------- 5. GitHub Hover Easter Egg ---------- */
  const githubIcon = document.getElementById('githubIcon');
  let githubHoverTimer = null;

  if (githubIcon) {
    githubIcon.style.position = 'relative';

    githubIcon.addEventListener('mouseenter', () => {
      githubHoverTimer = setTimeout(() => {
        let tooltip = githubIcon.querySelector('.github__tooltip');
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'github__tooltip';
          tooltip.textContent = 'Curious about my code? → github.com/Shai-E';
          githubIcon.appendChild(tooltip);
        }
        tooltip.classList.add('visible');
      }, 3000);
    });

    githubIcon.addEventListener('mouseleave', () => {
      clearTimeout(githubHoverTimer);
      const tooltip = githubIcon.querySelector('.github__tooltip');
      if (tooltip) tooltip.classList.remove('visible');
    });
  }

  /* ---------- 6. Mobile Shake Easter Egg ---------- */
  let shakeThreshold = 15;
  let lastX = 0, lastY = 0, lastZ = 0;
  let shakeTriggered = false;

  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (e) => {
      if (shakeTriggered) return;
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      if (deltaX + deltaY + deltaZ > shakeThreshold) {
        shakeTriggered = true;
        showConfetti();
        showShakeMessage();
        setTimeout(() => { shakeTriggered = false; }, 5000);
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    });
  }

  function showConfetti() {
    const colors = ['#6c63ff', '#ff6b6b', '#4ecdc4', '#ff9f43', '#e4e4ed'];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = (1.5 + Math.random()) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  function showShakeMessage() {
    const msg = document.createElement('div');
    msg.className = 'shake-message';
    msg.innerHTML = 'Performance optimized 🚀<br><small>FlatList rendering at 60fps.</small>';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }

  /* ---------- 7. Secret Developer Theme ---------- */
  const logoEl = document.querySelector('.nav__logo');
  let themeClicks = [];

  if (logoEl) {
    logoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const now = Date.now();
      themeClicks.push(now);
      themeClicks = themeClicks.filter(t => now - t < 2000);
      if (themeClicks.length >= 3) {
        themeClicks = [];
        toggleDevTheme();
      }
    });
  }

  function toggleDevTheme() {
    const isDevTheme = document.body.classList.toggle('dev-theme');
    Achievements.unlock('theme_switcher');

    if (isDevTheme) {
      const msg = document.createElement('div');
      msg.className = 'shake-message';
      msg.innerHTML = 'Entering developer mode...<br><small style="color: #00ff00;">Terminal aesthetic activated</small>';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 2000);
    }
  }

  /* ---------- 8. Scroll Completion Achievement ---------- */
  const scrollComplete = document.getElementById('scrollComplete');
  if (scrollComplete) {
    const achievementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Achievements.unlock('scroll_master');
          achievementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    achievementObserver.observe(scrollComplete);
  }

  /* ---------- 9. Recruiter Detection Popup ---------- */
  let recruiterShown = false;
  const recruiterDismissed = sessionStorage.getItem('recruiter_dismissed');

  if (!recruiterDismissed) {
    setTimeout(() => {
      if (recruiterShown) return;
      recruiterShown = true;
      const popup = document.getElementById('recruiterPopup');
      if (popup) popup.hidden = false;
    }, 30000);
  }

  const recruiterClose = document.getElementById('recruiterClose');
  const recruiterPopup = document.getElementById('recruiterPopup');
  const recruiterCTA = document.getElementById('recruiterCTA');

  if (recruiterClose && recruiterPopup) {
    recruiterClose.addEventListener('click', () => {
      recruiterPopup.hidden = true;
      sessionStorage.setItem('recruiter_dismissed', '1');
    });
  }

  if (recruiterCTA && recruiterPopup) {
    recruiterCTA.addEventListener('click', () => {
      recruiterPopup.hidden = true;
      sessionStorage.setItem('recruiter_dismissed', '1');
    });
  }

});
