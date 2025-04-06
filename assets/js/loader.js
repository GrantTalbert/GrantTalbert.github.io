let progress = 0;
const loaderText = document.getElementById('loader-text');
const loader = document.getElementById('loader');
const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 3) + 1;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
    // Short delay before updating to final message
    setTimeout(() => {
      loaderText.innerText = "The answer is 42";
      // Keep final message visible for 1 second
      setTimeout(() => {
         loaderText.classList.add('fade-up');
         // Start typewriter and scroll reveal 500ms after fade-up begins
         setTimeout(() => {
           startTypewriter();
           startScrollReveal();
         }, 500);
         // Hide the loader after the fade-up animation completes (0.8s)
         setTimeout(() => {
           loader.classList.add('hidden');
         }, 800);
      }, 1000);
    }, 300);
  } else {
    loaderText.innerText = `Calculating the answer to life, the universe, and everything - ${progress}% complete`;
  }
}, 50);