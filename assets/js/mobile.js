window.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth < 700 || /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.getElementById("mobile-warning").classList.remove("hidden");
    }
});