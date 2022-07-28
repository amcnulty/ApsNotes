import React, { useRef } from 'react';
import './BrowserContent.scss';

const BrowserContent = () => {
    const deferredPrompt = useRef();

    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt.current = e;
    });
    
    const handleInstallClick = () => {
        if (deferredPrompt.current != null) {
            deferredPrompt.current.prompt();
            deferredPrompt.current.userChoice.then((outcome) => {
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            });
        }
    };

    return (
        <div className='BrowserContent'>
            <button onClick={handleInstallClick}>Install App</button>
        </div>
    );
};

export default BrowserContent;
