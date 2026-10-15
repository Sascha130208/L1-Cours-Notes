/* Formules (KaTeX) + bouton « tout déplier / replier » sur les pages d'exercices. */
(function () {
  'use strict';

  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    } catch (e) { /* on garde le texte brut */ }
  }

  var page = document.querySelector('.page');
  if (!page) return;

  /* formules en ligne plus larges que l'écran : défilement horizontal au lieu de faire déborder la page */
  function fitFormulas() {
    Array.prototype.forEach.call(page.querySelectorAll('.katex'), function (k) {
      if (k.closest('.katex-display') || k.closest('.tablewrap')) return;
      k.classList.remove('katex-wide');
      var box = k.closest('p,li,summary,blockquote,h1,h2,h3,h4,div');
      if (box && k.getBoundingClientRect().width > box.clientWidth + 1) k.classList.add('katex-wide');
    });
  }
  fitFormulas();
  var timer;
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(fitFormulas, 150); });
  var items = Array.prototype.filter.call(page.querySelectorAll('details'), function (d) {
    return !d.closest('.toc');
  });
  if (items.length < 3) return;

  function setAll(open) { items.forEach(function (d) { d.open = open; }); }
  function btn(label, open) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', function () { setAll(open); });
    return b;
  }
  var bar = document.createElement('div');
  bar.className = 'rev-tools';
  bar.appendChild(btn('Tout déplier', true));
  bar.appendChild(btn('Tout replier', false));

  var toc = page.querySelector('.toc');
  var h1 = page.querySelector('h1');
  var anchor = toc || h1;
  if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor.nextSibling);
})();
