import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CranePage from '../../routes/CranePage/CranePage';
import SwanPage from '../../routes/SwanPage/SwanPage';
import Header from '../Header/Header';
import NotesList from '../../routes/NotesList/NotesList';
import './AppContent.scss';

const AppContent = () => {
    return (
        <div className='AppContent'>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<NotesList />} />
                    <Route path='/crane' element={<CranePage />} />
                    <Route path='/swan' element={<SwanPage />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default AppContent;
