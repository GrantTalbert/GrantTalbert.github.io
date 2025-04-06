// Randomly spawn comets every 5-15 seconds
function spawnComet() {
    const comet = document.createElement('div');
    comet.classList.add('comet');
    // Start the comet at a random horizontal position (offscreen left) and a random vertical offset
    comet.style.top = `${Math.random() * window.innerHeight - 50}px`;
    comet.style.left = `-50px`;
    document.body.appendChild(comet);
    // Remove comet after animation completes
    setTimeout(() => comet.remove(), 3000);
  }

setInterval(spawnComet, 5000 + Math.random() * 10000);