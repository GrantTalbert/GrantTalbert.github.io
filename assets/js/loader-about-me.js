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
    const lineElem = document.createElement("div");
    lineElem.className = "line";
    terminalContent.appendChild(lineElem);
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        lineElem.innerHTML += line.charAt(i);
        i++;
        setTimeout(typeChar, 50);
      } else {
        // Append a blinking cursor
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
          lineElem.removeChild(cursor);
          callback();
        }, 1000);
      }
    }
    typeChar();
  }
  
  function runTerminal() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        terminalContent.scrollTop = terminalContent.scrollHeight;
        setTimeout(runTerminal, 500);
      });
    } else {
      // All lines typed – fade out and hide the loader
      setTimeout(() => {
        const loader = document.getElementById("terminal-loader");
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.classList.add("hidden");
        }, 800); // Duration should match your fade-out transition
      }, 1000);
    }
  }
  
  runTerminal();
  