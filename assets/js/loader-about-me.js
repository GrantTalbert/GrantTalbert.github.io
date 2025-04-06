const lines = [
    "💫 SYSTEM INITIALIZATION BEGINNING",
    "Initializing video game music... ✅",
    "Finding the plushie that was lost last week... ✅",
    "Purchasing boba... ✅",
    "Actually getting out of bed this time... ✅",
    "Diagram: ✨ COMMUTING ✨"
  ];
  
  const terminalContent = document.getElementById("terminal-content");
  let currentLine = 0;
  
  function typeLine(line, callback) {
    // Create a line element and center its text
    const lineElem = document.createElement("div");
    lineElem.className = "line";
    lineElem.style.textAlign = "center";
    terminalContent.appendChild(lineElem);
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        lineElem.innerHTML += line.charAt(i);
        i++;
        
        // Default delay
        let delay = 10;
        
        // For lines 2, 3, 4, and 5 (indexes 1-4): pause 1000ms on the LAST character only
        if (i === line.length - 1 && currentLine >= 1 && currentLine <= 4) {
          delay = 1000;
        }
        
        // For line 6 (index 5): pause before typing "COMMUTING"
        if (currentLine === 5) {
          // Determine where "COMMUTING" starts
          const commutingIndex = line.indexOf("COMMUTING");
          if (i === commutingIndex - 2) {
            delay = 1500; // extra pause before "COMMUTING" is typed
          }
        }
        
        setTimeout(typeChar, delay);
      } else {
        // Once the line is fully typed, append a blinking cursor for 0.8 seconds
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
          // Remove the cursor and animate the line floating up
          lineElem.removeChild(cursor);
          lineElem.style.transition = "transform 0.8s ease, opacity 0.8s ease";
          lineElem.style.transform = "translateY(-30px)";
          lineElem.style.opacity = "0";
          setTimeout(() => {
            // Remove the line after the animation, then call the callback to start next line
            terminalContent.removeChild(lineElem);
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
        setTimeout(runTerminal, 500);
      });
    } else {
      // All lines typed – fade out the loader, then hide it
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