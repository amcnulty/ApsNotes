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
                    deferredPrompt.current = null;
                }
            });
        }
    };

    return (
        <div className='BrowserContent d-flex justify-content-center align-items-center'>
            <button className='btn btn-primary p-4' onClick={handleInstallClick}>Install App</button>
        </div>
    );
};

export default BrowserContent;
