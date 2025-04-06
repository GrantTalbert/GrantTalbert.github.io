const lines = [
    "💫 SYSTEM INITIALIZATION BEGINNING",
    "Initializing video game music... ✅",
    "Finding the plushie that was lost last week... ✅",
    "Purchasing boba... ✅",
    "Actually getting out of bed this time... ✅",
    "Diagram: ✨ COMMUTING ✨"
  ];
  
  const terminalLog = document.getElementById("terminal-log");
  const currentContainer = document.getElementById("current-line-container");
  let currentLine = 0;
  
  function typeLine(line, callback) {
    // Create a new line element for the current line
    const lineElem = document.createElement("div");
    lineElem.className = "line";
    currentContainer.innerHTML = "";  // Clear current container
    currentContainer.appendChild(lineElem);
    
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        lineElem.innerHTML += line.charAt(i);
        i++;
        
        // Determine delay adjustments:
        let delay = 10;
        if (i === line.length - 1 && currentLine >= 1 && currentLine <= 4) {
          delay = 1000; // Extra delay on the last character for lines 2-5
        }
        if (currentLine === 5) {
          const commutingIndex = line.indexOf("COMMUTING") - 2;
          if (i === commutingIndex) {
            delay = 1500; // Extra pause before typing "COMMUTING"
          }
        }
        
        setTimeout(typeChar, delay);
      } else {
        // Append blinking cursor at the end of the line
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
          // Remove cursor
          lineElem.removeChild(cursor);
          // Animate current line sliding up (without fading)
          lineElem.style.animation = "slideUp 0.8s ease forwards";
          // After the slide-up animation, move this line to the terminal log
          setTimeout(() => {
            // Append the finished line to the log so it stays visible
            terminalLog.appendChild(lineElem);
            // Clear current container for the next line
            currentContainer.innerHTML = "";
            callback();
          }, 800);
        }, 800); // Keep cursor for 0.8s
      }
    }
    typeChar();
  }
  
  function runTerminal() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        // Optionally, scroll the log if needed:
        terminalLog.scrollTop = terminalLog.scrollHeight;
        setTimeout(runTerminal, 500); // Wait before starting next line
      });
    } else {
      // All lines typed – fade out the loader then hide it
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