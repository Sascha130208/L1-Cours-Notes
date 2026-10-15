/* Lecteur de flashcards.
   Données : <script type="application/json" id="fc-data"> {id, tags:[{key,label}], cards:[{id,t,q,a}]}
   Progression ("cartes maîtrisées") gardée dans le localStorage du navigateur, par paquet. */
(function () {
  'use strict';

  var dataEl = document.getElementById('fc-data');
  var app = document.getElementById('fc-app');
  if (!dataEl || !app) return;
  var deck = JSON.parse(dataEl.textContent);

  /* ---------- progression ---------- */
  var KEY = 'fc:' + deck.id + ':known';
  function loadKnown() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { return new Set(); }
  }
  var known = loadKnown();
  function saveKnown() {
    try { localStorage.setItem(KEY, JSON.stringify(Array.from(known))); } catch (e) { /* stockage indisponible */ }
  }

  /* ---------- état ---------- */
  var sel = new Set(deck.tags.map(function (t) { return t.key; }));
  var opt = { shuffle: true, skipKnown: true };
  var screen = 'setup';
  var round = 1, queue = [], missed = [], idx = 0, nOk = 0, nKo = 0, history = [], flipped = false;

  /* ---------- utilitaires ---------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function clear() { while (app.firstChild) app.removeChild(app.firstChild); }
  function renderMath(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '$$', right: '$$', display: true }
          ],
          throwOnError: false
        });
      } catch (e) { /* on garde le texte brut */ }
    }
  }
  function plural(n, s, p) { return n + ' ' + (n > 1 ? p : s); }
  function tagLabel(key) {
    for (var i = 0; i < deck.tags.length; i++) if (deck.tags[i].key === key) return deck.tags[i].label;
    return '';
  }

  /* ---------- écran 1 : choix ---------- */
  function pool() {
    return deck.cards.filter(function (c) {
      return sel.has(c.t) && !(opt.skipKnown && known.has(c.id));
    });
  }

  function showSetup() {
    screen = 'setup';
    clear();
    var total = deck.cards.length, nKnown = deck.cards.filter(function (c) { return known.has(c.id); }).length;

    app.appendChild(h('h2', { 'class': 'fc-h', text: '1. Choisis ce que tu veux réviser' }));
    var chips = h('div', { 'class': 'fc-chips' });
    var summary = h('p', { 'class': 'fc-note' });
    var startBtn = h('button', { 'class': 'fc-btn', type: 'button', onclick: startSession });

    function refresh() {
      var n = pool().length;
      summary.textContent = n + ' carte' + (n > 1 ? 's' : '') + ' à réviser';
      startBtn.disabled = n === 0;
      startBtn.textContent = 'Commencer (' + n + ')';
      if (n === 0 && deck.cards.length) {
        summary.textContent += ' — tout est déjà maîtrisé dans cette sélection 🎉 Décoche « ignorer les cartes maîtrisées » pour tout revoir.';
      }
    }

    deck.tags.forEach(function (t) {
      var count = deck.cards.filter(function (c) { return c.t === t.key; }).length;
      var kn = deck.cards.filter(function (c) { return c.t === t.key && known.has(c.id); }).length;
      var b = h('button', { 'class': 'fc-chip', type: 'button', 'aria-pressed': String(sel.has(t.key)) });
      b.appendChild(document.createTextNode(t.label));
      b.appendChild(h('small', { text: kn + '/' + count }));
      b.addEventListener('click', function () {
        if (sel.has(t.key)) sel.delete(t.key); else sel.add(t.key);
        b.setAttribute('aria-pressed', String(sel.has(t.key)));
        refresh();
      });
      chips.appendChild(b);
    });
    app.appendChild(chips);
    app.appendChild(h('div', { 'class': 'fc-row' }, [
      h('button', { 'class': 'fc-btn ghost', type: 'button', text: 'Tout cocher', onclick: function () {
        deck.tags.forEach(function (t) { sel.add(t.key); }); showSetup(); } }),
      h('button', { 'class': 'fc-btn ghost', type: 'button', text: 'Tout décocher', onclick: function () {
        sel.clear(); showSetup(); } })
    ]));

    var cbShuffle = h('input', { type: 'checkbox' }); cbShuffle.checked = opt.shuffle;
    cbShuffle.addEventListener('change', function () { opt.shuffle = cbShuffle.checked; });
    var cbSkip = h('input', { type: 'checkbox' }); cbSkip.checked = opt.skipKnown;
    cbSkip.addEventListener('change', function () { opt.skipKnown = cbSkip.checked; refresh(); });
    app.appendChild(h('div', { 'class': 'fc-opts' }, [
      h('label', null, [cbShuffle, document.createTextNode(' Mélanger les cartes')]),
      h('label', null, [cbSkip, document.createTextNode(' Ignorer les cartes déjà maîtrisées (« Je sais » validé)')])
    ]));

    app.appendChild(summary);
    app.appendChild(h('div', { 'class': 'fc-row' }, [startBtn]));
    refresh();

    app.appendChild(h('p', { 'class': 'fc-note',
      text: 'Progression : ' + nKnown + ' carte' + (nKnown > 1 ? 's' : '') + ' maîtrisée' + (nKnown > 1 ? 's' : '') +
            ' sur ' + total + '. Elle est enregistrée dans ce navigateur uniquement.' }));
    if (nKnown > 0) {
      app.appendChild(h('div', { 'class': 'fc-row' }, [
        h('button', { 'class': 'fc-btn ghost', type: 'button', text: 'Effacer ma progression', onclick: function () {
          if (window.confirm('Effacer la progression de ce paquet ?')) { known = new Set(); saveKnown(); showSetup(); }
        } })
      ]));
    }
  }

  function startSession() {
    round = 1;
    startRound(pool());
  }

  /* ---------- écran 2 : une carte ---------- */
  function startRound(list) {
    queue = opt.shuffle ? shuffle(list) : list.slice();
    missed = []; idx = 0; nOk = 0; nKo = 0; history = [];
    showCard();
  }

  function showCard() {
    if (idx >= queue.length) return showRoundEnd();
    screen = 'study';
    flipped = false;
    clear();
    var c = queue[idx];

    var bar = h('i');
    bar.style.width = (idx / queue.length * 100) + '%';
    app.appendChild(h('div', { 'class': 'fc-top' }, [
      h('span', { text: (round > 1 ? 'Tour ' + round + ' (cartes ratées) · ' : '') + 'Carte ' + (idx + 1) + ' / ' + queue.length }),
      h('span', { 'class': 'fc-score', html: '✅ <b class="ok">' + nOk + '</b> &nbsp; ❌ <b class="ko">' + nKo + '</b>' })
    ]));
    app.appendChild(h('div', { 'class': 'fc-bar' }, [bar]));

    var front = h('div', { 'class': 'fc-face fc-front', 'aria-hidden': 'false' }, [
      h('span', { 'class': 'fc-tag', text: tagLabel(c.t) }),
      h('span', { 'class': 'fc-lbl', text: 'Question' }),
      h('div', { 'class': 'fc-body', html: c.q })
    ]);
    var back = h('div', { 'class': 'fc-face fc-back', 'aria-hidden': 'true' }, [
      h('span', { 'class': 'fc-tag', text: tagLabel(c.t) }),
      h('span', { 'class': 'fc-lbl', text: 'Réponse' }),
      h('div', { 'class': 'fc-body', html: c.a })
    ]);
    var card = h('div', { 'class': 'fc-card', role: 'button', tabindex: '0',
      'aria-label': 'Carte : cliquer pour retourner' }, [h('div', { 'class': 'fc-inner' }, [front, back])]);
    card.addEventListener('click', flip);
    app.appendChild(card);

    var hint = h('p', { 'class': 'fc-hint', text: 'Réfléchis, puis clique sur la carte (ou Espace) pour voir la réponse.' });
    app.appendChild(hint);

    var koBtn = h('button', { 'class': 'fc-btn ko', type: 'button', disabled: 'disabled',
      html: '❌ Je ne sais pas', onclick: function () { answer(false); } });
    var okBtn = h('button', { 'class': 'fc-btn ok', type: 'button', disabled: 'disabled',
      html: '✅ Je sais', onclick: function () { answer(true); } });
    app.appendChild(h('div', { 'class': 'fc-actions' }, [koBtn, okBtn]));

    var undo = h('button', { type: 'button', text: '↩ Annuler la dernière réponse', onclick: undoLast });
    if (!history.length) undo.disabled = true;
    app.appendChild(h('div', { 'class': 'fc-undo' }, [undo]));
    app.appendChild(h('div', { 'class': 'fc-undo' }, [
      h('button', { type: 'button', text: 'Arrêter et revenir au choix', onclick: showSetup })
    ]));

    renderMath(card);
    card._ui = { card: card, front: front, back: back, hint: hint, koBtn: koBtn, okBtn: okBtn };
    current = card;
  }

  var current = null;

  function flip() {
    if (screen !== 'study' || !current) return;
    var u = current._ui;
    flipped = !flipped;
    u.card.classList.toggle('flipped', flipped);
    u.front.setAttribute('aria-hidden', String(flipped));
    u.back.setAttribute('aria-hidden', String(!flipped));
    u.koBtn.disabled = !flipped;
    u.okBtn.disabled = !flipped;
    u.hint.textContent = flipped
      ? 'Tu savais ? Réponds honnêtement : les cartes ratées reviendront au tour suivant. (← ne sais pas · → sais)'
      : 'Réfléchis, puis clique sur la carte (ou Espace) pour voir la réponse.';
  }

  function answer(ok) {
    if (screen !== 'study' || !flipped) return;
    var c = queue[idx];
    history.push({ card: c, ok: ok, wasKnown: known.has(c.id) });
    if (ok) { known.add(c.id); nOk++; } else { known['delete'](c.id); missed.push(c); nKo++; }
    saveKnown();
    idx++;
    showCard();
  }

  function undoLast() {
    if (!history.length) return;
    var last = history.pop();
    if (last.ok) nOk--; else { nKo--; missed.pop(); }
    if (last.wasKnown) known.add(last.card.id); else known['delete'](last.card.id);
    saveKnown();
    idx--;
    showCard();
  }

  /* ---------- écran 3 : fin du tour ---------- */
  function showRoundEnd() {
    screen = 'end';
    clear();
    var box = h('div', { 'class': 'fc-end' });
    if (missed.length === 0) {
      box.appendChild(h('p', { 'class': 'big', text: '🎉' }));
      box.appendChild(h('p', { 'class': 'stats', html: round > 1
        ? 'Bravo : <b>toutes les cartes ratées sont maintenant sues</b>.'
        : 'Bravo : <b>tu connaissais les ' + plural(queue.length, 'carte', 'cartes') + '</b>.' }));
      box.appendChild(h('div', { 'class': 'fc-row', style: 'justify-content:center' }, [
        h('button', { 'class': 'fc-btn', type: 'button', text: 'Revenir au choix', onclick: showSetup })
      ]));
    } else {
      box.appendChild(h('p', { 'class': 'big', text: nOk >= nKo ? '👍' : '💪' }));
      box.appendChild(h('p', { 'class': 'stats',
        html: '✅ <b>' + nOk + '</b> sue' + (nOk > 1 ? 's' : '') + ' &nbsp;·&nbsp; ❌ <b>' + nKo + '</b> à revoir' }));
      var snapshot = missed.slice();
      box.appendChild(h('div', { 'class': 'fc-row', style: 'justify-content:center' }, [
        h('button', { 'class': 'fc-btn', type: 'button',
          text: '🔁 Refaire les ' + plural(snapshot.length, 'carte ratée', 'cartes ratées'),
          onclick: function () { round++; startRound(snapshot); } }),
        h('button', { 'class': 'fc-btn ghost', type: 'button', text: 'Arrêter', onclick: showSetup })
      ]));
      var list = h('ul');
      snapshot.forEach(function (c) { list.appendChild(h('li', { html: c.q })); });
      box.appendChild(h('details', { 'class': 'fc-miss' }, [h('summary', { text: 'Voir les cartes ratées' }), list]));
    }
    app.appendChild(box);
    renderMath(box);
  }

  /* ---------- clavier ---------- */
  document.addEventListener('keydown', function (e) {
    if (screen !== 'study') return;
    var t = e.target, tn = t && t.tagName;
    if (tn === 'BUTTON' || tn === 'INPUT' || tn === 'A' || tn === 'SUMMARY') return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
    else if (flipped && (e.key === 'ArrowLeft' || e.key === '1')) { e.preventDefault(); answer(false); }
    else if (flipped && (e.key === 'ArrowRight' || e.key === '2')) { e.preventDefault(); answer(true); }
  });

  /* KaTeX est chargé en différé : on re-rend la carte courante dès qu'il est prêt */
  window.addEventListener('load', function () { if (current && screen === 'study') renderMath(current); });

  showSetup();
})();
