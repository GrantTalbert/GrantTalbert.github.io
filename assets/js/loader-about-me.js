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
    // Clear the current container and append the new line element
    currentContainer.innerHTML = "";
    currentContainer.appendChild(lineElem);
    
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        lineElem.innerHTML += line.charAt(i);
        i++;
        
        // Set default delay
        let delay = 50;
        
        // For lines 2,3,4,5 (indexes 1-4): wait extra before typing the last character
        if (i === line.length && currentLine >= 1 && currentLine <= 4) {
          delay = 1000;
        }
        // For line 6 (index 5): pause before starting "COMMUTING"
        if (currentLine === 5) {
          const commutingIndex = line.indexOf("COMMUTING");
          if (i === commutingIndex) {
            delay = 1500;
          }
        }
        
        setTimeout(typeChar, delay);
      } else {
        // Line finished typing: append a blinking cursor for 0.8 seconds
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
          lineElem.removeChild(cursor);
          // Slide the current line up to signal completion (without fading out)
          lineElem.style.animation = "slideUp 0.8s ease forwards";
          setTimeout(() => {
            // After sliding, move the finished line to the terminal log and clear the current container
            terminalLog.appendChild(lineElem);
            currentContainer.innerHTML = "";
            callback();
          }, 800);
        }, 800);
      }
    }
    typeChar();
  }
  
  function runTerminal() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        // Optionally, scroll the log if needed
        terminalLog.scrollTop = terminalLog.scrollHeight;
        setTimeout(runTerminal, 500);
      });
    } else {
      // After all lines are typed, wait 1 second, then fade out the loader
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
  