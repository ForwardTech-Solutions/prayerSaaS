//default
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

//cognito authentication 
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

//appsync api
import {API} from 'aws-amplify';
import {listPrivateNotes} from './graphql/queries'
import {createPrivateNote, deletePrivateNote} from './graphql/mutations'


//after imports
Amplify.configure(aws_exports);


//initials
const initialFormState = {content: ''}


function App2() {
  const [notes, setNotes] = useState([])
  const [formData, setFormData] = useState(initialFormState)
  const [currentUser, setCurrentUser] = useState('not-signed-in')

  useEffect(() => {
   fetchMyNotes();
   updateAWSUser();
  }, [])

  async function updateAWSUser() {
    try{
      let user = await Auth.currentAuthenticatedUser();
      console.log(user.username)
      setCurrentUser(user.username)
    } catch (err) {
      console.log ("error", err)
    }
  }


  async function fetchMyNotes() {
    const apiData = await API.graphql({query: listPrivateNotes});
    setNotes(apiData.data.listPrivateNotes.items);
  }

  async function createNote() {
    if (!formData.content) return;
    await API.graphql({ query: createPrivateNote, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deletePrivateNote, variables: { input: { id } }});
  }


  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{flex:1}}>
              <h1>{currentUser}'s Notes </h1>
              <input
                onChange={e => setFormData({ ...formData, 'content': e.target.value})}
                placeholder="Note"
                value={formData.content}
              />

              <button onClick={createNote}>Create Note</button>
              <div style={{marginBottom: 30}}>
                {
                  notes.map(note => (
                    <div key={note.id || note.content} style={{ border: '4px dotted lightblue'}}>
                      <h2>{note.content}</h2>

                      <button onClick={() => deleteNote(note)}>Delete note</button>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
            
          
      </header> 
    </div>
  );

}



export default withAuthenticator(App2, true);
