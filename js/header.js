(function () {
  var script = document.currentScript;
  var depth = parseInt(script.getAttribute('data-depth') || '0', 10);
  var base = '../'.repeat(depth);

  fetch(base + 'templates/header.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      html = html.replace(/\{base\}/g, base);

      var container = document.getElementById('site-header');
      if (container) {
        container.innerHTML = html;
      }

      // Auto-detect active nav link based on current URL path
      var path = window.location.pathname.toLowerCase();
      var section = '';

      if (path.indexOf('services') !== -1) section = 'services';
      else if (path.indexOf('industries') !== -1) section = 'industries';
      else if (path.indexOf('case-studies') !== -1 || path.indexOf('case_studies') !== -1) section = 'case-studies';
      else if (path.indexOf('methodology') !== -1) section = 'methodology';

      if (section) {
        var links = document.querySelectorAll('[data-nav="' + section + '"]');
        for (var i = 0; i < links.length; i++) {
          links[i].classList.add('text-teal-600', 'font-bold');
          links[i].classList.remove('text-slate-600');
        }
      }

      // Re-initialize Lucide icons for the injected header
      if (window.lucide) {
        lucide.createIcons();
      }
    });
})();
