import * as React from 'react';

import { Note } from '../models/note.model';
import NotesCard from './NotesCard';

interface INotesListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesList: React.FC<INotesListProps> = ({ notes , setNotes}) => {
  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const renderNotes = (): JSX.Element[] => {
    return notes.map((note) => {
      return (
        <NotesCard key={note.id} note={note} handleDelete={handleDelete} />
      );
    });
  };

  return (
    <>
      <h2 className='mt-3'>Notes</h2>

      <div>{renderNotes()}</div>
    </>
  );
};

export default NotesList;
