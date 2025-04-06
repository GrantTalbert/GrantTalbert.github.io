document.addEventListener('mousemove', function(e) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerText = '★';
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 1000);
});