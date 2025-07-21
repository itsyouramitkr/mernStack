import { createContext } from "react";

const noteContext = createContext(); /// context holds the states related ot notes.

export default noteContext;

/// here we are using react context api 

/*
✅ Summary of File Responsibilities:
File	Responsibility
NoteContext.js	Creates context (createContext())
NoteState.js	Provides state and wraps children using NoteContext.Provider
About.js or any child	Consumes the state using useContext(NoteContext)
*/