import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NOTES } from '../res/notes';

export const useTitle = () => {
    const [title, setTitle] = useState('Notes');
    const location = useLocation();

    useEffect(() => {
        const note = NOTES.find(
            (note) => `/${note.path}` === location.pathname
        );
        if (note) {
            setTitle(note.name);
        } else {
            if (location.pathname === '/codes') {
                setTitle('Your Codes');
            } else {
                setTitle('Notes');
            }
        }
    }, [location.pathname]);

    return title;
};
