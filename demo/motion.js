// One small preference shared by the khonsu sites: follow the OS, keep motion on, or turn it off.
(() => {
  const key = 'khonsu-motion';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  if (!['system', 'on', 'off'].includes(preference)) preference = 'system';
  function apply() {
    const disabled = preference === 'off' || (preference === 'system' && reduced.matches);
    root.classList.toggle('motion-off', disabled);
    root.classList.toggle('motion-force-on', preference === 'on');
    root.dataset.motion = preference;
    const button = document.querySelector('#motion');
    if (!button) return;
    button.textContent = preference === 'on' ? 'Motion: on' : preference === 'off' ? 'Motion: off' : `Motion: system${reduced.matches ? ' (reduced)' : ''}`;
    button.setAttribute('aria-pressed', String(!disabled));
    button.title = 'Motion cycles through system, on, and off.';
  }
  apply();
  reduced.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('#motion')?.addEventListener('click', () => {
      preference = preference === 'system' ? 'on' : preference === 'on' ? 'off' : 'system';
      try { localStorage.setItem(key, preference); } catch {}
      apply();
    });
  });
})();
