// Sticky header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile nav
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('open');
  }));

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Testimonial carousel
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.querySelector('.testi-dots');
  let testiIndex = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('span');

  function goToSlide(i) {
    slides[testiIndex].classList.remove('active');
    dots[testiIndex].classList.remove('active');
    testiIndex = (i + slides.length) % slides.length;
    slides[testiIndex].classList.add('active');
    dots[testiIndex].classList.add('active');
  }
  document.getElementById('testiPrev').addEventListener('click', () => goToSlide(testiIndex - 1));
  document.getElementById('testiNext').addEventListener('click', () => goToSlide(testiIndex + 1));
  let testiAuto = setInterval(() => goToSlide(testiIndex + 1), 6500);
  const testiShell = document.querySelector('.testi-shell');
  testiShell.addEventListener('mouseenter', () => clearInterval(testiAuto));
  testiShell.addEventListener('mouseleave', () => { testiAuto = setInterval(() => goToSlide(testiIndex + 1), 6500); });

  // Quote form (front-end demo only — connect to a backend/email service to go live)
  const quoteForm = document.getElementById('quoteForm');
  const thanksPanel = document.getElementById('thanksPanel');

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Pickup Date & Time picker ----------
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const dtTrigger = document.getElementById('dtTrigger');
  const dtValue = document.getElementById('dtValue');
  const dtOverlay = document.getElementById('dtOverlay');
  const dateScreen = document.getElementById('dateScreen');
  const timeScreen = document.getElementById('timeScreen');
  const monthLabel = document.getElementById('monthLabel');
  const calGrid = document.getElementById('calGrid');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const dateCancel = document.getElementById('dateCancel');
  const dateNext = document.getElementById('dateNext');
  const timeBack = document.getElementById('timeBack');
  const timeCancel = document.getElementById('timeCancel');
  const timeOk = document.getElementById('timeOk');
  const readoutDay = document.getElementById('readoutDay');
  const readoutTime = document.getElementById('readoutTime');
  const clockFace = document.getElementById('clockFace');
  const clockHand = document.getElementById('clockHand');
  const periodAM = document.getElementById('periodAM');
  const periodPM = document.getElementById('periodPM');
  const hiddenDate = document.getElementById('fdate');
  const hiddenTime = document.getElementById('ftime');

  const todayMidnight = new Date(); todayMidnight.setHours(0,0,0,0);
  let calViewYear = todayMidnight.getFullYear();
  let calViewMonth = todayMidnight.getMonth();
  let selectedDate = null;
  let selHour = null, selMinute = null, selPeriod = null;
  let clockMode = 'hour';

  function isSameDate(a, b){
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderCalendar(){
    monthLabel.textContent = MONTH_NAMES[calViewMonth] + ' ' + calViewYear;
    calGrid.innerHTML = '';
    const firstDay = new Date(calViewYear, calViewMonth, 1).getDay();
    const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'dt-day is-blank';
      calGrid.appendChild(blank);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(calViewYear, calViewMonth, d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dt-day';
      btn.textContent = d;
      if (thisDate < todayMidnight) btn.disabled = true;
      if (isSameDate(thisDate, todayMidnight)) btn.classList.add('is-today');
      if (selectedDate && isSameDate(thisDate, selectedDate)) btn.classList.add('is-selected');
      btn.addEventListener('click', () => {
        selectedDate = thisDate;
        renderCalendar();
        dateNext.disabled = false;
      });
      calGrid.appendChild(btn);
    }
    prevMonthBtn.disabled = (calViewYear === todayMidnight.getFullYear() && calViewMonth === todayMidnight.getMonth());
  }

  prevMonthBtn.addEventListener('click', () => {
    calViewMonth--; if (calViewMonth < 0) { calViewMonth = 11; calViewYear--; }
    renderCalendar();
  });
  nextMonthBtn.addEventListener('click', () => {
    calViewMonth++; if (calViewMonth > 11) { calViewMonth = 0; calViewYear++; }
    renderCalendar();
  });

  function openPicker(){
    dtOverlay.classList.add('open');
    dateScreen.classList.add('active');
    timeScreen.classList.remove('active');
    const base = selectedDate || todayMidnight;
    calViewYear = base.getFullYear(); calViewMonth = base.getMonth();
    renderCalendar();
    dateNext.disabled = !selectedDate;
  }
  function closePicker(){ dtOverlay.classList.remove('open'); }

  dtTrigger.addEventListener('click', openPicker);
  dtTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); }
  });
  dtOverlay.addEventListener('click', (e) => { if (e.target === dtOverlay) closePicker(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dtOverlay.classList.contains('open')) closePicker();
  });
  dateCancel.addEventListener('click', closePicker);
  timeCancel.addEventListener('click', closePicker);

  function initTimeDefaults(){
    const now = new Date();
    let h24 = now.getHours();
    selPeriod = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12; if (h12 === 0) h12 = 12;
    selHour = h12;
    selMinute = Math.round(now.getMinutes() / 5) * 5; if (selMinute === 60) selMinute = 0;
  }

  function updateReadout(){
    if (selectedDate) {
      readoutDay.textContent = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    readoutTime.textContent = selHour + ':' + String(selMinute).padStart(2, '0') + ' ' + (selPeriod || '');
  }

  function updatePeriodButtons(){
    periodAM.classList.toggle('active', selPeriod === 'AM');
    periodPM.classList.toggle('active', selPeriod === 'PM');
  }

  function updateHand(){
    const current = clockMode === 'hour' ? selHour : selMinute;
    const posIndex = clockMode === 'hour' ? (current % 12) : (current / 5);
    const angle = posIndex * 30;
    clockHand.style.width = '80px';
    clockHand.style.transform = 'rotate(' + (angle - 90) + 'deg)';
  }

  function renderClock(){
    clockFace.querySelectorAll('.dt-num').forEach(n => n.remove());
    const cx = 115, cy = 115, R = 88;
    const values = clockMode === 'hour' ? [12,1,2,3,4,5,6,7,8,9,10,11] : [0,5,10,15,20,25,30,35,40,45,50,55];
    const current = clockMode === 'hour' ? selHour : selMinute;
    values.forEach((v) => {
      const posIndex = clockMode === 'hour' ? (v % 12) : (v / 5);
      const angle = posIndex * 30;
      const rad = angle * Math.PI / 180;
      const x = cx + R * Math.sin(rad);
      const y = cy - R * Math.cos(rad);
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'dt-num';
      el.textContent = clockMode === 'hour' ? v : String(v).padStart(2, '0');
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      if (v === current) el.classList.add('active');
      el.addEventListener('click', () => {
        if (clockMode === 'hour') { selHour = v; clockMode = 'minute'; renderClock(); }
        else { selMinute = v; renderClock(); }
        updateHand();
        updateReadout();
      });
      clockFace.appendChild(el);
    });
    updateHand();
  }

  dateNext.addEventListener('click', () => {
    dateScreen.classList.remove('active');
    timeScreen.classList.add('active');
    if (selHour === null) initTimeDefaults();
    clockMode = 'hour';
    renderClock();
    updatePeriodButtons();
    updateReadout();
  });

  timeBack.addEventListener('click', () => {
    if (clockMode === 'minute') { clockMode = 'hour'; renderClock(); }
    else { timeScreen.classList.remove('active'); dateScreen.classList.add('active'); }
  });

  periodAM.addEventListener('click', () => { selPeriod = 'AM'; updatePeriodButtons(); updateReadout(); });
  periodPM.addEventListener('click', () => { selPeriod = 'PM'; updatePeriodButtons(); updateReadout(); });

  timeOk.addEventListener('click', () => {
    let hour24 = selHour % 12; if (selPeriod === 'PM') hour24 += 12;
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    hiddenDate.value = yyyy + '-' + mm + '-' + dd;
    hiddenTime.value = String(hour24).padStart(2, '0') + ':' + String(selMinute).padStart(2, '0');
    const dayStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    dtValue.textContent = dayStr + ' · ' + selHour + ':' + String(selMinute).padStart(2, '0') + ' ' + selPeriod;
    dtTrigger.classList.add('has-value');
    dtTrigger.classList.remove('error');
    closePicker();
  });

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!hiddenDate.value || !hiddenTime.value) {
      dtTrigger.classList.add('error');
      dtTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    quoteForm.style.display = 'none';
    thanksPanel.classList.add('show');
  });

  // ---------- Direct call popover ----------
  const callOverlay = document.getElementById('callOverlay');
  const callClose = document.getElementById('callClose');
  const callCopyBtn = document.getElementById('callCopyBtn');

  function openCallPopover(){ callOverlay.classList.add('open'); }
  function closeCallPopover(){ callOverlay.classList.remove('open'); }

  document.querySelectorAll('a[href^="tel:"]:not(#callConfirmBtn)').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCallPopover();
    });
  });

  callClose.addEventListener('click', closeCallPopover);
  callOverlay.addEventListener('click', (e) => { if (e.target === callOverlay) closeCallPopover(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && callOverlay.classList.contains('open')) closeCallPopover();
  });

  callCopyBtn.addEventListener('click', () => {
    const number = '(347) 547-9667';
    const fallbackCopy = () => {
      const temp = document.createElement('textarea');
      temp.value = number;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand('copy'); } catch (err) {}
      document.body.removeChild(temp);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    callCopyBtn.textContent = 'Copied!';
    setTimeout(() => { callCopyBtn.textContent = 'Copy Number'; }, 1800);
  });
