// Keep appearance choices within the current tab. Storage may be disabled.
(() => {
  const page = document.documentElement;
  function apply(name, enabled) {
    page.dataset[name] = String(enabled);
    const button = document.getElementById(name);
    if (button) button.setAttribute("aria-pressed", String(enabled));
  }
  for (const name of ["theme", "pause"]) {
    let enabled = false;
    try { enabled = sessionStorage.getItem("mayaveil-" + name) === "true"; } catch {}
    apply(name, enabled);
  }
  document.addEventListener("DOMContentLoaded", () => {
    for (const name of ["theme", "pause"]) {
      const button = document.getElementById(name);
      button.hidden = false;
      apply(name, page.dataset[name] === "true");
      button.addEventListener("click", () => {
        const enabled = page.dataset[name] !== "true";
        apply(name, enabled);
        try { sessionStorage.setItem("mayaveil-" + name, String(enabled)); } catch {}
      });
    }
    page.classList.add("motion-ready");
  });
})();
