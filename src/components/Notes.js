import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import NotesItem from './NotesItem';

const Notes = () => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { notes, setNotes } = context
    return (
        <div>
            <div className='row my-3'>
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NotesItem notedetail = {note}/>;
                })}
            </div>
        </div>
    )
}

export default Notes