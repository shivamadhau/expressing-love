/* ═══════════════════════════════════════════════════
   💖 LOVE STUDIO — Interactive Platform & Engine
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── 1. ALL DOM REFERENCES GATHERED AT TOP ───
  // Platform Dashboard
  const platformDashboard  = document.getElementById('platform-dashboard');
  const experienceContainer= document.getElementById('experience-container');
  const topNav              = document.getElementById('top-nav');
  const btnNavDemo          = document.getElementById('btn-nav-demo');
  const btnNavCreate        = document.getElementById('btn-nav-create');
  const btnBackStudio       = document.getElementById('btn-back-studio');
  const btnViralCreate      = document.getElementById('btn-viral-create');

  // Creator Form Controls
  const studioTo            = document.getElementById('studio-to');
  const studioFrom          = document.getElementById('studio-from');
  const studioQuestion      = document.getElementById('studio-question');
  const studioLetter        = document.getElementById('studio-letter');
  const letterCharCount     = document.getElementById('letter-char-count');
  const questionPresets     = document.getElementById('question-presets');
  const mascotPresets       = document.getElementById('mascot-presets');
  const letterPresets       = document.getElementById('letter-presets');
  const btnGenerateMagic    = document.getElementById('btn-generate-magic');
  const btnPreviewFullscreen= document.getElementById('btn-preview-fullscreen');
  const tabBtnCustomize     = document.getElementById('tab-btn-customize');
  const tabBtnPreview       = document.getElementById('tab-btn-preview');
  const studioSection       = document.getElementById('studio-section');

  // Phone Mockup Elements
  const mockupMascot        = document.getElementById('mockup-mascot');
  const mockupQuestion      = document.getElementById('mockup-question');
  const mockupSubtitle      = document.getElementById('mockup-subtitle');

  // Share Modal Elements
  const shareModal          = document.getElementById('share-modal');
  const shareModalOverlay   = document.getElementById('share-modal-overlay');
  const shareLinkInput      = document.getElementById('share-link-input');
  const btnCopyMagic        = document.getElementById('btn-copy-magic');
  const btnShareWhatsapp    = document.getElementById('btn-share-whatsapp');
  const qrCanvas            = document.getElementById('qr-canvas');
  const btnDownloadQr       = document.getElementById('btn-download-qr');
  const btnTestLink         = document.getElementById('btn-test-link');
  const btnCloseShare       = document.getElementById('btn-close-share');

  // Partner Experience Elements
  const heartsCanvas        = document.getElementById('hearts-canvas');
  const heartsCtx           = heartsCanvas ? heartsCanvas.getContext('2d') : null;
  const audioToggle         = document.getElementById('audio-toggle');

  const stageQuestion       = document.getElementById('stage-question');
  const stageCelebrate      = document.getElementById('stage-celebrate');
  const stageLetter         = document.getElementById('stage-letter');
  const stageDate           = document.getElementById('stage-date');
  const allStages           = [stageQuestion, stageCelebrate, stageLetter, stageDate];

  const mascot              = document.getElementById('mascot');
  const questionText        = document.getElementById('question-text');
  const subtitleText        = document.getElementById('subtitle-text');
  const pleaMessage         = document.getElementById('plea-message');
  const btnYes              = document.getElementById('btn-yes');
  const btnNo               = document.getElementById('btn-no');
  const noCounter           = document.getElementById('no-counter');
  const buttonsContainer    = document.getElementById('buttons-container');

  const confettiCanvas      = document.getElementById('confetti-canvas');
  const confettiCtx         = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  const btnNext             = document.getElementById('btn-next');

  const envelope            = document.getElementById('envelope');
  const envelopeArea        = document.getElementById('envelope-area');
  const letterEl            = document.getElementById('letter');
  const letterTo            = document.getElementById('letter-to');
  const letterFrom          = document.getElementById('letter-from');
  const letterContent       = document.getElementById('letter-content');
  const btnDate             = document.getElementById('btn-date');
  const envelopeHint        = document.getElementById('envelope-hint');

  const dateCards           = document.querySelectorAll('.date-card');
  const dateResult          = document.getElementById('date-result');
  const btnRestart          = document.getElementById('btn-restart');

  // ─── 2. TEMPLATES & STATE ───
  const letterTemplates = {
    romantic: "From the moment you came into my life, everything changed for the better. Every smile of yours lights up my entire world, and every moment we share becomes my most treasured memory. I don't need the stars when I have the sparkle in your eyes. You are my today, my tomorrow, and my forever. 💕",
    playful: "You are officially my favorite human, my emergency contact for late-night food cravings, and the only person I will gladly share my dessert with. Life with you is my favorite comedy show. Love you endlessly, you adorable weirdo! 😜💖",
    poetic: "In a world spinning with infinite chaos, you are my serene silence. You are the poetry I never knew how to write, the sunlit morning after endless rain, and the home my soul was always searching for. Forever and always. 🌌✨",
    short: "Just a sweet little reminder that you mean the entire universe to me. Thank you for being you, and for making my heart skip a beat every single day. I love you so much! 🌸💕"
  };

  let config = {
    to: 'Sweetheart',
    from: 'Your Secret Admirer',
    question: 'Do you love me? 🥺',
    mascot: '(づ｡◕‿‿◕｡)づ',
    letter: letterTemplates.romantic
  };

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
  let isDemoMode   = false;

  // ─── 3. CLEAN & SHORT URL PARSING ───
  function decodePayload(str) {
    try {
      let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const json = decodeURIComponent(Array.prototype.map.call(atob(b64), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const from = params.get('from');
    const q = params.get('q');
    const mascot = params.get('m');
    const letterKey = params.get('letter') || params.get('p');
    const customMsg = params.get('msg');

    if (to || from || q || customMsg || letterKey) {
      let resolvedLetter = letterTemplates.romantic;
      if (customMsg) {
        resolvedLetter = customMsg;
      } else if (letterKey && letterTemplates[letterKey]) {
        resolvedLetter = letterTemplates[letterKey];
      }

      return {
        to: to || 'Sweetheart',
        from: from || 'Your Secret Admirer',
        question: q || 'Do you love me? 🥺',
        mascot: mascot || '(づ｡◕‿‿◕｡)づ',
        letter: resolvedLetter
      };
    }

    // Support legacy d param if someone still opens old base64 link
    const dParam = params.get('d');
    if (dParam) {
      const decoded = decodePayload(dParam);
      if (decoded) return decoded;
    }

    return null;
  }

  // ─── 4. STAGE DISPLAY & STATE RESET ───
  function showStage(target) {
    allStages.forEach(function (s) {
      if (s) s.style.display = 'none';
    });
    if (target) {
      target.style.display = 'flex';
      target.style.animation = 'none';
      void target.offsetWidth;
      target.style.animation = 'fadeInUp 0.7s cubic-bezier(0.22,0.61,0.36,1)';
    }
  }

  function updateStage() {
    const s = stages[currentStage % stages.length];
    if (mascot) mascot.textContent = (currentStage === 0) ? config.mascot : s.mascot;
    if (questionText) questionText.textContent = (currentStage === 0) ? config.question : s.question;
    if (subtitleText) subtitleText.textContent = (currentStage === 0) ? ('~ ' + config.from + ' is waiting for your answer') : s.subtitle;

    if (pleaMessage) {
      pleaMessage.textContent = s.plea;
      pleaMessage.classList.remove('shake');
      void pleaMessage.offsetWidth;
      if (s.plea) pleaMessage.classList.add('shake');
    }
  }

  function resetExperienceState() {
    currentStage = 0;
    noCount = 0;
    yesScale = 1;
    noScale = 1;

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

    updateStage();

    if (noCounter) {
      noCounter.classList.remove('visible');
      noCounter.style.display = 'none';
    }

    if (envelopeArea) {
      envelopeArea.style.display = 'flex';
      envelopeArea.classList.remove('disappearing');
    }
    if (envelope) envelope.classList.remove('open');
    if (letterEl) letterEl.style.display = 'none';
    if (envelopeHint) {
      envelopeHint.style.display = 'block';
      envelopeHint.style.opacity = '1';
    }
    if (btnDate) btnDate.style.display = 'none';

    if (dateCards && dateCards.length) {
      dateCards.forEach(function (c) { c.classList.remove('selected'); });
    }
    if (dateResult) dateResult.style.display = 'none';
    if (btnRestart) btnRestart.style.display = 'none';
  }

  function applyConfigToExperience() {
    if (questionText) questionText.textContent = config.question;
    if (subtitleText) subtitleText.textContent = '~ ' + config.from + ' is waiting for your answer';
    if (mascot) mascot.textContent = config.mascot;
    if (letterTo) letterTo.textContent = config.to;
    if (letterFrom) letterFrom.textContent = config.from;
    if (letterContent) letterContent.textContent = config.letter;

    stages[0].question = config.question;
    stages[0].subtitle = '~ ' + config.from + ' is waiting for your answer';
    stages[0].mascot = config.mascot;
  }

  // ─── 5. MODE ROUTING ───
  function startPlatformMode() {
    document.body.classList.add('platform-mode');
    document.body.classList.remove('experience-mode');
    if (platformDashboard) platformDashboard.style.display = 'block';
    if (experienceContainer) experienceContainer.style.display = 'none';
    if (topNav) topNav.style.display = 'flex';
    if (btnBackStudio) btnBackStudio.style.display = 'none';

    updatePhoneMockup();
  }

  function startExperienceMode(fromDemo) {
    isDemoMode = fromDemo;
    document.body.classList.add('experience-mode');
    document.body.classList.remove('platform-mode');
    if (platformDashboard) platformDashboard.style.display = 'none';
    if (experienceContainer) experienceContainer.style.display = 'block';
    if (topNav) topNav.style.display = 'none';

    if (btnBackStudio) {
      btnBackStudio.style.display = fromDemo ? 'block' : 'none';
    }

    applyConfigToExperience();
    resetExperienceState();
    showStage(stageQuestion);
  }

  // ─── 6. PLATFORM CREATOR: REACTIVE PHONE MOCKUP ───
  function updatePhoneMockup() {
    const toVal = studioTo ? (studioTo.value.trim() || 'Sweetheart') : 'Sweetheart';
    const fromVal = studioFrom ? (studioFrom.value.trim() || 'Your Secret Admirer') : 'Your Secret Admirer';
    const qVal = studioQuestion ? (studioQuestion.value.trim() || 'Do you love me? 🥺') : 'Do you love me? 🥺';
    
    const activeMascotBtn = document.querySelector('.mascot-chip.active');
    const mascotVal = activeMascotBtn ? activeMascotBtn.getAttribute('data-mascot') : '(づ｡◕‿‿◕｡)づ';

    if (mockupMascot) mockupMascot.textContent = mascotVal;
    if (mockupQuestion) mockupQuestion.textContent = qVal;
    if (mockupSubtitle) mockupSubtitle.textContent = '~ ' + fromVal + ' is waiting for your answer';

    config.to = toVal;
    config.from = fromVal;
    config.question = qVal;
    config.mascot = mascotVal;
    if (studioLetter) {
      config.letter = studioLetter.value.trim() || letterTemplates.romantic;
      if (letterCharCount) {
        letterCharCount.textContent = studioLetter.value.length + ' characters';
      }
    }
  }

  if (studioTo) studioTo.addEventListener('input', updatePhoneMockup);
  if (studioFrom) studioFrom.addEventListener('input', updatePhoneMockup);
  if (studioQuestion) studioQuestion.addEventListener('input', updatePhoneMockup);
  if (studioLetter) studioLetter.addEventListener('input', updatePhoneMockup);

  if (questionPresets) {
    questionPresets.querySelectorAll('.preset-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        questionPresets.querySelectorAll('.preset-chip').forEach(function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
        const qAttr = btn.getAttribute('data-q');
        if (qAttr === 'custom') {
          if (studioQuestion) {
            studioQuestion.focus();
            studioQuestion.select();
          }
        } else {
          if (studioQuestion) studioQuestion.value = qAttr;
        }
        updatePhoneMockup();
      });
    });
  }

  if (mascotPresets) {
    mascotPresets.querySelectorAll('.mascot-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mascotPresets.querySelectorAll('.mascot-chip').forEach(function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
        updatePhoneMockup();
      });
    });
  }

  if (letterPresets) {
    letterPresets.querySelectorAll('.preset-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        letterPresets.querySelectorAll('.preset-chip').forEach(function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
        const presetKey = btn.getAttribute('data-preset');
        if (letterTemplates[presetKey] && studioLetter) {
          studioLetter.value = letterTemplates[presetKey];
          updatePhoneMockup();
        }
      });
    });
  }

  // Mobile View Switcher
  if (tabBtnCustomize && tabBtnPreview && studioSection) {
    tabBtnCustomize.addEventListener('click', function () {
      tabBtnCustomize.classList.add('active');
      tabBtnPreview.classList.remove('active');
      studioSection.classList.remove('show-preview');
    });
    tabBtnPreview.addEventListener('click', function () {
      tabBtnPreview.classList.add('active');
      tabBtnCustomize.classList.remove('active');
      studioSection.classList.add('show-preview');
    });
  }

  // Scroll to Creator Studio
  if (btnNavCreate && studioSection) {
    btnNavCreate.addEventListener('click', function () {
      studioSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ─── 7. SHORT & CLEAN LINK GENERATOR ───
  function generateShareUrl() {
    updatePhoneMockup();

    let baseUrl = window.location.origin + window.location.pathname;
    if (baseUrl.endsWith('index.html')) {
      baseUrl = baseUrl.replace('index.html', 'love.html');
    } else if (!baseUrl.endsWith('love.html')) {
      if (!baseUrl.endsWith('/')) baseUrl += '/';
      baseUrl += 'love.html';
    }

    const qParams = new URLSearchParams();
    qParams.set('to', config.to || 'Sweetheart');
    qParams.set('from', config.from || 'Your Secret Admirer');

    if (config.question && config.question !== 'Do you love me? 🥺') {
      qParams.set('q', config.question);
    }

    if (config.mascot && config.mascot !== '(づ｡◕‿‿◕｡)づ') {
      qParams.set('m', config.mascot);
    }

    // Check if letter matches one of the presets
    let matchedPreset = null;
    for (const key in letterTemplates) {
      if (letterTemplates[key] === config.letter) {
        matchedPreset = key;
        break;
      }
    }

    if (matchedPreset && matchedPreset !== 'romantic') {
      qParams.set('letter', matchedPreset);
    } else if (!matchedPreset && config.letter) {
      qParams.set('msg', config.letter);
    }

    return baseUrl + '?' + qParams.toString();
  }

  function openShareModal() {
    const magicUrl = generateShareUrl();
    if (shareLinkInput) shareLinkInput.value = magicUrl;

    if (btnShareWhatsapp) {
      const waText = 'Hey ' + config.to + '... I made something special just for you 💕\nOpen it here: ' + magicUrl;
      btnShareWhatsapp.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(waText);
    }

    drawAestheticQRCode(qrCanvas, magicUrl);

    if (shareModal) shareModal.style.display = 'flex';
    playChime();
  }

  if (btnGenerateMagic) btnGenerateMagic.addEventListener('click', openShareModal);

  if (btnCopyMagic) {
    btnCopyMagic.addEventListener('click', function () {
      if (shareLinkInput) {
        shareLinkInput.select();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareLinkInput.value).then(function () {
            btnCopyMagic.textContent = 'Copied! ✅';
            setTimeout(function () { btnCopyMagic.textContent = 'Copy Link 📋'; }, 2000);
          });
        } else {
          document.execCommand('copy');
          btnCopyMagic.textContent = 'Copied! ✅';
          setTimeout(function () { btnCopyMagic.textContent = 'Copy Link 📋'; }, 2000);
        }
        playPop();
      }
    });
  }

  if (btnDownloadQr) {
    btnDownloadQr.addEventListener('click', function () {
      if (qrCanvas) {
        const link = document.createElement('a');
        link.download = 'love-note-qr.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
        playPop();
      }
    });
  }

  if (btnTestLink) {
    btnTestLink.addEventListener('click', function () {
      const url = shareLinkInput ? shareLinkInput.value : '';
      if (url) window.open(url, '_blank');
    });
  }

  if (btnCloseShare) btnCloseShare.addEventListener('click', function () {
    if (shareModal) shareModal.style.display = 'none';
  });
  if (shareModalOverlay) shareModalOverlay.addEventListener('click', function () {
    if (shareModal) shareModal.style.display = 'none';
  });

  if (btnNavCreate) {
    btnNavCreate.addEventListener('click', function () {
      const studioSec = document.getElementById('studio-section');
      if (studioSec) studioSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnNavDemo) {
    btnNavDemo.addEventListener('click', function () {
      updatePhoneMockup();
      startExperienceMode(true);
    });
  }

  if (btnPreviewFullscreen) {
    btnPreviewFullscreen.addEventListener('click', function () {
      updatePhoneMockup();
      startExperienceMode(true);
    });
  }

  if (btnBackStudio) {
    btnBackStudio.addEventListener('click', function () {
      startPlatformMode();
    });
  }

  if (btnViralCreate) {
    btnViralCreate.addEventListener('click', function (e) {
      e.preventDefault();
      startPlatformMode();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 8. CLIENT-SIDE QR CODE GENERATOR ───
  function drawAestheticQRCode(canvas, text) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const grid = 25;
    const cellSize = (size - 24) / grid;
    const offset = 12;

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    function isFinder(r, c) {
      if (r < 7 && c < 7) return true;
      if (r < 7 && c >= grid - 7) return true;
      if (r >= grid - 7 && c < 7) return true;
      return false;
    }

    function isCenterHeart(r, c) {
      return r >= 10 && r <= 14 && c >= 10 && c <= 14;
    }

    function drawFinder(sr, sc) {
      ctx.fillStyle = '#d63384';
      ctx.fillRect(offset + sc * cellSize, offset + sr * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(offset + (sc + 1) * cellSize, offset + (sr + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#d63384';
      ctx.fillRect(offset + (sc + 2) * cellSize, offset + (sr + 2) * cellSize, 3 * cellSize, 3 * cellSize);
    }

    ctx.fillStyle = '#222222';
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (isFinder(r, c) || isCenterHeart(r, c)) continue;
        if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize - 0.5, cellSize - 0.5);
          }
          continue;
        }
        const bit = Math.abs(Math.sin((hash + r * 37 + c * 19) * 0.1) * 10000) % 2 > 0.9;
        if (bit) {
          ctx.fillStyle = ((r + c) % 5 === 0) ? '#ff3366' : '#222222';
          ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }

    drawFinder(0, 0);
    drawFinder(0, grid - 7);
    drawFinder(grid - 7, 0);

    const centerSize = 5 * cellSize;
    const centerPos = offset + 10 * cellSize;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerPos + centerSize / 2, centerPos + centerSize / 2, centerSize / 1.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', centerPos + centerSize / 2, centerPos + centerSize / 2);
  }

  // ─── 9. FLOATING HEARTS BACKGROUND ───
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

    requestAnimationFrame(animateHearts);
  }

  resizeCanvas(heartsCanvas);
  createHearts();
  animateHearts();

  // ─── 10. WEB AUDIO SYSTEM ───
  function ensureAudioCtx() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {}
  }

  function playTone(freq, duration, type, vol, ramp) {
    if (!audioEnabled) return;
    try {
      ensureAudioCtx();
      if (!audioCtx) return;
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
    } catch (e) {}
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

  // ─── 11. BUTTON ACTIONS: RESPONSIVE YES & DODGING NO ───
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

  function handleNoAction() {
    noCount++;
    currentStage++;

    // 10th No: Vanish permanently!
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

      yesScale = 2.5;
      if (btnYes) {
        btnYes.style.transform = 'scale(' + yesScale + ')';
        btnYes.classList.add('glow');
      }

      playPop();
      return;
    }

    updateStage();

    if (noCounter) {
      noCounter.textContent = 'You said no ' + noCount + ' time' + (noCount > 1 ? 's' : '') + '! 😤';
      noCounter.classList.add('visible');
      noCounter.style.display = 'block';
    }

    yesScale = Math.min(2.5, yesScale + 0.18);
    if (btnYes) {
      btnYes.style.transform = 'scale(' + yesScale + ')';
      btnYes.classList.add('glow');
    }

    noScale = Math.max(0.5, noScale - 0.08);
    btnNo.style.transform = 'scale(' + noScale + ')';

    if (noCount >= 3 && !btnNo.classList.contains('dodging')) {
      btnNo.classList.add('dodging');
      if (buttonsContainer) buttonsContainer.style.minHeight = '120px';
    }

    if (noCount >= 3) dodgeButton();
    playPop();
  }

  if (btnNo) {
    btnNo.addEventListener('click', function (e) {
      e.stopPropagation();
      handleNoAction();
    });

    btnNo.addEventListener('mouseenter', function () {
      if (btnNo.classList.contains('dodging')) dodgeButton();
    });

    btnNo.addEventListener('touchstart', function (e) {
      if (btnNo.classList.contains('dodging')) {
        e.preventDefault();
        dodgeButton();
      }
    }, { passive: false });
  }

  if (btnYes) {
    btnYes.addEventListener('click', function (e) {
      e.stopPropagation();
      playSuccess();
      showStage(stageCelebrate);
      launchConfetti();
    });
  }

  // ─── 12. CONFETTI & FIREWORKS ───
  let confettiParticles = [];
  function launchConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    resizeCanvas(confettiCanvas);
    confettiParticles = [];

    const colors = ['#ff6b9d', '#ff3d7f', '#e91e63', '#ffd700', '#ff80ab',
                    '#ff4081', '#f50057', '#ff1744', '#ff6e40', '#ff9100',
                    '#ffea00', '#76ff03', '#00e5ff', '#d500f9', '#651fff'];

    for (let i = 0; i < 180; i++) {
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
        isHeart: Math.random() < 0.3,
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

        if (elapsed > 2500) p.opacity = Math.max(0, p.opacity - 0.02);
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
        requestAnimationFrame(animConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    animConfetti();
  }

  // ─── 13. FLOATING ENVELOPE & LETTER ───
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      playChime();
      showStage(stageLetter);
      if (letterTo) letterTo.textContent = config.to;
      if (letterFrom) letterFrom.textContent = config.from;
      if (letterContent) letterContent.textContent = config.letter;
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

  if (envelope) {
    envelope.addEventListener('click', function () {
      if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        playChime();

        const rect = envelope.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.4;
        spawnEnvelopeHearts(cx, cy);

        if (envelopeHint) {
          envelopeHint.style.opacity = '0';
          setTimeout(function () { envelopeHint.style.display = 'none'; }, 300);
        }

        setTimeout(function () {
          if (envelopeArea) {
            envelopeArea.classList.add('disappearing');
            setTimeout(function () {
              envelopeArea.style.display = 'none';
              if (letterEl) letterEl.style.display = 'block';
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

  // ─── 14. DATE PLANNER & RESTART ───
  if (btnDate) {
    btnDate.addEventListener('click', function () {
      playChime();
      showStage(stageDate);
    });
  }

  if (dateCards && dateCards.length) {
    dateCards.forEach(function (card) {
      card.addEventListener('click', function () {
        dateCards.forEach(function (c) { c.classList.remove('selected'); });
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

        if (btnRestart) btnRestart.style.display = 'inline-block';
      });
    });
  }

  if (btnRestart) {
    btnRestart.addEventListener('click', function () {
      resetExperienceState();
      showStage(stageQuestion);
      playPop();
    });
  }

  // ─── 15. WINDOW RESIZE ───
  window.addEventListener('resize', function () {
    resizeCanvas(heartsCanvas);
    resizeCanvas(confettiCanvas);
    createHearts();
  });

  // ─── 16. RUN INITIAL ROUTE ───
  const isLovePage = window.location.pathname.endsWith('love.html');
  const partnerData = getUrlParams();

  if (isLovePage || partnerData) {
    if (partnerData) {
      config = Object.assign({}, config, partnerData);
    }
    startExperienceMode(false);
  } else {
    startPlatformMode();
  }

});
