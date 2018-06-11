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

    //Fetching data from API
    componentDidMount() {
        fetch('https://api.coinmarketcap.com/v1/ticker/?limit=2000')
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    data: data
                });
            });
    }

    //Sort by price ascending
    sortByPriceAsc() {
        const sorted = this.state.data.sort((a, b) => (
            parseFloat(b.price_usd) - parseFloat(a.price_usd)
        ));

        this.setState({
            data: sorted,
            query: ''
        });
    }

    //Sort by price descending
    sortByPriceDesc() {
        const sorted = this.state.data.sort((a, b) => (
            parseFloat(a.price_usd) - parseFloat(b.price_usd)
        ));
        this.setState({
            data: sorted,
            query: ''
        });
    }

    //Sort by rank
    sortByRank() {
        const sorted = this.state.data.sort((a, b) => (
            parseFloat(a.rank) - parseFloat(b.rank)
        ));
        this.setState({
            data: sorted,
            query: ''
        });
    }
    

    render() {
        let showData;
        //Showing data according to input field
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
                            type="text"
                            name="search"
                            placeholder="Please insert pattern"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>

                    {/* Check the length of the data */}
                    
                        {showData.length !== this.state.data.length && (
                            <p className="total-amount">
                                Found match - 
                                {' '  + showData.length} out of -
                                {' '  + this.state.data.length}
                                
                            </p>
                        )}
                        

                </div>
                <div className="coin-title">
                    <div className="coin-table">
                        <div className="sorting-btns">
                            {/* <button onClick={this.sortByName} className="sort-btn-name">Sort by name 
                                <i className="fas fa-sort-alpha-down"></i></button> */}
                            <button
                                onClick={() => this.sortByPriceDesc()} 
                                className="sort-btn-price-lowest">Sort by price
                                <i className="fas fa-chart-line"></i>
                            </button>
                            <button 
                                onClick={ () => this.sortByPriceAsc() }
                                className="sort-btn-price-higest">Sort by price
                                <img className="chart-down" 
                                src={chartDown} alt="chart arrow going down" />
                            </button>
                            <button 
                                onClick={ () => this.sortByRank() }
                                className="sort-btn-rank">Sort by rank 
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