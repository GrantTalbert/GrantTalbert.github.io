document.addEventListener('click', function(e) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.classList.add('explosion');
      particle.innerText = Math.random() < 0.5 ? '♥' : '★';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      const dx = (Math.random() * 100 - 50) + 'px';
      const dy = (Math.random() * -100 - 20) + 'px';
      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  });