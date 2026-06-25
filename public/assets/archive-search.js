(() => {
  const input = document.querySelector('[data-archive-search]');
  const items = Array.from(document.querySelectorAll('[data-archive-item]'));
  const count = document.querySelector('[data-archive-count]');
  if (!input || !items.length) return;
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    items.forEach((item) => {
      const match = !q || item.dataset.title.toLowerCase().includes(q);
      item.hidden = !match;
      if (match) visible += 1;
    });
    if (count) count.textContent = `${visible} post${visible === 1 ? '' : 's'}`;
  };
  input.addEventListener('input', filter);
  filter();
})();
