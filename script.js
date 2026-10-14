/**
 * Luxury Wedding Countdown Counter
 * Interactive Logic, Particle Engine & Web Audio Synthesizer
 */

(function () {
  'use strict';

  // --- State Configuration ---
  const DEFAULT_CONFIG = {
    names: 'Jaswanth & Lalitha',
    subtitle: 'THE WEDDING CELEBRATION',
    date: '2026-11-22',
    time: '21:30',
    venue: 'RVR Conventions',
    address: 'Daspalla Hills, Visakhapatnam',
    quote: '"Two souls with but a single thought, two hearts that beat as one."',
    theme: 'champagne'
  };

  let config = { ...DEFAULT_CONFIG };
  let countdownInterval = null;
  let previousDigits = { days: null, hours: null, minutes: null, seconds: null };

  // --- DOM Elements ---
  const displayNames = document.getElementById('display-names');
  const displaySubtitle = document.getElementById('display-subtitle');
  const displayDateString = document.getElementById('display-date-string');
  const displayQuote = document.getElementById('display-quote');
  const monogramBadge = document.getElementById('monogram-badge');

  const valDays = document.getElementById('val-days');
  const valHours = document.getElementById('val-hours');
  const valMinutes = document.getElementById('val-minutes');
  const valSeconds = document.getElementById('val-seconds');

  const ringDays = document.getElementById('ring-days');
  const ringHours = document.getElementById('ring-hours');
  const ringMinutes = document.getElementById('ring-minutes');
  const ringSeconds = document.getElementById('ring-seconds');

  // Controls & Modals
  const themeBtn = document.getElementById('theme-btn');
  const themeMenu = document.getElementById('theme-menu');
  const particlesBtn = document.getElementById('particles-btn');
  const audioBtn = document.getElementById('audio-btn');
  const audioIconOff = document.getElementById('audio-icon-off');
  const audioIconOn = document.getElementById('audio-icon-on');
  const customizeBtn = document.getElementById('customize-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const celebrateBtn = document.getElementById('celebrate-btn');
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  const shareLinkBtn = document.getElementById('share-link-btn');
  const shareBtnText = document.getElementById('share-btn-text');
  const toastMessage = document.getElementById('toast-message');

  const customModal = document.getElementById('custom-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const customForm = document.getElementById('custom-form');
  const inputNames = document.getElementById('input-names');
  const inputSubtitle = document.getElementById('input-subtitle');
  const inputDate = document.getElementById('input-date');
  const inputTime = document.getElementById('input-time');
  const inputQuote = document.getElementById('input-quote');
  const resetDefaultsBtn = document.getElementById('reset-defaults-btn');

  // --- Load Initial Settings (URL params > LocalStorage > Defaults) ---
  function loadInitialSettings() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check local storage
    const saved = localStorage.getItem('wedding_counter_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate if old date was stored
        if (parsed.date === '2026-11-20' && parsed.time === '10:30') {
          parsed.date = '2026-11-22';
          parsed.time = '21:30';
          localStorage.setItem('wedding_counter_config', JSON.stringify(parsed));
        }
        config = { ...config, ...parsed };
      } catch (e) {
        console.warn('Could not parse saved config', e);
      }
    }

    // URL params override
    if (urlParams.get('names')) config.names = urlParams.get('names');
    if (urlParams.get('date')) config.date = urlParams.get('date');
    if (urlParams.get('time')) config.time = urlParams.get('time');
    if (urlParams.get('subtitle')) config.subtitle = urlParams.get('subtitle');
    if (urlParams.get('quote')) config.quote = urlParams.get('quote');
    config.theme = 'champagne';

    applyConfigToUI();
    setTheme('champagne');
  }

  function applyConfigToUI() {
    displayNames.textContent = config.names;
    displaySubtitle.textContent = config.subtitle;
    displayQuote.textContent = config.quote;

    // Update Monogram initials
    updateMonogram(config.names);

    // Formatted date string (Apple editorial format)
    const target = new Date(`${config.date}T${config.time}`);
    if (!isNaN(target.getTime())) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
      displayDateString.textContent = target.toLocaleDateString(undefined, options);
    }

    // Sync input fields if modal is present
    if (inputNames) inputNames.value = config.names;
    if (inputSubtitle) inputSubtitle.value = config.subtitle;
    if (inputDate) inputDate.value = config.date;
    if (inputTime) inputTime.value = config.time;
    if (inputQuote) inputQuote.value = config.quote;
  }

  function updateMonogram(namesStr) {
    const parts = namesStr.split('&').map(s => s.trim());
    if (parts.length >= 2) {
      const init1 = parts[0].charAt(0).toUpperCase() || 'J';
      const init2 = parts[1].charAt(0).toUpperCase() || 'L';
      monogramBadge.innerHTML = `<span>${init1}</span><span class="ampersand">&amp;</span><span>${init2}</span>`;
    } else {
      monogramBadge.innerHTML = `<span>${namesStr.charAt(0).toUpperCase() || 'W'}</span>`;
    }
  }

  // --- Countdown Math & Rendering ---
  const RING_CIRCUMFERENCE = 2 * Math.PI * 44; // ~276.46

  function getTargetDate() {
    return new Date(`${config.date}T${config.time}:00`);
  }

  function updateCountdown() {
    const now = new Date();
    const target = getTargetDate();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      renderDigits('00', '00', '00', '00');
      updateRing(ringDays, 0, 1);
      updateRing(ringHours, 0, 1);
      updateRing(ringMinutes, 0, 1);
      updateRing(ringSeconds, 0, 1);
      displaySubtitle.textContent = 'TODAY IS THE BIG DAY!';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const strDays = String(days).padStart(2, '0');
    const strHours = String(hours).padStart(2, '0');
    const strMinutes = String(minutes).padStart(2, '0');
    const strSeconds = String(seconds).padStart(2, '0');

    renderDigits(strDays, strHours, strMinutes, strSeconds);

    // Progress rings:
    // Seconds out of 60
    updateRing(ringSeconds, seconds, 60);
    // Minutes out of 60
    updateRing(ringMinutes, minutes, 60);
    // Hours out of 24
    updateRing(ringHours, hours, 24);
    // Days relative to monthly cycle or 100-day landmark
    const dayCycle = days > 30 ? (days % 100) / 100 : days / 30;
    updateRing(ringDays, dayCycle, 1);
  }

  function updateRing(ringElement, current, max) {
    if (!ringElement) return;
    const progress = Math.min(Math.max(current / max, 0), 1);
    const offset = RING_CIRCUMFERENCE * (1 - progress);
    ringElement.style.strokeDashoffset = offset;
  }

  function renderDigits(d, h, m, s) {
    applyDigitWithAnimation(valDays, d, 'days');
    applyDigitWithAnimation(valHours, h, 'hours');
    applyDigitWithAnimation(valMinutes, m, 'minutes');
    applyDigitWithAnimation(valSeconds, s, 'seconds');
  }

  function applyDigitWithAnimation(element, newValue, key) {
    if (previousDigits[key] !== newValue) {
      previousDigits[key] = newValue;
      element.textContent = newValue;
      element.classList.remove('flip-animate');
      // trigger reflow
      void element.offsetWidth;
      element.classList.add('flip-animate');
    }
  }

  function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // --- Theme (Warm Champagne) ---
  function setTheme(themeName = 'champagne') {
    document.body.setAttribute('data-theme', 'champagne');
    config.theme = 'champagne';
    localStorage.setItem('wedding_counter_config', JSON.stringify(config));
  }

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
        themeMenu.classList.remove('show');
      }
    });
  }

  // --- Customizer Modal ---
  if (customizeBtn && customModal) {
    customizeBtn.addEventListener('click', () => {
      customModal.classList.add('open');
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        customModal.classList.remove('open');
      });
    }

    customModal.addEventListener('click', (e) => {
      if (e.target === customModal) {
        customModal.classList.remove('open');
      }
    });

    if (customForm) {
      customForm.addEventListener('submit', (e) => {
        e.preventDefault();
        config.names = inputNames.value.trim() || DEFAULT_CONFIG.names;
        config.subtitle = inputSubtitle.value.trim() || DEFAULT_CONFIG.subtitle;
        config.date = inputDate.value || DEFAULT_CONFIG.date;
        config.time = inputTime.value || DEFAULT_CONFIG.time;
        config.quote = inputQuote.value.trim() || DEFAULT_CONFIG.quote;

        localStorage.setItem('wedding_counter_config', JSON.stringify(config));
        applyConfigToUI();
        updateCountdown();
        customModal.classList.remove('open');
        showToast('Wedding details updated beautifully ✨');
      });
    }

    if (resetDefaultsBtn) {
      resetDefaultsBtn.addEventListener('click', () => {
        config = { ...DEFAULT_CONFIG };
        localStorage.removeItem('wedding_counter_config');
        applyConfigToUI();
        setTheme(DEFAULT_CONFIG.theme);
        updateCountdown();
        customModal.classList.remove('open');
        showToast('Reset to original sample details');
      });
    }
  }

  // --- Toast Notification ---
  let toastTimeout = null;
  function showToast(msg) {
    toastMessage.textContent = msg;
    toastMessage.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 3200);
  }

  // --- Shareable Link ---
  if (shareLinkBtn) {
    shareLinkBtn.addEventListener('click', async () => {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('names', config.names);
      url.searchParams.set('date', config.date);
      url.searchParams.set('time', config.time);
      url.searchParams.set('subtitle', config.subtitle);
      url.searchParams.set('theme', config.theme);

      try {
        await navigator.clipboard.writeText(url.toString());
        if (shareBtnText) shareBtnText.textContent = 'Link Copied!';
        showToast('Custom countdown link copied to clipboard! 💌');
        setTimeout(() => {
          if (shareBtnText) shareBtnText.textContent = 'Share Countdown';
        }, 2500);
      } catch (err) {
        // Fallback
        prompt('Copy your custom wedding counter link:', url.toString());
      }
    });
  }

  // --- Add to Calendar (.ics download) ---
  if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
      const startDate = new Date(`${config.date}T${config.time}:00`);
      const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours later

      const formatICSDate = (d) => {
        return d.toISOString().replace(/-|:|\.\d+/g, '');
      };

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Jaswanth & Lalitha//Wedding Countdown//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `SUMMARY:Wedding Ceremony - ${config.names}`,
        `DESCRIPTION:${config.quote}\\n\\nJoin us in celebrating!`,
        `LOCATION:RVR Conventions, Nowroji Rd, Daspalla Hills, Visakhapatnam, Andhra Pradesh 530002`,
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${config.names.replace(/[^a-zA-Z0-9]/g, '_')}_Wedding.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Calendar invite (.ics) downloaded! 📅');
    });
  }

  // --- Fullscreen Toggle ---
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Fullscreen error:', err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // --- Atmospheric Sparkles & Falling Petals Canvas ---
  const sparkleCanvas = document.getElementById('sparkle-canvas');
  const ctx = sparkleCanvas.getContext('2d');
  let particles = [];
  let particlesActive = true;
  let animFrameId = null;

  function resizeCanvas() {
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * sparkleCanvas.width;
      this.y = Math.random() * sparkleCanvas.height;
      this.type = Math.random() > 0.65 ? 'petal' : 'sparkle';
      
      if (this.type === 'sparkle') {
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      } else {
        this.size = Math.random() * 7 + 4;
        this.speedY = Math.random() * 0.8 + 0.4; // gently falling
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.25;
      }
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.type === 'sparkle') {
        this.opacity += Math.sin(Date.now() * 0.003) * 0.015;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.9) this.opacity = 0.9;
      } else {
        this.rotation += this.rotSpeed;
        this.x += Math.sin(this.y * 0.01) * 0.3;
      }

      // Loop around
      if (this.y < -10 || this.y > sparkleCanvas.height + 10 || this.x < -10 || this.x > sparkleCanvas.width + 10) {
        this.reset();
        this.y = this.type === 'petal' ? -5 : sparkleCanvas.height + 5;
      }
    }

    draw() {
      ctx.save();
      if (this.type === 'sparkle') {
        ctx.fillStyle = config.theme === 'midnight' 
          ? `rgba(243, 211, 130, ${this.opacity})` 
          : `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(235, 195, 100, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Soft romantic rose petal
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = config.theme === 'rosegold'
          ? `rgba(232, 152, 159, ${this.opacity})`
          : `rgba(255, 230, 220, ${this.opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor(window.innerWidth / 20); // adaptive density
    for (let i = 0; i < Math.min(count, 65); i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    if (!particlesActive) return;
    ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    animFrameId = requestAnimationFrame(animateParticles);
  }
  animateParticles();

  if (particlesBtn) {
    particlesBtn.addEventListener('click', () => {
      particlesActive = !particlesActive;
      particlesBtn.classList.toggle('active', particlesActive);
      if (particlesActive) {
        animateParticles();
        showToast('Sparkles & petals enabled ✨');
      } else {
        ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
        cancelAnimationFrame(animFrameId);
        showToast('Sparkles paused');
      }
    });
  }

  // --- Confetti Cannon Engine ---
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  let confettiActive = false;

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfetti);
  window.addEventListener('orientationchange', resizeConfetti);
  resizeConfetti();

  function triggerCelebration() {
    resizeConfetti();
    confettiPieces = [];
    const colors = ['#D4AF37', '#ECC880', '#FFFFFF', '#FFB7B2', '#FAD0C4', '#F3D382'];
    
    // Spawn 140 luxury gold foil confetti ribbons
    for (let i = 0; i < 140; i++) {
      confettiPieces.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.7,
        vx: (Math.random() - 0.5) * 14,
        vy: -(Math.random() * 16 + 8),
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        wobble: Math.random() * 10,
        gravity: 0.35,
        drag: 0.98,
        opacity: 1
      });
    }

    confettiActive = true;
    requestAnimationFrame(renderConfetti);
    playHarmonicChime();
  }

  function renderConfetti() {
    if (!confettiActive) return;
    confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let activeCount = 0;
    for (let p of confettiPieces) {
      p.vx *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.wobble += 0.1;

      if (p.y > window.innerHeight * 0.6) {
        p.opacity -= 0.015;
      }

      if (p.opacity > 0 && p.y < window.innerHeight + 20) {
        activeCount++;
        confCtx.save();
        confCtx.translate(p.x, p.y);
        confCtx.rotate((p.rotation * Math.PI) / 180);
        confCtx.globalAlpha = Math.max(p.opacity, 0);
        confCtx.fillStyle = p.color;
        // Ribbon rectangle
        confCtx.fillRect(-p.size / 2, -p.size, p.size, p.size * (0.8 + Math.sin(p.wobble) * 0.3));
        confCtx.restore();
      }
    }

    if (activeCount > 0) {
      requestAnimationFrame(renderConfetti);
    } else {
      confettiActive = false;
      confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      triggerCelebration();
      showToast('Congratulations! Cheers to eternal love! 🥂✨');
    });
  }

  // --- Romantic Web Audio Ambient Chimes Synthesizer ---
  let audioCtx = null;
  let isAudioPlaying = false;
  let chimeTimer = null;

  // Gentle Pentatonic Wedding Chime Frequencies (Hz): F#4, G#4, A#4, C#5, D#5, F5
  const CHIME_FREQS = [370.0, 415.3, 466.16, 554.37, 622.25, 698.46, 739.99];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHarmonicChime() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      // Play 3 gentle ascending bell tones
      const notes = [
        CHIME_FREQS[Math.floor(Math.random() * 3)],
        CHIME_FREQS[3 + Math.floor(Math.random() * 2)],
        CHIME_FREQS[5]
      ];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.16);

        gain.gain.setValueAtTime(0.001, now + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.16 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.16 + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.16);
        osc.stop(now + idx * 0.16 + 2.3);
      });
    } catch (e) {
      console.warn('Audio play notice', e);
    }
  }

  function scheduleNextAmbientChime() {
    if (!isAudioPlaying) return;
    playHarmonicChime();
    const nextInterval = 4500 + Math.random() * 4000; // gentle chime every 4.5 - 8.5 seconds
    chimeTimer = setTimeout(scheduleNextAmbientChime, nextInterval);
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      isAudioPlaying = !isAudioPlaying;
      if (audioIconOff) audioIconOff.classList.toggle('hidden', isAudioPlaying);
      if (audioIconOn) audioIconOn.classList.toggle('hidden', !isAudioPlaying);
      audioBtn.classList.toggle('active', isAudioPlaying);

      if (isAudioPlaying) {
        getAudioContext();
        scheduleNextAmbientChime();
        showToast('Romantic chimes ambiently playing 🎵');
      } else {
        if (chimeTimer) clearTimeout(chimeTimer);
        showToast('Chimes muted');
      }
    });
  }

  // --- Couple Photos Gallery & Lightbox ---
  const COUPLE_PHOTOS = [
    {
      id: 'engagement',
      img: 'assets/couple_engagement.jpg',
      title: 'The Promise in the Garden',
      badge: '❤️ Engagement Day',
      desc: 'Surrounded by blooming roses and warm sunset bokeh, our forever quietly began.'
    },
    {
      id: 'ring',
      img: 'assets/couple_ring.jpg',
      title: 'Two Hands, One Vow',
      badge: '💍 The Promise',
      desc: 'A sparkling reminder of love, devotion, and a promise that will never fade.'
    },
    {
      id: 'beach',
      img: 'assets/couple_beach.jpg',
      title: 'By the Ocean Tide',
      badge: '🌊 Sunset Walk',
      desc: 'Walking hand in hand through the golden shores, whispering dreams for the future.'
    },
    {
      id: 'coffee',
      img: 'assets/couple_candid.jpg',
      title: 'Coffee & Endless Laughter',
      badge: '☕ Sweet Beginnings',
      desc: 'From our very first conversations where minutes blurred into hours of joy.'
    },
    {
      id: 'wedding-joy',
      img: 'assets/couple_festive.jpg',
      title: 'Laughter on the Mandap',
      badge: '✨ Sacred Mandap',
      desc: 'Surrounded by family, fragrant marigolds, and sacred blessings as we unite as one.'
    },
    {
      id: 'fairy-lights',
      img: 'assets/couple_lights.jpg',
      title: 'Under the Fairy Canopy',
      badge: '✨ Golden Lights',
      desc: 'Golden hour smiles surrounded by sparkling fairy lights, warmth, and joyous company.'
    },
    {
      id: 'pure-romance',
      img: 'assets/couple_ring.jpg',
      title: 'Pure Devotion',
      badge: '🕊️ Two Hearts',
      desc: 'Two hands intertwined with sacred vows, where every heartbeat whispers forever.'
    },
    {
      id: 'mehendi',
      img: 'assets/couple_mehendi.jpg',
      title: 'Colors, Henna & Starlit Beats',
      badge: '🌸 Mehendi Sangeet',
      desc: 'Swinging under glowing fairy lights, drenched in laughter and joyful melodies.'
    },
    {
      id: 'forever',
      img: 'assets/couple_walk.jpg',
      title: 'A Lifetime Together',
      badge: '🥂 Forever Begins',
      desc: 'Walking gracefully hand in hand through the garden walkway towards our sacred vows.'
    }
  ];

  let currentPhotoIndex = 0;
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  function openLightbox(index) {
    if (index < 0) index = COUPLE_PHOTOS.length - 1;
    if (index >= COUPLE_PHOTOS.length) index = 0;
    currentPhotoIndex = index;

    const photo = COUPLE_PHOTOS[currentPhotoIndex];
    lightboxImg.src = photo.img;
    lightboxTitle.textContent = photo.title;
    lightboxDesc.textContent = `${photo.badge} • ${photo.desc}`;
    photoLightbox.classList.add('open');
  }

  function closeLightbox() {
    photoLightbox.classList.remove('open');
  }

  // --- Apple Camera-Style Carousel Controls & Tracking ---
  const galleryScroller = document.getElementById('gallery-scroller');
  const galleryPrevBtn = document.getElementById('gallery-prev-btn');
  const galleryNextBtn = document.getElementById('gallery-next-btn');
  const galleryDots = document.getElementById('gallery-dots');
  const photoSlides = document.querySelectorAll('.apple-photo-slide');

  function initGalleryDots() {
    if (!galleryDots || !photoSlides.length) return;
    galleryDots.innerHTML = '';
    photoSlides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-indicator-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to photo ${idx + 1}`);
      dot.addEventListener('click', () => {
        scrollToSlide(idx);
      });
      galleryDots.appendChild(dot);
    });
  }

  function scrollToSlide(index) {
    if (!galleryScroller) return;
    const slides = galleryScroller.querySelectorAll('.apple-photo-slide');
    if (!slides[index]) return;
    const slideLeft = slides[index].offsetLeft;
    galleryScroller.scrollTo({ left: slideLeft - 8, behavior: 'smooth' });
  }

  function updateCarouselControls() {
    if (!galleryScroller) return;
    const maxScroll = galleryScroller.scrollWidth - galleryScroller.clientWidth;
    const scrollLeft = galleryScroller.scrollLeft;

    if (galleryPrevBtn) {
      galleryPrevBtn.disabled = scrollLeft <= 8;
    }
    if (galleryNextBtn) {
      galleryNextBtn.disabled = scrollLeft >= maxScroll - 8;
    }

    // Highlight closest active dot
    const slides = galleryScroller.querySelectorAll('.apple-photo-slide');
    if (slides.length && galleryDots) {
      let closestIdx = 0;
      let minDiff = Infinity;
      slides.forEach((slide, idx) => {
        const diff = Math.abs(slide.offsetLeft - scrollLeft - 8);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      const dots = galleryDots.querySelectorAll('.carousel-indicator-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIdx);
      });
    }
  }

  if (galleryPrevBtn && galleryScroller) {
    galleryPrevBtn.addEventListener('click', () => {
      const slides = galleryScroller.querySelectorAll('.apple-photo-slide');
      const step = slides[0] ? (slides[0].offsetWidth + 24) : 400;
      galleryScroller.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (galleryNextBtn && galleryScroller) {
    galleryNextBtn.addEventListener('click', () => {
      const slides = galleryScroller.querySelectorAll('.apple-photo-slide');
      const step = slides[0] ? (slides[0].offsetWidth + 24) : 400;
      galleryScroller.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  if (galleryScroller) {
    galleryScroller.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateCarouselControls);
    }, { passive: true });

    // Keyboard Arrow navigation for the scroller
    galleryScroller.addEventListener('keydown', (e) => {
      const slides = galleryScroller.querySelectorAll('.apple-photo-slide');
      const step = slides[0] ? (slides[0].offsetWidth + 24) : 400;
      if (e.key === 'ArrowRight') {
        galleryScroller.scrollBy({ left: step, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        galleryScroller.scrollBy({ left: -step, behavior: 'smooth' });
      }
    });
  }

  initGalleryDots();
  updateCarouselControls();

  // Bind clicks on couple photo slides
  document.querySelectorAll('.apple-photo-slide').forEach((slide, idx) => {
    const trigger = slide.querySelector('.slide-media') || slide;
    trigger.addEventListener('click', () => {
      openLightbox(idx);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxPrevBtn.addEventListener('click', () => openLightbox(currentPhotoIndex - 1));
  lightboxNextBtn.addEventListener('click', () => openLightbox(currentPhotoIndex + 1));

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!photoLightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentPhotoIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentPhotoIndex + 1);
  });

  photoLightbox.addEventListener('click', (e) => {
    if (e.target === photoLightbox) closeLightbox();
  });

  // --- Custom Photo Upload Support ---
  const userPhotoUpload = document.getElementById('user-photo-upload');
  if (userPhotoUpload) {
    userPhotoUpload.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const slides = document.querySelectorAll('.apple-photo-slide');
      files.forEach((file, index) => {
        if (index < slides.length) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = slides[index].querySelector('.slide-media img');
            if (img) {
              img.src = event.target.result;
              if (COUPLE_PHOTOS[index]) {
                COUPLE_PHOTOS[index].img = event.target.result;
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });

      showToast(`Uploaded ${files.length} custom couple photo(s)! 💕`);
    });
  }

  // --- Smooth Navigation Segment Switcher ---
  const navBtnCounter = document.getElementById('nav-btn-counter');
  const navBtnGallery = document.getElementById('nav-btn-gallery');
  const weddingCounterSec = document.getElementById('wedding-counter');
  const coupleGallerySec = document.getElementById('couple-gallery');

  if (navBtnCounter && weddingCounterSec) {
    navBtnCounter.addEventListener('click', (e) => {
      e.preventDefault();
      navBtnCounter.classList.add('active');
      if (navBtnGallery) navBtnGallery.classList.remove('active');
      weddingCounterSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (navBtnGallery && coupleGallerySec) {
    navBtnGallery.addEventListener('click', (e) => {
      e.preventDefault();
      navBtnGallery.classList.add('active');
      if (navBtnCounter) navBtnCounter.classList.remove('active');
      coupleGallerySec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Highlight segment on scroll
  window.addEventListener('scroll', () => {
    if (!coupleGallerySec || !navBtnGallery || !navBtnCounter) return;
    const galleryRect = coupleGallerySec.getBoundingClientRect();
    if (galleryRect.top <= 250) {
      navBtnGallery.classList.add('active');
      navBtnCounter.classList.remove('active');
    } else {
      navBtnCounter.classList.add('active');
      navBtnGallery.classList.remove('active');
    }
  }, { passive: true });

  // --- Initialization ---
  loadInitialSettings();
  startCountdown();

})();

