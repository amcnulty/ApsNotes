import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import NotesList from '../NotesList/NotesList';
import './AppContent.scss';

const AppContent = () => {
    return (
        <div className='AppContent'>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<NotesList />} />
                    <Route path='/crane' element={<p>Crane Page</p>} />
                    <Route path='/swan' element={<p>Swan Page</p>} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default AppContent;