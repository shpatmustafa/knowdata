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
        // Ensure container doesn't cause overflow
        container.style.width = '100%';
        container.style.maxWidth = '100vw';
        container.style.overflowX = 'hidden';
        container.style.boxSizing = 'border-box';
        container.style.position = 'relative';
        
        container.innerHTML = html;
        
        // Force overflow-x hidden on all elements after footer loads
        setTimeout(function() {
          document.documentElement.style.overflowX = 'hidden';
          document.documentElement.style.width = '100%';
          document.documentElement.style.maxWidth = '100vw';
          
          document.body.style.overflowX = 'hidden';
          document.body.style.width = '100%';
          document.body.style.maxWidth = '100vw';
          document.body.style.position = 'relative';
          document.body.style.boxSizing = 'border-box';
          
          // Ensure main element doesn't overflow
          const main = document.querySelector('main');
          if (main) {
            main.style.maxWidth = '100%';
            main.style.overflowX = 'hidden';
            main.style.width = '100%';
          }
          
          // Ensure footer element doesn't overflow
          const footer = container.querySelector('footer');
          if (footer) {
            footer.style.maxWidth = '100vw';
            footer.style.width = '100%';
            footer.style.overflowX = 'hidden';
          }
        }, 10);
      }
    });
})();
