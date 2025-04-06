function typeText(element, text, delay = 50, callback) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML = element.innerHTML.replace(/<span class="cursor">.*?<\/span>/g, '') 
                              + text.charAt(i) + '<span class="cursor">&nbsp;</span>';
        i++;
        setTimeout(type, delay);
      } else {
        element.innerHTML = text + '<span class="cursor">&nbsp;</span>';
        if (callback) callback();
      }
    }
    element.innerHTML = '<span class="cursor">&nbsp;</span>';
    type();
  }
  
  function startTypewriter() {
    const titleEl = document.getElementById("typed-title");
    const taglineEl = document.getElementById("typed-tagline");
    typeText(titleEl, "Hi, I'm Grant Talbert!", 50, () => {
      setTimeout(() => {
        typeText(taglineEl, "math, physics, and a friendly introduction to abstract nonsense", 35);
      }, 300);
    });
}