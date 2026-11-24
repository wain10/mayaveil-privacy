const contact = document.getElementById("privacy-email");
const reveal = document.getElementById("reveal-email");

reveal.addEventListener("click", () => {
  const address = contact.textContent.replace(" [at] ", "@").replace(" [dot] ", ".");
  const link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  contact.replaceChildren(link);
  reveal.hidden = true;
  link.focus();
}, { once: true });
reveal.hidden = false;
