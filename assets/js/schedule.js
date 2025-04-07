document.addEventListener("DOMContentLoaded", function() {
    // Get the current time in EST (ignoring DST for simplicity)
    const now = new Date();
    let currentHourEST = now.getUTCHours() - 5; 
    if (currentHourEST < 0) {
      currentHourEST += 24;
    }
    // Compute fractional hour (e.g. 8:30am becomes 8.5)
    const currentFractionalHour = currentHourEST + (now.getUTCMinutes() / 60);
    
    document.querySelectorAll(".timeline-item").forEach(item => {
      const itemHour = parseInt(item.getAttribute("data-time"), 10);
      // Check if the current fractional hour is between itemHour and itemHour+1
      if (currentFractionalHour >= itemHour && currentFractionalHour < (itemHour + 1)) {
        item.classList.add("active");
        // Replace the icon with a heat icon
        const icon = item.querySelector(".timeline-icon");
        if (icon) {
          icon.textContent = "❤️";
        }
      }
    });
});
