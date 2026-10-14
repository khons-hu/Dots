import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './bootstrap.scss';
import '../dots-game/src/App.css';
import Dots from '../dots-game/src/components/game/Dots.jsx';
import './responsive.css';

function BrowserApp() {
 const readPreferences = () => ({theme: window.DotsPreferences.theme, motion: window.DotsPreferences.motion});
 const [preferences, setPreferences] = useState(readPreferences);
 useEffect(() => {
  const update = () => setPreferences(readPreferences());
  window.addEventListener('dots:preferences', update);
  update();
  return () => window.removeEventListener('dots:preferences', update);
 }, []);
 const themeLabel = preferences.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
 const nextMotion = preferences.motion === 'system' ? 'on' : preferences.motion === 'on' ? 'off' : 'system';
 return <div className="App browser-app">
  <a className="skip-link" href="#game">Skip to game</a>
  <header className="site-header">
   <a className="brand" href="/" aria-label="Dots home">
    <img src="/images/dots/dots_logo.webp" width="38" height="38" alt=""/>
    <span>Dots<small>BY KHONSU</small></span>
   </a>
   <nav className="site-nav" aria-label="Project links">
    <a href="https://khns.dev/">Portfolio ↗</a>
    <a href="https://github.com/khons-hu/Dots">Source ↗</a>
   </nav>
   <div className="header-tools">
    <button className="theme-toggle" type="button" aria-label={themeLabel} title={themeLabel} onClick={() => window.DotsPreferences.setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}>
     <span aria-hidden="true">{preferences.theme === 'dark' ? '☀' : '☾'}</span>
    </button>
    <button className="motion-toggle" type="button" aria-label={`Motion: ${preferences.motion}. Switch to ${nextMotion}.`} title="Cycle motion through system, on and off" onClick={() => window.DotsPreferences.setMotion(nextMotion)}>Motion: {preferences.motion}</button>
   </div>
  </header>
  <main id="game" className="container game-region" tabIndex="-1">
   <p className="eyebrow">2023 · browser edition</p>
   <Dots/>
   <p className="session-note">Guest game · no account or shared leaderboard · reloading starts over</p>
  </main>
  <footer className="site-footer"><span>Original game, a new home.</span><a href="https://khns.dev/">Built by khonsu ↗</a></footer>
 </div>;
}

createRoot(document.getElementById('root')).render(<BrowserApp/>);
