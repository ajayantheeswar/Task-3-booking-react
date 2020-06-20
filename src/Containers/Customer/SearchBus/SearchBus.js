import React, { Component, useReducer } from 'react';
import Search from '../../../Components/Search/Search';
import classes from './SearchBus.module.css';
import Busitem from '../../../Components/BusItem/BusItem';
import SearchResult from '../../../Components/Search/SearchResult/SearchResult';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class SearchBus extends Component{
    constructor(props){
        super(props);
        this.state = {
            origin : '',
            destination : '',
        }
    }

    onSearchClicked = () => {
        this.props.onSearch(this.props.token,this.state.origin,this.state.destination);

    }

    onFormChanged = (event,id) => {
        event.persist();
        this.setState((prevState) => {
            const updated = {...prevState};
            updated[id] = event.target.value
            return updated;
        })
    }

    onBookClicked = (busId) => {
        this.props.onBook(busId,this.state.origin);
        console.log(this.props);
        this.props.history.push('/customer/bookticket');
    }

    render(){
        let SearchReusltList;
        if(this.props.searchResults && this.props.searchResults.length >0){
            SearchReusltList = this.props.searchResults.map(result => {
                const origin = this.props.searchOrigin;
                const destination = this.props.searchDestination;
                const timing = origin === result.endpointA ? result.timingA : result.timingB;
                return(<li key={result.id}><SearchResult Bus={result} origin={origin} destination={destination} onBookClicked={this.onBookClicked} time={timing} /></li>);
            });
        }
         return (
            <div>
                <Search origin={this.state.origin}
                 destination={this.state.destination}
                 onChange = {this.onFormChanged}
                 onSearch = {this.onSearchClicked} />
                <ul className={classes['Search-results']}>
                    {SearchReusltList}
                </ul>
            </div>
        );
    }
};

const mapPropstoState = state => {
    return{
        searchResults : state.customer.SearchResults,
        token : state.auth.token,
        searchOrigin : state.customer.searchOrigin,
        searchDestination : state.customer.searchDestination
    }
}

const mapPropsToDispatch =  dispatch => {
    return {
        onSearch : (token,origin,destination) => dispatch(actions.fetchSearchResultsAsync(token,origin,destination)),
        onBook : (busId,origin) => dispatch(actions.SelectBus(busId,origin))
    }
}

export default connect(mapPropstoState,mapPropsToDispatch)(SearchBus);