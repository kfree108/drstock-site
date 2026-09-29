/* "Talk to Ava about your Amazon account." floating chat.
   One free message, then an email to keep going, up to 10 messages, ending on a
   strategy-call booking. Talks to /api/ava/* on the same origin (see _server/server.js). */
(function () {
  'use strict';
  if (window.__agentWidget) return;
  window.__agentWidget = true;

  var CSS_URL = '/ava/ava-widget.css';
  var me = document.currentScript || document.querySelector('script[src*="ava-widget.js"]');
  var AGENTS = {
    ava: {
      name: 'Ava', role: 'Brand manager', org: 'Orbit', accent: '#fbbf24', grad: 'linear-gradient(135deg,#fde047 0%,#f59e0b 100%)', ink: '#1a1d29',
      launch: 'Talk to Ava about your Amazon account.', sub: 'Online · your brand manager in Orbit',
      hello: 'Hi, I\'m Ava, the brand manager inside Orbit. I\'ve learned from a team that has managed **$500M+ in Amazon revenue**.\n\nTell me a little about your brand, or pick a question to start.',
      starters: ['Sales are flat but ad spend keeps rising. What\'s going on?', 'What would you fix first in a $5M Amazon brand?', 'How should ads, inventory and listings work together?', 'How do I grow on Amazon without killing margin?', 'When should I add streaming TV or audience ads?']
    },
    'dr-ppc': {
      name: 'Dr. PPC', role: 'Advertising specialist', org: 'Opus 5.5', accent: '#34d399', grad: 'linear-gradient(135deg,#6ee7b7 0%,#10b981 100%)', ink: '#06231a',
      launch: 'Talk to Dr. PPC about your Amazon ads.', sub: 'On duty · 24/7/365',
      hello: 'I\'m Dr. PPC. I run Amazon advertising every single day on the playbooks of an agency that has managed **$500M+ in Amazon revenue**.\n\nDescribe a symptom in your ad account, or pick one below.',
      starters: ['My ACoS looks fine but profit is down. Why?', 'Should I split branded and non-branded campaigns?', 'How should I set top-of-search placement multipliers?', 'My campaigns run out of budget by noon. What do I do?', 'Are my ads cannibalising my organic sales?']
    },
    'dr-stock': {
      name: 'Dr. Stock', role: 'Inventory specialist', org: 'Orbit', accent: '#ffb43d', grad: 'linear-gradient(135deg,#ffd27a 0%,#f59e0b 100%)', ink: '#1a1206',
      launch: 'Talk to Dr. Stock about your inventory.', sub: 'On duty · checked daily',
      hello: 'I\'m Dr. Stock. My question is always the same: **when does your cash come back?**\n\nTell me what\'s going on with your inventory, or pick one below.',
      starters: ['When should my next purchase order leave the supplier?', 'I keep stocking out mid-campaign. How do I stop it?', 'How much safety stock do I really need?', 'Should I liquidate slow SKUs before aged surcharges hit?', 'Am I being overcharged on FBA fees?']
    },
    'dr-dsp': {
      name: 'Dr. DSP', role: 'Audience network specialist', org: 'Orbit', accent: '#b97aff', grad: 'linear-gradient(135deg,#d8b4fe 0%,#9b5cf6 100%)', ink: '#1a0833',
      launch: 'Talk to Dr. DSP about reaching new shoppers.', sub: 'Online · is it incremental?',
      hello: 'I\'m Dr. DSP. Before any display dollar, I ask one question: **is it incremental?**\n\nTell me where your brand is, or pick a question.',
      starters: ['Is DSP the right next dollar for my brand?', 'Prospecting or retargeting: where do I start?', 'How do I know my display spend is incremental?', 'Is streaming TV worth it at my size?', 'What frequency cap should I use?']
    },
    bruno: {
      name: 'Bruno', role: 'Creative director', org: 'Listing Lab', accent: '#e879f9', grad: 'linear-gradient(135deg,#f5d0fe 0%,#d946ef 100%)', ink: '#2a0630',
      launch: 'Talk to Bruno about your listing creative.', sub: 'Online · creative director in Orbit',
      hello: 'I\'m Bruno. I build Amazon listings, copy and images, and I score every image against evidence, not taste.\n\nTell me about your listing, or pick a question.',
      starters: ['What makes a main image convert on Amazon?', 'How many images should my listing have, and what goes in each?', 'My clicks are fine but conversion is low. Is it my images?', 'What are the main-image rules brands still break?', 'How fast can you build a full image stack?']
    },
    'dr-shield': {
      name: 'Dr. Shield', role: 'Account protection', org: 'Orbit', accent: '#5aa9ff', grad: 'linear-gradient(135deg,#93c5fd 0%,#3b82f6 100%)', ink: '#04182e',
      launch: 'Talk to Dr. Shield about protecting your account.', sub: 'On watch · every hour',
      hello: 'I\'m Dr. Shield. My job is to make sure growth doesn\'t get erased overnight: hijackers, lost Buy Box, compliance flags.\n\nWhat\'s worrying you, or pick one below.',
      starters: ['Someone is selling on my listing. What do I do first?', 'I lost the Buy Box. How do I find out why?', 'How do I launch a new product without a compliance flag?', 'My listing was suppressed. Where do I start?', 'How do I spot counterfeit complaints before they hurt me?']
    },
    jacob: {
      av: 'dr-dsp',
      name: 'Jacob', role: 'Audience specialist', org: 'reMKTR', accent: '#fccc00', grad: 'linear-gradient(135deg,#ffe066 0%,#fccc00 100%)', ink: '#111111',
      launch: 'Talk to Jacob about reaching the shoppers who left.', sub: 'Online · reMKTR audience specialist',
      hello: 'I\'m Jacob from reMKTR. We find the shoppers who looked at your product and left, and bring them back, on Amazon, on streaming TV and on your own site.\n\nWhat\'s going on with your growth?',
      starters: ['My sponsored ads have plateaued. What\'s next?', 'How do I reach shoppers who looked and left?', 'Can I run TV ads on Prime Video?', 'Can Amazon audiences drive sales on my Shopify store?', 'What does the free Growth Leak Audit cover?']
    }
  };
  // data-api: base URL of the chat server (defaults to same origin /api/ava, as on the local review server)
  var API = ((me && me.getAttribute('data-api')) || '/api/ava').replace(/\/$/, '');
  var AGENT_ID = (me && me.getAttribute('data-agent')) || 'ava';
  if (!AGENTS[AGENT_ID]) AGENT_ID = 'ava';
  var A = AGENTS[AGENT_ID];
  var BOOK = AGENT_ID === 'jacob' ? 'https://calendly.com/jayce-remktr/30min' : 'https://fullcircle.fillout.com/bookacall-nick';
  var AVATAR_VIDEO = '/agents/' + (A.av || AGENT_ID) + '.mp4';
  var AVATAR_POSTER = '/agents/' + (A.av || AGENT_ID) + '.jpg';
  var STORE_KEY = 'agent-chat-v3-' + AGENT_ID;
  var STARTERS = A.starters;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- state ----------
  var st = { pending: null, sessionId: null, turns: 0, maxTurns: 10, email: null, needEmail: false, done: false, bookingUrl: null, log: [] };
  st.bookingUrl = st.bookingUrl || BOOK;
  try { var saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null'); if (saved && saved.sessionId) st = Object.assign(st, saved); } catch (e) {}
  function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(st)); } catch (e) {} }

  // ---------- dom ----------
  var host = document.createElement('div');
  host.setAttribute('data-ava-widget', '');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML =
    '<link rel="stylesheet" href="' + CSS_URL + '">' +
    '<div class="ava-root" part="root" style="--gold:' + A.accent + ';--gold-grad:' + A.grad + ';--ink:' + A.ink + ';--gold-a:' + hexA(A.accent, .16) + '">' +
      '<section class="ava-panel" role="dialog" aria-label="Chat with ' + A.name + '" aria-modal="false">' +
        '<header class="ava-head">' + avatar(42) +
          '<div class="ava-head-text"><b>' + A.name + '</b><span>' + A.role + ' &middot; <em>' + A.org + '</em></span></div>' +
          '<button class="ava-x" type="button" aria-label="Close chat"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg></button>' +
        '</header>' +
        '<div class="ava-log" aria-live="polite"></div>' +
        '<div class="ava-foot">' +
          '<form class="ava-form"><textarea rows="1" maxlength="800" placeholder="Ask ' + A.name + ' a question..." aria-label="Message ' + A.name + '"></textarea>' +
          '<button class="ava-send" type="submit" aria-label="Send"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5"/></svg></button></form>' +
          '<div class="ava-meta"><span>AI agent &middot; no account access yet</span><span class="ava-count"></span></div>' +
        '</div>' +
      '</section>' +
      '<button class="ava-launch" type="button" aria-label="' + A.launch + '">' +
        '<span class="ava-launch-text"><b>' + A.launch + '</b><span><i></i>' + A.sub + '</span></span>' +
        '<span class="ava-launch-av"><span class="ava-orbit o1"><i></i></span><span class="ava-orbit o2"><i></i><i></i></span><span class="ava-glow"></span>' + avatar(48) + '</span>' +
      '</button>' +
    '</div>';
  document.body.appendChild(host);

  var $ = function (s) { return root.querySelector(s); };
  var wrap = $('.ava-root'), launch = $('.ava-launch'), logEl = $('.ava-log'), form = $('.ava-form'),
      input = $('.ava-form textarea'), sendBtn = $('.ava-send'), countEl = $('.ava-count');

  function hexA(h, a) { var n = parseInt(h.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; }
  function avatar(size) {
    return '<span class="ava-av" style="width:' + size + 'px;height:' + size + 'px">' +
      (reduced ? '<img src="' + AVATAR_POSTER + '" alt="">' :
        '<video autoplay muted loop playsinline preload="metadata" poster="' + AVATAR_POSTER + '" aria-hidden="true"><source src="' + AVATAR_VIDEO + '" type="video/mp4"></video>') +
      '</span>';
  }

  // ---------- rendering ----------
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function md(text) {
    var blocks = esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').split(/\n{2,}/);
    return blocks.map(function (b) {
      var lines = b.split('\n');
      if (lines.every(function (l) { return /^\s*([-*•]|\d+\.)\s+/.test(l); })) {
        return '<ul>' + lines.map(function (l) { return '<li>' + l.replace(/^\s*([-*•]|\d+\.)\s+/, '') + '</li>'; }).join('') + '</ul>';
      }
      return '<p>' + lines.join('<br>') + '</p>';
    }).join('');
  }

  function addMsg(role, text, opts) {
    var hasBook = role === 'bot' && /\[\[BOOK\]\]/.test(text);
    var clean = text.replace(/\n?\s*\[\[BOOK\]\]\s*/g, '').trim();
    var el = document.createElement('div');
    el.className = 'ava-msg ' + role + (opts && opts.err ? ' err' : '');
    el.innerHTML = role === 'me' ? esc(clean).replace(/\n/g, '<br>') : md(clean);
    logEl.appendChild(el);
    if (hasBook) addBook();
    scroll();
    return el;
  }

  function addBook(label) {
    var a = document.createElement('a');
    a.className = 'ava-cta';
    a.href = st.bookingUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = esc(label || 'Book a strategy call') + ' <span aria-hidden="true">&rarr;</span>';
    a.addEventListener('click', function (e) {
      if (window.Calendly && /calendly\.com/.test(a.href)) { e.preventDefault(); window.Calendly.initPopupWidget({ url: a.href }); }
    });
    logEl.appendChild(a);
  }

  function addChips() {
    var box = document.createElement('div');
    box.className = 'ava-chips';
    STARTERS.forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ava-chip';
      b.textContent = q;
      b.addEventListener('click', function () { box.remove(); sendMessage(q); });
      box.appendChild(b);
    });
    logEl.appendChild(box);
  }

  function addGate() {
    if ($('.ava-gate')) return;
    var g = document.createElement('div');
    g.className = 'ava-gate';
    g.innerHTML = '<form><input type="email" required autocomplete="email" placeholder="you@yourbrand.com" aria-label="Your email"><button type="submit">Keep chatting</button></form>' +
      '<div class="ava-gerr" role="alert"></div><small>No spam. Just your notes and, if you want one, a call with our team.</small>';
    logEl.appendChild(g);
    var f = g.querySelector('form'), em = g.querySelector('input'), er = g.querySelector('.ava-gerr');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = em.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) { er.textContent = 'That email doesn\'t look right.'; er.style.display = 'block'; return; }
      er.style.display = 'none';
      api('/chat', { sessionId: st.sessionId, email: v }).then(function (r) {
        if (r.error && r.error !== 'email_required') { er.textContent = r.error; er.style.display = 'block'; return; }
        st.email = v; applyState(r); save();
        g.remove();
        var pending = st.pending; st.pending = null; save();
        refreshInput();
        if (pending) ask(pending); else input.focus();
      }).catch(function () { er.textContent = 'Couldn\'t save that. Try again.'; er.style.display = 'block'; });
    });
    scroll();
    setTimeout(function () { em.focus(); }, 60);
  }

  function askForEmail() {
    var line = 'Good one, and I can keep going with you. Where should I send your brand notes? Drop your email and I\'ll answer this right away.';
    addMsg('bot', line); st.log.push({ r: 'bot', t: line }); save();
    addGate();
  }

  function typing(on) {
    var t = $('.ava-typing');
    if (on && !t) { t = document.createElement('div'); t.className = 'ava-typing'; t.innerHTML = '<i></i><i></i><i></i>'; logEl.appendChild(t); scroll(); }
    if (!on && t) t.remove();
  }

  function scroll() { logEl.scrollTop = logEl.scrollHeight; }

  function refreshInput() {
    var waiting = Boolean(st.pending);
    var locked = waiting || st.done || busy;
    form.classList.toggle('locked', waiting || st.done);
    input.disabled = waiting || st.done;
    sendBtn.disabled = locked || !input.value.trim();
    input.placeholder = st.done ? 'That\'s the end of this chat. Book a call to keep going.' : waiting ? 'Add your email above to keep chatting' : 'Ask ' + A.name + ' a question...';
    countEl.innerHTML = st.turns ? '<b>' + st.turns + '</b> of ' + st.maxTurns + ' messages' : '';
  }

  function applyState(r) {
    if (typeof r.turns === 'number') st.turns = r.turns;
    if (r.maxTurns) st.maxTurns = r.maxTurns;
    if (typeof r.needEmail === 'boolean') st.needEmail = r.needEmail;
    if (typeof r.done === 'boolean') st.done = r.done;
    if (r.bookingUrl) st.bookingUrl = r.bookingUrl;
  }

  // ---------- api ----------
  function api(path, body) {
    return fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) })
      .then(function (res) { return res.json().catch(function () { return { error: 'Something went wrong.' }; }).then(function (j) { j._status = res.status; return j; }); });
  }

  function ensureSession() {
    if (st.sessionId) return Promise.resolve();
    return api('/start', { page: location.pathname, agent: AGENT_ID }).then(function (r) {
      if (!r.sessionId) throw new Error(r.error || 'Could not start a chat.');
      st.sessionId = r.sessionId; st.maxTurns = r.maxTurns || 10; if (r.bookingUrl) st.bookingUrl = r.bookingUrl; save();
    });
  }

  var busy = false;
  function sendMessage(text) {
    text = (text || '').trim();
    if (!text || busy || st.pending || st.done) return;
    var chips = $('.ava-chips'); if (chips) chips.remove();
    addMsg('me', text); st.log.push({ r: 'me', t: text }); save();
    input.value = ''; autosize();
    if (st.needEmail && !st.email) { st.pending = text; save(); refreshInput(); askForEmail(); return; }
    ask(text);
  }

  function ask(text) {
    busy = true; refreshInput();
    typing(true);
    ensureSession()
      .then(function () { return api('/chat', { sessionId: st.sessionId, message: text }); })
      .then(function (r) {
        typing(false);
        if (r._status === 404) { st.sessionId = null; save(); throw new Error(r.error); }
        if (r.error === 'email_required') { applyState(r); st.pending = text; save(); askForEmail(); return; }
        if (r.error && !r.reply) {
          addMsg('bot', r.error, { err: true });
          if (r.bookingUrl) addBook();
          return;
        }
        applyState(r);
        addMsg('bot', r.reply); st.log.push({ r: 'bot', t: r.reply }); save();
        if (st.done && !/\[\[BOOK\]\]/.test(r.reply)) addBook();
      })
      .catch(function () { typing(false); addMsg('bot', 'I can\'t chat right this second, but our team can answer this on a quick call.'); addBook('Book a call'); })
      .then(function () { busy = false; refreshInput(); if (!st.pending && !st.done) input.focus(); });
  }

  // ---------- open / close ----------
  var greeted = false;
  function open() {
    wrap.classList.add('open');
    if (!greeted) {
      greeted = true;
      if (st.log.length) {
        st.log.forEach(function (m) { addMsg(m.r, m.t); });
        if (st.pending) addGate();
        if (st.done) addBook();
      } else {
        addMsg('bot', A.hello);
        addChips();
      }
    }
    refreshInput();
    setTimeout(function () { (st.pending ? (root.querySelector('.ava-gate input') || input) : input).focus(); }, 80);
  }
  function close() { wrap.classList.remove('open'); launch.focus(); }

  launch.addEventListener('click', open);
  $('.ava-x').addEventListener('click', close);
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('open')) close(); });

  form.addEventListener('submit', function (e) { e.preventDefault(); sendMessage(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); } });
  input.addEventListener('input', function () { autosize(); refreshInput(); });
  function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; }

  // data-defer="hero": keep the launcher hidden until the visitor scrolls past the first screen
  // (used where the hero already features the same agent).
  if (me && me.getAttribute('data-defer') === 'hero') {
    wrap.classList.add('deferred');
    var reveal = function () { if (window.scrollY > window.innerHeight * 0.8) { wrap.classList.remove('deferred'); window.removeEventListener('scroll', reveal); } };
    window.addEventListener('scroll', reveal, { passive: true });
  }

  // Show the full "Talk to ..." pill briefly, then shrink to the avatar so it never covers the page.
  function mini() { wrap.classList.add('mini'); window.removeEventListener('scroll', onScroll); }
  function onScroll() { if (window.scrollY > 500) mini(); }
  setTimeout(mini, 9000);
  window.addEventListener('scroll', onScroll, { passive: true });

  refreshInput();
})();
