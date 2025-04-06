const mathSymbols = ['⊗', '∏', 'σ', '∫', '∑', 'Ψ', '∞', '≅', 'λ', 'θ'];
setInterval(() => {
  const symbol = document.createElement('div');
  symbol.classList.add('floating-symbol');
  symbol.innerText = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
  symbol.style.left = Math.random() * window.innerWidth + 'px';
  symbol.style.top = window.innerHeight + 'px';
  document.body.appendChild(symbol);
  setTimeout(() => symbol.remove(), 4000);
}, 500);