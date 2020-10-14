import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './AddFolder.css';


export default class AddFolder extends Component {
    static contextType=ApiContext

    state={
        name:'',
        error: false
    }

    
    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.name.length > 0){
        this.context.addFolder(this.state.name);
        this.props.history.push('/')
        }
        else{
            this.setState({error:true})
        }
        

    }

    handleNameChange = (e) =>{
        this.setState({name:e.currentTarget.value})
    }
    render() {
        let input = '';
        if(this.state.error){
            input = 
            <div>
                <input onChange={this.handleNameChange} className='error-message' type='text' id='folder-name-input' value={this.state.name} name='folder-name'></input>
                <p className='lighter'>Folder must have a name</p>
            </div>
        } else {
            input = <input onChange={this.handleNameChange} type='text' id='folder-name-input' value={this.state.name} name='folder-name'></input>
        }
        return(
        <section className='add-folder'>
            <h2>Create a folder</h2>
            <form onSubmit={this.handleSubmit} >
                <label htmlFor='folder-name'>Name</label>
                {input}
                <button type='submit'>Add Folder</button>
            </form>
        </section>
        )
    }
}

AddFolder.defaultProps ={

}