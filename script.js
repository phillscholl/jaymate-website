(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let selected = null;
  try {
    const saved = localStorage.getItem('jaymate-site-theme');
    if (saved === 'dark' || saved === 'light') selected = saved;
  } catch { /* Appearance still works when storage is unavailable. */ }
  function render() {
    if (selected) root.dataset.theme = selected;
    else delete root.dataset.theme;
    const dark = selected ? selected === 'dark' : preference.matches;
    button.setAttribute('aria-label', `Use ${dark ? 'light' : 'dark'} appearance`);
    button.title = `Use ${dark ? 'light' : 'dark'} appearance`;
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    const dark = selected ? selected === 'dark' : preference.matches;
    selected = dark ? 'light' : 'dark';
    try { localStorage.setItem('jaymate-site-theme', selected); } catch { /* Optional preference. */ }
    render();
  });
  preference.addEventListener('change', render);
  render();
})();
