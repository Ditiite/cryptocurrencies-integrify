import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import { Tickers } from "./components/Tickers";

import "./SortButtons.css";
import './App.css';

import chartDown from "./images/chartDown.png";

class App extends Component {
    
    state = {
        query: '',
        data: []
    }

    // For input search field
    updateQuery = (query) => {
        this.setState({ 
            query: query 
        });
    }

    componentDidMount() {
        fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    data: data
                });
            });
    }

    sortByPriceAsc() {
        const sorted = this.state.data.sort((a, b) => (
            parseFloat(b.price_usd) - parseFloat(a.price_usd)
        ));

        this.setState({
            data: sorted
        });
    }

    sortByPriceDesc() {
        const sorted = this.state.data.sort((a, b) => (
            parseFloat(a.price_usd) - parseFloat(b.price_usd)
        ));
        this.setState({
            data: sorted
        });
    }

    render() {
        let showData;

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showData = this.state.data.filter((currency) => match.test(currency.name));
        } else {
            showData = this.state.data
        }

        //showData.sort(sortBy('name'));

        return (
            <div className="container">
                {/* Check if geting any data from input field -> {JSON.stringify(this.state)} */}
                <div className="container-fixed-position">
                    <h1 className="title">Cryptocurrencies</h1>
                    <div className="search-bar">
                        <input
                            name="search"
                            placeholder="Please insert patern"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                    <p className="total-amount">Total amount of cryptocurrency coins
                        <span className="total-num"></span>
                    </p>

                </div>
                <div className="coin-title">
                    <div className="coin-table">
                        <div className="sorting-btns">
                            {/* <button onClick={this.sortByName} className="sort-btn-name">Sort by name 
                                <i className="fas fa-sort-alpha-down"></i></button> */}
                            <button
                                onClick={ () => this.sortByPriceAsc() }
                                className="sort-btn-price-lowest">Sort by price
                                <i className="fas fa-chart-line"></i>
                            </button>
                            <button onClick={() => this.sortByPriceDesc()} className="sort-btn-price-higest">Sort by price
                                <img className="chart-down" src={chartDown} alt="chart arrow going down" />
                            </button>
                            <button className="sort-btn-rank">Sort by rank 
                                <i className="fas fa-sort-numeric-down"></i>
                            </button>
                        </div>

                        <div className="coin-table-title">
                            <p className="center">Name</p>
                            <p>Rank</p>
                            <p>Price</p>
                            <p>% 1h</p>
                            <p>% 24h</p>
                            <p>% 7d</p>
                        </div>
                    </div>

                    <section className="details">
                        <Tickers data={showData} />
                    </section>

                </div>
            </div>
        );
    }
}

export default App;