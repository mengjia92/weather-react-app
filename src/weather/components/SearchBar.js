import React, {Component} from "react";
import "../weatherStyle.css";

export class SearchBar extends Component {
    state = {
        newSearch: ""
    }

    getNewSearch() {
        this.props.newCity(this.state.newSearch);
    }

    render() {
        return (
            <div className="weatherRow searchBar" >
                <input type="search" placeholder="Search city..."
                       className="my-search" ng-model="$ctrl.pesquisa" ng-disabled="'@ViewBag.EditaConteudo'"
                       value={this.state.newSearch}
                       onChange={event => {
                           this.setState({newSearch: event.target.value})}} />
                <button onClick={this.getNewSearch.bind(this)}>Search</button>
            </div>
        )
    }
}