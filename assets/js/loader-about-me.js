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
    // Clear any existing content in the current container
    currentContainer.innerHTML = "";
    currentContainer.appendChild(lineElem);
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        lineElem.innerHTML += line.charAt(i);
        i++;
        
        // For lines 2,3,4,5 (indexes 1-4): wait extra before the last character
        let delay = 50;
        if (i === line.length && currentLine >= 1 && currentLine <= 4) {
          delay = 1000;
        }
        // For line 6: pause before typing "COMMUTING"
        if (currentLine === 5) {
          const commutingIndex = line.indexOf("COMMUTING");
          if (i === commutingIndex) {
            delay = 1500;
          }
        }
        
        setTimeout(typeChar, delay);
      } else {
        // Append blinking cursor at the end of the line
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
          lineElem.removeChild(cursor);
          // Animate the current line sliding up
          lineElem.style.animation = "slideUp 0.8s ease forwards";
          // After animation, move this line to the log and clear current container
          setTimeout(() => {
            currentContainer.innerHTML = ""; // Clear current typing area
            terminalLog.appendChild(lineElem); // Add finished line to log
            callback();
          }, 800);
        }, 800); // Wait 0.8 seconds with cursor blinking before slide
      }
    }
    typeChar();
  }
  
  function runTerminal() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        // Scroll terminal log if needed
        terminalLog.scrollTop = terminalLog.scrollHeight;
        setTimeout(runTerminal, 500); // Wait a bit before next line
      });
    } else {
      // All lines typed – fade out the loader after a brief pause
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
  