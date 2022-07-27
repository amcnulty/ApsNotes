import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const deferredPrompt = useRef();

    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt.current = e;
    });

    const handleInstallClick = () => {
        if (deferredPrompt.current !== null) {
            deferredPrompt.current.prompt();
            deferredPrompt.current.userChoice.then((outcome) => {
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            });
        }
    };

    return (
        <div className='App'>
            <div className='installSection'>
                <button onClick={handleInstallClick}>Install App</button>
            </div>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>The newest content but even better now</p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
