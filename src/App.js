import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import { Currency } from './components/Currency';

import { Buttons } from './components/Buttons';
import './SortButtons.css';
import './App.css';
import './components/Loader.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.sortByName = this.sortByName.bind(this);
        this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByRank = this.sortByRank.bind(this);
        
        this.state = {
            query: '',
            data: [], //will hold data from fetch call
            loading: false //change to true when data is loaded
        }
    }
    

    // For input search field
    updateQuery = (query) => {
        this.setState({ 
            query: query 
        });
    }

    //Fetching data from API
    componentDidMount() {
        this.setState({ loading: true }, () => {
            fetch('https://api.coinmarketcap.com/v1/ticker/?limit=2000')
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    loading: false,
                    data: data
                });
            });
        })
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
    
    sortByName() {
        const sorted = this.state.data.sort(sortBy('name'));
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

        const { data, loading } = this.state;

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
                {/* If data loading show loader else show data */}
                { loading ? 
                <div className="loader-container">
                    <div class="loader">
                        <div class="loader-abs"></div> 
                        <div class="loader-abs"></div>
                    </div>
                </div> :
                <div className="coin-title">
                    <div className="coin-table">
                        <Buttons 
                            data={this.state.data}
                            sortByPriceDesc = {this.sortByPriceDesc}
                            sortByPriceAsc = {this.sortByPriceAsc}
                            sortByRank = {this.sortByRank}
                            sortByName = {this.sortByName}
                        />

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
                        <Currency data={showData} />
                    </section>

                </div> }
            </div>
        );
    }
}

export default App;