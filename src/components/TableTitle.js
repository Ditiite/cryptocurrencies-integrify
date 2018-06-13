import React, { Component } from 'react';

class TableTitle extends Component {
    render() {

        return(
            <div className="coin-table-title">
                <p className="center">Name</p>
                <p>Rank</p>
                <p>Price</p>
                <p>% 1h</p>
                <p>% 24h</p>
                <p>% 7d</p>
            </div>
        );
    }
}

export default TableTitle;