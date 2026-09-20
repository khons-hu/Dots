import React from 'react';
import {createRoot} from 'react-dom/client';
import {Navbar,Container,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dots-game/src/App.css';
import AnimatedBackground from '../dots-game/src/AnimatedBackground.js';
import Dots from '../dots-game/src/components/game/Dots.jsx';
import Footer from '../dots-game/src/components/Footer.jsx';
import './responsive.css';
createRoot(document.getElementById('root')).render(<div className="App mb-5">
 <AnimatedBackground/>
 <Navbar bg="dark" variant="dark" fixed="top"><Container fluid><Navbar.Brand href="/"><img src="/images/dots/dots_logo.png" width="50" height="50" alt="Dots"/></Navbar.Brand><Nav className="me-auto"><Nav.Link href="/">Play</Nav.Link><Nav.Link href="https://github.com/khons-hu/Dots">Source</Nav.Link></Nav><span className="text-light small">2023 · browser edition</span></Container></Navbar>
 <main className="container index-container main-content"><Dots/><p className="text-center light-text mt-4 small">Guest game · no account or shared leaderboard · reloading starts over</p></main><Footer/>
</div>);
