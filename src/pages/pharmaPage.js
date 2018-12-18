import React, { Component } from 'react';

class farmacoPage extends Component {

    
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        
    }

    render() {
        console.log(this.props);
        
        return (
            <div>
                <p>FARMACOS PAGE -> {this.props.teste} </p>
            </div>
        );
    }
}

export default farmacoPage;