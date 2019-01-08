import React, { Component } from 'react';

class PharmaPage extends Component {

    
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        
    }

    render() {
        console.log(this.props);
        
        return (
            <div>
                <h1 className="title">
          Fármacos
        </h1>
            </div>
        );
    }
}

export default PharmaPage;