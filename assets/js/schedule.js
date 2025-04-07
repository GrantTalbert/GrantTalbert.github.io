document.addEventListener("DOMContentLoaded", function() {
    // Get the current time in EST.
    // If you're not in EST, you can adjust with offsets as needed.
    const now = new Date();
    // Convert to EST: EST = UTC-5 (ignoring DST complexities for now)
    let currentHour = now.getUTCHours() - 5;
    if (currentHour < 0) {
      currentHour += 24;
}
    
// Loop over timeline items and add active class to the matching one.
document.querySelectorAll(".timeline-item").forEach(item => {
    const itemHour = parseInt(item.getAttribute("data-time"), 10);
      // Since our schedule times are in 24-hour format: 8,9,10,13,18,19,23,1,
      // adjust for 1 representing 1am.
    if(itemHour === currentHour) {
        item.classList.add("active");
        // Optionally, add sparkles or a heat icon here, e.g. by appending a class.
        const icon = item.querySelector(".timeline-icon");
        if (icon) {
           icon.textContent = "❤️";
        }
      }
    });
});  