import * as React from 'react';
import { useRef, useState } from 'react';
import { Note } from '../models/note.model';
import { Form, Button, Alert } from 'react-bootstrap';

interface ICreateNotesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const CreateNotes: React.FunctionComponent<ICreateNotesProps> = ({
  notes,
  setNotes,
}) => {
  const [error, setError] = useState<string>();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleRef.current?.value === '' || textRef.current?.value === '')
      return setError('All fields are mandatory');

    setError('');
    setNotes([
      ...notes,
      {
        id: new Date().toString(),
        title: (titleRef.current as HTMLInputElement).value,
        text: (textRef.current as HTMLTextAreaElement).value,
        color: (colorRef.current as HTMLInputElement).value,
        date: new Date().toString(),
      },
    ]);

    (titleRef.current as HTMLInputElement).value = '';
    (textRef.current as HTMLTextAreaElement).value = '';
  };

  return (
    <>
      <h2>Create Note</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form className='mt-3 mb-3' onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className='mb-3' controlId='formBasic'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Title for the Note'
            ref={titleRef}
          />

          <Form.Label>Text</Form.Label>
          <Form.Control
            placeholder='Enter Your Notes'
            as='textarea'
            rows={3}
            ref={textRef}
          />

          <Form.Label htmlFor='colorInput'>Notes Color</Form.Label>
          <Form.Control
            type='color'
            id='colorInput'
            defaultValue='#777'
            title='Choose your color'
            ref={colorRef}
          />

          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CreateNotes;
