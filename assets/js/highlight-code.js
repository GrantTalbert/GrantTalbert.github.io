/***************************************************************
 * highlight-code.js
 * 
 * A simple code highlighter using regex.
 **************************************************************/

/**
 * basicHighlight() 
 * 
 * Takes a string of code, runs regex replacements,
 * and returns HTML with <span> tags for color styling.
 * 
 * NOTE: This is a basic approach that won't handle all edge cases
 *       (e.g., nested quotes, multiline strings, etc.).
 */
function basicHighlight(code) {
    // Escape any existing HTML to avoid weird injection 
    code = escapeHtml(code);
  
    // italicize text wrapped in in \emph{<text>} 
    code = code.replace(
        /\\emph\{([^}]+)\}/g,
        '<span class="latex-cmd">\\emph</span>' +
        '<span class="latex-brace">{</span>' +
        '<em>$1</em>' +
        '<span class="latex-brace">}</span>'
    );
  
    // color all latex commands
    code = code.replace(
        /\\[A-Za-z]+/g,
        '<span class="latex-cmd">$&</span>'
    );
  

  // Highlight {}
    code = code.replace(
        /(\{|\})/g,
        '<span class="latex-brace">$1</span>'
    );
  
    // Markdown: highlight # headings
    //    assume a line starts with #+some spaces => heading
    code = code.replace(
      /^(\#{1,6})(\s.*)$/gm,
      '<span class="md-hash">$1</span><span class="md-heading">$2</span>'
    );

    // Markdown: highlight a dash if it starts a line => list item
    code = code.replace(
      /^(\-\s)/gm,
      '<span class="md-dash">$1</span>'
    );
  
    return code;
}
  
/**
* Simple function to escape HTML special chars
* so we can safely insert user code into <span> tags
*/
function escapeHtml(str) {
    return str
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#39;');
}  