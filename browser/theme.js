// Paint the saved choice before CSS loads. An unset theme follows the OS.
(() => {
 const root = document.documentElement;
 const system = matchMedia('(prefers-color-scheme: light)');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const themeChoice = value => value === 'light' || value === 'dark' ? value : null;
 const motionChoice = value => ['system', 'on', 'off'].includes(value) ? value : 'system';
 let themePreference = null, motionPreference = 'system';
 try { themePreference = themeChoice(localStorage.getItem('dots-theme')); motionPreference = motionChoice(localStorage.getItem('khonsu-motion')); } catch {}
 function apply() {
  const theme = themePreference || (system.matches ? 'light' : 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.dataset.motion = motionPreference;
  root.classList.toggle('motion-off', motionPreference === 'off' || (motionPreference === 'system' && reduced.matches));
  root.classList.toggle('motion-force-on', motionPreference === 'on');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#e7ebef' : '#0b111a');
  window.dispatchEvent(new CustomEvent('dots:preferences'));
 }
 function persist(key, value) { try { localStorage.setItem(key, value); } catch {} }
 window.DotsPreferences = {
  get theme() { return root.dataset.theme; },
  get motion() { return motionPreference; },
  setTheme(value) { themePreference = themeChoice(value); persist('dots-theme', themePreference || 'system'); apply(); },
  setMotion(value) { motionPreference = motionChoice(value); persist('khonsu-motion', motionPreference); apply(); },
 };
 system.addEventListener('change', () => { if (!themePreference) apply(); });
 reduced.addEventListener('change', apply);
 window.addEventListener('storage', event => {
  if (event.key === 'dots-theme' || event.key === null) themePreference = themeChoice(event.newValue);
  if (event.key === 'khonsu-motion' || event.key === null) motionPreference = motionChoice(event.newValue);
  if (event.key === 'dots-theme' || event.key === 'khonsu-motion' || event.key === null) apply();
 });
 apply();
})();
