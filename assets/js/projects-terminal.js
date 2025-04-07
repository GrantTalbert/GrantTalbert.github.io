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
  
    // Get all items in the file explorer
    const explorerItems = document.querySelectorAll(".file-explorer li");
    explorerItems.forEach(item => {
      item.addEventListener("click", () => {
        handleExplorerClick(item);
      });
    });
  });
  
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
  
  // Log a message in the terminal
  function logToTerminal(message) {
    const terminalLog = document.getElementById("terminal-log");
    const p = document.createElement("p");
    p.textContent = message;
    terminalLog.appendChild(p);
    // auto-scroll
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }
  
  // Display the folder contents in the main area
  function displayFolderContents(folderPath) {
    const projectView = document.getElementById("project-view");
    projectView.innerHTML = `
      <h2>Folder: ${folderPath}</h2>
      <p>Here you'd show the next level of files/folders, or some note like:
        "No subfolders yet" / "coming soon" / or a new explorer view, etc.</p>
    `;
  }
  
  // Display file content or preview
  function displayFileContent(filetype, filename) {
    const projectView = document.getElementById("project-view");
  
    let contentHTML = "";
    switch (filetype) {
      case "tex":
        contentHTML = `
          <h2>${filename}</h2>
          <pre>
  \\documentclass{article}
  \\begin{document}
  Hello from Kira's Category Zine \\\\
  We love colimits, kisses, and the Yoneda lemma. 
  \\end{document}
          </pre>
          <p>Imagine a quick snippet or some rendered preview. 
             Possibly a link to the actual PDF or GitHub link.
          </p>
        `;
        break;
      case "pdf":
        contentHTML = `
          <h2>${filename}</h2>
          <p>This could embed a PDF or offer a link to open it. 
             For a real embed, you'd do an &lt;iframe&gt; or link to a new tab. 
          </p>
          <iframe src="path/to/${filename}" 
                  style="width:100%; height:400px;">
          </iframe>
        `;
        break;
      case "md":
        contentHTML = `
          <h2>${filename}</h2>
          <p>We can parse markdown or just show it raw. 
             For a quick demo, here's some raw MD text:</p>
          <pre>
  # About This Project
  This is a snippet from about-this-project.md
  - We do a little math
  - We do a little chaos
          </pre>
        `;
        break;
      case "sh":
        contentHTML = `
          <h2>${filename}</h2>
          <pre>
  #!/bin/bash
  echo "Compiling Good Mod..."
  gradlew build
  echo "Done! Boba time."
          </pre>
          <p>We could highlight syntax or just show the script. 
             Or let the user "run" it (pretend) in the terminal. 
          </p>
        `;
        break;
      default:
        contentHTML = `
          <h2>${filename}</h2>
          <p>Filetype not recognized, or no preview available.</p>
        `;
    }
  
    projectView.innerHTML = contentHTML;
  }  