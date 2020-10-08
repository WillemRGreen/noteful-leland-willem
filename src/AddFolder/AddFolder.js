import React, { Component } from 'react';
import ApiContext from '../ApiContext';


export default class AddFolder extends Component {
    static contextType=ApiContext

    state={
        name:''
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.context.addFolder(this.state.name)
    }

    handleNameChange = (e) =>{
        this.setState({name:e.currentTarget.value})
    }
    render() {
        return(
        <section className='AddFolder'>
            <h2>Create a folder</h2>
            <form onSubmit={this.handleSubmit} >
                <label htmlFor='folder-name'>Name</label>
                <input onChange={this.handleNameChange} type='text' id='folder-name-input' value={this.state.name} name='folder-name'></input>
                <button type='submit'>Add Folder</button>
            </form>
        </section>
        )
    }
}