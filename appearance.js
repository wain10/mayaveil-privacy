(() => {
  const page = document.documentElement;
  let light = false;
  try { light = sessionStorage.getItem("mayaveil-theme") === "true"; } catch {}
  page.dataset.theme = String(light);

  document.addEventListener("DOMContentLoaded", () => {
    const theme = document.getElementById("theme");
    function updateLabel() {
      const action = light ? theme.dataset.dark : theme.dataset.light;
      theme.setAttribute("aria-label", action);
      theme.title = action;
    }
    updateLabel();
    theme.hidden = false;
    theme.addEventListener("click", () => {
      light = !light;
      page.dataset.theme = String(light);
      updateLabel();
      try { sessionStorage.setItem("mayaveil-theme", String(light)); } catch {}
    });
    page.classList.add("motion-ready");
  });
})();
