/* ═══════════════════════════════════════════════════
   💖 LOVE STUDIO — Interactive Platform & Supabase Engine
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── 0. SUPABASE CONFIGURATION ───
  const SUPABASE_URL = 'https://kkedhoeviqgdzpcwxmyq.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZWRob2V2aXFnZHpwY3d4bXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MzAyMTcsImV4cCI6MjEwNzIwNjIxN30.Lm10XUnfJ5P1tBze7MDhdcJTFEDzDEKkItWZ_ZNnj8o';
  let activeNoteId = null;

  // ─── 1. ALL DOM REFERENCES GATHERED AT TOP ───
  // Platform Dashboard
  const platformDashboard  = document.getElementById('platform-dashboard');
  const experienceContainer= document.getElementById('experience-container');
  const topNav              = document.getElementById('top-nav');
  const btnNavDemo          = document.getElementById('btn-nav-demo');
  const btnNavCreate        = document.getElementById('btn-nav-create');
  const btnNavTrack         = document.getElementById('btn-nav-track');
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
  const btnOpenTrackerFromShare = document.getElementById('btn-open-tracker-from-share');
  const qrCanvas            = document.getElementById('qr-canvas');
  const btnDownloadQr       = document.getElementById('btn-download-qr');
  const btnTestLink         = document.getElementById('btn-test-link');
  const btnCloseShare       = document.getElementById('btn-close-share');

  // Tracker Modal Elements
  const trackerModal        = document.getElementById('tracker-modal');
  const trackerModalOverlay = document.getElementById('tracker-modal-overlay');
  const trackerNoteIdInput  = document.getElementById('tracker-note-id-input');
  const btnRefreshTracker   = document.getElementById('btn-refresh-tracker');
  const btnCloseTracker     = document.getElementById('btn-close-tracker');
  const valOpened           = document.getElementById('val-opened');
  const subOpened           = document.getElementById('sub-opened');
  const valYes              = document.getElementById('val-yes');
  const subYes              = document.getElementById('sub-yes');
  const valNoClicks         = document.getElementById('val-no-clicks');
  const valDate             = document.getElementById('val-date');
  const subDate             = document.getElementById('sub-date');

  // Partner Experience Elements
  const heartsCanvas        = document.getElementById('hearts-canvas');
  const heartsCtx           = heartsCanvas ? heartsCanvas.getContext('2d') : null;

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
    { question: 'Are you sure? 🥺💔',          subtitle: '~ Think about all our late night chats...', mascot: '(╥﹏╥)',          plea: 'Please reconsider! 🥺' },
    { question: 'Really really sure? 😢',       subtitle: '~ Who will share funny memes with you?',  mascot: '(っ- ‸ - ς)',     plea: 'My heart is breaking... 💔' },
    { question: 'Think again, please! 😭',     subtitle: '~ I baked you imaginary cookies today 🍪', mascot: '(ಥ﹏ಥ)',          plea: 'Look at those puppy eyes! 🐶' },
    { question: "Don't do this to me! 🥺👉👈", subtitle: '~ I promise to always let you have the last bite', mascot: '(ノ_<。)',  plea: 'Is this your final answer? 😢' },
    { question: 'Have a heart! ❤️‍🩹',           subtitle: '~ Even Google says we belong together',    mascot: 'ʕo•̥_•̥•ʔ',         plea: 'I will write you 100 poems! 📝' },
    { question: 'Pretty please with cherry on top? 🍒', subtitle: '~ I will make you coffee every morning', mascot: '(;´Д`)', plea: 'You are being so mean! 😭' },
    { question: 'Last chance, my love! ⚠️',    subtitle: '~ The button is getting suspiciously hard to click', mascot: '(ง •̀_•́)ง', plea: 'Resistance is futile! 💫' },
    { question: 'Almost no options left! 💨',  subtitle: '~ You know you love me deep down',        mascot: '(•̀o•́)ง',         plea: 'The universe is telling you YES! 🌟' },
    { question: 'You have no other option now! 😏', subtitle: '~ Just click Yes already 💖',          mascot: '( ˘ ³˘)♥',        plea: 'The No button gave up on you too 😂💀' }
  ];

  let currentStage = 0;
  let noCount      = 0;
  let yesScale     = 1;
  let noScale      = 1;
  let isDemoMode   = false;

  // ─── 3. SUPABASE HELPERS ───
  function generateShortId() {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let res = '';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  }

  async function saveNoteToSupabase(noteObj) {
    try {
      const resp = await fetch(SUPABASE_URL + '/rest/v1/love_notes', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(noteObj)
      });
      return resp.ok;
    } catch (err) {
      console.warn('Supabase save failed:', err);
      return false;
    }
  }

  async function fetchNoteFromSupabase(id) {
    if (!id) return null;
    try {
      const resp = await fetch(SUPABASE_URL + '/rest/v1/love_notes?id=eq.' + encodeURIComponent(id) + '&select=*', {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      return (data && data.length > 0) ? data[0] : null;
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
      return null;
    }
  }

  async function patchNoteResponse(id, updates) {
    if (!id) return;
    try {
      await fetch(SUPABASE_URL + '/rest/v1/love_notes?id=eq.' + encodeURIComponent(id), {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.warn('Supabase patch failed:', err);
    }
  }

  // ─── 4. CLEAN & SHORT URL PARSING ───
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

  // ─── 5. STAGE DISPLAY & STATE RESET ───
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

  // ─── 6. MODE ROUTING ───
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

  // ─── 7. PLATFORM CREATOR: REACTIVE PHONE MOCKUP ───
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

  // ─── 8. SHORT & SUPABASE-POWERED LINK GENERATOR ───
  async function generateShareUrl() {
    updatePhoneMockup();

    let baseUrl = window.location.origin + window.location.pathname;
    if (baseUrl.endsWith('index.html')) {
      baseUrl = baseUrl.replace('index.html', 'love.html');
    } else if (!baseUrl.endsWith('love.html')) {
      if (!baseUrl.endsWith('/')) baseUrl += '/';
      baseUrl += 'love.html';
    }

    const shortId = generateShortId();
    const notePayload = {
      id: shortId,
      to_name: config.to || 'Sweetheart',
      from_name: config.from || 'Your Secret Admirer',
      question: config.question || 'Do you love me? 🥺',
      mascot: config.mascot || '(づ｡◕‿‿◕｡)づ',
      letter: config.letter || letterTemplates.romantic
    };

    // Try saving to Supabase first
    const saved = await saveNoteToSupabase(notePayload);
    if (saved) {
      try {
        localStorage.setItem('love_last_id', shortId);
      } catch (e) {}
      if (trackerNoteIdInput) trackerNoteIdInput.value = shortId;
      return baseUrl + '?id=' + shortId;
    }

    // Graceful fallback to query params if Supabase unavailable
    const qParams = new URLSearchParams();
    qParams.set('to', config.to || 'Sweetheart');
    qParams.set('from', config.from || 'Your Secret Admirer');

    if (config.question && config.question !== 'Do you love me? 🥺') {
      qParams.set('q', config.question);
    }
    if (config.mascot && config.mascot !== '(づ｡◕‿‿◕｡)づ') {
      qParams.set('m', config.mascot);
    }

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

  async function openShareModal() {
    if (btnGenerateMagic) {
      btnGenerateMagic.disabled = true;
      btnGenerateMagic.innerHTML = '<span class="btn-sparkle">⏳</span><span>Creating Magic Link...</span>';
    }

    const magicUrl = await generateShareUrl();

    if (btnGenerateMagic) {
      btnGenerateMagic.disabled = false;
      btnGenerateMagic.innerHTML = '<span class="btn-sparkle">✨</span><span>Generate Magic Link</span><span class="btn-arrow">→</span>';
    }

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

  // ─── 9. LIVE PARTNER RESPONSE TRACKER ───
  async function loadTrackerStatus(noteId) {
    if (!noteId) return;

    if (valOpened) { valOpened.textContent = 'Checking...'; valOpened.className = 'metric-value pending'; }
    if (valYes)    { valYes.textContent    = 'Checking...'; valYes.className    = 'metric-value pending'; }
    if (valNoClicks) valNoClicks.textContent= '...';
    if (valDate)   valDate.textContent     = 'Checking...';

    const note = await fetchNoteFromSupabase(noteId);
    if (!note) {
      if (valOpened) { valOpened.textContent = 'Note not found'; valOpened.className = 'metric-value'; }
      if (subOpened) subOpened.textContent = 'Check Note ID: ' + noteId;
      if (valYes)    { valYes.textContent = '-'; valYes.className = 'metric-value'; }
      return;
    }

    // 1. Opened Status
    if (valOpened) {
      if (note.opened) {
        valOpened.textContent = 'Opened! 👀';
        valOpened.className = 'metric-value success';
        if (subOpened) {
          if (note.opened_at) {
            try {
              const d = new Date(note.opened_at);
              subOpened.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + d.toLocaleDateString();
            } catch (e) {
              subOpened.textContent = 'Viewed by partner';
            }
          } else {
            subOpened.textContent = 'Viewed by partner';
          }
        }
      } else {
        valOpened.textContent = 'Not opened yet';
        valOpened.className = 'metric-value pending';
        if (subOpened) subOpened.textContent = 'Waiting for them to tap link';
      }
    }

    // 2. Proposal Response
    if (valYes) {
      if (note.said_yes) {
        valYes.textContent = 'Said YES! 💖🎉';
        valYes.className = 'metric-value success';
        if (subYes) subYes.textContent = 'Accepted the proposal!';
      } else {
        valYes.textContent = 'Waiting for answer...';
        valYes.className = 'metric-value pending';
        if (subYes) subYes.textContent = 'Still deciding';
      }
    }

    // 3. Dodged No Clicks
    if (valNoClicks) {
      const clicks = note.no_click_count || 0;
      valNoClicks.textContent = clicks + (clicks === 1 ? ' time' : ' times');
      valNoClicks.className = clicks > 0 ? 'metric-value highlight' : 'metric-value';
    }

    // 4. Date Picked
    if (valDate) {
      if (note.date_picked) {
        valDate.textContent = note.date_picked + ' ✨';
        valDate.className = 'metric-value success';
        if (subDate) subDate.textContent = 'Stage 4 adventure chosen!';
      } else {
        valDate.textContent = 'Not picked yet';
        valDate.className = 'metric-value pending';
        if (subDate) subDate.textContent = 'Awaiting date planner';
      }
    }
  }

  function openTrackerModal(optionalId) {
    let idToTrack = optionalId;
    if (!idToTrack && trackerNoteIdInput && trackerNoteIdInput.value.trim()) {
      idToTrack = trackerNoteIdInput.value.trim();
    }
    if (!idToTrack) {
      try { idToTrack = localStorage.getItem('love_last_id'); } catch (e) {}
    }
    if (idToTrack && trackerNoteIdInput) {
      trackerNoteIdInput.value = idToTrack;
    }
    if (trackerModal) trackerModal.style.display = 'flex';
    if (idToTrack) {
      loadTrackerStatus(idToTrack);
    }
    playPop();
  }

  if (btnNavTrack) {
    btnNavTrack.addEventListener('click', function () { openTrackerModal(); });
  }

  if (btnOpenTrackerFromShare) {
    btnOpenTrackerFromShare.addEventListener('click', function () {
      let id = null;
      try { id = localStorage.getItem('love_last_id'); } catch (e) {}
      openTrackerModal(id);
    });
  }

  if (btnRefreshTracker) {
    btnRefreshTracker.addEventListener('click', function () {
      const id = trackerNoteIdInput ? trackerNoteIdInput.value.trim() : null;
      if (id) loadTrackerStatus(id);
      playPop();
    });
  }

  if (btnCloseTracker) {
    btnCloseTracker.addEventListener('click', function () {
      if (trackerModal) trackerModal.style.display = 'none';
    });
  }

  if (trackerModalOverlay) {
    trackerModalOverlay.addEventListener('click', function () {
      if (trackerModal) trackerModal.style.display = 'none';
    });
  }

  // ─── 10. CLIENT-SIDE QR CODE RENDERER ───
  function drawAestheticQRCode(canvas, text) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    // Warm gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, size, size);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(1, '#fff5f7');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    // Deterministic pseudo-random pattern based on string hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    const gridSize = 21;
    const cellSize = (size - 32) / gridSize;
    const offset = 16;

    function pseudoBit(r, c) {
      const seed = Math.sin(hash + r * 31 + c * 17) * 10000;
      return (seed - Math.floor(seed)) > 0.46;
    }

    function isFinder(r, c) {
      return (r < 7 && c < 7) || (r < 7 && c >= gridSize - 7) || (r >= gridSize - 7 && c < 7);
    }

    // Gradient for cells
    const cellGrad = ctx.createLinearGradient(0, 0, size, size);
    cellGrad.addColorStop(0, '#ff4d84');
    cellGrad.addColorStop(1, '#d63384');
    ctx.fillStyle = cellGrad;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!isFinder(r, c) && pseudoBit(r, c)) {
          ctx.beginPath();
          ctx.roundRect(offset + c * cellSize + 1, offset + r * cellSize + 1, cellSize - 2, cellSize - 2, 2);
          ctx.fill();
        }
      }
    }

    // Draw finder patterns
    function drawFinder(startX, startY) {
      ctx.fillStyle = '#ff4d84';
      ctx.fillRect(startX, startY, cellSize * 7, cellSize * 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(startX + cellSize, startY + cellSize, cellSize * 5, cellSize * 5);
      ctx.fillStyle = '#d63384';
      ctx.fillRect(startX + cellSize * 2, startY + cellSize * 2, cellSize * 3, cellSize * 3);
    }

    drawFinder(offset, offset);
    drawFinder(offset + cellSize * (gridSize - 7), offset);
    drawFinder(offset, offset + cellSize * (gridSize - 7));

    // Center cute heart badge
    const cx = size / 2;
    const cy = size / 2;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', cx, cy);
  }

  // ─── 11. AUDIO SYSTEM ───
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(function () {});
    }
  }

  function playPop() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playSuccess() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach(function (freq, i) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.1);
        osc.stop(audioCtx.currentTime + i * 0.1 + 0.35);
      });
    } catch (e) {}
  }

  function playChime() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const chords = [587.33, 739.99, 880.00];
      chords.forEach(function (freq, i) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + i * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.06);
        osc.stop(audioCtx.currentTime + i * 0.06 + 0.4);
      });
    } catch (e) {}
  }

  // Auto-unlock Web Audio on first user interaction so sounds play by default
  function setupAudioUnlock() {
    function unlock() {
      initAudio();
      ['click', 'touchstart', 'pointerdown'].forEach(function (evt) {
        document.removeEventListener(evt, unlock);
      });
    }
    ['click', 'touchstart', 'pointerdown'].forEach(function (evt) {
      document.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }
  setupAudioUnlock();

  // ─── 12. FLOATING CANVAS HEARTS ───
  let hearts = [];
  function resizeCanvas(c) {
    if (c) {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
  }

  function createHearts() {
    if (!heartsCanvas) return;
    resizeCanvas(heartsCanvas);
    hearts = [];
    const count = Math.min(26, Math.floor(window.innerWidth / 45));
    for (let i = 0; i < count; i++) {
      hearts.push({
        x: Math.random() * heartsCanvas.width,
        y: Math.random() * heartsCanvas.height,
        size: 8 + Math.random() * 16,
        speedY: 0.4 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.2 + Math.random() * 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: ['#ff4d84', '#ff85a1', '#f472b6', '#fda4af'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function drawHeart(ctx, x, y, size, color, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateHearts() {
    if (!heartsCanvas || !heartsCtx) return;
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    for (const h of hearts) {
      h.y -= h.speedY;
      h.x += h.speedX;
      h.rotation += h.rotSpeed;
      if (h.y < -30) {
        h.y = heartsCanvas.height + 20;
        h.x = Math.random() * heartsCanvas.width;
      }
      drawHeart(heartsCtx, h.x, h.y, h.size, h.color, h.opacity, h.rotation);
    }
    requestAnimationFrame(animateHearts);
  }

  createHearts();
  animateHearts();

  // ─── 13. BUTTON ACTIONS: RESPONSIVE YES & DODGING NO ───
  function dodgeButton() {
    if (!btnNo || !buttonsContainer) return;
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxW = Math.max(10, containerRect.width - btnRect.width - 6);
    const maxH = Math.max(10, containerRect.height - btnRect.height - 6);
    const newX = Math.max(4, Math.min(maxW, Math.random() * maxW));
    const newY = Math.max(4, Math.min(maxH, Math.random() * maxH));
    btnNo.style.left = newX + 'px';
    btnNo.style.top  = newY + 'px';
  }

  function handleNoAction() {
    noCount++;
    currentStage++;

    // Track "No" click count in Supabase
    if (activeNoteId) {
      patchNoteResponse(activeNoteId, { no_click_count: noCount });
    }

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

      // Track "Said Yes" in Supabase
      if (activeNoteId) {
        patchNoteResponse(activeNoteId, {
          said_yes: true,
          answered_at: new Date().toISOString()
        });
      }
    });
  }

  // ─── 14. CONFETTI & FIREWORKS ───
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

  // ─── 15. FLOATING ENVELOPE & LETTER ───
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

  // ─── 16. DATE PLANNER & RESTART ───
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

        // Track chosen date in Supabase
        if (activeNoteId) {
          patchNoteResponse(activeNoteId, { date_picked: dateText });
        }
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

  // Demo mode buttons
  if (btnNavDemo) {
    btnNavDemo.addEventListener('click', function () {
      startExperienceMode(true);
    });
  }

  if (btnPreviewFullscreen) {
    btnPreviewFullscreen.addEventListener('click', function () {
      startExperienceMode(true);
    });
  }

  if (btnBackStudio) {
    btnBackStudio.addEventListener('click', function () {
      startPlatformMode();
    });
  }

  // ─── 17. WINDOW RESIZE ───
  window.addEventListener('resize', function () {
    resizeCanvas(heartsCanvas);
    resizeCanvas(confettiCanvas);
    createHearts();
  });

  // ─── 18. RUN INITIAL ROUTE (ASYNC SUPABASE SUPPORT) ───
  async function initRoute() {
    const isLovePage = window.location.pathname.endsWith('love.html');
    const urlParams = new URLSearchParams(window.location.search);
    const noteIdParam = urlParams.get('id');

    if (noteIdParam) {
      activeNoteId = noteIdParam;
      // Fetch note from Supabase
      const remoteNote = await fetchNoteFromSupabase(noteIdParam);
      if (remoteNote) {
        config = {
          to: remoteNote.to_name || 'Sweetheart',
          from: remoteNote.from_name || 'Your Secret Admirer',
          question: remoteNote.question || 'Do you love me? 🥺',
          mascot: remoteNote.mascot || '(づ｡◕‿‿◕｡)づ',
          letter: remoteNote.letter || letterTemplates.romantic
        };
        // Record that the note was opened by the partner
        patchNoteResponse(activeNoteId, {
          opened: true,
          opened_at: new Date().toISOString()
        });
      }
      startExperienceMode(false);
      return;
    }

    const partnerData = getUrlParams();
    if (isLovePage || partnerData) {
      if (partnerData) {
        config = Object.assign({}, config, partnerData);
      }
      startExperienceMode(false);
    } else {
      startPlatformMode();
    }
  }

  initRoute();

});
