function updateCursorColor() {
    const accentColor = getComputedStyle(document.body)
                          .getPropertyValue('--accent-color').trim();
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='${accentColor}' viewBox='0 0 24 24'>
      <path d='M12 .587l3.668 7.431L24 9.748l-6 5.845 1.416 8.265L12 18.896l-7.416 4.962L6 15.593 0 9.748l8.332-1.73z'/>
    </svg>`;
    const encodedSVG = encodeURIComponent(svg);
    const cursorValue = `url("data:image/svg+xml,${encodedSVG}") 12 12, auto`;
    document.body.style.cursor = cursorValue;
    updateHoverCursor();
  }

  function updateHoverCursor() {
    const accentColor = getComputedStyle(document.body)
                          .getPropertyValue('--accent-color').trim();
    // Use a hollow cursor for hover (fill none, stroke set to accentColor)
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='${accentColor}' stroke-width='2' viewBox='0 0 24 24'>
      <path d='M12 .587l3.668 7.431L24 9.748l-6 5.845 1.416 8.265L12 18.896l-7.416 4.962L6 15.593 0 9.748l8.332-1.73z'/>
    </svg>`;
    const encodedSVG = encodeURIComponent(svg);
    const hoverCursorValue = `url("data:image/svg+xml,${encodedSVG}") 12 12, auto`;
    let styleElement = document.getElementById('hover-cursor-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'hover-cursor-style';
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `a:hover, button:hover { cursor: ${hoverCursorValue}; }`;
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Set initial cursor and hover style
    updateCursorColor();
  
    const themeChooser = document.getElementById('theme-chooser');
    themeChooser.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function() {
        // Remove previously applied theme classes.
        document.body.classList.remove('theme-quantum', 'theme-yoneda');
        const theme = this.getAttribute('data-theme');
        if (theme !== 'default') {
          document.body.classList.add(`theme-${theme}`);
        }
        updateCursorColor();
      });
    });
});