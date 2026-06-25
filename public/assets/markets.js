(() => {
  const money = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
  const percent = new Intl.NumberFormat('en-US', { signDisplay: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatPrice = (value) => {
    if (!Number.isFinite(value)) return '—';
    if (value >= 1000) return money.format(value);
    if (value >= 10) return value.toFixed(2);
    return value.toFixed(4);
  };

  const pointsToPath = (values) => {
    const clean = values.filter((value) => Number.isFinite(value));
    if (clean.length < 2) return '';
    const min = Math.min(...clean);
    const max = Math.max(...clean);
    const span = max - min || 1;
    return clean.map((value, index) => {
      const x = (index / (clean.length - 1)) * 100;
      const y = 28 - ((value - min) / span) * 24;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const loadLiveMarkets = async () => {
    const response = await fetch('/api/markets.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Market API unavailable');
    return response.json();
  };

  const updateRow = (row, data) => {
    const priceNode = row.querySelector('[data-price]');
    const changeNode = row.querySelector('[data-change]');
    const sparkPath = row.querySelector('[data-spark] path');
    const up = data.changePct >= 0;

    priceNode.textContent = formatPrice(data.price);
    changeNode.textContent = `${percent.format(data.changePct)}%`;
    changeNode.classList.toggle('up', up);
    changeNode.classList.toggle('down', !up);
    sparkPath.classList.toggle('up', up);
    sparkPath.classList.toggle('down', !up);

    const path = pointsToPath(data.closes || []);
    if (path) sparkPath.setAttribute('d', path);
  };

  const refreshWidget = async (widget) => {
    const rows = Array.from(widget.querySelectorAll('[data-symbol]'));
    const status = widget.querySelector('[data-market-status]');
    const updated = widget.querySelector('[data-market-updated]');
    const button = widget.querySelector('[data-market-refresh]');
    if (!rows.length) return;

    button?.setAttribute('disabled', 'true');
    if (status) status.textContent = 'Refreshing live market data…';
    try {
      const payload = await loadLiveMarkets();
      const dataMap = new Map((payload.rows || []).map((row) => [row.symbol, row]));
      let rendered = 0;
      rows.forEach((row) => {
        const item = dataMap.get(row.dataset.symbol);
        if (!item) return;
        updateRow(row, item);
        rendered += 1;
      });
      const live = Number(payload.liveCount ?? 0);
      const now = payload.updatedAt ? new Date(payload.updatedAt) : new Date();
      if (status) status.textContent = live > 0
        ? `${live}/${rows.length} live feeds updated. Public market data may be slightly delayed.`
        : 'Live feed unavailable. Static fallback is displayed.';
      if (updated) updated.textContent = rendered > 0
        ? `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : 'Fallback snapshot';
    } catch (error) {
      if (status) status.textContent = 'Live feed unavailable. Static fallback is displayed.';
      if (updated) updated.textContent = 'Fallback snapshot';
    }
    button?.removeAttribute('disabled');
  };

  const boot = () => {
    const widgets = document.querySelectorAll('[data-market-widget]');
    widgets.forEach((widget) => {
      widget.querySelector('[data-market-refresh]')?.addEventListener('click', () => refreshWidget(widget));
      refreshWidget(widget);
      setInterval(() => refreshWidget(widget), 120000);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
