/* ==========================================================
   從新聞，看個案 — 共用互動腳本（無外部相依）
   ========================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 捲動顯示 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.matches('[data-count]')) countUp(e.target);
      if (e.target.matches('.dialogue')) playDialogue(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal, .tl-item, [data-count], .dialogue').forEach((el) => io.observe(el));

  /* ---------- 數字跳動 ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    const fmt = (v) => v.toLocaleString('zh-TW', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduce) { el.innerHTML = fmt(target) + suffix; return; }
    const dur = 1400, t0 = performance.now();
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- 對話逐句出現 ---------- */
  function playDialogue(box) {
    const lines = $$('.say', box);
    if (reduce) return;
    lines.forEach((l) => (l.style.display = 'none'));
    let i = 0;
    (function next() {
      if (i >= lines.length) return;
      const line = lines[i++];
      line.style.display = '';
      const bubble = $('.bubble', line);
      const html = bubble.innerHTML;
      const who = $('.who', bubble);
      bubble.innerHTML = (who ? who.outerHTML : '') + '<span class="dots"><i></i><i></i><i></i></span>';
      line.classList.add('reveal', 'in');
      setTimeout(() => { bubble.innerHTML = html; setTimeout(next, 350); }, 650);
    })();
  }

  /* ---------- 頂部進度條 + 目錄高亮 ---------- */
  const bar = $('.progress');
  const tocLinks = $$('.toc a[href^="#"]');
  const secs = tocLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const tl = $('.timeline'), tlFill = tl && $('.fill', tl);
  function onScroll() {
    const h = document.documentElement;
    if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
    let cur = null;
    secs.forEach((s) => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
    tocLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    if (tlFill) {
      const r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height));
      tlFill.style.height = p * (r.height - 12) + 'px';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 攻擊流程模擬 ---------- */
  $$('[data-attack]').forEach((root) => {
    const nodes = $$('.node', root);
    const steps = JSON.parse($('script[type="application/json"]', root).textContent);
    const cap = $('.attack-caption', root);
    const packet = $('.packet', root);
    const stage = $('.attack-stage', root);
    const dots = $('.step-dots', root);
    dots.innerHTML = steps.map(() => '<i></i>').join('');
    let i = -1, timer = null;

    function show(n) {
      i = (n + steps.length) % steps.length;
      const s = steps[i];
      nodes.forEach((nd, k) => nd.classList.toggle('active', k === s.node));
      const nd = nodes[s.node];
      const left = nd.offsetLeft + nd.offsetWidth / 2 - 8;
      packet.style.top = nd.offsetTop - 8 + 'px';
      packet.style.left = left + 'px';
      packet.style.opacity = 1;
      packet.classList.toggle('evil', !!s.evil);
      cap.innerHTML = '<b>Step ' + (i + 1) + '／' + steps.length + '：' + s.title + '</b><br>' + s.text;
      $$('i', dots).forEach((d, k) => d.classList.toggle('on', k <= i));
    }
    function play() {
      stop();
      $('[data-act="play"]', root).textContent = '⏸ 暫停';
      timer = setInterval(() => { if (i === steps.length - 1) { stop(); return; } show(i + 1); }, 3200);
      if (i === steps.length - 1 || i < 0) show(0);
    }
    function stop() {
      clearInterval(timer); timer = null;
      $('[data-act="play"]', root).textContent = '▶ 播放攻擊流程';
    }
    root.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]');
      if (!act) return;
      const a = act.dataset.act;
      if (a === 'play') timer ? stop() : play();
      if (a === 'next') { stop(); show(i + 1); }
      if (a === 'prev') { stop(); show(i - 1); }
      if (a === 'reset') { stop(); i = -1; nodes.forEach((n) => n.classList.remove('active')); packet.style.opacity = 0; cap.innerHTML = cap.dataset.init; $$('i', dots).forEach((d) => d.classList.remove('on')); }
    });
    cap.dataset.init = cap.innerHTML;
    window.addEventListener('resize', () => { if (i >= 0) show(i); });
    // 進入畫面時自動播放一次
    const auto = new IntersectionObserver((en) => { if (en[0].isIntersecting && !reduce) { play(); auto.disconnect(); } }, { threshold: 0.5 });
    auto.observe(stage);
  });

  /* ---------- 分頁（問題討論） ---------- */
  $$('[role="tablist"]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((t) => t.addEventListener('click', () => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', on);
        $('#' + x.getAttribute('aria-controls')).hidden = !on;
      });
    }));
  });
  // 全部展開／收合
  $$('[data-expand]').forEach((b) => b.addEventListener('click', () => {
    const scope = $(b.dataset.expand);
    const ds = $$('details', scope);
    const open = ds.some((d) => !d.open);
    ds.forEach((d) => (d.open = open));
    b.textContent = open ? '收合全部參考答案' : '展開全部參考答案';
  }));
  // 列印時展開所有答案
  window.addEventListener('beforeprint', () => { $$('details.qa').forEach((d) => (d.open = true)); $$('.panel').forEach((p) => (p.hidden = false)); });

  /* ---------- 檢核清單（存在本機） ---------- */
  $$('[data-checklist]').forEach((ul) => {
    const key = 'checklist:' + ul.dataset.checklist;
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    const boxes = $$('input[type="checkbox"]', ul);
    const meter = $(ul.dataset.meter);
    const label = $(ul.dataset.meterLabel);
    function update() {
      const done = boxes.filter((b) => b.checked).length;
      if (meter) $('i', meter).style.width = (done / boxes.length) * 100 + '%';
      if (label) label.textContent = done + ' / ' + boxes.length;
      localStorage.setItem(key, JSON.stringify(Object.fromEntries(boxes.map((b) => [b.id, b.checked]))));
    }
    boxes.forEach((b) => { b.checked = !!saved[b.id]; b.addEventListener('change', update); });
    update();
  });

  /* ---------- 阿拉蕾小提示（依章節切換） ---------- */
  const helper = $('.helper');
  if (helper) {
    const box = $('.tipbox span', helper);
    const img = $('img', helper);
    let lastId = null, dismissed = false, hideT = null;
    const tipSecs = $$('[data-tip]');
    const tipIO = new IntersectionObserver((en) => {
      en.forEach((e) => {
        if (!e.isIntersecting || dismissed) return;
        const el = e.target;
        if (el.id === lastId) return;
        lastId = el.id;
        helper.classList.remove('show');
        setTimeout(() => {
          box.innerHTML = el.dataset.tip;
          if (el.dataset.tipImg) img.src = el.dataset.tipImg;
          helper.classList.add('show');
          clearTimeout(hideT);
          hideT = setTimeout(() => helper.classList.remove('show'), window.innerWidth < 680 ? 5000 : 9000);
        }, 250);
      });
    }, { threshold: 0.35 });
    tipSecs.forEach((s) => tipIO.observe(s));
    $('.close', helper).addEventListener('click', () => { dismissed = true; helper.classList.remove('show'); });
    img.addEventListener('click', () => { dismissed = false; helper.classList.toggle('show'); });
  }
})();
