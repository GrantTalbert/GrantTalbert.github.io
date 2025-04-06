const mathQuotes = [
    "Mathematics is the poetry of logical ideas. – Albert Einstein",
    "The answer to life, the universe, and everything is 42. – Douglas Adams",
    "In mathematics, the art of proposing a question must be held of higher value than solving it. – Georg Cantor",
    "Pure mathematics is, in its way, the poetry of logical ideas. – Albert Einstein",
    "If I were beginning my studies again, I would follow the advice of Plato and start with mathematics. – Galileo Galilei",
    "HOLY SHIT THE DIAGRAM COMMUTES LETS GOOOOOOOOOOOOOO - meeeeee"
  ];
  document.addEventListener("DOMContentLoaded", () => {
    const quoteEl = document.getElementById("math-quote");
    // Do NOT push the loader final message into the math quotes
    quoteEl.innerText = mathQuotes[Math.floor(Math.random() * mathQuotes.length)];
});