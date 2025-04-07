// Array of boba-themed messages
const bobaMessages = [
    "Refilling quantum tapioca reserves...",
    "Slurping on that sweet milk tea of category theory~",
    "Synthesizing new boba beads in the arc reactor...",
    "Gotta keep my boba levels up or I'll collapse wavefunctions weirdly!"
  ];
  
  // On DOM loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Log a random boba message once per minute
    setInterval(() => {
      const msg = bobaMessages[Math.floor(Math.random() * bobaMessages.length)];
      logToTerminal(`> ${msg}`);
    }, 60_000);
  
    // Attach click handlers to file explorer items
    const explorerItems = document.querySelectorAll(".file-explorer li");
    explorerItems.forEach(item => {
      item.addEventListener("click", () => {
        handleExplorerClick(item);
      });
    });
  });
  
  /**
   * Handle clicking a folder or file in the explorer
   */
  function handleExplorerClick(item) {
    const filetype = item.dataset.filetype; 
    const filename = item.dataset.filename;
    const path = item.dataset.path;
  
    if (path) {
      // It's a folder
      logToTerminal(`> cd ${path}`);
      displayFolderContents(path);
    } else if (filetype) {
      // It's a file
      logToTerminal(`> open ${filename}`);
      displayFileContent(filetype, filename);
    }
  }
  
  /**
   * Log a message in the terminal
   */
  function logToTerminal(message) {
    const terminalLog = document.getElementById("terminal-log");
    const p = document.createElement("p");
    p.textContent = message;
    terminalLog.appendChild(p);
    // auto-scroll to bottom
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }
  
  /**
   * Display the contents for a folder (subfolders, etc.)
   * For now, we fetch a snippet if it exists or fallback text
   */
  function displayFolderContents(folderPath) {
    const projectView = document.getElementById("project-view");
    const snippetUrl = `./snippets/${folderPath.replace("/", "")}.html`;
  
    fetch(snippetUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        projectView.innerHTML = html;
        // If there's code to highlight
        if (window.hljs) {
          hljs.highlightAll();
        }
      })
      .catch(err => {
        projectView.innerHTML = `
          <h2>Folder: ${folderPath}</h2>
          <p>No subfolder snippet found. Or an error occurred:</p>
          <pre>${err}</pre>
        `;
      });
  }
  
  /**
   * Display file content by fetching an external snippet
   * Then highlight syntax if needed
   */
  function displayFileContent(filetype, filename) {
    const projectView = document.getElementById("project-view");
    const snippetUrl = `snippets/${filename}.html`; 
    // e.g. for "category-zine.tex" => we store a snippet file "category-zine.tex.html"
  
    fetch(snippetUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        projectView.innerHTML = html;
        // Syntax highlighting (highlight.js)
        if (window.hljs) {
          hljs.highlightAll();
        }
        // If you'd like special handling for PDFs or .tex, do it here
      })
      .catch(err => {
        projectView.innerHTML = `
          <h2>${filename}</h2>
          <p>Could not load snippet for this file: ${err}</p>
        `;
      });
  }  