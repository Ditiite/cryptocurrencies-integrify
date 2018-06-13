import React, { Component } from 'react';
import chartDown from "../images/chartDown.png";

export class Buttons extends Component {

    render() {
        return(
            <div className="sorting-btns">
                <button onClick={() => this.props.sortByName()} 
                    className="sort-btn-name">Sort by name 
                    <i className="fas fa-sort-alpha-down"></i></button> 
                <button
                    onClick={() => this.props.sortByPriceDesc()} 
                    className="sort-btn-price-lowest">Sort by price
                    <i className="fas fa-chart-line"></i>
                </button>
                <button 
                    onClick={() => this.props.sortByPriceAsc()}
                    className="sort-btn-price-higest">Sort by price
                    <img className="chart-down" 
                    src={chartDown} alt="chart arrow going down" />
                </button>
                <button 
                    onClick={() => this.props.sortByRank()}
                    className="sort-btn-rank">Sort by rank 
                    <i className="fas fa-sort-numeric-down"></i>
                </button>
            </div>
        );
    }
}