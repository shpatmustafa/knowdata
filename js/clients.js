(function () {
  var script = document.currentScript;
  var depth = parseInt(script.getAttribute('data-depth') || '0', 10);
  var base = '../'.repeat(depth);

  fetch(base + 'templates/clients.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      html = html.replace(/\{base\}/g, base);
      var container = document.getElementById('client-logos');
      if (container) {
        container.innerHTML = html;
      }
    });
})();
