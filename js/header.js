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
      // Wait a bit to ensure Lucide is fully loaded
      setTimeout(function() {
        if (window.lucide) {
          lucide.createIcons();
        } else {
          // If Lucide isn't loaded yet, wait a bit more
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
        var industryLink = mobileMenu.querySelector('a[data-nav="industries"]');
        
        if (serviceLink) {
          var serviceSubmenu = serviceLink.nextElementSibling;
          if (serviceSubmenu) {
            serviceLink.addEventListener('click', function(e) {
              e.preventDefault();
              serviceSubmenu.classList.toggle('hidden');
              // Toggle chevron icon
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
        
        if (industryLink) {
          var industrySubmenu = industryLink.nextElementSibling;
          if (industrySubmenu) {
            industryLink.addEventListener('click', function(e) {
              e.preventDefault();
              industrySubmenu.classList.toggle('hidden');
              // Toggle chevron icon
              var icon = industryLink.querySelector('i');
              if (icon) {
                if (industrySubmenu.classList.contains('hidden')) {
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
