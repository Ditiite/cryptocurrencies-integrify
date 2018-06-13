import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return(
            <div className="loader-container">
                <div class="loader">
                    <div class="loader-abs"></div> 
                    <div class="loader-abs"></div>
                </div>
            </div> 
        );
    }
}

export default Loader;