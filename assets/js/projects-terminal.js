/***************************************************************
 * projects-terminal.js
 * 
 * Handles:
 *   - Boba-themed messages in terminal every 60s
 *   - Folder & file click logic in the file explorer
 *   - Fetching & displaying HTML snippets for folders/files
 *   - Removing leading newlines in code blocks
 **************************************************************/

// Array of random boba-themed messages
const bobaMessages = [
    "Refilling quantum tapioca reserves...",
    "Slurping on that sweet milk tea of category theory~",
    "Synthesizing new boba beads in the arc reactor...",
    "Gotta keep my boba levels up or I'll collapse wavefunctions weirdly!"
];
  
document.addEventListener("DOMContentLoaded", () => {
    // Log a random boba message once per minute
    setInterval(() => {
      const msg = pickRandom(bobaMessages);
      logToTerminal(`> ${msg}`);
    }, 60_000);
  
    // Attach click handlers to items in the file explorer
    const explorerItems = document.querySelectorAll(".file-explorer li");
    explorerItems.forEach(item => {
      item.addEventListener("click", () => handleExplorerClick(item));
    });
});
  
  /***************************************************************
   * Helper: Pick a random element from an array
   ***************************************************************/
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
  
  /***************************************************************
   * Log a message in the terminal
   ***************************************************************/
function logToTerminal(message) {
    const terminalLog = document.getElementById("terminal-log");
    const p = document.createElement("p");
    p.textContent = message;
    terminalLog.appendChild(p);
    // auto-scroll to bottom
    terminalLog.scrollTop = terminalLog.scrollHeight;
}
  
  /***************************************************************
   * Handle user clicking a folder or file in the explorer
   ***************************************************************/
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
  
  /***************************************************************
   * Load & display snippet for a folder
   ***************************************************************/
function displayFolderContents(folderPath) {
    const projectView = document.getElementById("project-view");
    // e.g. "minecraft-mods/" => snippet at "snippets/minecraft-mods.html"
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
        // removeLeadingNewlines (already included in your cleaned-up JS)
        removeLeadingNewlines(projectView);

        // Add fade-in animation to all <pre> blocks AND .pdf-frame containers
        const fadeTargets = projectView.querySelectorAll("pre, .pdf-frame");
        fadeTargets.forEach(el => {
            el.classList.add("animate-in");
        });

      })
      .catch(err => {
        projectView.innerHTML = `
          <h2>Folder: ${folderPath}</h2>
          <p>No subfolder snippet found. Or an error occurred:</p>
          <pre>${err}</pre>
        `;
      });
}
  
  /***************************************************************
   * Load & display snippet for a file
   ***************************************************************/
function displayFileContent(filetype, filename) {
    const projectView = document.getElementById("project-view");
    // e.g. "category-zine.tex" => snippet at "snippets/category-zine.tex.html"
    const snippetUrl = `./snippets/${filename}.html`; 
  
    fetch(snippetUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        projectView.innerHTML = html;
        // removeLeadingNewlines (already included in your cleaned-up JS)
        removeLeadingNewlines(projectView);

        // Add fade-in animation to all <pre> blocks AND .pdf-frame containers
        const fadeTargets = projectView.querySelectorAll("pre, .pdf-frame");
        fadeTargets.forEach(el => {
            el.classList.add("animate-in");
        });

      })
      .catch(err => {
        projectView.innerHTML = `
          <h2>${filename}</h2>
          <p>Could not load snippet for this file: ${err}</p>
        `;
      });
}
  
  /***************************************************************
   * Remove any leading newline in <pre> blocks for nicer code
   ***************************************************************/
function removeLeadingNewlines(container) {
    const preBlocks = container.querySelectorAll("pre");
    preBlocks.forEach(pre => {
      // If the text starts with a newline, trim it
      pre.textContent = pre.textContent.replace(/^\n/, "");
    });
}  