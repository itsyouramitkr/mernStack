import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialnotes = [
        {
            "user": "68715f090af018cf10680177",
            "title": "Myfirst title",
            "description": "this is the first desccription",
            "tag": "tag",
            "_id": "687b31d1a3776d963e52ebfe",
            "date": "2025-07-19T05:49:05.374Z",
            "__v": 0
        },
        {
            "user": "68715f090af018cf10680177",
            "title": "Myfirst title",
            "description": "this is the first desccription",
            "tag": "tag",
            "_id": "687b31d1a3776d963e52ebfe",
            "date": "2025-07-19T05:49:05.374Z",
            "__v": 0
        },
        {
            "user": "68715f090af018cf10680177",
            "title": "Myfirst title",
            "description": "this is the first desccription",
            "tag": "tag",
            "_id": "687b31d1a3776d963e52ebfe",
            "date": "2025-07-19T05:49:05.374Z",
            "__v": 0
        },
        {
            "user": "68715f090af018cf10680177",
            "title": "Myfirst title",
            "description": "this is the first desccription",
            "tag": "tag",
            "_id": "687b31d1a3776d963e52ebfe",
            "date": "2025-07-19T05:49:05.374Z",
            "__v": 0
        },
        {
            "user": "68715f090af018cf10680177",
            "title": "Myfirst title",
            "description": "this is the first desccription",
            "tag": "tag",
            "_id": "687b31d1a3776d963e52ebfe",
            "date": "2025-07-19T05:49:05.374Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(initialnotes);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

/*

🔸 {props.children}
This means: "whatever component I wrap inside <NoteState> ... </NoteState>".

Those wrapped components can now access the value (i.e., state) using useContext.

🔶 NoteContext.Provider: What does it do?
Think of NoteContext.Provider like a data pipe 🧵:

You put some data inside it using value={...}

Then, any component wrapped inside it can use that data with useContext(NoteContext)


✅ Summary of File Responsibilities:
File	Responsibility
NoteContext.js	Creates context (createContext())
NoteState.js	Provides state and wraps children using NoteContext.Provider
About.js or any child	Consumes the state using useContext(NoteContext)
*/
export default NoteState;


/// these all will provide the notestate

// make a function and jo v cheez provide krna chate ho usko context.provider k andar value me pass kr do

// jab v context k andar wrap karoge uske bich me sare k sare children a jayenge