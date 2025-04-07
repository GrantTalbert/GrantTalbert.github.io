document.addEventListener("DOMContentLoaded", function() {
    const lines = [
      "💫 SYSTEM INITIALIZATION BEGINNING",
      "Initializing video game music... ✅",
      "Finding the plushie that was lost last week... ✅",
      "Purchasing boba... ✅",
      "Actually getting out of bed this time... ✅",
      "Diagram: ✨ COMMUTING ✨"
    ];
  
    const terminalLog = document.getElementById("terminal-log");
    const currentContainer = document.getElementById("terminal-line-container");
    let currentLine = 0;
    let offset = 0; // tracks cumulative height of finished lines
  
    function typeLine(line, callback) {
      // Create a new line element for the current line
      const lineElem = document.createElement("div");
      lineElem.className = "line";
      currentContainer.innerHTML = "";
      currentContainer.appendChild(lineElem);
  
      let i = 0;
      function typeChar() {
        if (i < line.length) {
          lineElem.innerHTML += line.charAt(i);
          i++;
  
          let delay = 10;
          // For lines 2-5 (indexes 1-4): extra delay on the last character
          if (i === line.length - 1 && currentLine >= 1 && currentLine <= 4) {
            delay = 1000;
          }
          // For line 6 (index 5): extra pause before "COMMUTING"
          if (currentLine === 5) {
            const commutingIndex = line.indexOf("COMMUTING") - 2;
            if (i === commutingIndex) {
              delay = 1500;
            }
          }
          setTimeout(typeChar, delay);
        } else {
          // After finishing typing, wait 0.8 seconds then slide up the log container.
          setTimeout(() => {
            // Append the finished line to the terminal log.
            terminalLog.appendChild(lineElem);
            currentContainer.innerHTML = ""; // Clear current container.
            terminalLog.style.transition = "transform 0.8s ease";
            callback();
          }, 150);
        }
      }
      typeChar();
    }
  
    function runTerminal() {
      if (currentLine < lines.length) {
        typeLine(lines[currentLine], () => {
          currentLine++;
          // Scroll the log container if needed.
          terminalLog.scrollTop = terminalLog.scrollHeight;
          setTimeout(runTerminal, 500);
        });
      } else {
        // After all lines are typed, fade out the loader.
        setTimeout(() => {
          const loader = document.getElementById("terminal-loader");
          loader.style.transition = "opacity 0.8s ease";
          loader.style.opacity = "0";
          setTimeout(() => {
            loader.style.display = "none";
          }, 800);
        }, 1000);
      }
    }
  
    runTerminal();
  });
  