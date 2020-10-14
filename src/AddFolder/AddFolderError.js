import React, {Component} from 'react';


export default class AppErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state ={hasError:false, error:undefined};
    }
    static getDerivedStateFromError(error){
        return {hasError:true, error:error};
    }
    render(){
        if(this.state.hasError){
            return <h1>{this.state.error.message}</h1>
        }
        return this.props.children;
    }
}