import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './AddNote.css';
import PropTypes from 'prop-types';


export default class AddNote extends Component {
    static contextType=ApiContext

    state={
        name:'',
        content:'',
        folderId:'',
        nameError:false,
        contentError:false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name.length > 0){
            if(this.state.content.length > 0){
                this.context.addNote(this.state.name, this.state.content, this.state.folderId);
            } else {
                this.setState({contentError:true})
            }
            
        } else {
            this.setState({nameError:true})
        }
        
    }

    handleNameChange = (e) => {
        this.setState({name:e.currentTarget.value})
    }

    handleContentChange = (e) => {
        this.setState({content:e.currentTarget.value})
    }

    handleFolderIdChange = (e) => {
        this.setState({folderId:e.currentTarget.value})
    }

    render() {
        let nameInput ='';
        let contentInput='';
        if(this.state.nameError ){
            nameInput = 
                <div>
                    <input onChange={this.handleNameChange} className ='error-message' value={this.state.name} type='text' id='note-name-input' name='note-name'></input>
                    <p>Enter a name</p>
                </div>
        } else {
            nameInput=
            <div>
                <input onChange={this.handleNameChange} value={this.state.name} type='text' id='note-name-input' name='note-name'></input>
            </div>
        }
        if(this.state.contentError){
            contentInput =
            <div>
                <input onChange={this.handleContentChange} class ='error-message' value={this.state.content} type="text" id="note-content-input" name='note-content' ></input>
                <p>Enter content</p>
            </div>
        } else {
            contentInput = 
            <input onChange={this.handleContentChange} value={this.state.content} type="text" id="note-content-input" name='note-content' ></input>
        }
        return(
        <section className='add-note'>
            <h2>Create a note</h2>
            <form onSubmit={this.handleSubmit} >
                <label htmlFor='folder-name'>Name</label>
                {nameInput}
                <label htmlFor='note-content'>Content</label>
                {contentInput}
                <select onClick={this.handleFolderIdChange} name='folder-list'>
                    {this.props.folders.map(folder =>
                        <option value={folder.id}>{folder.name}</option>)}
                </select>
                <button type='submit'>Add Note</button>
            </form>
        </section>
        )
    }
}
AddNote.propTypes ={
    folders: PropTypes.array.isRequired
}
AddNote.defaultProps ={
    folders:[]
}