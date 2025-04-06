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
        setTimeout(typeChar, 50); // typing speed (adjust as needed)
      } else {
        // Append a blinking cursor at the end of the line
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        lineElem.appendChild(cursor);
        setTimeout(() => {
           lineElem.removeChild(cursor); // remove cursor before next line
           callback();
        }, 1000); // wait 1 second after finishing the line
      }
    }
    typeChar();
}
  
function runTerminal() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        // Scroll to show the new line with a smooth effect
        terminalContent.scrollTo({
          top: terminalContent.scrollHeight,
          behavior: "smooth"
        });
        setTimeout(runTerminal, 500); // wait a bit before starting the next line
      });
    } else {
      // All lines typed – you can trigger the next step here
      // For example, fade out the loader or continue to the main page.
    }
}
  
runTerminal();