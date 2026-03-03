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
      else if (path.indexOf('approach') !== -1) section = 'approach';
      else if (path.indexOf('about') !== -1) section = 'about';
      else if (path.indexOf('insights') !== -1) section = 'insights';

      if (section) {
        var links = document.querySelectorAll('[data-nav="' + section + '"]');
        for (var i = 0; i < links.length; i++) {
          links[i].classList.add('text-teal-600', 'font-bold');
          links[i].classList.remove('text-slate-600');
        }
      }

      // Re-initialize Lucide icons for the injected header
      setTimeout(function() {
        if (window.lucide) {
          lucide.createIcons();
        } else {
          setTimeout(function() {
            if (window.lucide) {
              lucide.createIcons();
            }
          }, 200);
        }
      }, 50);

      // Initialize mobile menu dropdown toggles
      var mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        var serviceLink = mobileMenu.querySelector('a[data-nav="services"]');

        if (serviceLink) {
          var serviceSubmenu = serviceLink.nextElementSibling;
          if (serviceSubmenu) {
            serviceLink.addEventListener('click', function(e) {
              e.preventDefault();
              serviceSubmenu.classList.toggle('hidden');
              var icon = serviceLink.querySelector('i');
              if (icon) {
                if (serviceSubmenu.classList.contains('hidden')) {
                  icon.setAttribute('data-lucide', 'chevron-down');
                } else {
                  icon.setAttribute('data-lucide', 'chevron-up');
                }
                lucide.createIcons();
              }
            });
          }
        }
      }
    });
})();
