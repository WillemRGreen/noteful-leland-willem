import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.js';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleAddFolder = name => {
       const fullName ={name: name}
       fetch(`${config.API_ENDPOINT}/folders`,{
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
           body: JSON.stringify(fullName)
       })
       .then((foldersRes) => {
        if(!foldersRes.ok){
            return foldersRes.json().then(error =>{
                throw error
            })
        }
            return foldersRes.json()
       })
       .then((data)=>{
           let newFolders=this.state.folders
           newFolders.push(data)
           this.setState({folders:newFolders})
       })
       .catch(error =>{
           console.log({error})
       })
       
    }

    handleAddNote = (name, content, folderId) => {
        console.log(name, content, folderId)
       const fullPost ={name: name, content:content, folderId:folderId}
       fetch(`${config.API_ENDPOINT}/notes`,{
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
           body: JSON.stringify(fullPost)
       })
       .then((notesRes) => {
        if(!notesRes.ok){
            return notesRes.json().then(error =>{
                throw error
            })
        }
            return notesRes.json()
       })
       .then((data)=>{
           let newNotes=this.state.notes
           newNotes.push(data)
           this.setState({notes:newNotes})
       })
       .catch(error =>{
           console.log({error})
       })
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" render={(routerProps) => {
                    return(
                    <ErrorBoundary>
                        <AddFolder routerProps={routerProps} />
                    </ErrorBoundary>
                    )
                }} 
                />
                <Route path="/add-note" render={(routerProps) => {
                    return (
                        <ErrorBoundary>
                            <AddNote
                                routerProps={routerProps}
                                folders={this.state.folders}
                            />
                        </ErrorBoundary>
                    )
                }} 
                />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
