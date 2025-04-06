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
  
  function typeLine(line, callback) {
    // Create a new line element in the current container
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
        
        // Default typing delay
        let delay = 50;
        
        // For lines 2-5 (indexes 1-4): wait extra on the LAST character
        if (i === line.length && currentLine >= 1 && currentLine <= 4) {
          delay = 1000;
        }
        
        // For line 6 (index 5): pause before typing "COMMUTING"
        if (currentLine === 5) {
          const commutingIndex = line.indexOf("COMMUTING");
          if (i === commutingIndex) {
            delay = 1500;
          }
        }
        
        setTimeout(typeChar, delay);
      } else {
        // Line finished typing. Wait 0.8s, then slide it up.
        setTimeout(() => {
          lineElem.style.animation = "slideUp 0.8s ease forwards";
          setTimeout(() => {
            // Append the finished line to the log
            terminalLog.appendChild(lineElem);
            // Clear the current container for the next line
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
        // Scroll the log if needed
        terminalLog.scrollTop = terminalLog.scrollHeight;
        setTimeout(runTerminal, 500);
      });
    } else {
      // After all lines, fade out the loader
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
  