import React, { Component } from 'react';
import Cryptocurrency from './Cryptocurrency';
import './Tickers.css';

export class Tickers extends Component {
 
    render() {
        const tickers = this.props.data.map((currency) => 
            <Cryptocurrency data={currency} key={currency.id} />
        );

        return(
            <div className="tickers-container">
                <ul className="tickers">
                    {tickers}
                </ul>
            </div>
        );
    }
}
// export default Tickers;