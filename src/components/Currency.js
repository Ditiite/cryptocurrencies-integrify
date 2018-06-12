import React, { Component } from 'react';
import Cryptocurrency from './Cryptocurrency';

export class Currency extends Component {
 
    render() {
        const currency = this.props.data.map((currency) => 
            <Cryptocurrency data={currency} key={currency.id} />
        );

        return(
            <div className="currency-container">
                <div className="currency">
                    {currency}
                </div>
            </div>
        );
    }
}
