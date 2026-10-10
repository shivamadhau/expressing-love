/* ═══════════════════════════════════════════════════
   💖 Expressing Love — Interactive Engine
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── DOM References ───
  const heartsCanvas   = document.getElementById('hearts-canvas');
  const heartsCtx      = heartsCanvas ? heartsCanvas.getContext('2d') : null;
  const audioToggle    = document.getElementById('audio-toggle');

  const stageQuestion  = document.getElementById('stage-question');
  const stageCelebrate = document.getElementById('stage-celebrate');
  const stageLetter    = document.getElementById('stage-letter');
  const stageDate      = document.getElementById('stage-date');

  const mascot         = document.getElementById('mascot');
  const questionText   = document.getElementById('question-text');
  const subtitleText   = document.getElementById('subtitle-text');
  const pleaMessage    = document.getElementById('plea-message');
  const btnYes         = document.getElementById('btn-yes');
  const btnNo          = document.getElementById('btn-no');
  const noCounter      = document.getElementById('no-counter');
  const buttonsContainer = document.getElementById('buttons-container');

  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx    = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  const btnNext        = document.getElementById('btn-next');

  const envelope       = document.getElementById('envelope');
  const letterTo       = document.getElementById('letter-to');
  const letterFrom     = document.getElementById('letter-from');
  const btnDate        = document.getElementById('btn-date');
  const envelopeHint   = document.getElementById('envelope-hint');

  const dateResult     = document.getElementById('date-result');
  const btnRestart     = document.getElementById('btn-restart');

  const customizerModal = document.getElementById('customizer-modal');
  const modalOverlay    = document.getElementById('modal-overlay');
  const inputTo         = document.getElementById('input-to');
  const inputFrom       = document.getElementById('input-from');
  const btnGenerate     = document.getElementById('btn-generate');
  const linkResult      = document.getElementById('link-result');
  const generatedLink   = document.getElementById('generated-link');
  const btnCopy         = document.getElementById('btn-copy');
  const btnCloseModal   = document.getElementById('btn-close-modal');
  const btnCustomize    = document.getElementById('btn-customize');

  // ─── State ───
  const stages = [
    { question: 'Do you love me? 🥺',         subtitle: '~ Someone special is waiting for your answer', mascot: '(づ｡◕‿‿◕｡)づ',  plea: '' },
    { question: 'Are you sure?? 😢',           subtitle: '~ Please reconsider...',                      mascot: '(╥﹏╥)',        plea: 'Nooo! Please think again! 🥺' },
    { question: 'Really really sure? 😭',      subtitle: '~ My heart is breaking...',                   mascot: '(இ﹏இ)',        plea: "You're breaking my heart! 💔" },
    { question: 'Pretty pleaseee? 🙏',         subtitle: "~ I'll be the best!",                         mascot: '(◕ᴗ◕✿)',       plea: 'I promise to make you smile every day! 🌹' },
    { question: 'Last chance... 🥀',           subtitle: "~ Don't say no again...",                     mascot: '(╯°□°)╯︵ ┻━┻', plea: 'NOOOO! You cannot do this! 😫' },
    { question: 'Okay fine... 😞',             subtitle: '~ But look how cute I am!',                   mascot: '(◕‿◕)',         plea: 'Look at my face. HOW CAN YOU SAY NO?! 🐱' },
    { question: "I'm not giving up! 💪",       subtitle: "~ Because you're worth it",                   mascot: '(ง •̀_•́)ง',     plea: 'I will NEVER stop asking! 😤💖' },
    { question: 'PLEASE SAY YES!! 😩',         subtitle: "~ I'm on my knees!",                          mascot: '🧎‍♂️',           plea: "I'm literally begging you right now 🥺🙏" },
  ];

  let currentStage = 0;
  let noCount      = 0;
  let audioEnabled = false;
  let audioCtx     = null;
  let yesScale     = 1;
  let noScale      = 1;

  // ─── URL Personalization ───
  const urlParams  = new URLSearchParams(window.location.search);
  const personTo   = urlParams.get('to') || '';
  const personFrom = urlParams.get('from') || '';

  // ════════════════════════════════════════
  // 1. FLOATING HEARTS BACKGROUND
  // ════════════════════════════════════════
  const heartColors = ['#ff6b9d', '#ff3d7f', '#e91e63', '#ff9a9e', '#f8bbd0', '#ffcdd2', '#ff80ab'];
  let hearts = [];

  function resizeCanvas(canvas) {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createHearts() {
    hearts = [];
    const count = Math.min(35, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < count; i++) {
      hearts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 8 + Math.random() * 22,
        speed: 0.3 + Math.random() * 1.0,
        opacity: 0.08 + Math.random() * 0.35,
        wobbleAmp: 20 + Math.random() * 40,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.015,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        rotation: Math.random() * 0.3 - 0.15
      });
    }
  }

  function drawHeart(ctx, cx, cy, size, color, opacity, rotation) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const s = size * 0.5;
    ctx.moveTo(0, s * 0.4);
    ctx.bezierCurveTo(0, -s * 0.2, -s, -s * 0.5, -s, s * 0.1);
    ctx.bezierCurveTo(-s, s * 0.6, 0, s * 0.9, 0, s * 1.1);
    ctx.bezierCurveTo(0, s * 0.9, s, s * 0.6, s, s * 0.1);
    ctx.bezierCurveTo(s, -s * 0.5, 0, -s * 0.2, 0, s * 0.4);
    ctx.fill();
    ctx.restore();
  }

  let heartAnimFrame;
  function animateHearts() {
    if (!heartsCtx) return;
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);

    for (const h of hearts) {
      h.y -= h.speed;
      h.wobblePhase += h.wobbleSpeed;
      const wx = h.x + Math.sin(h.wobblePhase) * h.wobbleAmp;

      if (h.y + h.size < 0) {
        h.y = window.innerHeight + h.size;
        h.x = Math.random() * window.innerWidth;
      }

      drawHeart(heartsCtx, wx, h.y, h.size, h.color, h.opacity, h.rotation);
    }

    heartAnimFrame = requestAnimationFrame(animateHearts);
  }

  resizeCanvas(heartsCanvas);
  createHearts();
  animateHearts();

  // ════════════════════════════════════════
  // 2. WEB AUDIO — Sound Effects
  // ════════════════════════════════════════
  function ensureAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playTone(freq, duration, type, vol, ramp) {
    if (!audioEnabled) return;
    ensureAudioCtx();
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (ramp) osc.frequency.linearRampToValueAtTime(ramp, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(vol || 0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playPop() {
    playTone(600, 0.08, 'sine', 0.15, 200);
  }

  function playChime() {
    playTone(880, 0.18, 'sine', 0.1);
    setTimeout(function () { playTone(1320, 0.18, 'sine', 0.08); }, 60);
  }

  function playSuccess() {
    playTone(523, 0.15, 'sine', 0.12);
    setTimeout(function () { playTone(659, 0.15, 'sine', 0.12); }, 140);
    setTimeout(function () { playTone(784, 0.22, 'sine', 0.14); }, 280);
    setTimeout(function () { playTone(1047, 0.35, 'sine', 0.1); }, 420);
  }

  // Audio toggle
  if (audioToggle) {
    audioToggle.addEventListener('click', function () {
      audioEnabled = !audioEnabled;
      audioToggle.textContent = audioEnabled ? '🔊' : '🔇';
      if (audioEnabled) {
        ensureAudioCtx();
        playChime();
      }
    });
  }

  // ════════════════════════════════════════
  // 3. STAGE TRANSITIONS
  // ════════════════════════════════════════
  const allStages = [stageQuestion, stageCelebrate, stageLetter, stageDate];

  function showStage(target) {
    allStages.forEach(function (s) {
      if (s) s.style.display = 'none';
    });
    if (target) {
      target.style.display = 'flex';
      target.style.animation = 'none';
      // Force reflow
      void target.offsetWidth;
      target.style.animation = 'fadeInUp 0.7s cubic-bezier(0.22,0.61,0.36,1)';
    }
  }

  // ════════════════════════════════════════
  // 4. NO BUTTON — Dodging & State Machine
  // ════════════════════════════════════════
  function updateStage() {
    const s = stages[currentStage % stages.length];
    if (mascot)       mascot.textContent       = s.mascot;
    if (questionText) questionText.textContent  = s.question;
    if (subtitleText) subtitleText.textContent   = s.subtitle;

    if (pleaMessage) {
      pleaMessage.textContent = s.plea;
      pleaMessage.classList.remove('shake');
      void pleaMessage.offsetWidth;
      if (s.plea) pleaMessage.classList.add('shake');
    }
  }

  function dodgeButton() {
    if (!btnNo || !buttonsContainer) return;
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = containerRect.width - btnRect.width - 10;
    const maxY = containerRect.height - btnRect.height - 10;
    const newX = Math.max(5, Math.random() * Math.max(maxX, 150));
    const newY = Math.max(5, Math.random() * Math.max(maxY, 50));
    btnNo.style.left = newX + 'px';
    btnNo.style.top  = newY + 'px';
  }

  if (btnNo) {
    btnNo.addEventListener('click', function (e) {
      noCount++;
      currentStage++;

      // After 10th No — button disappears forever!
      if (noCount >= 10) {
        btnNo.style.transition = 'all 0.6s ease';
        btnNo.style.transform = 'scale(0)';
        btnNo.style.opacity = '0';
        btnNo.style.pointerEvents = 'none';
        setTimeout(function () {
          btnNo.style.display = 'none';
        }, 600);

        if (questionText) questionText.textContent = 'You have no other option now! 😏';
        if (subtitleText) subtitleText.textContent = '~ Just click Yes already 💖';
        if (mascot) mascot.textContent = '( ˘ ³˘)♥';
        if (pleaMessage) {
          pleaMessage.textContent = 'The No button gave up on you too 😂💀';
          pleaMessage.classList.remove('shake');
          void pleaMessage.offsetWidth;
          pleaMessage.classList.add('shake');
        }
        if (noCounter) {
          noCounter.textContent = 'You said no 10 times! The No button has left the chat 👋😂';
        }

        // Make Yes button extra big and irresistible
        yesScale = 2.5;
        if (btnYes) {
          btnYes.style.transform = 'scale(' + yesScale + ')';
          btnYes.classList.add('glow');
        }

        playPop();
        return;
      }

      // Update content
      updateStage();

      // Show counter
      if (noCounter) {
        noCounter.textContent = 'You said no ' + noCount + ' time' + (noCount > 1 ? 's' : '') + '! 😤';
        noCounter.classList.add('visible');
        noCounter.style.display = 'block';
      }

      // Grow Yes button
      yesScale = Math.min(2.5, yesScale + 0.18);
      if (btnYes) {
        btnYes.style.transform = 'scale(' + yesScale + ')';
        btnYes.classList.add('glow');
      }

      // Shrink No button
      noScale = Math.max(0.5, noScale - 0.08);
      btnNo.style.transform = 'scale(' + noScale + ')';

      // Start dodging after 3rd no
      if (noCount >= 3 && !btnNo.classList.contains('dodging')) {
        btnNo.classList.add('dodging');
        buttonsContainer.style.minHeight = '120px';
      }

      if (noCount >= 3) {
        dodgeButton();
      }

      playPop();
    });

    // Dodge on hover (desktop) — only when dodging is active
    btnNo.addEventListener('mouseenter', function () {
      if (btnNo.classList.contains('dodging')) {
        dodgeButton();
      }
    });

    // Dodge on touch (mobile)
    btnNo.addEventListener('touchstart', function (e) {
      if (btnNo.classList.contains('dodging')) {
        e.preventDefault();
        dodgeButton();
      }
    }, { passive: false });
  }

  // ════════════════════════════════════════
  // 5. YES BUTTON — Celebration!
  // ════════════════════════════════════════
  if (btnYes) {
    btnYes.addEventListener('click', function () {
      playSuccess();
      showStage(stageCelebrate);
      launchConfetti();
    });
  }

  // ════════════════════════════════════════
  // 6. CONFETTI SYSTEM
  // ════════════════════════════════════════
  let confettiParticles = [];
  let confettiAnimFrame;

  function launchConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    resizeCanvas(confettiCanvas);
    confettiParticles = [];

    const colors = ['#ff6b9d', '#ff3d7f', '#e91e63', '#ffd700', '#ff80ab',
                    '#ff4081', '#f50057', '#ff1744', '#ff6e40', '#ff9100',
                    '#ffea00', '#76ff03', '#00e5ff', '#d500f9', '#651fff'];

    for (let i = 0; i < 180; i++) {
      const isHeart = Math.random() < 0.3;
      confettiParticles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4,
        vx: (Math.random() - 0.5) * 14,
        vy: -8 - Math.random() * 12,
        size: 4 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        gravity: 0.18 + Math.random() * 0.12,
        friction: 0.985 + Math.random() * 0.01,
        isHeart: isHeart,
        opacity: 1
      });
    }

    let startTime = Date.now();
    function animConfetti() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      const elapsed = Date.now() - startTime;

      for (const p of confettiParticles) {
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rotation += p.rotSpeed;

        if (elapsed > 2500) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        if (p.opacity <= 0) continue;

        confettiCtx.save();
        confettiCtx.globalAlpha = p.opacity;

        if (p.isHeart) {
          drawHeart(confettiCtx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          confettiCtx.translate(p.x, p.y);
          confettiCtx.rotate(p.rotation);
          confettiCtx.fillStyle = p.color;
          confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          confettiCtx.restore();
        }

        confettiCtx.restore();
      }

      if (elapsed < 5000) {
        confettiAnimFrame = requestAnimationFrame(animConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    animConfetti();
  }

  // ════════════════════════════════════════
  // 7. LOVE LETTER
  // ════════════════════════════════════════
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      playChime();
      showStage(stageLetter);

      // Populate letter with personalized names
      if (letterTo)   letterTo.textContent   = personTo || 'Sweetheart';
      if (letterFrom) letterFrom.textContent = personFrom || 'Your Secret Admirer';
    });
  }

  function spawnEnvelopeHearts(x, y) {
    const emojis = ['💖', '💕', '✨', '💗', '🌸', '💓'];
    for (let i = 0; i < 16; i++) {
      const h = document.createElement('span');
      h.className = 'envelope-pop-heart';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = (x + (Math.random() - 0.5) * 160) + 'px';
      h.style.top  = (y + (Math.random() - 0.5) * 40) + 'px';
      h.style.setProperty('--tx', ((Math.random() - 0.5) * 180) + 'px');
      h.style.setProperty('--ty', (-70 - Math.random() * 110) + 'px');
      h.style.setProperty('--rot', ((Math.random() - 0.5) * 60) + 'deg');
      h.style.animationDelay = (Math.random() * 0.15) + 's';
      document.body.appendChild(h);
      setTimeout(function () { h.remove(); }, 1600);
    }
  }

  // Envelope open
  if (envelope) {
    envelope.addEventListener('click', function () {
      if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        playChime();

        // Spawn popping hearts from envelope location
        const rect = envelope.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.4;
        spawnEnvelopeHearts(cx, cy);

        if (envelopeHint) {
          envelopeHint.style.opacity = '0';
          setTimeout(function () { envelopeHint.style.display = 'none'; }, 300);
        }

        // Envelope dissolves & disappears, letter smoothly centers!
        setTimeout(function () {
          const envArea = document.getElementById('envelope-area');
          if (envArea) {
            envArea.classList.add('disappearing');
            setTimeout(function () {
              envArea.style.display = 'none';
              // Letter emerges centered
              if (letter) {
                letter.style.display = 'block';
              }
              // Button appears below the centered letter
              setTimeout(function () {
                if (btnDate) {
                  btnDate.style.display = 'inline-block';
                  btnDate.style.animation = 'fadeInUp 0.6s ease';
                }
              }, 400);
            }, 450);
          }
        }, 350);
      }
    });
  }

  // ════════════════════════════════════════
  // 8. DATE PLANNER
  // ════════════════════════════════════════
  if (btnDate) {
    btnDate.addEventListener('click', function () {
      playChime();
      showStage(stageDate);
    });
  }

  // Date card selection
  const dateCards = document.querySelectorAll('.date-card');
  dateCards.forEach(function (card) {
    card.addEventListener('click', function () {
      // Deselect all
      dateCards.forEach(function (c) { c.classList.remove('selected'); });
      // Select this
      card.classList.add('selected');
      const dateText = card.getAttribute('data-date');

      playChime();

      if (dateResult) {
        dateResult.textContent = "It's a date! " + dateText + " 💕";
        dateResult.style.display = 'block';
        dateResult.style.animation = 'none';
        void dateResult.offsetWidth;
        dateResult.style.animation = 'fadeInUp 0.6s ease';
      }

      if (btnRestart) {
        btnRestart.style.display = 'inline-block';
      }
    });
  });

  // Restart
  if (btnRestart) {
    btnRestart.addEventListener('click', function () {
      // Reset state
      currentStage = 0;
      noCount = 0;
      yesScale = 1;
      noScale = 1;

      // Reset buttons
      if (btnYes) {
        btnYes.style.transform = 'scale(1)';
        btnYes.classList.remove('glow');
      }
      if (btnNo) {
        btnNo.style.transform = 'scale(1)';
        btnNo.classList.remove('dodging');
        btnNo.style.left = '';
        btnNo.style.top  = '';
        btnNo.style.opacity = '1';
        btnNo.style.pointerEvents = 'auto';
        btnNo.style.display = 'inline-block';
      }
      if (buttonsContainer) buttonsContainer.style.minHeight = '70px';

      // Reset content
      updateStage();
      if (noCounter) {
        noCounter.classList.remove('visible');
        noCounter.style.display = 'none';
      }

      // Reset envelope & letter
      const envArea = document.getElementById('envelope-area');
      if (envArea) {
        envArea.style.display = 'flex';
        envArea.classList.remove('disappearing');
      }
      if (envelope) envelope.classList.remove('open');
      if (letter) letter.style.display = 'none';
      if (envelopeHint) {
        envelopeHint.style.display = 'block';
        envelopeHint.style.opacity = '1';
      }
      if (btnDate) btnDate.style.display = 'none';

      // Reset date
      dateCards.forEach(function (c) { c.classList.remove('selected'); });
      if (dateResult)  dateResult.style.display  = 'none';
      if (btnRestart)  btnRestart.style.display  = 'none';

      // Show question stage
      showStage(stageQuestion);
      playPop();
    });
  }

  // ════════════════════════════════════════
  // 9. CUSTOMIZER MODAL
  // ════════════════════════════════════════
  if (btnCustomize) {
    btnCustomize.addEventListener('click', function () {
      if (customizerModal) customizerModal.style.display = 'flex';
      playPop();
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', function () {
      if (customizerModal) customizerModal.style.display = 'none';
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function () {
      if (customizerModal) customizerModal.style.display = 'none';
    });
  }

  if (btnGenerate) {
    btnGenerate.addEventListener('click', function () {
      const toVal   = (inputTo   ? inputTo.value.trim()   : '') || '';
      const fromVal = (inputFrom ? inputFrom.value.trim() : '') || '';

      const base = window.location.href.split('?')[0];
      let url = base;
      const params = [];
      if (toVal)   params.push('to=' + encodeURIComponent(toVal));
      if (fromVal) params.push('from=' + encodeURIComponent(fromVal));
      if (params.length) url += '?' + params.join('&');

      if (generatedLink) generatedLink.value = url;
      if (linkResult)    linkResult.style.display = 'block';

      playChime();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', function () {
      const link = generatedLink ? generatedLink.value : '';
      if (link && navigator.clipboard) {
        navigator.clipboard.writeText(link).then(function () {
          btnCopy.textContent = 'Copied! ✅';
          setTimeout(function () { btnCopy.textContent = 'Copy Link 📋'; }, 2000);
        });
      } else if (link) {
        // Fallback
        generatedLink.select();
        document.execCommand('copy');
        btnCopy.textContent = 'Copied! ✅';
        setTimeout(function () { btnCopy.textContent = 'Copy Link 📋'; }, 2000);
      }
      playPop();
    });
  }

  // ════════════════════════════════════════
  // 10. WINDOW RESIZE
  // ════════════════════════════════════════
  window.addEventListener('resize', function () {
    resizeCanvas(heartsCanvas);
    resizeCanvas(confettiCanvas);
    createHearts();
  });

  // ════════════════════════════════════════
  // 11. SPARKLE DECORATIONS ON GLASS CARDS
  // ════════════════════════════════════════
  function addSparkles() {
    const cards = document.querySelectorAll('.glass-card');
    const sparkleChars = ['✦', '✧', '⋆', '˚', '·'];
    cards.forEach(function (card) {
      if (card.querySelector('.sparkle')) return; // already added
      for (let i = 0; i < 5; i++) {
        const sp = document.createElement('span');
        sp.className = 'sparkle';
        sp.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sp.style.top  = (Math.random() * 100) + '%';
        sp.style.left = (Math.random() * 100) + '%';
        sp.style.animationDelay = (Math.random() * 3) + 's';
        sp.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        sp.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        card.appendChild(sp);
      }
    });
  }
  addSparkles();

  // ════════════════════════════════════════
  // 12. INITIAL PERSONALIZATION FROM URL
  // ════════════════════════════════════════
  if (personTo || personFrom) {
    const subText = personFrom
      ? '~ ' + personFrom + ' is waiting for your answer'
      : '~ Someone special is waiting for your answer';
    if (subtitleText) subtitleText.textContent = subText;

    // Update first stage data
    stages[0].subtitle = subText;
  }

});