(function () {
  const script = document.currentScript;
  const depth = parseInt(script.getAttribute('data-depth') || '0', 10);
  const base = '../'.repeat(depth);

  fetch(base + 'templates/footer.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      html = html.replace(/\{base\}/g, base);
      const container = document.getElementById('site-footer');
      if (container) {
        container.innerHTML = html;
      }
    });
})();
