import React, { Component } from 'react';
import './Cryptocurrency.css';

class Cryptocurrency extends Component {
    render() {
        const {
            name,
            rank,
            symbol,
            price_usd,
            percent_change_1h,
            percent_change_24h,
            percent_change_7d,
        } = this.props.data;

        return(
            <div className="coin">
                <p className="cryptocurrency-name">{name} ({symbol})</p>
                <p>{rank}</p>
                <h1>${(+price_usd)}</h1>
                <p style={percent_change_1h < 0 ? {color:'#ff0033'} : {color:'#05af0d'}}>
                    {percent_change_1h}
                </p>
                <p style={percent_change_24h < 0 ? { color: '#ff0033' } : { color: '#05af0d' }}>
                    {percent_change_24h}
                </p>
                <p style={percent_change_7d < 0 ? { color: '#ff0033' } : { color: '#05af0d' }}>
                    {percent_change_7d}
                </p>
            </div>
        );
    }
}

export default Cryptocurrency;
