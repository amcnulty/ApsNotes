import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CranePage from '../../routes/CranePage/CranePage';
import SwanPage from '../../routes/SwanPage/SwanPage';
import HeronPage from '../../routes/HeronPage/HeronPage';
import Header from '../Header/Header';
import NotesList from '../../routes/NotesList/NotesList';
import './AppContent.scss';
import CodesList from '../../routes/CodesList/CodesList';
import CrowPage from '../../routes/CrowPage/CrowPage';

const AppContent = () => {
    return (
        <div className='AppContent'>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<NotesList />} />
                    <Route path='/codes' element={<CodesList />} />
                    <Route path='/crane' element={<CranePage />} />
                    <Route path='/swan' element={<SwanPage />} />
                    <Route path='/heron' element={<HeronPage />} />
                    <Route path='/crow' element={<CrowPage />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default AppContent;
